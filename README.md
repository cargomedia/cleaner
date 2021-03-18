# Delete Old Issues

Deletes old closed issues that had no activity for a specified amount of time

## List of options

| Input                  | Description                                                                                                 |
| ---------------------- | ----------------------------------------------------------------------------------------------------------- |
| `repository-token`     | Personal Access Token for authorizing repository                                                            |
| `repository-name`      | Name of the repository                                                                                      |
| `repository-owner`     | Owner of the repository                                                                                     |
| `days-before-deletion` | (Optional) Idle number of days before deleting a closed issue. <br>_Defaults to **365**_.                   |
| `dry-run`              | (Optional) Run the action in dry-run mode without actually deleting any issue. <br>_Defaults to **false**_. |

## Usage

Basic:
```yaml
name: 'Delete old issues'
on:
  schedule:
    - cron: '30 9 * * 1'

jobs:
  cleaner:
    runs-on: ubuntu-latest
    steps:
      - uses: cargomedia/cleaner@main
        with:
          repository-token: ${{ secrets.PERSONAL_TOKEN }}
          repository-name: 'foo'
          repository-owner: 'bar'
```

Configure idle number of days before deletion:
```yaml
name: 'Delete old issues'
on:
  schedule:
    - cron: '30 9 * * 1'

jobs:
  cleaner:
    runs-on: ubuntu-latest
    steps:
      - uses: cargomedia/cleaner@main
        with:
          repository-token: ${{ secrets.PERSONAL_TOKEN }}
          repository-name: 'foo'
          repository-owner: 'bar'
          days-before-deletion: 42
```

### Personal Access Token
In order to [delete issues](https://docs.github.com/en/github/setting-up-and-managing-organizations-and-teams/repository-permission-levels-for-an-organization#repository-access-for-each-permission-level) 
the `Admin` permission is required. As `{{ secrets.GITHUB_TOKEN }}` has only `write` permission on issues it is needed to [create a Personal Access Token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)
with scope `repo` and [add it as secret](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository) in your workflow's repository so it can be used in the action.

### Debugging

**Dry-run:**  
You can run this action in dry-run mode (no actions will be taken on your issues) by passing `dry-run` set to `true` as an argument to the action.
