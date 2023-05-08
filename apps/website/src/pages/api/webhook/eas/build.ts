// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import crypto from 'crypto';
import got from 'got';
import { capitalize } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';

interface TypedNextApiRequest<T> extends NextApiRequest {
  body: T;
}

export default async function handler(
  req: TypedNextApiRequest<BuildPayload>,
  res: NextApiResponse
) {
  try {
    const expoSignature = req.headers['expo-signature'] as string | undefined;

    if (!expoSignature || !process.env.EAS_SECRET_WEBHOOK_KEY || !process.env.DISCORD_WEBHOOK_URL) {
      return res.status(500).send('Oops!');
    }

    const hmac = crypto.createHmac('sha1', process.env.EAS_SECRET_WEBHOOK_KEY);
    hmac.update(JSON.stringify(req.body));
    const hash = `sha1=${hmac.digest('hex')}`;

    if (!crypto.timingSafeEqual(Buffer.from(expoSignature), Buffer.from(hash))) {
      return res.status(500).send('Oops!');
    } else {
      const fields: (
        | {
            name: string;
            value: string;
            inline: boolean;
          }
        | {
            name: string;
            value: string;
          }
      )[] = [
        {
          name: 'Project Page',
          value: `[${req.body.accountName}/${req.body.projectName}](https://expo.dev/accounts/${req.body.accountName}/projects/${req.body.projectName})`,
          inline: true,
        },
        {
          name: 'Platform',
          value: capitalize(req.body.platform),
          inline: true,
        },
        {
          name: '‎',
          value: '‎',
          inline: true,
        },
        {
          name: 'App Version',
          value: req.body.metadata.appVersion,
          inline: true,
        },
        {
          name: 'SDK Version',
          value: req.body.metadata.sdkVersion,
          inline: true,
        },
        {
          name: 'Build Profile',
          value: req.body.metadata.buildProfile,
          inline: true,
        },
        {
          name: 'Git Commit',
          value: `[${req.body.metadata.gitCommitMessage}](https://github.com/danshilm/MoBouzer/commit/${req.body.metadata.gitCommitHash})`,
        },
      ];

      if (req.body.status === 'finished') {
        fields.push({
          name: 'Artifact URL',
          value: req.body.artifacts.buildUrl ?? '',
        });
      } else if (req.body.status === 'errored') {
        fields.push({
          name: 'Error',
          value: `${req.body.error?.errorCode ? `[${req.body.error.errorCode}]` : ''}${
            req.body.error?.message ?? ''
          }`,
        });
      }

      await got.post(process.env.DISCORD_WEBHOOK_URL, {
        json: {
          content: null,
          embeds: [
            {
              title: `MoBouzer EAS Build - ${capitalize(req.body.status)}`,
              url: req.body.buildDetailsPageUrl,
              color:
                req.body.status === 'canceled'
                  ? 12626710
                  : req.body.status === 'errored'
                  ? 12390673
                  : 2726948,
              fields: fields,
              timestamp: req.body.completedAt,
            },
          ],
          attachments: [],
        },
      });
      return res.status(200).send('OK!');
    }
  } catch (e) {
    console.log(`Oops: ${e}`);
    return res.status(500).send('Oops!');
  }
}

export interface BuildPayload {
  id: string;
  parentBuildId?: string;
  appId: string;
  initiatingUserId: string;
  cancelingUserId?: string;
  platform: 'android' | 'ios';
  status: 'errored' | 'finished' | 'canceled';
  artifacts: { buildUrl?: string; logsS3KeyPrefix?: string };
  metadata: {
    appName: string;
    channel: string;
    username: string;
    workflow: string;
    buildMode: string;
    runFromCI: boolean;
    appVersion: string;
    cliVersion: string;
    sdkVersion: string;
    buildProfile: string;
    distribution: string;
    appIdentifier: string;
    gitCommitHash: string;
    runtimeVersion: string;
    appBuildVersion: string;
    trackingContext: {
      no_wait: boolean;
      platform: string;
      account_id: string;
      dev_client: boolean;
      project_id: string;
      run_from_ci: boolean;
      sdk_version: string;
      tracking_id: string;
      project_type: string;
      dev_client_version: string;
    };
    gitCommitMessage: string;
    credentialsSource: string;
    runWithNoWaitFlag: boolean;
    reactNativeVersion: string;
    isGitWorkingTreeDirty: boolean;
  };
  metrics: {
    buildEnqueuedTimestamp: number;
  };
  error?: { message: string; errorCode: string };
  createdAt: string;
  enqueuedAt: string;
  provisioningStartedAt: string;
  workerStartedAt?: string;
  completedAt: string;
  updatedAt: string;
  expirationDate: string;
  priority: 'normal' | 'high' | 'low';
  resourceClass: string;
  actualResourceClass: string;
  requestedResourceClass: string;
  maxRetryTimeMinutes: number;
  usageInformationSentToBigQuery: boolean;
  accountName: string;
  projectName: string;
  buildDetailsPageUrl: string;
}
