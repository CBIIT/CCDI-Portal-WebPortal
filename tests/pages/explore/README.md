# Explore Page Tests

## Overview

This directory contains integration tests for the explore page (`/explore`): participant counts in tab headers, **dashboard `WidgetView` charts** (Bento widgets), **main tab strip navigation** (`tab` in the URL), **tabs while facets are active**, **clear-all filters** in the sidebar, **dashboard `client.query` loading / empty payload** behavior, Redux/API wiring, sidebar facet interactions, **deep-link query strings** with mocked GraphQL, and **`TabPanel` table headers/cells** via real Bento paginated table (mocked Apollo only).

Classification vs **`tests/TEST_STRUCTURE.md`** (§§133–153 — test types **1–3**) is summarized in that doc’s **Explore** table under **§2 API / data layer**.

| File | Focus |
|------|--------|
| `exploreParticipantCount.test.js` | `TabsView` counts, filter variables in Redux, and data-flow assertions (mostly isolated components + mock store) |
| `exploreFacetFilterUi.test.js` | End-to-end UI: open facet panel, select **Sex at Birth → Female**, assert refetch variables and updated counts |
| `exploreUrlQuery.test.js` | **`MemoryRouter` deep links**: facets (`|` lists), age ranges + `*_unknownAges`, `p_id` / `u` / upload metadata (`u_fc`, `u_um`), `import_from` + `fetch`, `tab`, combined — asserts `client.query` variables + Redux (`inventoryCover`) |
| `exploreTabSwitching.test.js` | **User clicks main tabs** (Studies, Files, back to Participants): `RouterProvider` + `createMemoryRouter` assert location `search` includes `tab=` and Redux `inventoryReducer.tab`; **no extra** `client.query` on tab-only changes |
| `exploreTabWithFilters.test.js` | **Sex at Birth → Female**, then switch tabs: **`activeFilters` + `dashData` stay filtered**, URL keeps **`sex_at_birth` + `tab`**, **no extra** dashboard `client.query` after facet refetch |
| `exploreClearFilters.test.js` | **Clear all filtered selections** (`#button_sidebar_clear_all_filters`): **drops facet params from URL**, **`dashData`** back to unfiltered fixture, **`mockQuery` variables** without `sex_at_birth`; control **disabled** when no filters |
| `exploreDashboardAsync.test.js` | **`isDataloading`** while a **delayed** facet refetch runs; **`searchParticipants` absent** in API `data` → **`dashData` stays null**, **`role="progressbar"`** (loading layout) |
| `exploreInventoryRestore.test.js` | **Saved query restore** (`return_2_page`, **main menu** + `return_query_url`); **`import_from` fetch rejects** → import cleared + dashboard query still runs |
| `exploreTabTables.test.js` | **Real `TabsView` + `TabPanel`** with **mocked** `@bento-core/paginated-table`: four tab **pagination** fields (`participantOverview` … `fileOverview`), **`activeTab`**, tab clicks, **`queryVariables`** with **`activeFilters`** |
| `exploreTabTableRows.test.js` | **Real `TabPanel`** + **real** `@bento-core/paginated-table` / `@bento-core/table`; mocked **`useApolloClient().query`**; fixture rows for **Participants** / **Studies**; **`getByRole('columnheader')`**, cell text; facet filter → subset of rows |
| `exploreWidgetView.test.js` | **`WidgetView`** (six Bento chart cards + collapse); **`ThemeProvider` + `createMuiTheme(light)`**; fixtures **`widgetDashboardData.js`**; **no** `MemoryRouter` (no hooks); collapse / open via **`getByText`** |

Shared mock shapes live in **`../fixtures/explore/apiResponses.js`**; overview table row shapes live in **`../fixtures/explore/participantOverviewTableRows.js`** and **`../fixtures/explore/studyOverviewTableRows.js`**; widget `dashData` slices live in **`../fixtures/explore/widgetDashboardData.js`**.

## Test Files

### `exploreParticipantCount.test.js` (23 tests)

