import {CloudBillingClient} from "@google-cloud/billing";
import * as functions from "firebase-functions";

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT;
const PROJECT_NAME = `projects/${PROJECT_ID}`;
const billing = new CloudBillingClient();

export const forceStop = functions
    .region("asia-southeast1")
    .pubsub.topic("budget-cap-enforcer")
    .onPublish(async (pubsubEvent) => {
      const pubsubData = JSON.parse(
          Buffer.from(pubsubEvent.data, "base64").toString()
      );

      if (pubsubData.costAmount <= pubsubData.budgetAmount) {
        return functions.logger.log(`No action necessary.
          (Current cost: ${pubsubData.costAmount})`);
      }

      if (!PROJECT_ID) {
        return functions.logger.log("No project specified");
      }

      const billingEnabled = await _isBillingEnabled(PROJECT_NAME);
      if (billingEnabled) {
        return _disableBillingForProject(PROJECT_NAME);
      } else {
        return functions.logger.log("Billing already disabled");
      }
    });

/**
 * Determine whether billing is enabled for a project
 * @param {string} projectName Name of project to check if billing is enabled
 * @return {bool} Whether project has billing enabled or not
 */
const _isBillingEnabled = async (projectName: string): Promise<boolean> => {
  try {
    const [res] = await billing.getProjectBillingInfo({name: projectName});
    return res.billingEnabled ?? false;
  } catch (e) {
    functions.logger.log(
        `Unable to determine if billing is enabled on specified project,
        assuming billing is enabled`
    );

    return true;
  }
};

/**
 * Disable billing for a project by removing its billing account
 * @param {string} projectName Name of project disable billing on
 * @return {string} Text containing response from disabling billing
 */
const _disableBillingForProject = async (projectName: string) => {
  const [res] = await billing.updateProjectBillingInfo({
    name: projectName,
    projectBillingInfo: {billingAccountName: ""},
  });

  return functions.logger.log(`Billing disabled: ${JSON.stringify(res)}`);
};
