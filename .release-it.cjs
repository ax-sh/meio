module.exports = {
    "hooks": {
        "before:init": "git fetch --prune --prune-tags origin",
        "after:release": "echo Successfully released ${version} to ${repo.repository}."
    },
    "git": {
        "commitMessage": "chore: release v${version}"
    },
    "github": {
        "release": false
    }
}