- Participant count display in tab headers (`dashboardStats` / formatting)
- Filter variables stored in Redux and passed to GraphQL-style mocks
- Redux → `TabsView` integration and edge cases (zero results, large numbers, etc.)

This suite does **not** mount the full `Inventory` tree; it targets `TabsView` and controlled store updates.

### `exploreUrlQuery.test.js` (10 tests)

- Renders **`Inventory`** with the same **mock stack** as `exploreFacetFilterUi` (real `src/store`, mocked `useApolloClient`, `WidgetView`, `TabPanel`, cohort, etc.).
- Uses **`MemoryRouter` `initialEntries`** so `inventoryCover`’s `useSearchParams` / `URLSearchParams` effect runs on first paint.
- **Before each test:** `resetExploreSingletonStore()` from `tests/helpers/exploreStoreReset.js` resets inventory slice (unmounting explore dispatches `return_2_page`). **`global.fetch` is restored** after each test so `import_from` cases do not leak into other suites.
- **Apollo mock:** Female-only dashboard fixture is returned only when variables carry **exactly** `sex_at_birth: ['Female']` (so multi-value URLs like `Female|Male` stay on the unfiltered facet fixture).
- Covered URL shapes:
  - Facets: `sex_at_birth=Female`, pipe list `Female|Male` → `variables` + Redux `activeFilters`.
  - Age: `age_at_diagnosis=min,max`; optional `age_at_diagnosis_unknownAges=exclude` → `[min,max]` + `age_at_diagnosis_unknownAges` on `variables`.
  - IDs: `p_id` / `u` pipe lists → `participant_ids`; `u` + `u_fc` + `u_um` → same ids + `localFind` upload metadata (`fileContent`, `unmatched`).
  - `import_from`: mocked `fetch` resolves JSON array; first `client.query` includes `import_data` as stringified rows.
  - Tab: `?tab=`, and combined `sex_at_birth` + `tab`.

### `exploreTabSwitching.test.js` (3 tests)

- **Explore milestone 2.2:** exercises **`TabsView.handleTabChange`** together with **`inventoryCover`** when the route updates.
- **`createMemoryRouter` / `RouterProvider`** (not only `MemoryRouter`) so tests can read `router.state.location` after each click.
- **`resetExploreSingletonStore()`** in `beforeEach` for isolation (same rationale as URL-query tests).
- Assertions: **`tab=N` in the URL**, **`inventoryReducer.tab`**, and on the Studies case **`mockQuery` call count unchanged** after the click (tab navigation uses the `not-facet` / `restoreActionType` path instead of issuing another dashboard query).

### `exploreTabWithFilters.test.js` (2 tests)

- **Explore milestone 2.3:** reuses the **Demographics → Sex at Birth → Female** interaction from **`exploreFacetFilterUi.test.js`**, then clicks **Studies** or **Files → Participants**.
- **`resetExploreSingletonStore()`** in `beforeEach`; **`createMemoryRouter`** for the Studies test asserts **`location.search`** includes both **`sex_at_birth`** and **`tab=`**.
- Assertions after tab changes: **`activeFilters.sex_at_birth`**, **`dashData.numberOfParticipants`**, **Participants** tab label **`(2)`**, and **`mockQuery` call count** unchanged after the facet-driven refetch completes (tab moves alone do not trigger another `getData`).

### `exploreClearFilters.test.js` (2 tests)

- **Explore milestone 2.4:** **`inventoryView.js`** `CustomClearAllFiltersBtn` — `generateQueryStr` resets known query keys, **`navigate`**, `@bento-core/facet-filter` **`onClearAllFilters`**, **`resetAllData`**, and **`UNKNOWN_AGES_CHANGED`** for default age fields.
- Apply **Female** first (same Demographics flow as other Explore UI tests), then click **`#button_sidebar_clear_all_filters`**.
- Assert **`location.search`** no longer includes **`sex_at_birth`**, participant count returns **`(3)`**, **`activeFilters.sex_at_birth`** is cleared, and a **`mockQuery`** call exists with **no** `sex_at_birth` variable.
- Second test: with **no** facet selection, the clear button is **`disabled`**.

