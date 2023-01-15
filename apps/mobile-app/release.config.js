/**
 * Matches both
 * - `[app] feat(ui): some awesome stuff`
 * - `feat(ui): some awesome stuff`
 *
 * since I didn't use the `[app]` header until I added the admin cli to the repo and
 * then turned the repo into a monorepo
 */
const conventionalCommitsParserOptions = {
  // eslint-disable-next-line no-useless-escape
  headerPattern: /^(\[app\]\s|)([\w]*)(?:\(([\w$\.\-\*\s]*)\))?:\s(.*)$/,
  headerCorrespondence: ['appname', 'type', 'scope', 'subject'],
};

module.exports = {
  branches: ['develop'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        parserOpts: conventionalCommitsParserOptions,
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        parserOpts: conventionalCommitsParserOptions,
      },
    ],
    '@semantic-release/changelog',
    'semantic-release-expo',
    [
      '@semantic-release/git',
      {
        assets: ['app.json', 'CHANGELOG.md'],
        message: '[app] chore(release): ${nextRelease.version}',
      },
    ],
    '@semantic-release/github',
  ],
  tagFormat: '@mobouzer/app@v${version}',
};
