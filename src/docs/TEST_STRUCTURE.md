# Frontend Unit Test Structure

This document describes the standard structure for unit tests across the app. Use it as a template when adding tests for new pages or components.

## File placement

- **Tests folder:** Use the root-level `tests/` directory for all test files. Keep the same folder structure as `src/` so each test file mirrors its source (e.g. `src/pages/landing/landingView.js` → `tests/pages/landing/landingView.test.js`).
- **Naming:** `ComponentName.test.js`, `viewName.test.js`, or `controllerName.test.js` next to the path that mirrors the source. Use a separate test file for controllers when testing data-fetching and mocked APIs (e.g. `landingController.test.js` alongside `landingView.test.js`).
- **Fixtures:** Put shared, stable mock data and API response shapes under `tests/fixtures/<area>/` (e.g. `tests/fixtures/landing/apiResponses.js`, `tests/fixtures/landing/landingViewProps.js`). Import these in test files so values stay consistent across suites.
- **Helpers:** Put reusable mock wiring (e.g. `global.fetch`, `axios.get`, Apollo) under `tests/helpers/` (e.g. `tests/helpers/landingApiMocks.js`). Tests should not duplicate the same `jest.fn` setup in every file.

## Section layout

Organize tests with a top-level `describe` for the component and nested `describe` blocks by feature or behavior. Order sections as follows:

| Section         | Purpose |
|----------------|--------|
| **Rendering**  | Smoke tests: renders without crashing, with required props, and with minimal/empty data. |
| **[Feature]**  | One nested `describe` per major feature (e.g. Hero, Stats, Resources). Test visible content, links, and list length—not backend-dependent values. |
| **Side effects** | Behavior that affects the environment (e.g. `window.scrollTo`, focus). Mock the API and assert it was called. |
| **Edge cases** | Empty arrays, missing optional props, empty strings. Ensure no crashes and sensible output. |

## Conventions

1. **Describe blocks:** Use the component name for the top-level `describe`; use a short label for each section (e.g. `describe('Rendering')`, `describe('Stats section')`).
2. **Test names:** Start with “should” and state the expected behavior (e.g. `it('should render without crashing')`).
3. **Props:** Prefer importing default props from `tests/fixtures/<area>/` (e.g. `defaultLandingStatsData` from `tests/fixtures/landing/landingViewProps.js`). If a test needs a one-off override, spread or replace fields in the test only.
4. **Router:** For components that use `NavLink` or `useNavigate`, wrap the component in `MemoryRouter` from `react-router-dom` in the test.
5. **Mocks:** Mock child components and heavy dependencies (e.g. data fetchers) so tests stay fast and focused. Prefer `jest.mock('path/to/module')` at the top of the file.
6. **Global/window:** If the component or its children call `window.scrollTo`, `window.open`, or similar, set them in `beforeEach` (e.g. `window.scrollTo = jest.fn()`) so tests don't rely on jsdom's unimplemented stubs.
7. **Queries:** Prefer `getByRole`, `getByLabelText`, or `getByText` from `@testing-library/react`; use `queryBy` when the element may be missing.
8. **No live backend in unit tests:** Do not depend on live API or real network calls. Use static fixture data in view tests. For controller tests that verify frontend API usage, mock the endpoints (see **Controller tests and mocked APIs** below).

## Shared fixtures and mock helpers

- **Purpose:** One place for response shapes, stable numeric values, and production URL strings used in assertions. Tests still **never** open real network connections; `fetch` / `axios` / Apollo are replaced with `jest.fn` implementations.
- **Why include production URLs in fixtures?** The app passes those exact strings to `fetch` (or similar). Assertions like `expect(global.fetch).toHaveBeenCalledWith(ccdcDatasetsCountUrl)` verify the **frontend contract** (which URL the code requests). The mock intercepts the call before it leaves the test environment. Same for JSON bodies: mirror backend shape so tests break if the API contract changes.
- **Landing page (example):**
  - `tests/fixtures/landing/apiResponses.js` — CCDC count URL, `{ data: number }` body, GraphQL `landingDataQuery` data, formatted stat strings for `en-US`, raw `newsData.yaml` string.
  - `tests/fixtures/landing/landingViewProps.js` — default `statsData` / `newsData` for `LandingView` tests.
  - `tests/helpers/landingApiMocks.js` — `createCcdcFetchMock`, `setupNewsYamlAxiosMock`, optional `createLandingGraphqlQueryMock`.
- **Adding new areas:** Create `tests/fixtures/<feature>/` and optional `tests/helpers/<feature>Mocks.js` following the same pattern.

## Controller tests and mocked APIs

When you need to verify that the frontend calls the correct APIs and displays the returned counts (or other data), add a **controller test file** that mocks the endpoints and asserts the UI updates. This keeps tests fast and deterministic while confirming the integration between the controller’s data-fetching and the view.

- **What to mock:** Mimic the real API shape (URLs, request/response format). Import canonical values from `tests/fixtures/<area>/apiResponses.js` (or equivalent) instead of duplicating literals in each test. For example:
  - REST: mock `global.fetch` for the count URL and return the fixture JSON (e.g. `ccdcDatasetsCountResponseBody`).
  - GraphQL: mock `useApolloClient` (or use Apollo’s `MockedProvider`) so `client.query()` resolves with the fixture `data` object (e.g. `landingDataQueryData`).
- **What to assert:** After rendering the controller (with Redux `Provider`, `MemoryRouter`, and any other required wrappers), use `waitFor` or `findBy*` to wait for async updates, then assert that the mocked values appear in the DOM using fixture-derived strings where applicable (e.g. `ccdcDatasetsCountFormatted` for locale-formatted numbers).
- **Other dependencies:** Mock env, `axios`, and other side-effect modules so no real network or config is used. Prefer helpers in `tests/helpers/` for repeated wiring.
- **Reference:** `tests/pages/landing/landingController.test.js` uses `tests/fixtures/landing/apiResponses.js` and `tests/helpers/landingApiMocks.js`, then asserts displayed counts and that `fetch` / GraphQL were called with the expected URL and query.

## Example outline

**View / component tests (static data):**

```javascript
// 1. Mocks (at top of file)
// 2. Import default props from tests/fixtures/<area>/ where applicable
// 3. Top-level describe(ComponentName)
//    - describe('Rendering') → smoke, required props
//    - describe('Feature A')  → content, links, list length
//    - describe('Feature B')  → ...
//    - describe('Side effects') → e.g. scrollTo
//    - describe('Edge cases')  → empty data, missing props
```

**Controller tests (mocked APIs):**

```javascript
// 1. Optional: MutationObserver polyfill if needed for waitFor in test env
// 2. Import fixture data + helpers from tests/fixtures/ and tests/helpers/
// 3. Mocks: fetch, Apollo client (or MockedProvider), axios, env — wire helpers in beforeEach
// 4. Redux store + render helper (Provider, MemoryRouter)
// 5. Top-level describe(ControllerName (mocked count APIs))
//    - it('should call X endpoint and display the mocked count')
//    - it('should call Y query and display the mocked count')
//    - it('should display both counts when both APIs resolve')
```

Adapt section names (e.g. “Hero section”, “Stats section”) to match the page or component under test.