### `exploreDashboardAsync.test.js` (2 tests)

- **Explore milestone 2.5:** **`inventoryCover.getData`** integration with Redux **`inDataloading`** and the **`if (result.searchParticipants)`** guard.
- **Loading:** First `mockQuery` resolves immediately; the **second** call (after **Female**) resolves after a **200ms** delay — asserts **`inventoryReducer.isDataloading`** is **`true`** then returns to **`false`**, and the filtered **`dashData`** lands afterward.
- **Empty payload:** After **`syncUpDashboard(null, null)`** (no `dashData`), **`mockQuery` resolves `{ data: {} }`** so **`searchParticipants`** is missing — Explore stays on the **`inventoryView`** loading branch (**`progressbar`**), and **`dashData`** remains **`null`**. Does **not** use rejected promises (the app has no `.catch` on `getData`).

### `exploreInventoryRestore.test.js` (3 tests)

- **Explore milestone 2.6:** **`LocationProbe`** + **`MemoryRouter`** assert **`useLocation().search`** after `navigate` (same router context as **`Inventory`**).
- **Return to explore:** Redux **`return_2_page`** + **`return_query_url`** (`?sex_at_birth=Female`) with **`/explore`** and no query → URL updates; **`mockQuery`** receives **`Female`** variables.
- **Main menu:** **`return_query_url`** `?tab=2`, **`location.state.navigationType`** **`main_menu`**, empty search → URL gains **`tab=2`**, tab index **2** in Redux.
- **`import_from` failure:** **`fetch` rejects**; Redux import fields clear; dashboard **`mockQuery`** runs without **`import_data`**.
- **`inventoryCover`** uses **`[...query.keys()].length === 0`** (not **`query.size`**) so empty-query detection works in **Jest / jsdom** where **`URLSearchParams.prototype.size`** is undefined.

### `exploreTabTables.test.js` (5 tests)

- **`TabsView` + `TabPanel`** mount **without** mocking `TabPanel`; **`@bento-core/paginated-table`** is mocked (`types` / `btnTypes`, stub **`TableView`**) so Jest does not run live GraphQL pagination.
- Asserts **four** regions (**Participants**, **Studies**, **Samples**, **Files**) with the expected **`paginationAPIField`** from **`dashboardTabData.tabContainers`**.
- Uses **`getByRole('region', { name, hidden: true })`** because inactive panels sit under **`hidden`** wrappers.
- Clicks **Studies** / **Files** tab roles → Redux **`inventoryReducer.tab`** and exactly one **`data-active-tab="true"`** table.
- Passes **`activeFilters: { sex_at_birth: ['Female'] }`** and asserts **`queryVariables`** on the Participants stub include **`sex_at_birth`**.

### `exploreWidgetView.test.js` (6 tests)

- Isolated **`src/pages/inventory/widget/WidgetView.js`**: same unit the Explore right panel uses for `data={dashData}`.
- **Type 1 + 3** per **`tests/TEST_STRUCTURE.md`**: `widgetDashboardData.js` populates all `widgetConfig` slots; empty-slice fixture yields no chart headers; **COLLAPSE VIEW** / **OPEN VIEW** via `fireEvent` + `getByText` (MUI collapse control’s **button** has no reliable `getByRole` name in Jest).
- **Theme:** `createMuiTheme` from **`src/themes/light`** (includes `palette.widgetBackground` required by Bento + JSS).
- **Not** a full **`Inventory`** mount; no Apollo. Real **`@bento-core/widgets`** (Recharts under the hood); `ResizeObserver` / `MutationObserver` in `beforeEach`.

### `exploreTabTableRows.test.js` (3 tests)

- **`TEST_STRUCTURE.md` type 2** (mocked integration): **`Provider`** + **`GlobalProvider`** + **`CohortModalProvider`** + **`MemoryRouter`**; **`useApolloClient().query`** mocked; **`graphql` `getOperationAST`** dispatches **`participantOverview` / `studyOverview`** fixture data.
- Asserts **`getByRole('columnheader', { name: /…/i })`** and fixture-derived **`getByText`** for participant and study rows; one test passes **`activeFilters`** and expects the non-matching row absent.
- Complements **`exploreTabTables.test.js`** (stub table, wiring only) by exercising real Bento **`TableView`** rendering.

