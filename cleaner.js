const github = require('@actions/github');
const dayjs = require('dayjs');

let cleaner = async function (repositoryToken, repositoryName, repositoryOwner, daysBeforeDeletion, dryRun) {
  const query = `query ($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      issues(first: 100, states: CLOSED, orderBy: {field: UPDATED_AT, direction: ASC}) {
        nodes {
          id,
          number,
          title,
          updatedAt
        }
      }
    }
  }`;

  const mutation = `mutation ($issueId: ID!) { 
    deleteIssue(input: {issueId: $issueId}) {
      clientMutationId
    }
  }`;

  const octokit = github.getOctokit(repositoryToken);
  const response = await octokit.graphql(query, {name: repositoryName, owner: repositoryOwner});
  const issueList = response.repository.issues.nodes;
  const limitDate = dayjs().subtract(daysBeforeDeletion, 'days');

  issueList.forEach((issue) => {
    const issueDate = dayjs(issue.updatedAt);
    if (issueDate.isBefore(limitDate)) {
      if (!dryRun)
        octokit.graphql(mutation, {issueId: issue.id});
      console.log(issue)
    }
  });
};

module.exports = cleaner;
