/**
 * **`createGetTabData`** — All-tab pagination stitching vs direct **`queryResultAPI`** tabs (Phase 4).
 *
 * @see src/pages/globalSearch/globalSearchGetTabData.js
 */

import { createGetTabData } from '../../../src/pages/globalSearch/globalSearchGetTabData';

import { globalSearchCountsFixture } from '../../fixtures/globalSearch/globalSearchApiResponses';

describe('globalSearchGetTabData', () => {
  const queryResultAPI = jest.fn();
  const queryAllAPI = jest.fn();
  const countValues = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should query per-tab results for non-all fields', async () => {
    queryResultAPI.mockResolvedValue([{ id: 'p1' }]);
    countValues.mockReturnValue(100);

    const getTabData = createGetTabData({
      searchText: 'brain',
      searchCounts: globalSearchCountsFixture,
      queryResultAPI,
      queryAllAPI,
      countValues,
    });

    const rows = await getTabData('participants', 25, 2);

    expect(queryAllAPI).not.toHaveBeenCalled();
    expect(queryResultAPI).toHaveBeenCalledWith(
      'participants',
      { input: 'brain', first: 25, offset: 25 },
      true,
    );
    expect(rows).toEqual([{ id: 'p1' }]);
  });

  it('should return a single All-tab page from queryAllAPI when the page is full', async () => {
    const page = Array.from({ length: 10 }, (_, i) => ({ row: i, type: 'participants' }));
    queryAllAPI.mockResolvedValue(page);
    countValues.mockReturnValue(100);

    const getTabData = createGetTabData({
      searchText: 'x',
      searchCounts: globalSearchCountsFixture,
      queryResultAPI,
      queryAllAPI,
      countValues,
    });

    const rows = await getTabData('all', 10, 1);

    expect(queryResultAPI).not.toHaveBeenCalled();
    expect(queryAllAPI).toHaveBeenCalledTimes(1);
    expect(queryAllAPI).toHaveBeenCalledWith('x', 0, 10, true);
    expect(rows).toHaveLength(10);
  });

  it('should stitch additional All-tab batches when the first page is short', async () => {
    queryAllAPI
      .mockResolvedValueOnce([{ a: 1 }])
      .mockResolvedValueOnce([{ b: 2 }, { c: 3 }]);
    countValues.mockReturnValue(5);

    const getTabData = createGetTabData({
      searchText: 'x',
      searchCounts: globalSearchCountsFixture,
      queryResultAPI,
      queryAllAPI,
      countValues,
    });

    const rows = await getTabData('all', 3, 1);

    expect(queryAllAPI).toHaveBeenCalledTimes(2);
    expect(rows).toHaveLength(3);
    expect(rows[0]).toMatchObject({ a: 1 });
  });
});
