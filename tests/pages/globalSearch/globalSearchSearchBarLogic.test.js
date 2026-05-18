/**
 * **`globalSearchSearchBarLogic`** — search change + autocomplete wiring (unit).
 *
 * @see src/pages/globalSearch/globalSearchSearchBarLogic.js
 */

import { waitFor } from '@testing-library/react';
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
    it('should load counts, update state, and navigate on new keyword', async () => {
      const setSearchText = jest.fn();
      const setSearchCounts = jest.fn();
      const navigate = jest.fn();
      const queryCountAPI = jest.fn(() => Promise.resolve({ participant_count: 1 }));
      const onChange = createOnSearchChange({
        getSearchText: () => '',
        setSearchText,
        setSearchCounts,
        queryCountAPI,
        navigate,
      });

      onChange('glioma');

      await waitFor(() => {
        expect(setSearchText).toHaveBeenCalledWith('glioma');
      });

      expect(queryCountAPI).toHaveBeenCalledWith('glioma');
      expect(setSearchCounts).toHaveBeenCalledWith({ participant_count: 1 });
      expect(navigate).toHaveBeenCalledWith('/sitesearch?keyword=glioma');
    });

    it('should no-op when value equals current search text', () => {
      const queryCountAPI = jest.fn();
      const onChange = createOnSearchChange({
        getSearchText: () => 'same',
        setSearchText: jest.fn(),
        setSearchCounts: jest.fn(),
        queryCountAPI,
        navigate: jest.fn(),
      });
      onChange('same');
      expect(queryCountAPI).not.toHaveBeenCalled();
    });

    it('should no-op on empty or non-string', () => {
      const queryCountAPI = jest.fn();
      const onChange = createOnSearchChange({
        getSearchText: () => '',
        setSearchText: jest.fn(),
        setSearchCounts: jest.fn(),
        queryCountAPI,
        navigate: jest.fn(),
      });
      onChange('');
      onChange('   ');
      onChange(null);
      expect(queryCountAPI).not.toHaveBeenCalled();
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
      });
      const out = await getSug({}, '   ', 'type');
      expect(out).toEqual([]);
    });

    it('should clear search state and return [] when value is empty', async () => {
      const setSearchText = jest.fn();
      const setSearchCounts = jest.fn();
      const getSug = createGetSearchSuggestions({
        authCheck: () => true,
        queryAutocompleteAPI: jest.fn(),
        SEARCH_PAGE_KEYS,
        SEARCH_PAGE_DATAFIELDS,
        setSearchText,
        setSearchCounts,
      });

      const out = await getSug({}, null, 'clear');
      expect(out).toEqual([]);
      expect(setSearchText).toHaveBeenCalledWith('');
      expect(setSearchCounts).toHaveBeenCalledWith([]);
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
      });

      const out = await getSug({}, 'abc', 'type');
      expect(queryAutocompleteAPI).toHaveBeenCalledWith('abc', false);
      expect(out[0]).toBe('ABC');
      expect(out.slice(1)).toEqual(['PART-1', 'N1']);
    });
  });
});
