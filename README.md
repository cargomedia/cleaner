# Delete Old Issues

Deletes old closed issues that had no activity for a specified amount of time

## List of options

| Input                  | Description                                                                                                               |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `repository-token`     | (Optional) Personal Access Token for authorizing repository.<br>_Defaults to **${{ github.token }}**_.                    |
| `repository-name`      | Name of the repository                                                                                                    |
| `repository-owner`     | Owner of the repository                                                                                                   |
| `days-before-deletion` | (Optional) Idle number of days before deleting a closed issue. <br>_Defaults to **365**_.                                 |
| `dry-run`              | (Optional) Run the action in dry-run mode without actually deleting any issue. <br>_Defaults to **false**_.               |

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
          repository-name: 'foo'
          repository-owner: 'bar'
```

Configure access token:
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
          repository-token: ${{ secrets.GITHUB_TOKEN }}
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
          repository-token: ${{ secrets.GITHUB_TOKEN }}
          repository-name: 'foo'
          repository-owner: 'bar'
          days-before-deletion: 42
```

### Debugging

**Dry-run:**  
You can run this action in dry-run mode (no actions will be taken on your issues) by passing `dry-run` set to `true` as an argument to the action.