### `exploreFacetFilterUi.test.js` (1 test)

- Renders **`Inventory`** from `inventoryController.js` at `/explore` with the **real `src/store` singleton** (required because `inventoryCover.js` dispatches dashboard updates to that store, not only React context).
- Mocks **`useApolloClient`** so `getData()` returns fixture payloads from `apiResponses.js`:
  - Initial load: `exploreDashboardWithSexAtBirthFacets` (facet buckets for Female/Male).
  - After selecting Female: `exploreDashboardFemaleOnly` (filtered counts aligned with `sampleParticipants`).
- Mocks heavy or environment-dependent modules (`env`, `graphqlClient`, `WidgetView`, `TabPanel`, cohort modal/context) so the page mounts in JSDOM.
- Interaction: open **Demographics** → expand **Sex at Birth** → click the **Female** facet row (via MUI label / leaf text; checkbox queries alone are unreliable).
- Assertions: `dashData.numberOfParticipants`, `activeFilters.sex_at_birth`, **Participants** tab label includes the new count, and `client.query` was invoked with `variables.sex_at_birth` containing `Female`.

Facet list container queries use `[class*="contentPanelBody"]` (the sidebar body used by the inventory layout).

### Test fixtures — `../fixtures/explore/apiResponses.js`

- **`sampleDashboardData`** / **`sampleParticipants`** — baseline dashboard and participant rows used across tests.
- **`dashboardQueryResponseData`**, **`createMockStore`**, **`createDashboardQueryMock`** — helpers for participant-count tests.
- **`exploreDashboardWithSexAtBirthFacets`** — extends `sampleDashboardData` with `participantCountBySexAtBirth` and `filterParticipantCountBySexAtBirth` buckets (e.g. Female 2, Male 1) so the facet UI renders options; still **3** participants overall.
- **`exploreDashboardFemaleOnly`** — filtered dashboard payload (`numberOfParticipants: 2`, adjusted entity counts, single Female bucket) returned when the mock sees `sex_at_birth` including `Female`, matching two Female rows in `sampleParticipants`.

## Test Architecture

### Data Flow Being Tested

```
┌─────────────────┐
│  User Action    │ (Selects filter or loads page)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ inventoryCover  │ (useEffect triggers on URL change)
│   getData()     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Apollo Client  │ (Executes DASHBOARD_QUERY_NEW)
│   + GraphQL     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  API Response   │ searchParticipants { numberOfParticipants: 60622 }
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│     Redux       │ syncUpDashboard() action
│  State Update   │ inventoryReducer.dashData = {...}
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   TabsView      │ Component receives dashboardStats prop
│  Component      │ getTabs() formats with .toLocaleString()
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  UI Display     │ "Participants (60,622)"
└─────────────────┘
```

## Test Suites

### 1. Component Display Tests (12 tests)

Tests the `TabsView` component in isolation to verify proper rendering and formatting.

#### Component Rendering (2 tests)
- ✅ Renders without crashing
- ✅ Renders all 4 tabs (Participants, Studies, Samples, Files)

#### Participant Count Display (4 tests)
- ✅ Displays participant count from `dashboardStats` prop
- ✅ Formats large numbers with thousand separators (e.g., 60,622)
- ✅ Uses correct field mapping from tabs configuration
- ✅ Displays all tab counts with proper formatting

#### Count Formatting (3 tests)
- ✅ Formats zero: `(0)`
- ✅ Formats very large numbers: `(1,234,567)`
- ✅ Uses en-US locale formatting

#### Edge Cases (3 tests)
- ✅ Handles missing `dashboardStats` gracefully (throws error)
- ✅ Handles single-digit counts
- ✅ Handles thousands correctly: `(5,000)`

### 2. Filter & User Input Tests (6 tests)

Tests that verify user interactions with filters correctly affect API calls and update counts.

