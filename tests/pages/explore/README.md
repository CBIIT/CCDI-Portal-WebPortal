# Explore Page Participant Count Tests

## Overview

This directory contains comprehensive integration tests for the explore page (`/explore`) participant count functionality. These tests verify the complete data flow from API calls through Redux state management to UI display, including user filter interactions.

## Test Files

### Primary Test File
- **`exploreParticipantCount.test.js`** - Main test suite (23 tests)
  - Tests the participant count display in tab headers
  - Validates filtering and API integration
  - Verifies the complete data flow from API to UI

### Test Fixtures
- **`../fixtures/explore/apiResponses.js`** - Mock data and helper functions
  - Sample dashboard data
  - Sample participant records
  - Redux store mocking utilities
  - GraphQL response mocks

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

### Components
- **`TabsView.js`** - Main tab component
- **`getTabs()` function** - Count formatting logic
- **`inventoryReducer`** - Redux state management

### Configuration
- **`tabs`** array from `dashboardTabData.js` - Tab configuration
- **`DASHBOARD_QUERY_NEW`** - GraphQL query structure

### Formatting
- **`.toLocaleString('en-US')`** - Number formatting with thousand separators

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

### Run All Explore Tests
```bash
npm test -- tests/pages/explore/exploreParticipantCount.test.js
```

### Run in Watch Mode
```bash
npm test -- tests/pages/explore/exploreParticipantCount.test.js --watch
```

### Run with Coverage
```bash
npm test -- tests/pages/explore/exploreParticipantCount.test.js --coverage
```

### Run a Specific Test
```bash
npm test -- tests/pages/explore/exploreParticipantCount.test.js -t "should update participant count from 3 to 1"
```

## Expected Test Output

```
PASS tests/pages/explore/exploreParticipantCount.test.js
  Explore Page - Participant Count Display (TabsView)
    Component Rendering
      ✓ should render without crashing
      ✓ should render all tabs (Participants, Studies, Samples, Files)
    Participant Count Display
      ✓ should display participant count in the tab header from dashboardStats
      ✓ should display large participant count with thousand separators
      ✓ should use the correct count field from tabs configuration
      ✓ should display all tab counts correctly
    Count Formatting
      ✓ should format zero participants correctly
      ✓ should format very large participant counts correctly
      ✓ should use en-US locale formatting
    Edge Cases
      ✓ should handle missing dashboardStats gracefully
      ✓ should handle single digit participant counts
      ✓ should handle counts in the thousands correctly
  Explore Page - Full Integration (API → Redux → Display)
    Filtered API Calls (User Input)
      ✓ should call API with filter variables when user selects a facet
      ✓ should update participant count from 3 to 1 when filtering by Female
      ✓ should call API with multiple filter variables
      ✓ should handle zero results when filters exclude all participants
      ✓ should correctly format filter variables for GraphQL query
      ✓ should update all tab counts when filters are applied
    Redux State Flow
      ✓ should update Redux state when API returns data
      ✓ should pass dashData from Redux to TabsView component
    Complete Data Flow Verification
      ✓ should complete the full flow: API Response → Redux → Component → Display
      ✓ should match the exact data structure from DASHBOARD_QUERY_NEW
      ✓ should format counts correctly when passed through Redux to component

Test Suites: 1 passed, 1 total
Tests:       23 passed, 23 total
```

## What's NOT Tested

These tests focus on the count display and filtering. They do NOT test:
- ❌ The actual API network calls (mocked with fixtures)
- ❌ Full `InventoryController` component rendering (too complex)
- ❌ Side panel filter UI interactions
- ❌ URL parameter parsing and routing
- ❌ Tab switching functionality
- ❌ Participant table data display

## Future Test Additions

Consider adding tests for:
1. **URL Parameter Integration** - Test that URL query params correctly trigger filtered API calls
2. **Filter UI Interactions** - Test clicking checkboxes in the side panel
3. **Tab Switching** - Test that switching tabs maintains filter state
4. **Loading States** - Test loading indicators while API calls are in progress
5. **Error Handling** - Test API error scenarios
6. **Debouncing** - Test that rapid filter changes don't cause excessive API calls

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
- `/src/pages/inventory/inventoryController.js` - Main controller
- `/src/pages/inventory/inventoryCover.js` - API call logic
- `/src/pages/inventory/tabs/TabsView.js` - Tab display component
- `/src/bento/dashboardTabData.js` - GraphQL queries and tab config
- `/src/components/Inventory/InventoryState.js` - Redux reducer

### Other Test Files
- `/tests/pages/landing/landingView.test.js` - Example test structure
- `/tests/helpers/landingApiMocks.js` - Example API mock helpers

## Maintenance Notes

### Updating Tests When API Changes
If the `DASHBOARD_QUERY_NEW` GraphQL query structure changes:
1. Update `tests/fixtures/explore/apiResponses.js` mock data structure
2. Update filter variable tests to match new filter parameters
3. Verify field names match (e.g., `numberOfParticipants`)

### Adding New Filter Types
To add tests for a new filter type:
1. Add sample filter data to fixtures
2. Add a test case in "Filtered API Calls" section
3. Verify the filter structure matches GraphQL schema

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
