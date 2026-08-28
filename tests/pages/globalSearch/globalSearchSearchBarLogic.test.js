/**
 * **`globalSearchSearchBarLogic`** — search change + autocomplete wiring (unit).
 *
 * @see src/pages/globalSearch/globalSearchSearchBarLogic.js
 */

import {
  createOnSearchChange,
  createGetSearchSuggestions,
} from '../../../src/pages/globalSearch/globalSearchSearchBarLogic';

describe('globalSearchSearchBarLogic', () => {
  beforeEach(() => {
    global.MutationObserver = class {
      constructor() {
        this.observe = jest.fn();
        this.disconnect = jest.fn();
        this.takeRecords = jest.fn(() => []);
      }
    };
    if (!document.createRange) {
      document.createRange = () => ({
        setStart: () => {},
        setEnd: () => {},
        commonAncestorContainer: document.body,
      });
    }
  });

  describe('createOnSearchChange', () => {
    it('should update text, set loading, and navigate on new keyword', () => {
      const setSearchText = jest.fn();
      const setCountsLoading = jest.fn();
      const navigate = jest.fn();
      const onChange = createOnSearchChange({
        getSearchParam: () => '',
        setSearchText,
        setCountsLoading,
        navigate,
      });

      onChange('glioma');

      expect(setSearchText).toHaveBeenCalledWith('glioma');
      expect(setCountsLoading).toHaveBeenCalledWith(true);
      expect(navigate).toHaveBeenCalledWith('/sitesearch?keyword=glioma');
    });

    it('should no-op when value equals current URL keyword', () => {
      const setSearchText = jest.fn();
      const navigate = jest.fn();
      const onChange = createOnSearchChange({
        getSearchParam: () => 'same',
        setSearchText,
        setCountsLoading: jest.fn(),
        navigate,
      });
      onChange('same');
      expect(setSearchText).not.toHaveBeenCalled();
      expect(navigate).not.toHaveBeenCalled();
    });

    it('should no-op on empty or non-string', () => {
      const navigate = jest.fn();
      const onChange = createOnSearchChange({
        getSearchParam: () => '',
        setSearchText: jest.fn(),
        setCountsLoading: jest.fn(),
        navigate,
      });
      onChange('');
      onChange('   ');
      onChange(null);
      expect(navigate).not.toHaveBeenCalled();
    });
  });

  describe('createGetSearchSuggestions', () => {
    const SEARCH_PAGE_KEYS = {
      private: ['p', 'm'],
      public: [],
    };
    const SEARCH_PAGE_DATAFIELDS = {
      private: ['participant_id', 'node'],
      public: [],
    };

    it('should return empty array when value is whitespace only', async () => {
      const getSug = createGetSearchSuggestions({
        authCheck: () => true,
        queryAutocompleteAPI: jest.fn(),
        SEARCH_PAGE_KEYS,
        SEARCH_PAGE_DATAFIELDS,
        setSearchText: jest.fn(),
        setSearchCounts: jest.fn(),
        setCountsLoading: jest.fn(),
      });
      const out = await getSug({}, '   ', 'type');
      expect(out).toEqual([]);
    });

    it('should clear search state and return [] when value is empty', async () => {
      const setSearchText = jest.fn();
      const setSearchCounts = jest.fn();
      const setCountsLoading = jest.fn();
      const getSug = createGetSearchSuggestions({
        authCheck: () => true,
        queryAutocompleteAPI: jest.fn(),
        SEARCH_PAGE_KEYS,
        SEARCH_PAGE_DATAFIELDS,
        setSearchText,
        setSearchCounts,
        setCountsLoading,
      });

      const out = await getSug({}, null, 'clear');
      expect(out).toEqual([]);
      expect(setSearchText).toHaveBeenCalledWith('');
      expect(setSearchCounts).toHaveBeenCalledWith({});
      expect(setCountsLoading).toHaveBeenCalledWith(false);
    });

    it('should build suggestions from autocomplete when authed', async () => {
      const queryAutocompleteAPI = jest.fn(() => Promise.resolve({
        p: [{ participant_id: 'PART-1' }],
        m: [{ node: 'N1' }],
      }));
      const getSug = createGetSearchSuggestions({
        authCheck: () => true,
        queryAutocompleteAPI,
        SEARCH_PAGE_KEYS,
        SEARCH_PAGE_DATAFIELDS,
        setSearchText: jest.fn(),
        setSearchCounts: jest.fn(),
        setCountsLoading: jest.fn(),
      });

      const out = await getSug({}, 'abc', 'type');
      expect(queryAutocompleteAPI).toHaveBeenCalledWith('abc', false);
      expect(out[0]).toBe('ABC');
      expect(out.slice(1)).toEqual(['PART-1', 'N1']);
    });
  });
});