#### Filter Integration Tests
1. **`should call API with filter variables when user selects a facet`**
   - Verifies filter variables are stored in Redux
   - Confirms API response updates participant count
   - Tests: `sex_at_birth: ['Female']`

2. **`should update participant count from 3 to 1 when filtering by Female`**
   - Real-world scenario: 3 participants (2 male, 1 female) → filter by Female → 1 result
   - Tests the complete UI update cycle
   - Verifies count displays correctly before and after filtering

3. **`should call API with multiple filter variables`**
   - Tests combining multiple filters simultaneously
   - Example: `sex_at_birth: ['Female']`, `race: ['White']`, `age_at_diagnosis: [0, 10]`
   - Verifies all filters are passed to GraphQL query

4. **`should handle zero results when filters exclude all participants`**
   - Tests restrictive filters that match no data
   - Verifies all 4 tabs show `(0)`
   - Important UX edge case

5. **`should correctly format filter variables for GraphQL query`**
   - Validates filter structure matches `DASHBOARD_QUERY_NEW` schema
   - Tests different filter types:
     - **Checkbox filters**: Arrays of strings
     - **Range filters**: `[min, max]` arrays
     - **Participant ID filters**: Arrays of IDs

6. **`should update all tab counts when filters are applied`**
   - Verifies all entity counts update together
   - Tests: Participants, Studies, Samples, Files all reduce proportionally

### 3. Full Integration Tests (5 tests)

Tests the complete data flow from Redux state management to UI rendering.

#### Redux State Flow (2 tests)
- ✅ Updates Redux state when API returns data
- ✅ Passes `dashData` from Redux to `TabsView` component

#### Complete Data Flow (3 tests)
- ✅ Tests full pipeline: API Response → Redux → Component → Display
- ✅ Validates mock data matches real GraphQL response structure
- ✅ Tests 6 different count formats through the complete pipeline

## Real Frontend Code Tested

These tests validate actual production code:

### Components (`exploreParticipantCount`)
- **`TabsView.js`** — Tab headers and counts
- **`getTabs()`** — Count formatting logic
- **`inventoryReducer`** — Redux state management

### Components (`exploreFacetFilterUi`)
- **`inventoryController.js` / `inventoryView.js`** — Explore layout and sidebar
- **`inventoryCover.js`** — `getData()` / Apollo `client.query` and Redux sync
- **`BentoFacetFilter.js`** (and related sidebar) — Facet sections and checkbox UI

### Configuration
- **`tabs`** array from `dashboardTabData.js` — Tab configuration
- **`DASHBOARD_QUERY_NEW`** — GraphQL query structure

### Formatting
- **`.toLocaleString('en-US')`** — Number formatting with thousand separators

## Filter Variable Structure

### Supported Filter Types

```javascript
// Checkbox/Select Filters (arrays of strings)
{
  sex_at_birth: ['Female', 'Male'],
  race: ['White', 'Black or African American'],
  diagnosis: ['Acute lymphoblastic leukemia, NOS'],
  study_name: ['phs002371', 'phs002430']
}

// Range Filters (arrays with [min, max])
{
  age_at_diagnosis: [5, 10],
  age_at_last_known_survival_status: [0, 18]
}

// Participant ID Filters
{
  participant_ids: ['00301d78915737fa100f', '0061cbb084697320fcf']
}
```

### GraphQL Query Variables

Filters are passed to `DASHBOARD_QUERY_NEW` as variables:

```graphql
query search (
  $sex_at_birth: [String],
  $race: [String],
  $age_at_diagnosis: [Int],
  $participant_ids: [String],
  # ... other filter parameters
) {
  searchParticipants(
    sex_at_birth: $sex_at_birth,
    race: $race,
    age_at_diagnosis: $age_at_diagnosis,
    participant_ids: $participant_ids,
    # ... other filters
  ) {
    numberOfParticipants
    numberOfStudies
    numberOfSamples
    numberOfFiles
    # ... other fields
  }
}
```

## Mock Data Structure

### Sample Dashboard Data

```javascript
{
  numberOfParticipants: 3,
  numberOfStudies: 1,
  numberOfSamples: 5,
  numberOfFiles: 10,
  // ... filter counts and other fields
}
```

