# Frontend unit tests — structure and AI agent guide

This document is the **single reference** for how we write tests in this repo: file layout, `describe` structure, fixtures, mocked APIs, and patterns for **pure renders**, **mocked HTTP/GraphQL**, and **before/after user input**. Humans and AI agents should follow it when adding or extending tests.

---

## File placement

- **Tests folder:** Use the root-level `tests/` directory for all test files. Keep the same folder structure as `src/` so each test file mirrors its source (e.g. `src/pages/landing/landingView.js` → `tests/pages/landing/landingView.test.js`).
- **Naming:** `ComponentName.test.js`, `viewName.test.js`, or `controllerName.test.js` next to the path that mirrors the source. Use a separate test file for controllers when testing data-fetching and mocked APIs (e.g. `landingController.test.js` alongside `landingView.test.js`).
- **Colocation:** Jest also picks up `src/**/__tests__/**` and `src/**/*.test.js` (see `package.json` `testMatch`). Prefer `tests/` for page-level suites unless colocating a small component test (e.g. `CustomIconView.test.js`).
- **Fixtures:** Put shared, stable mock data and API response shapes under `tests/fixtures/<area>/` (e.g. `tests/fixtures/landing/apiResponses.js`, `tests/fixtures/landing/landingViewProps.js`). Import these in test files so values stay consistent across suites.
- **Helpers:** Put reusable mock wiring (e.g. `global.fetch`, `axios.get`, Apollo) under `tests/helpers/` (e.g. `tests/helpers/landingApiMocks.js`). Tests should not duplicate the same `jest.fn` setup in every file.

---

## Section layout

Organize tests with a top-level `describe` for the component and nested `describe` blocks by feature or behavior. Order sections as follows:

| Section | Purpose |
|---------|--------|
| **Rendering** | Smoke tests: renders without crashing, with required props, and with minimal/empty data. |
| **[Feature]** | One nested `describe` per major feature (e.g. Hero, Stats, Resources). Test visible content, links, and list length—not backend-dependent values. |
| **Side effects** | Behavior that affects the environment (e.g. `window.scrollTo`, focus). Mock the API and assert it was called. |
| **Edge cases** | Empty arrays, missing optional props, empty strings. Ensure no crashes and sensible output. |

Adapt section names (e.g. “Hero section”, “Stats section”) to match the page or component under test.

---

## Conventions

1. **Describe blocks:** Use the component name for the top-level `describe`; use a short label for each section (e.g. `describe('Rendering')`, `describe('Stats section')`).
2. **Test names:** Start with “should” and state the expected behavior (e.g. `it('should render without crashing')`).
3. **Props:** Prefer importing default props from `tests/fixtures/<area>/` (e.g. `defaultLandingStatsData` from `tests/fixtures/landing/landingViewProps.js`). If a test needs a one-off override, spread or replace fields in the test only.
4. **Router:** For components that use `NavLink` or `useNavigate`, wrap the component in `MemoryRouter` from `react-router-dom` in the test.
5. **Mocks:** Mock child components and heavy dependencies (e.g. data fetchers) so tests stay fast and focused. Prefer `jest.mock('path/to/module')` at the top of the file.
6. **Global/window:** If the component or its children call `window.scrollTo`, `window.open`, or similar, set them in `beforeEach` (e.g. `window.scrollTo = jest.fn()`) so tests don't rely on jsdom's unimplemented stubs.
7. **Queries:** Prefer `getByRole`, `getByLabelText`, or `getByText` from `@testing-library/react`; use `queryBy` when the element may be missing.
8. **No live backend in unit tests:** Do not depend on live API or real network calls. Use static fixture data in view tests. For controller tests that verify frontend API usage, mock the endpoints (see **Controller tests and mocked APIs** below).

---

## Shared fixtures and mock helpers

- **Purpose:** One place for response shapes, stable numeric values, and production URL strings used in assertions. Tests still **never** open real network connections; `fetch` / `axios` / Apollo are replaced with `jest.fn` implementations.
- **Why include production URLs in fixtures?** The app passes those exact strings to `fetch` (or similar). Assertions like `expect(global.fetch).toHaveBeenCalledWith(ccdcDatasetsCountUrl)` verify the **frontend contract** (which URL the code requests). The mock intercepts the call before it leaves the test environment. Same for JSON bodies: mirror backend shape so tests break if the API contract changes.
- **Landing page (example):**
  - `tests/fixtures/landing/apiResponses.js` — CCDC count URL, `{ data: number }` body, GraphQL `landingDataQuery` data, formatted stat strings for `en-US`, raw `newsData.yaml` string.
  - `tests/fixtures/landing/landingViewProps.js` — default `statsData` / `newsData` for `LandingView` tests.
  - `tests/helpers/landingApiMocks.js` — `createCcdcFetchMock`, `setupNewsYamlAxiosMock`, optional `createLandingGraphqlQueryMock`.
