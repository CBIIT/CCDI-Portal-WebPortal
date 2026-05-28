/**
 * `src/bento/dashboardTabData.js` — tab config and column data formatters.
 */

import {
  tabs,
  tabIndex,
  tabContainers,
  DASHBOARD_QUERY_NEW,
  GET_FILES_OVERVIEW_QUERY,
  tooltipContent,
} from '../../src/bento/dashboardTabData';

function findColumn(dataField) {
  for (const tab of tabContainers) {
    const column = tab.columns.find((col) => col.dataField === dataField);
    if (column) {
      return column;
    }
  }
  return null;
}

describe('dashboardTabData', () => {
  describe('tab configuration', () => {
    it('should define explore tabs with counts', () => {
      expect(tabs).toHaveLength(4);
      expect(tabs.map((t) => t.id)).toEqual([
        'participant_tab',
        'study_tab',
        'sample_tab',
        'file_tab',
      ]);
      expect(tabIndex).toHaveLength(4);
      tabIndex.forEach((tab) => {
        expect(tab).toEqual(
          expect.objectContaining({
            title: expect.any(String),
            primaryColor: expect.any(String),
            selectedColor: expect.any(String),
          }),
        );
      });
    });

    it('should wire tab containers to overview APIs', () => {
      expect(tabContainers.length).toBeGreaterThanOrEqual(4);
      const participants = tabContainers.find((t) => t.name === 'Participants');
      expect(participants.paginationAPIField).toBe('participantOverview');
      expect(participants.api).toBeDefined();
    });

    it('should expose dashboard GraphQL documents', () => {
      expect(DASHBOARD_QUERY_NEW).toBeDefined();
      expect(GET_FILES_OVERVIEW_QUERY).toBeDefined();
      expect(tooltipContent.Participants).toContain('add files');
    });
  });

  describe('column data formatters', () => {
    const ageFormatter = findColumn('participant_age_at_collection').dataFormatter;
    const categoryFormatter = findColumn('data_category').dataFormatter;

    it('should format participant age at collection', () => {
      expect(ageFormatter(null)).toBe('Not Reported');
      expect(ageFormatter(-999)).toBe('Not Reported');
      expect(ageFormatter(42)).toBe('42');
    });

    it('should format data category values', () => {
      expect(categoryFormatter(['Genomics', 'Clinical'])).toBe('Genomics,Clinical');
      expect(categoryFormatter(null)).toBe('');
      expect(categoryFormatter('[Genomics]')).toBe('Genomics');
      expect(categoryFormatter('Sequencing')).toBe('Sequencing');
    });
  });
});