### Sample Participants

The fixture includes 3 sample participants:
1. Female, White, Glioblastoma
2. Male, White, Mixed phenotype acute leukemia
3. Female, Hispanic/Latino & White, Astrocytoma

## Running the Tests

### Run all explore tests (both files)

In Create React App, pass **`CI=true`** (or **`--watchAll=false`**) so Jest exits after one run instead of staying in watch mode:

```bash
CI=true npm test -- --testPathPattern=tests/pages/explore --watchAll=false
```

### Participant count suite only
```bash
npm test -- tests/pages/explore/exploreParticipantCount.test.js
```

### Facet filter UI suite only
```bash
npm test -- tests/pages/explore/exploreFacetFilterUi.test.js
```

### Watch mode (example: participant count file)
```bash
npm test -- tests/pages/explore/exploreParticipantCount.test.js --watch
```

### Coverage (example)
```bash
npm test -- tests/pages/explore/exploreParticipantCount.test.js --coverage
```

### Single test by name
```bash
npm test -- tests/pages/explore/exploreParticipantCount.test.js -t "should update participant count from 3 to 1"
```

## Expected Test Output

Running `npm test -- --testPathPattern=tests/pages/explore` should report **9** suites (**51** tests total: **23** + **1** + **10** + **3** + **2** + **2** + **2** + **3** + **5**). Individual file runs show only that file’s tests.

Example (participant count file only):

```
PASS tests/pages/explore/exploreParticipantCount.test.js
...
Test Suites: 1 passed, 1 total
Tests:       23 passed, 23 total
```

Example (facet UI file):

```
PASS tests/pages/explore/exploreFacetFilterUi.test.js
  Explore — facet filter UI (Sex at Birth)
    ✓ opens Demographics, selects Female, refetches with sex_at_birth and updates participant count

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
```

## What's NOT Tested

Across these suites, the following are still out of scope unless noted above:

- Real network I/O (GraphQL is mocked; no backend required).
- **Every URL edge case** — `exploreUrlQuery.test.js` covers the main `inventoryCover` branches (facets, age + unknown ages, upload/import, tab); encoding quirks, invalid age strings (skipped in code), `import_from` fetch failures, and additional facets can still be added if product behavior expands.
- **Tab strip + facets** — `exploreTabSwitching.test.js` / `exploreTabWithFilters.test.js` cover Redux, URL, and counts (**`TabPanel` mocked** there). **`exploreTabTables.test.js`** asserts **`TabPanel` → mocked `TableView`** wiring only. **`exploreTabTableRows.test.js`** covers **real** Bento table DOM for Participants and Studies (Samples/Files tabs not duplicated there yet). **`exploreWidgetView.test.js`** covers **`WidgetView`** chart strip + collapse in isolation (not embedded in full **`Inventory`**).
- **Production Apollo client** — `useApolloClient` is mocked in the facet UI test.

The participant-count suite intentionally avoids full-page `Inventory` mount; the facet UI suite covers that path instead.

## Future Test Additions

Ideas that would complement the current coverage:

1. ~~**URL parameter integration (Explore 2.1)**~~ — **`exploreUrlQuery.test.js`** covers primary query-string paths; add cases for new facets or URL rules as they ship.
2. **Additional facet sections** — repeat the facet UI pattern for another demographic or file facet using new fixture branches in `apiResponses.js`.
3. ~~**Tab switching with filters (Explore 2.3)**~~ — **`exploreTabWithFilters.test.js`**; add more facet sections or combined filters using the same pattern if needed.
4. ~~**Loading / empty dashboard payload**~~ — **`exploreDashboardAsync.test.js`** (`isDataloading`, missing **`searchParticipants`**); rejected `client.query` is still not covered (no `.catch` in app).
5. **Debouncing** — rapid facet toggles do not spam redundant queries (if applicable to product behavior).

## Test Pattern Examples

### Testing a Filter Change

