/**
 * Dashboard/widget helpers — filters, sorting, donut/sunburst transforms (pure logic).
 */

jest.mock('uuid', () => ({
  v4: jest.fn(() => '00000000-0000-4000-8000-000000000001'),
}));

import {
  unselectFilters,
  filterData,
  getFilters,
  isNumeric,
  sortPreference,
  getDonutDataFromDashboardData,
  transformInitialDataForSunburst,
  COLORS_LEVEL_1,
  COLORS_LEVEL_2,
} from '../../../src/components/util/dashboardUtilFunctions';

describe('dashboardUtilFunctions', () => {
  describe('unselectFilters', () => {
    it('should set isChecked false on every filter entry', () => {
      const input = [
        { groupName: 'g', name: 'a', datafield: 'f', isChecked: true },
      ];
      const out = unselectFilters(input);
      expect(out[0].isChecked).toBe(false);
      expect(out[0].groupName).toBe('g');
    });
  });

  describe('filterData', () => {
    const row = { sex: ['Male'], race: 'Asian' };

    it('should return true when there are no filters', () => {
      expect(filterData(row, [])).toBe(true);
    });

    it('should require each filter group to match the row', () => {
      const filters = [
        { groupName: 'Sex', name: 'Male', datafield: 'sex' },
        { groupName: 'Race', name: 'Asian', datafield: 'race' },
      ];
      expect(filterData(row, filters)).toBe(true);
    });

    it('should return false when any group fails', () => {
      const filters = [
        { groupName: 'Sex', name: 'Female', datafield: 'sex' },
      ];
      expect(filterData(row, filters)).toBe(false);
    });
  });

  describe('getFilters', () => {
    it('should merge checked selections into the active filter list', () => {
      const origin = [];
      const checkbox = {
        groupName: 'Race',
        name: 'Asian',
        datafield: 'race',
        isChecked: true,
      };
      expect(getFilters(origin, [checkbox])).toEqual([checkbox]);
    });

    it('should remove filters when isChecked becomes false', () => {
      const origin = [
        { groupName: 'Race', name: 'Asian', datafield: 'race', isChecked: true },
      ];
      const checkbox = {
        groupName: 'Race',
        name: 'Asian',
        datafield: 'race',
        isChecked: false,
      };
      expect(getFilters(origin, [checkbox])).toEqual([]);
    });
  });

  describe('isNumeric', () => {
    it('should detect integer strings', () => {
      expect(isNumeric('42')).toBe(true);
      expect(isNumeric('-7')).toBe(true);
      expect(isNumeric('4.2')).toBe(false);
    });
  });

  describe('sortPreference', () => {
    it('should classify bracket intervals and fall back to default', () => {
      expect(sortPreference('(1,3]')).toBe(3);
      expect(sortPreference('[1,3]')).toBe(4);
      expect(sortPreference('other')).toBe(9);
    });
  });

  describe('getDonutDataFromDashboardData', () => {
    it('should aggregate unique subjects per group value', () => {
      const rows = [
        { gender: 'Male', subject_id: 's1' },
        { gender: 'Male', subject_id: 's2' },
        { gender: 'Female', subject_id: 's1' },
      ];
      const result = getDonutDataFromDashboardData(rows, 'gender');
      expect(result).toEqual(
        expect.arrayContaining([
          { group: 'Male', subjects: 2 },
          { group: 'Female', subjects: 1 },
        ]),
      );
    });
  });

  describe('transformInitialDataForSunburst', () => {
    it('should build a root node with children from nested config', () => {
      const data = [
        {
          program: 'P1',
          caseSize: 2,
          children: [
            { arm: 'A1', caseSize: 2 },
          ],
        },
      ];

      const tree = transformInitialDataForSunburst(data);

      expect(tree.title).toBe('root');
      expect(tree.key).toBe('00000000-0000-4000-8000-000000000001');
      expect(tree.children[0].title).toBe('P1');
      expect(tree.children[0].children[0].title).toBe('P1 : A1');
      expect(tree.color).toBe(COLORS_LEVEL_1[1]);
      expect(tree.children[0].color).toBe(COLORS_LEVEL_1[0]);
      expect(tree.children[0].children[0].color).toBe(COLORS_LEVEL_2[0]);
    });
  });

  describe('COLORS constants', () => {
    it('should expose palette arrays', () => {
      expect(COLORS_LEVEL_1.length).toBeGreaterThan(0);
      expect(COLORS_LEVEL_2.length).toBeGreaterThan(0);
    });
  });
});
