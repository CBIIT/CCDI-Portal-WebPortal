# Explore Page Tests

## Overview

This directory contains integration tests for the explore page (`/explore`): participant counts in tab headers, Redux/API wiring, and (in one suite) real sidebar facet interactions with mocked GraphQL.

| File | Focus |
|------|--------|
| `exploreParticipantCount.test.js` | `TabsView` counts, filter variables in Redux, and data-flow assertions (mostly isolated components + mock store) |
| `exploreFacetFilterUi.test.js` | End-to-end UI: open facet panel, select **Sex at Birth → Female**, assert refetch variables and updated counts |

Shared mock shapes live in **`../fixtures/explore/apiResponses.js`**.

## Test Files

### `exploreParticipantCount.test.js` (23 tests)

- Participant count display in tab headers (`dashboardStats` / formatting)
- Filter variables stored in Redux and passed to GraphQL-style mocks
- Redux → `TabsView` integration and edge cases (zero results, large numbers, etc.)

This suite does **not** mount the full `Inventory` tree; it targets `TabsView` and controlled store updates.

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

Running `npm test -- --testPathPattern=tests/pages/explore` should report **2** suites (**24** tests total: **23** + **1**). Individual file runs show only that file’s tests.

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
- **URL/query-string driven filters** — `exploreFacetFilterUi` exercises sidebar clicks, not deep-linking or `useSearchParams` behavior.
- **Tab switching** — not asserted in the facet UI test (focus is filter + counts).
- **Participant table row data** — table contents are not the assertion target.
- **Production Apollo client** — `useApolloClient` is mocked in the facet UI test.

The participant-count suite intentionally avoids full-page `Inventory` mount; the facet UI suite covers that path instead.

## Future Test Additions

Ideas that would complement the current coverage:

1. **URL parameter integration** — filters applied from the URL trigger the same `getData()` path as sidebar actions.
2. **Additional facet sections** — repeat the facet UI pattern for another demographic or file facet using new fixture branches in `apiResponses.js`.
3. **Tab switching with filters** — ensure counts and filter state stay consistent when changing tabs.
4. **Loading and error paths** — loading UI and failed `client.query` handling in `inventoryCover`.
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