- **Resource pages (YAML from static content):**
  - `tests/fixtures/resource/mciViewProps.js`, `pmtlViewProps.js` — dedicated YAML shapes for Group A views.
  - `tests/fixtures/resource/resourceDataViewProps.js` — minimal keys for `resourceData.yaml` (Group B).
  - `tests/fixtures/resource/cpiResourceFixtures.js` — CPI page: YAML keys + participant-index JSON shape + stats URL constant (Group C).
  - `tests/helpers/resourceYamlApiMocks.js` — `createDedicatedYamlAxiosMock` for mocked `axios.get` (`/mciData.yaml`, `/pmtlData.yaml`, `/resourceData.yaml`, etc.).
  - `tests/helpers/cpiApiMocks.js` — `createCpiStatsFetchSuccessMock`, `createCpiStatsFetchHttpErrorMock` for mocked `global.fetch` to the CPI statistics endpoint.
- **Adding new areas:** Create `tests/fixtures/<feature>/` and optional `tests/helpers/<feature>Mocks.js` following the same pattern.

---

## Controller tests and mocked APIs

When you need to verify that the frontend calls the correct APIs and displays the returned counts (or other data), add a **controller test file** that mocks the endpoints and asserts the UI updates. This keeps tests fast and deterministic while confirming the integration between the controller’s data-fetching and the view.

- **What to mock:** Mimic the real API shape (URLs, request/response format). Import canonical values from `tests/fixtures/<area>/apiResponses.js` (or equivalent) instead of duplicating literals in each test. For example:
  - REST: mock `global.fetch` for the count URL and return the fixture JSON (e.g. `ccdcDatasetsCountResponseBody`).
  - GraphQL: mock `useApolloClient` (or use Apollo’s `MockedProvider`) so `client.query()` resolves with the fixture `data` object (e.g. `landingDataQueryData`).
- **What to assert:** After rendering the controller (with Redux `Provider`, `MemoryRouter`, and any other required wrappers), use `waitFor` or `findBy*` to wait for async updates, then assert that the mocked values appear in the DOM using fixture-derived strings where applicable (e.g. `ccdcDatasetsCountFormatted` for locale-formatted numbers).
- **Other dependencies:** Mock env, `axios`, and other side-effect modules so no real network or config is used. Prefer helpers in `tests/helpers/` for repeated wiring.
- **Reference:** `tests/pages/landing/landingController.test.js` uses `tests/fixtures/landing/apiResponses.js` and `tests/helpers/landingApiMocks.js`, then asserts displayed counts and that `fetch` / GraphQL were called with the expected URL and query.

---

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

---

## Baseline tests (copy these patterns)

