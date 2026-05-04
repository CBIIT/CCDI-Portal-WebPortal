/**
 * Explore — `WidgetView` (dashboard charts under Query Bar on `/explore`).
 *
 * Test types (tests/TEST_STRUCTURE.md §§133–153):
 * - **§1 Pure frontend:** fixture `dashData`, MUI theme, collapse control copy and widget titles.
 * - **§3 Interaction:** collapse toggle button.
 *
 * @see src/pages/inventory/widget/WidgetView.js
 * @see src/bento/dashTemplate.js `widgetConfig`
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import WidgetView from '../../../src/pages/inventory/widget/WidgetView';
import lightTheme from '../../../src/themes/light';
import {
  exploreDashboardWithAllWidgetsForTests,
  exploreDashboardWithSexAtBirthFacets,
  sampleDashboardData,
  sampleParticipants,
} from '../../fixtures/explore/apiResponses';
import {
  dashboardDataAllWidgetsPopulated,
  dashboardDataNoWidgetSlices,
} from '../../fixtures/explore/widgetDashboardData';

const theme = createMuiTheme(lightTheme);

function renderWidgetView(props = {}) {
  const {
    data = dashboardDataAllWidgetsPopulated,
    activeFilters = {},
  } = props;

  return render(
    <ThemeProvider theme={theme}>
      <WidgetView
        data={data}
        activeFilters={activeFilters}
      />
    </ThemeProvider>,
  );
}

describe('Explore — WidgetView (dashboard widgets)', () => {
  describe('Sample API alignment', () => {
    it('should expose widgetDashboardData.dashboardDataAllWidgetsPopulated as exploreDashboardWithAllWidgetsForTests', () => {
      expect(dashboardDataAllWidgetsPopulated).toBe(exploreDashboardWithAllWidgetsForTests);
    });

    it('should match sample dashboard participant total and cohort size', () => {
      expect(exploreDashboardWithAllWidgetsForTests.numberOfParticipants).toBe(sampleDashboardData.numberOfParticipants);
      expect(exploreDashboardWithAllWidgetsForTests.numberOfParticipants).toBe(sampleParticipants.length);
    });

    it('should reuse Sex at Birth buckets from exploreDashboardWithSexAtBirthFacets', () => {
      expect(exploreDashboardWithAllWidgetsForTests.participantCountBySexAtBirth).toEqual(
        exploreDashboardWithSexAtBirthFacets.participantCountBySexAtBirth,
      );
    });

    it('should have race and diagnosis subject totals summing to numberOfParticipants', () => {
      const raceSum = exploreDashboardWithAllWidgetsForTests.participantCountByRace.reduce((s, r) => s + r.subjects, 0);
      const dxSum = exploreDashboardWithAllWidgetsForTests.participantCountByDiagnosis.reduce((s, r) => s + r.subjects, 0);
      const dcSum = exploreDashboardWithAllWidgetsForTests.participantCountByDataCategory.reduce((s, r) => s + r.subjects, 0);
      const ageSum = exploreDashboardWithAllWidgetsForTests.participantCountByDiagnosisAge.reduce((s, r) => s + r.subjects, 0);
      const { numberOfParticipants } = exploreDashboardWithAllWidgetsForTests;
      expect(raceSum).toBe(numberOfParticipants);
      expect(dxSum).toBe(numberOfParticipants);
      expect(dcSum).toBe(numberOfParticipants);
      expect(ageSum).toBe(numberOfParticipants);
    });

    it('should list study_id phs002431 for all sample participants in participantCountByStudy', () => {
      expect(sampleParticipants.every((p) => p.study_id === 'phs002431')).toBe(true);
      expect(exploreDashboardWithAllWidgetsForTests.participantCountByStudy).toEqual([
        { group: 'phs002431', subjects: sampleParticipants.length },
      ]);
    });
  });

  beforeEach(() => {
    if (!document.createRange) {
      document.createRange = () => ({
        setStart: () => {},
        setEnd: () => {},
        commonAncestorContainer: document.body,
      });
    }

    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
    global.MutationObserver = class {
      constructor() {
        this.observe = jest.fn();
        this.disconnect = jest.fn();
        this.takeRecords = jest.fn(() => []);
      }
    };
  });

  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { container } = renderWidgetView();
      expect(container).toBeInTheDocument();
    });

    it('should show the collapse toggle with COLLAPSE VIEW while charts are expanded', () => {
      renderWidgetView();
      // MUI Button exposes child text but not always as the computed accessible name for `getByRole`.
      expect(screen.getByText(/collapse view/i)).toBeInTheDocument();
    });

    it('should render widget section titles from widgetConfig', () => {
      renderWidgetView();
      expect(screen.getByText('Study')).toBeInTheDocument();
      expect(screen.getByText('Diagnosis')).toBeInTheDocument();
      expect(screen.getByText(/age at diagnosis \(years\)/i)).toBeInTheDocument();
      expect(screen.getByText('Sex at Birth')).toBeInTheDocument();
      expect(screen.getByText('Race')).toBeInTheDocument();
      expect(screen.getByText('Data Category')).toBeInTheDocument();
    });

    it('should render the diagnosis info tooltip icon when Diagnosis widget is shown', () => {
      renderWidgetView();
      expect(screen.getByRole('img', { name: /diagnosis tooltip/i })).toBeInTheDocument();
    });

    it('should surface primary donut slice labels and counts that match exploreDashboardWithAllWidgetsForTests', () => {
      const { container } = renderWidgetView({ data: exploreDashboardWithAllWidgetsForTests });
      const text = container.textContent;
      const { participantCountByStudy, participantCountBySexAtBirth, participantCountByRace } = exploreDashboardWithAllWidgetsForTests;

      // @bento-core/widgets + Recharts typically expose **one** slice label per donut in the DOM at a time;
      // remaining sectors mount as empty `<g>` nodes — full multi-slice strings are asserted on the fixture in `Sample API alignment`.
      const [studySlice] = participantCountByStudy;
      expect(text).toContain(studySlice.group);
      expect(text).toContain(String(studySlice.subjects));

      const sexPrimary = participantCountBySexAtBirth.reduce((a, b) => (a.subjects >= b.subjects ? a : b));
      expect(text).toContain(sexPrimary.group);
      expect(text).toContain(String(sexPrimary.subjects));

      const racePrimary = participantCountByRace.reduce((a, b) => (a.subjects >= b.subjects ? a : b));
      expect(text).toContain(racePrimary.group);
      expect(text).toContain(String(racePrimary.subjects));

      const [dxPrimary] = exploreDashboardWithAllWidgetsForTests.participantCountByDiagnosis;
      expect(text).toContain(dxPrimary.group.slice(0, 20));
      expect(text).toContain(String(dxPrimary.subjects));

      const [dcPrimary] = exploreDashboardWithAllWidgetsForTests.participantCountByDataCategory;
      expect(text).toContain(dcPrimary.group);
      expect(text).toContain(String(dcPrimary.subjects));
    });

    it('should mount the Age at Diagnosis widget while bucket labels may render only inside Recharts internals', () => {
      const { container } = renderWidgetView({ data: exploreDashboardWithAllWidgetsForTests });
      expect(container.textContent).toContain('Age at Diagnosis (years)');
      const [ageBucket] = exploreDashboardWithAllWidgetsForTests.participantCountByDiagnosisAge;
      expect(ageBucket.subjects).toBe(exploreDashboardWithAllWidgetsForTests.numberOfParticipants);
    });

    it('should not render widget titles when all widget datasets are empty', () => {
      renderWidgetView({ data: dashboardDataNoWidgetSlices });
      expect(screen.queryByText(/^Study$/)).not.toBeInTheDocument();
      expect(screen.queryByText(/^Sex at Birth$/)).not.toBeInTheDocument();
      expect(screen.getByText(/collapse view/i)).toBeInTheDocument();
    });
  });

  describe('Collapse control', () => {
    it('should toggle button label between COLLAPSE VIEW and OPEN VIEW when clicked', () => {
      renderWidgetView();
      fireEvent.click(screen.getByText(/collapse view/i));
      expect(screen.getByText(/open view/i)).toBeInTheDocument();
      fireEvent.click(screen.getByText(/open view/i));
      expect(screen.getByText(/collapse view/i)).toBeInTheDocument();
    });
  });

  describe('Diagnosis widget behavior', () => {
    it('should show top-20 diagnosis tooltip copy when only participant_ids filter is active', async () => {
      const diagnosisBuckets = Array.from({ length: 25 }, (_, idx) => ({
        group: `Diagnosis ${idx + 1}`,
        subjects: 1,
      }));

      renderWidgetView({
        data: {
          ...dashboardDataAllWidgetsPopulated,
          participantCountByDiagnosis: diagnosisBuckets,
        },
        activeFilters: { participant_ids: [] },
      });

      fireEvent.mouseOver(screen.getByRole('img', { name: /diagnosis tooltip/i }));

      expect(await screen.findByText('Showing top 20 out of 25 total diagnoses')).toBeInTheDocument();
    });
  });
});