```javascript
it('should update count when user filters by diagnosis', () => {
  // Arrange: Initial unfiltered state
  const unfilteredData = {
    numberOfParticipants: 100,
  };

  // Act: User applies filter
  const filteredData = {
    numberOfParticipants: 25,
  };
  const filters = {
    diagnosis: ['Acute lymphoblastic leukemia, NOS'],
  };

  // Assert: Verify Redux state and UI update
  store.dispatch({
    type: 'Inventory/DASHBOARD_DATA_CHANGED',
    payload: { facets: filters, dashData: filteredData },
  });

  // Render and verify
  // ... test implementation
});
```

### Testing Number Formatting

```javascript
it('should format large numbers correctly', () => {
  const count = 1234567;
  const formatted = count.toLocaleString('en-US');
  expect(formatted).toBe('1,234,567');
});
```

## Related Files

### Source Code
- `/src/pages/inventory/inventoryController.js` — Explore entry (renders `Inventory`)
- `/src/pages/inventory/inventoryCover.js` — `getData()`, Apollo, Redux sync
- `/src/pages/inventory/inventoryView.js` — Layout including facet sidebar
- `/src/pages/inventory/sideBar/BentoFacetFilter.js` — Facet groups and checkboxes
- `/src/pages/inventory/tabs/TabsView.js` — Tab display component (participant count tests)
- `/src/store` — Singleton store used by `exploreFacetFilterUi` tests
- `/src/bento/dashboardTabData.js` — `DASHBOARD_QUERY_NEW` and tab config
- `/src/components/Inventory/InventoryState.js` — Redux reducer (`inventoryReducer`)

### Test and fixture paths
- `/tests/pages/explore/exploreParticipantCount.test.js`
- `/tests/pages/explore/exploreFacetFilterUi.test.js`
- `/tests/pages/explore/exploreUrlQuery.test.js`
- `/tests/pages/explore/exploreTabSwitching.test.js`
- `/tests/pages/explore/exploreTabWithFilters.test.js`
- `/tests/pages/explore/exploreClearFilters.test.js`
- `/tests/pages/explore/exploreDashboardAsync.test.js`
- `/tests/pages/explore/exploreInventoryRestore.test.js`
- `/tests/pages/explore/exploreTabTables.test.js`
- `/tests/pages/explore/exploreTabTableRows.test.js`
- `/tests/pages/explore/exploreWidgetView.test.js`
- `/tests/helpers/exploreStoreReset.js`
- `/tests/fixtures/explore/apiResponses.js`

### Other Test Files
- `/tests/pages/landing/landingView.test.js` — Example test structure
- `/tests/helpers/landingApiMocks.js` — Example API mock helpers

## Maintenance Notes

### Updating Tests When API Changes
If the `DASHBOARD_QUERY_NEW` GraphQL query structure changes:
1. Update `tests/fixtures/explore/apiResponses.js` mock data structure (including `exploreDashboardWithSexAtBirthFacets` / `exploreDashboardFemaleOnly` if facet buckets or counts change).
2. Update filter variable tests in `exploreParticipantCount.test.js` to match new filter parameters.
3. Re-run `exploreFacetFilterUi.test.js` and adjust mocks/assertions if `getData()` or variable names change.
4. Verify field names match (e.g., `numberOfParticipants`).

### Adding New Filter Types
To add tests for a new filter type:
1. Add sample filter data to fixtures (`apiResponses.js`).
2. Add a case in `exploreParticipantCount.test.js` (Redux / variable shape) as needed.
3. For UI coverage, follow `exploreFacetFilterUi.test.js`: extend the `mockQuery` implementation and add facet bucket data so the sidebar renders options.
4. Verify the filter structure matches the GraphQL schema.

## Contributing

When adding new tests:
1. Follow the existing test structure (Arrange → Act → Assert)
2. Use descriptive test names that explain what's being tested
3. Include comments explaining complex test scenarios
4. Keep tests isolated and independent
5. Update this documentation file

## Questions or Issues?

If you encounter issues with these tests:
1. Verify all dependencies are installed: `npm install`
2. Check that the Redux store is properly initialized
3. Ensure mock data matches production data structure
4. Review console warnings for helpful debugging info
