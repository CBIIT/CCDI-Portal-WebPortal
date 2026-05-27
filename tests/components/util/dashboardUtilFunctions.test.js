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
  customSorting,
  getDonutDataFromDashboardData,
  getStatDataFromDashboardData,
  getSunburstDataFromDashboardData,
  getCheckBoxData,
  transformInitialDataForSunburst,
  transformAPIDataIntoCheckBoxData,
  customCheckBox,
  updateCurrentSelection,
  updateCheckBox,
  setSelectedVlauesToTrue,
  setSelectedFilterValues,
  customSort,
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

  describe('customSorting', () => {
    it('should compare numeric strings and string tuples', () => {
      expect(customSorting(['10', '2'], ['2', '10'])).toBeGreaterThan(0);
      expect(customSorting(['a', 'b'], ['a', 'c'])).toBe(-1);
      expect(customSorting(['a', 'a'], ['a', 'a'])).toBe(0);
    });
  });

  describe('getStatDataFromDashboardData', () => {
    it('should count unique values for field, array, and object stat types', () => {
      const dashboardData = [
        {
          site: 'A',
          tags: ['x', 'y'],
          files: [{ type: 'pdf' }, { type: 'csv' }],
        },
        {
          site: 'B',
          tags: ['y'],
          files: [{ type: 'pdf' }],
        },
      ];
      const stats = [
        { type: 'field', statAPI: 'sites', datatable_field: 'site' },
        { type: 'array', statAPI: 'tagCount', datatable_field: 'tags' },
        {
          type: 'object',
          statAPI: 'fileTypes',
          datatable_field: 'files',
          datatable_sub_field: 'type',
        },
      ];

      const out = getStatDataFromDashboardData(dashboardData, stats);
      expect(out.sites).toBe(2);
      expect(out.tagCount).toBe(2);
      expect(out.fileTypes).toBe(2);
    });
  });

  describe('getSunburstDataFromDashboardData', () => {
    it('should aggregate programs and studies', () => {
      const rows = [
        { program: 'P1', arm: 'A1' },
        { program: 'P1', arm: 'A1' },
        { program: 'P2', arm: 'B1' },
      ];
      const tree = getSunburstDataFromDashboardData(rows, 'program', 'arm');
      expect(tree.title).toBe('root');
      expect(tree.children).toHaveLength(2);
      expect(tree.children[0].caseSize).toBe(2);
      expect(tree.children[0].children[0].caseSize).toBe(2);
    });
  });

  describe('transformAPIDataIntoCheckBoxData and customCheckBox', () => {
    it('should map facet API rows into checkbox items sorted by name', () => {
      const apiRows = [
        { race: 'Asian', subjects: 2 },
        { race: 'White', subjects: 1 },
      ];
      const items = transformAPIDataIntoCheckBoxData(apiRows, 'race');
      expect(items).toHaveLength(2);
      expect(items.map((i) => i.name)).toEqual(['Asian', 'White']);
      expect(items[0].subjects).toBe(2);
    });

    it('should map facet config into checkbox groups', () => {
      const groups = customCheckBox(
        { genderFacet: [{ gender: 'Male', subjects: 4 }] },
        [{
          label: 'Sex',
          api: 'genderFacet',
          field: 'gender',
          datafield: 'gender',
          show: true,
          section: 'demo',
        }],
      );
      expect(groups[0].groupName).toBe('Sex');
      expect(groups[0].checkboxItems[0].name).toBe('Male');
    });
  });

  describe('getCheckBoxData', () => {
    it('should refresh counts for inactive groups and sync checks for active group', () => {
      const data = [
        { subject_id: 's1', race: 'Asian', gender: 'Male' },
        { subject_id: 's2', race: 'White', gender: 'Male' },
      ];
      const allCheckBoxs = [
        {
          groupName: 'Race',
          datafield: 'race',
          checkboxItems: [
            { name: 'Asian', isChecked: false, subjects: 0 },
            { name: 'White', isChecked: false, subjects: 0 },
          ],
        },
        {
          groupName: 'Sex',
          datafield: 'gender',
          checkboxItems: [{ name: 'Male', isChecked: true, subjects: 0 }],
        },
      ];
      const activeCheckBoxs = allCheckBoxs[1];
      const filters = [{ groupName: 'Sex', name: 'Male', isChecked: true }];

      const out = getCheckBoxData(data, allCheckBoxs, activeCheckBoxs, filters);
      expect(out.find((g) => g.groupName === 'Sex').checkboxItems[0].isChecked).toBe(true);
      expect(out.find((g) => g.groupName === 'Race').checkboxItems).toHaveLength(2);
    });
  });

  describe('updateCurrentSelection and updateCheckBox', () => {
    it('should toggle the matching checkbox item', () => {
      const group = {
        groupName: 'Race',
        checkboxItems: [{ name: 'Asian', isChecked: false }],
      };
      const updated = updateCurrentSelection(group, { name: 'Asian', isChecked: true });
      expect(updated.checkboxItems[0].isChecked).toBe(true);
    });

    it('should refresh non-active groups via updateCheckBox', () => {
      const facetSearchData = [
        { label: 'Race', api: 'raceFacet', field: 'race', datafield: 'race', show: true, section: 'd' },
        { label: 'Sex', api: 'sexFacet', field: 'gender', datafield: 'gender', show: true, section: 'd' },
      ];
      const current = [
        { groupName: 'Sex', checkboxItems: [{ name: 'Male', isChecked: true }] },
      ];
      const willUpdate = {
        raceFacet: [{ race: 'Asian', subjects: 2 }],
        sexFacet: [{ gender: 'Male', subjects: 2 }],
      };
      const selection = { groupName: 'Sex', name: 'Male', isChecked: true };

      const out = updateCheckBox(current, willUpdate, selection, facetSearchData);
      expect(out).toHaveLength(2);
      expect(out[0].checkboxItems[0].name).toBe('Asian');
    });
  });

  describe('setSelectedVlauesToTrue and setSelectedFilterValues', () => {
    it('should mark checkbox items checked when filter values are present', () => {
      const items = setSelectedVlauesToTrue(
        [{ name: 'Asian', isChecked: false }, { name: 'White', isChecked: false }],
        ['Asian'],
      );
      expect(items[0].isChecked).toBe(true);
      expect(items[1].isChecked).toBe(false);
    });

    it('should apply array filters to matching checkbox groups', () => {
      const checkboxData = [
        {
          groupName: 'Race',
          datafield: 'race',
          checkboxItems: [{ name: 'Asian', isChecked: false }],
          show: true,
          section: 'd',
        },
      ];
      const out = setSelectedFilterValues(checkboxData, { race: ['Asian'] });
      expect(out[0].checkboxItems[0].isChecked).toBe(true);
    });
  });

  describe('customSort', () => {
    it('should sort interval labels using sortPreference', () => {
      const sorted = customSort([
        { name: '>= 10' },
        { name: '< 5' },
        { name: 'Other' },
      ]);
      expect(sorted[0].name).toBe('< 5');
      expect(sorted[sorted.length - 1].name).toBe('Other');
    });
  });

  describe('sortPreference branches', () => {
    it('should classify additional interval patterns', () => {
      expect(sortPreference('<=5')).toBe(1);
      expect(sortPreference('>=5')).toBe(7);
      expect(sortPreference('>5')).toBe(8);
      expect(sortPreference('[1,3)')).toBe(5);
      expect(sortPreference('(1,3)')).toBe(6);
    });
  });
});