| Area | File | What it demonstrates |
|------|------|----------------------|
| **Pure view / static props** | `tests/pages/landing/landingView.test.js` | `MemoryRouter`, mocked heavy children, fixtures from `tests/fixtures/landing/`, sections: Rendering → features → side effects → edge cases |
| **Controller + mocked HTTP/GraphQL** | `tests/pages/landing/landingController.test.js` | `waitFor`, mocked `fetch` / Apollo `useApolloClient`, Redux `Provider`, asserts **calls** and **DOM** from fixtures |
| **Resource view (YAML-shaped props)** | `tests/pages/resource/MCIResourcePage/mciResourceView.test.js` (and other `*ResourceView.test.js`) | Same section order; mock tables/maps; `tests/fixtures/resource/`; extra `<footer>` nodes when scroll sync needs them; `hidden: true` for links inside `display:none` regions |
| **Resource view (YAML + API-driven stats)** | `tests/pages/resource/CPIResourcePage/cpiResourceView.test.js` | Same section order; pass `cpiStats` / `loadingCpiStats` / `cpiStatsError` with `cpiResourceFixtures.js`; assert loading, unavailable, and formatted stat rows |
| **Resource controller (mocked axios YAML)** | `tests/pages/resource/MCIResourcePage/mciResourceController.test.js` (and other `*ResourceController.test.js`) | `createDedicatedYamlAxiosMock`, mock `env` + `axios`, nested `describe('Mocked axios …')`, assert `/mciData.yaml?ts=` or `/resourceData.yaml?ts=` URL + fixture text |
| **Resource controller (YAML + external fetch)** | `tests/pages/resource/CPIResourcePage/cpiResourceController.test.js` | Same axios/YAML mocks plus **`global.fetch`** to `participantindex.ccdi.cancer.gov/v1/statistic`; assert both URLs and DOM from `cpiResourceFixtures.js` |
| **Component co-located** | `src/components/CustomIcon/CustomIconView.test.js` | Small presentational component: roles, attributes, edge cases without router |
| **Tabs / props-only display** | `tests/pages/explore/exploreParticipantCount.test.js` | `TabsView` + `createMockStore`, formatting, Redux dispatch simulations, before/after filter **state** via two renders |
| **Full UI + user input** | `tests/pages/explore/exploreFacetFilterUi.test.js` | Real `Inventory` + singleton `src/store`, `fireEvent`, `waitFor`, mock `useApolloClient` branches on variables |
| **URL / search params + data layer (Explore 2.1)** | `tests/pages/explore/exploreUrlQuery.test.js` | `MemoryRouter` `initialEntries`, `resetExploreSingletonStore`, facet pipes (`\|`), age ranges + `*_unknownAges`, `p_id` / `u` / upload metadata, mocked `import_from` `fetch`, `tab`; assert `client.query` `variables` and Redux from `inventoryCover` |
| **Main tab strip + router (Explore 2.2)** | `tests/pages/explore/exploreTabSwitching.test.js` | `createMemoryRouter` / `RouterProvider`, click `role="tab"` (Studies / Files / Participants), assert `location.search` has `tab=`, Redux `inventoryReducer.tab`, `mockQuery` count stable on tab-only navigation |
| **Tabs + active facet (Explore 2.3)** | `tests/pages/explore/exploreTabWithFilters.test.js` | Facet UI selects **Female**, then tab clicks; assert **`activeFilters` + `dashData`**, URL includes **facet + `tab`**, **`mockQuery` count** unchanged after tab-only navigation |
| **Clear all filters (Explore 2.4)** | `tests/pages/explore/exploreClearFilters.test.js` | **`#button_sidebar_clear_all_filters`** after **Female**; URL + **`dashData`** reset, **`mockQuery`** without facet vars; disabled when no filters |
| **Dashboard async / loading (Explore 2.5)** | `tests/pages/explore/exploreDashboardAsync.test.js` | Delayed **`mockQuery`** → **`isDataloading`**; **`data: {}`** with no **`searchParticipants`** → **`dashData` null**, loading **`progressbar`** |
| **Restore URL + import failure (Explore 2.6)** | `tests/pages/explore/exploreInventoryRestore.test.js` | **`return_2_page`** / **main menu** + **`return_query_url`**; **`fetch`** reject on **`import_from`**; relies on **`inventoryCover`** empty-query check compatible with Jest |
| **Tab strip + `TabPanel` table wiring** | `tests/pages/explore/exploreTabTables.test.js` | Real **`TabsView`/`TabPanel`**, mocked **`@bento-core/paginated-table`**; assert **`paginationAPIField`**, **`activeTab`**, tab clicks, **`queryVariables`** |
| **`TabPanel` + real Bento table (rows/columns)** | `tests/pages/explore/exploreTabTableRows.test.js` | Type **2** (+**3** for facet): real paginated table; mocked **`useApolloClient().query`**; **`tests/fixtures/explore/participantOverviewTableRows.js`**, **`studyOverviewTableRows.js`**; **`getByRole('columnheader')`**, fixture-derived cell text |
| **Explore `WidgetView` (Bento charts)** | `tests/pages/explore/exploreWidgetView.test.js` | Type **1** + **3**: **`createMuiTheme` + `ThemeProvider`**, fixtures **`widgetDashboardData.js`**, real **`@bento-core/widgets`**; assert widget **titles** + **COLLAPSE / OPEN** control; no `MemoryRouter` (no routes) |

More detail on Explore: [`tests/pages/explore/README.md`](pages/explore/README.md).

---

## Test types (when to use which)

### 1. Pure frontend render (no network)

**Goal:** Assert visible structure, copy, links, accessibility roles, and formatting from **props or static fixtures**.

