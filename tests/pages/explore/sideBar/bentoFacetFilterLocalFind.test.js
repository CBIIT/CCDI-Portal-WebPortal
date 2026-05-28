/**
 * Module-level local-find wiring for BentoFacetFilter (SearchBox / UploadModal generators).
 */

const mockNavigate = jest.fn();

let searchBoxFunctions;
let uploadModalFunctions;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ search: '?tab=0' }),
}));

const mockChunkSplit = jest.fn((arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
});

jest.mock('@bento-core/local-find', () => ({
  resetAllData: jest.fn(),
  chunkSplit: (...args) => mockChunkSplit(...args),
  SearchView: () => null,
  SearchBoxGenerator: ({ functions }) => {
    searchBoxFunctions = functions;
    return { SearchBox: () => null };
  },
  UploadModalGenerator: ({ functions }) => {
    uploadModalFunctions = functions;
    return { UploadModal: () => null };
  },
}));

jest.mock('@bento-core/facet-filter', () => ({
  FacetFilter: () => null,
  ClearAllFiltersBtn: () => null,
}));

jest.mock('../../../../src/pages/inventory/sideBar/BentoFilterUtils', () => ({
  getAllIds: jest.fn(),
  getAllParticipantIds: jest.fn(),
}));

jest.mock('../../../../src/bento/dashTemplate', () => ({
  facetsConfig: [],
  facetSectionVariables: {},
  resetIcon: {},
  sectionLabel: {},
  queryParams: ['import_from', 'p_id', 'u', 'u_fc', 'u_um', 'tab'],
}));

jest.mock('../../../../src/store', () => ({
  __esModule: true,
  default: { dispatch: jest.fn(), getState: jest.fn(() => ({})) },
}));

import { getAllIds, getAllParticipantIds } from '../../../../src/pages/inventory/sideBar/BentoFilterUtils';

// Load module so SearchBoxGenerator / UploadModalGenerator run
require('../../../../src/pages/inventory/sideBar/BentoFacetFilter');

describe('BentoFacetFilter local-find generators', () => {
  const query = new URLSearchParams('?tab=0');

  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockClear();
  });

  describe('SearchBox', () => {
    it('should map participant id suggestions from getAllIds', async () => {
      getAllIds.mockResolvedValueOnce({ participantIds: ['P-100', 'P-200'] });

      const suggestions = await searchBoxFunctions.getSuggestions('participantIds');

      expect(suggestions).toEqual([
        { type: 'participantIds', title: 'P-100' },
        { type: 'participantIds', title: 'P-200' },
      ]);
    });

    it('should return empty suggestions when getAllIds fails', async () => {
      getAllIds.mockRejectedValueOnce(new Error('network'));

      const suggestions = await searchBoxFunctions.getSuggestions('participantIds');

      expect(suggestions).toEqual([]);
    });

    it('should return empty suggestions when getAllIds throws synchronously', async () => {
      getAllIds.mockImplementationOnce(() => {
        throw new Error('sync failure');
      });

      const suggestions = await searchBoxFunctions.getSuggestions('participantIds');

      expect(suggestions).toEqual([]);
    });

    it('should return empty suggestions when response field is not an array', async () => {
      getAllIds.mockResolvedValueOnce({ participantIds: 'not-an-array' });

      const suggestions = await searchBoxFunctions.getSuggestions('participantIds');

      expect(suggestions).toEqual([]);
    });

    it('should update browser URL with selected participant ids', () => {
      searchBoxFunctions.updateBrowserUrl(
        query,
        mockNavigate,
        [{ title: 'P-1' }, { title: 'P-2' }],
      );

      expect(mockNavigate).toHaveBeenCalledWith(
        expect.stringMatching(/\/explore\?.*p_id=P-1/),
      );
    });
  });

  describe('UploadModal', () => {
    it('should match uploaded participant ids and navigate with upload params', async () => {
      getAllParticipantIds.mockResolvedValueOnce([
        { participant_id: 'P-1' },
        { participant_id: 'P-2' },
      ]);

      const fileContent = 'P-1\np-2, invalid';
      const result = await uploadModalFunctions.searchMatches(['P-1', 'P-2', 'P-99']);

      expect(result.matched).toHaveLength(2);
      expect(result.unmatched).toContain('P-99');

      uploadModalFunctions.updateBrowserUrl(
        query,
        mockNavigate,
        'upload.csv',
        fileContent,
        result.matched,
        result.unmatched,
      );

      expect(mockNavigate).toHaveBeenCalledWith(
        expect.stringMatching(/\/explore\?/),
      );
    });

    it('should return empty match result when participant lookup fails', async () => {
      getAllParticipantIds.mockRejectedValueOnce(new Error('network'));

      const result = await uploadModalFunctions.searchMatches(['P-1']);

      expect(result.matched).toEqual([]);
      expect(result.unmatched).toEqual(['P-1']);
    });

    it('should return empty matched and unmatched when chunking throws', async () => {
      mockChunkSplit.mockImplementationOnce(() => {
        throw new Error('chunk error');
      });

      const result = await uploadModalFunctions.searchMatches(['P-1']);

      expect(result).toEqual({ matched: [], unmatched: [] });
    });
  });
});
