/**
 * Global Search **`sitesearchReducer`** — reducer registration + dispatch.
 *
 * Mocks the singleton **`src/store`** so we can assert:
 *   - `injectReducer` is called with the `dashboardTab` key and a reducer function.
 *   - `setOverLayWindow` dispatches `SET_OVERLAY_WINDOW` with the boolean payload.
 *   - The injected reducer covers all action branches (search criteria, overlay,
 *     loading flags, autocomplete + bulk uploads, cohort table selection, RESET_*).
 *
 * @see src/pages/globalSearch/store/sitesearchReducer.js
 */

const mockDispatch = jest.fn();
const mockInjectReducer = jest.fn();

jest.mock('../../../../src/store', () => ({
  __esModule: true,
  default: {
    dispatch: mockDispatch,
    injectReducer: mockInjectReducer,
  },
}));

describe('Global Search — sitesearchReducer', () => {
  let setOverLayWindow;
  let injectedReducer;

  beforeAll(() => {
    require('../../../../src/pages/globalSearch/store/sitesearchReducer');
    setOverLayWindow = require('../../../../src/pages/globalSearch/store/sitesearchReducer').setOverLayWindow;
    expect(mockInjectReducer).toHaveBeenCalledTimes(1);
    const [storeKey, reducerFn] = mockInjectReducer.mock.calls[0];
    expect(storeKey).toBe('dashboardTab');
    expect(typeof reducerFn).toBe('function');
    injectedReducer = reducerFn;
  });

  beforeEach(() => {
    mockDispatch.mockClear();
  });

  describe('Reducer registration', () => {
    it('should register the dashboardTab reducer with the store', () => {
      expect(mockInjectReducer).toHaveBeenCalledWith(
        'dashboardTab',
        expect.any(Function),
      );
    });
  });

  describe('setOverLayWindow', () => {
    it('should dispatch SET_OVERLAY_WINDOW with the boolean payload', () => {
      setOverLayWindow(true);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_OVERLAY_WINDOW',
        payload: true,
      });
    });

    it('should dispatch SET_OVERLAY_WINDOW with false to close the overlay', () => {
      setOverLayWindow(false);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_OVERLAY_WINDOW',
        payload: false,
      });
    });
  });

  describe('Reducer behavior', () => {
    const initialState = {
      sitesearch: {},
      isOverlayOpen: false,
    };

    it('should default to initialState for unknown action types', () => {
      const next = injectedReducer(undefined, { type: 'UNKNOWN_TYPE' });
      expect(next).toEqual(initialState);
    });

    it('should set search criteria', () => {
      const next = injectedReducer(initialState, {
        type: 'SET_SEARCH_CRITERIA',
        payload: { query: 'tumor' },
      });
      expect(next).toEqual({
        ...initialState,
        searchCriteria: { query: 'tumor' },
      });
    });

    it('should set the overlay window flag', () => {
      const next = injectedReducer(initialState, {
        type: 'SET_OVERLAY_WINDOW',
        payload: true,
      });
      expect(next.isOverlayOpen).toBe(true);
    });

    it('should mark dashboardTab as loading on REQUEST_DASHBOARDTAB', () => {
      const next = injectedReducer(initialState, { type: 'REQUEST_DASHBOARDTAB' });
      expect(next.isLoading).toBe(true);
    });

    it('should set sidebar loading flag', () => {
      const next = injectedReducer(initialState, { type: 'SET_SIDEBAR_LOADING' });
      expect(next.setSideBarLoading).toBe(true);
    });

    it('should set the active filters via SET_SINGLE_FILTER', () => {
      const filters = { sex_at_birth: ['Female'] };
      const next = injectedReducer(initialState, {
        type: 'SET_SINGLE_FILTER',
        payload: filters,
      });
      expect(next.allActiveFilters).toEqual(filters);
    });

    it('should mark the dashboard table as loading', () => {
      const next = injectedReducer(initialState, { type: 'SET_DASHBOARDTABLE_LOADING' });
      expect(next.isDashboardTableLoading).toBe(true);
    });

    it('should clear table selection across cases/samples/files', () => {
      const next = injectedReducer(initialState, { type: 'CLEAR_TABLE_SELECTION' });
      expect(next.dataCaseSelected.selectedRowInfo).toEqual([]);
      expect(next.dataSampleSelected.selectedRowIndex).toEqual([]);
      expect(next.dataFileSelected.selectedRowInfo).toEqual([]);
    });

    it('should reset autocomplete + bulk upload + filters on RESET_ALL', () => {
      const seeded = {
        ...initialState,
        autoCompleteSelection: { subject_ids: ['x'], sample_ids: ['y'], file_ids: ['z'] },
        bulkUpload: { subject_ids: ['x'], sample_ids: [], file_ids: [] },
        allActiveFilters: { foo: 'bar' },
      };
      const next = injectedReducer(seeded, { type: 'RESET_ALL' });
      expect(next.autoCompleteSelection).toEqual({
        subject_ids: [],
        sample_ids: [],
        file_ids: [],
      });
      expect(next.bulkUpload).toEqual({
        subject_ids: [],
        sample_ids: [],
        file_ids: [],
      });
      expect(next.allActiveFilters).toEqual({});
    });

    it('should reset autocomplete and filters but keep bulkUpload on RESET_ALL_EXCEPT_BULK_UPLOAD', () => {
      const seeded = {
        ...initialState,
        autoCompleteSelection: { subject_ids: ['x'], sample_ids: [], file_ids: [] },
        bulkUpload: { subject_ids: ['kept'], sample_ids: [], file_ids: [] },
        allActiveFilters: { foo: 'bar' },
      };
      const next = injectedReducer(seeded, { type: 'RESET_ALL_EXCEPT_BULK_UPLOAD' });
      expect(next.autoCompleteSelection).toEqual({
        subject_ids: [],
        sample_ids: [],
        file_ids: [],
      });
      expect(next.allActiveFilters).toEqual({});
      expect(next.bulkUpload).toEqual(seeded.bulkUpload);
    });

    it('should set autocomplete data for a typed list (ADD_AUTOCOMPLETE_DATA)', () => {
      const next = injectedReducer(initialState, {
        type: 'ADD_AUTOCOMPLETE_DATA',
        payload: { type: 'subject', value: ['s1', 's2'] },
      });
      expect(next.autoCompleteSelection).toEqual({ subject_ids: ['s1', 's2'] });
    });

    it('should set bulk upload data for a typed list (ADD_BULKSEARCHDATA)', () => {
      const next = injectedReducer(initialState, {
        type: 'ADD_BULKSEARCHDATA',
        payload: { type: 'sample', value: ['sm1'] },
      });
      expect(next.bulkUpload).toEqual({ sample_ids: ['sm1'] });
    });
  });
});