- Import default data from `tests/fixtures/<area>/` (e.g. `landingViewProps.js`).
- Mock child modules that pull in assets, Apollo, or app-wide context if they are not the subject of the test.
- Wrap with `MemoryRouter` when the component uses `NavLink`, `Link`, or routing hooks.
- Prefer queries in this order: `getByRole` → `getByLabelText` → `getByText`; use `within()` for regions.
- **Do not** rely on live backends or env-specific URLs unless you assert the **string the app passes** (contract test) with mocks intercepting the call.

**Baseline:** `landingView.test.js`, `CustomIconView.test.js`, the `TabsView`-focused sections of `exploreParticipantCount.test.js`, `tests/pages/explore/exploreWidgetView.test.js` (widget titles from `dashData` fixtures, MUI theme only).

### 2. API / data layer (mocked integration)

**Goal:** Prove the frontend **requests the right thing** and **shows the right thing** after async resolution—without real I/O. This overlaps with **Controller tests and mocked APIs** above; use fixtures, helpers, `waitFor`, and assert both **call contract** (`fetch` / `mockQuery` arguments) and **DOM** (fixture-derived text).

**Baseline:** `landingController.test.js`.

**Explore (`tests/pages/explore/`):** All explore suites use **`tests/fixtures/explore/`** and **mocked Apollo / `fetch` / `env`**—no live I/O (same “no live backends” rule as §1). Each file’s role relative to types **1–3** is fixed in the table below.

| File | Type(s) | Role |
|------|---------|------|
| `exploreParticipantCount.test.js` | **1**, **3** | **1:** `TabsView` counts/formatting from props + fixtures. **3:** simulated filter API → Redux → tab counts (“3 → 1”). |
| `exploreTabTables.test.js` | **2**, **3** | **2:** Stubbed `TableView`; assert `paginationAPIField`, `queryVariables`, wiring. **3:** tab clicks → `activeTab` / Redux. |
| `exploreTabTableRows.test.js` | **2**, **3** | **2:** Real Bento table; mocked `useApolloClient().query`; fixture-derived headers/cells. **3:** `activeFilters` → subset of rows. |
| `exploreUrlQuery.test.js` | **2** | URL/search params → `mockQuery` variables + Redux (`inventoryCover`). |
| `exploreDashboardAsync.test.js` | **2** | Delayed / empty dashboard response → loading UI + `dashData`. |
| `exploreFacetFilterUi.test.js` | **3** | Full `Inventory` + facet sidebar interaction. |
| `exploreTabSwitching.test.js` | **3** | Tab strip + URL + singleton store (pattern **C**). |
| `exploreTabWithFilters.test.js` | **3** | Facet active, then tabs; counts + filters (pattern **D**). |
| `exploreClearFilters.test.js` | **3** | Clear-all control; URL + Redux reset (pattern **E**). |
| `exploreInventoryRestore.test.js` | **3**, **2** | Restore navigation / menu (pattern **G**); `import_from` **`fetch`** mocked. |
| `exploreWidgetView.test.js` | **1**, **3** | **1:** `WidgetView` + `ThemeProvider` + `widgetDashboardData` fixtures; **3:** collapse / open control (`getByText` for MUI button label). Real **`@bento-core/widgets`**; no Apollo. |

Queries should follow §1 order where applicable: **`getByRole`** → **`getByLabelText`** → **`getByText`**; use **`within()`** for tables/regions (see `exploreTabTableRows.test.js`).

### 3. Before and after user input (interaction + state)

**Goal:** Document **initial** UI/state, simulate **user actions**, then assert **updated** UI, Redux, and/or mock client arguments.

