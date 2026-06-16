# Git hooks

Versioned hooks for this repo. They are **not** active until you point git at this directory:

```sh
git config core.hooksPath .githooks
```

Run that once per clone.

## `pre-commit`

Strips the account-bound `uid` from any staged `.sosconfig.json` before commit and re-stages the
file. The signageOS CLI writes `uid` on upload; it identifies the uploader's account and must never
be committed or published to the Marketplace / Hub. Requires `node` on `PATH`.
