/**
 * Pure unit tests for `formatWidgetData` — donut filtering and sunburst shaping.
 *
 * @see src/pages/inventory/widget/WidgetUtils.js
 * @see tests/TEST_STRUCTURE.md — fixtures for shapes, focused describes
 */

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid-key'),
}));

import { formatWidgetData } from '../../../../src/pages/inventory/widget/WidgetUtils';

describe('WidgetUtils — formatWidgetData', () => {
  describe('Donut datasets', () => {
    it('should remove slices with zero subjects', () => {
      const data = {
        myWidget: [
          { group: 'A', subjects: 2 },
          { group: 'B', subjects: 0 },
          { group: 'C', subjects: 1 },
        ],
      };
      const custodianConfig = [{ type: 'donut', dataName: 'myWidget' }];

      const out = formatWidgetData(data, custodianConfig);

      expect(out.myWidget).toEqual([
        { group: 'A', subjects: 2 },
        { group: 'C', subjects: 1 },
      ]);
    });
  });

  describe('Sunburst datasets', () => {
    it('should build a nested sunburst tree from program/arm rows', () => {
      const data = {
        armsByPrograms: [
          {
            program: 'ProgA',
            children: [
              { arm: 'Arm1', caseSize: 3 },
              { arm: 'Arm2', caseSize: 7 },
            ],
          },
        ],
      };
      const custodianConfig = [{
        type: 'sunburst',
        dataName: 'armsByPrograms',
        datatable_level1_field: 'program',
        datatable_level2_field: 'arm',
      }];

      const out = formatWidgetData(data, custodianConfig);

      expect(out.armsByPrograms.key).toBe('test-uuid-key');
      expect(out.armsByPrograms.title).toBe('root');
      expect(out.armsByPrograms.children).toHaveLength(1);
      expect(out.armsByPrograms.children[0].title).toBe('ProgA');
      expect(out.armsByPrograms.children[0].children).toHaveLength(2);
      expect(out.armsByPrograms.children[0].children[0].title).toBe('ProgA : Arm1');
      expect(out.armsByPrograms.children[0].children[0].caseSize).toBe(3);
      expect(out.armsByPrograms.children[0].children[1].title).toBe('ProgA : Arm2');
      expect(out.armsByPrograms.children[0].children[1].caseSize).toBe(7);
    });
  });
});