| Pattern | When | Baseline |
|--------|------|----------|
| **A. Full interaction** | Mount the real page/container, `fireEvent` on real DOM, mock Apollo/client to return different data when `variables` include filters | `exploreFacetFilterUi.test.js` |
| **B. Two-phase render or dispatch** | Render or dispatch with **unfiltered** props/state, assert `(3)`; then render again or dispatch with **filtered** data, assert `(1)` | `exploreParticipantCount.test.js` (“Filtered API Calls”, “update from 3 to 1”) |
| **C. Tab strip + URL** | `createMemoryRouter` + `RouterProvider`, click `role="tab"`, assert `router.state.location` and singleton store `inventoryReducer.tab` | `exploreTabSwitching.test.js` |
| **D. Facet then tab** | Apply filter via sidebar (same steps as facet UI test), then switch tabs; assert filter + counts persist and no spurious refetch | `exploreTabWithFilters.test.js` |
| **E. Clear all filters** | Select a facet, click **Clear all**; assert URL + Redux + tab counts reset | `exploreClearFilters.test.js` |
| **F. Loading + empty API shape** | Delayed Apollo resolve to assert **`isDataloading`**; empty **`searchParticipants`** keeps loading UI | `exploreDashboardAsync.test.js` |
| **G. Redux + router restore** | Dispatch **`return_2_page`** / saved URL; **`MemoryRouter`** `state`; assert **`location.search`** + **`mockQuery`** | `exploreInventoryRestore.test.js` |
| **H. Tabs + table stubs** | **`TabsView`/`TabPanel`** with mocked paginated table; **`getByRole(..., { hidden: true })`** | `exploreTabTables.test.js` |
| **I. Tabs + real table DOM** | **`TabPanel`** with real **`@bento-core/paginated-table`** / **`@bento-core/table`**; mocked **`useApolloClient().query`**; fixtures mirror overview query shapes; assert **`columnheader`** + cell text (type **2**); optional facet props for row subset (type **3**) | `exploreTabTableRows.test.js` |
| **J. Explore `WidgetView` (charts)** | **`createMuiTheme`** from **`src/themes/light`**, **`ThemeProvider`**; **`tests/fixtures/explore/widgetDashboardData.js`**; polyfill **`ResizeObserver`**; use **`getByText(/COLLAPSE VIEW/i)`** for the collapse control (MUI may not set the button’s accessible name) | `exploreWidgetView.test.js` |

**Rules of thumb:**

- State **explicit expectations before input**: e.g. tab shows `(3)`, `variables.sex_at_birth` is `undefined` on first query.
- State **explicit expectations after input**: e.g. tab shows `(2)`, `activeFilters` matches, `mockQuery` received `variables` with `Female`.
- Polyfill or mock browser APIs missing in JSDOM when needed: `ResizeObserver`, `MutationObserver`, `window.scrollTo`.
- If code dispatches to the **singleton store** (`src/store`), the test must use that same store in `Provider`—see `exploreFacetFilterUi.test.js`.

---

## Prompting guidance (for humans directing an AI)

Use prompts that pin **scope**, **files**, and **outcomes**:

1. **Scope:** Name the source file(s) under test and whether the work is **view-only**, **controller + API mocks**, or **user flow**.
2. **Data:** Point to an existing fixture path or ask to add `tests/fixtures/<feature>/` with stable shapes aligned to production types.
3. **Mocks:** List modules to mock (children, `env`, `graphqlClient`, Apollo) and say “no real network.”
4. **Assertions:** For interactions, require “before: … after: …” in the prompt so tests encode both phases.
5. **Structure:** Ask to follow this document’s sections (Rendering → features → side effects → edge cases) and `it('should …')` naming.

**Example prompt fragments:**

- “Add tests for `src/pages/foo/barView.js` mirroring `tests/pages/landing/landingView.test.js`; mock `HeavyWidget`; use fixtures only.”
- “Add `barController.test.js` like `landingController.test.js`; mock `fetch` to return `tests/fixtures/foo/apiResponses.js`; assert URL and displayed count.”
- “Interaction test: open section X, click Y; before click participant tab shows (3); after, mock returns filtered data and tab shows (2); assert Redux `activeFilters` and Apollo `variables`.”

---

## Rules checklist (agents)

- [ ] **Placement:** `tests/` tree mirrors `src/`; or colocate `*.test.js` under `src/**` per Jest `testMatch` in `package.json`.
- [ ] **No live network** in unit tests; use fixtures + `jest.fn` / `jest.mock`.
- [ ] **Reuse** fixtures and helpers instead of duplicating magic strings and URLs.
- [ ] **Router/Redux:** Provide `MemoryRouter` / `Provider` when the component needs them.
- [ ] **Async:** Use `waitFor` / `findBy*` for post-fetch UI; reset mocks in `beforeEach` where needed.
- [ ] **Queries:** Prefer accessible roles; `data-testid` only when roles/text are inadequate (see existing usage).
- [ ] **Describe structure:** Follow the section layout above; keep **before/after** user input tests readable in one `it` or split **arrange** clearly.
- [ ] **Comments:** File-level comment summarizing scope and key mocks (matches style in baseline files).

---

## Commands

From the repo root:

```bash
npm test
```

CI-style (single run, coverage):

```bash
npm run test:ci
```

Run a single file:

```bash
npm test -- tests/pages/landing/landingView.test.js
```
