module.exports = {
    "hooks": {
        "before:init": ["echo v${version}", "git fetch --prune --prune-tags origin", 'pnpm test',],
        "after:release": "echo Successfully released ${version} to ${repo.repository}."
    },
    "git": {
        "commitMessage": "chore: release v${version}"
    },
    "github": {
        "release": false
    }
}