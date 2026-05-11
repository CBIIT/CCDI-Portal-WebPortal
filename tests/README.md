# Frontend tests — quick guide

For patterns, fixtures, and detailed conventions, see [TEST_STRUCTURE.md](./TEST_STRUCTURE.md).

## Run tests locally

From the repository root:

| Command | What it does |
|--------|----------------|
| `npm install --legacy-peer-deps` | Install dependencies (same flag CI uses). Run once or after dependency changes. |
| `npm test` | Starts Jest in **watch** mode when you are in a git checkout (only changed files by default). Press `a` in the terminal to run all tests, `q` to quit. |
| `npm run test:ci` | Runs the full suite once, with **UTC** timezone, coverage, and the same flags as GitHub Actions. Use this before pushing when you want to match CI. |

**Run part of the suite** (still from repo root; everything after `--` is passed to Jest):

```bash
npm test -- tests/pages/landing/landingView.test.js
npm test -- --watchAll=false
npm test -- -t "should render without crashing"
```

`npm test` defaults to watch mode unless you pass `--coverage`, `--watchAll`, `--no-watch`, or run in CI (`CI=true`).

## Interpret CI test results

1. Open the pull request on GitHub and find the **Checks** section (or the **Actions** tab → workflow **Test**).
2. The job **Test Changes** runs `npm install --legacy-peer-deps` then `npm run test:ci`. If that step fails, Jest reported a failing test or a setup error — open the log for the **Run Jest** step; the failure summary and stack traces are there.
3. A later step may upload coverage to Coveralls; that step is allowed to fail (`continue-on-error`) and does **not** decide whether the workflow passed.
4. Whether a red check blocks merging depends on **branch protection** in the repository settings (required status checks), not on GitHub Actions by itself.

Reproduce a CI failure locally with `npm run test:ci` (same command as CI).

## Where to place new tests

- **Default:** Put files under **`tests/`** and mirror the path under **`src/`**.  
  Example: `src/pages/about/publications/publicationsView.js` → `tests/pages/about/publications/publicationsView.test.js`.
- **Explore:** Keep Explore-related tests under **`tests/pages/explore/`** even when source lives under `src/pages/inventory/` (see [TEST_STRUCTURE.md](./TEST_STRUCTURE.md) for the rationale).
- **Shared data and mocks:** Reuse or add **`tests/fixtures/<area>/`** for static mock data and **`tests/helpers/`** for shared mock setup.
- **Optional colocation:** Jest also picks up `src/**/__tests__/**` and `src/**/*.test.js`. Prefer **`tests/`** for page-level suites; colocate only for small, tightly scoped components if that fits the existing layout.

Naming: use `*.test.js` or `*.spec.js` (see `package.json` → `jest.testMatch`).
