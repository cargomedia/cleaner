const core = require('@actions/core');
const cleaner = require('./cleaner')

async function run() {
  try {
    const repositoryToken = core.getInput('repository-token', {required: true});
    const repositoryName = core.getInput('repository-name', {required: true});
    const repositoryOwner = core.getInput('repository-owner', {required: true});
    const daysBeforeDeletion = parseInt(core.getInput('days-before-deletion', {required: true}));
    const dryRun = core.getInput('dry-run') === 'true';

    let message = 'Deleting older issues...';
    if (dryRun)
      message = 'DRY-RUN: ' + message;
    core.info(message);

    await cleaner(repositoryToken, repositoryName, repositoryOwner, daysBeforeDeletion, dryRun);

    if (!dryRun)
      core.info('Deletion done.');
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
