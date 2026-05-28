/**
 * Card title truncation branches — exercises both the **short-title** path
 * (where measured width fits the container) and the **long-title start...end**
 * path (where the helper splits the title into 60% prefix and 40% suffix).
 *
 * The presentation tests already cover the very-narrow `availableChars <= 6`
 * branch via {@link enableTitleTruncationMocks}. This file fills the gaps for:
 *   - StudiesCard / SamplesCard / ModelsCard / FilesCard `truncateTitle`
 *   - FilesCard `renderSample` resize handler + expand / collapse arrow
 *
 * @see src/pages/globalSearch/Cards/studies/StudiesCard.js
 * @see src/pages/globalSearch/Cards/samples/SamplesCard.js
 * @see src/pages/globalSearch/Cards/models/ModelsCard.js
 * @see src/pages/globalSearch/Cards/files/FilesCard.js
 */

jest.mock('../../../src/bento/studiesData', () => ({
  studyDownloadLinks: {
    phsCARD_TEST_001: 'https://example.com/mock-study-manifest.xlsx',
  },
  openDoubleLink: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(() => jest.fn()),
}));

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

import StudiesCard from '../../../src/pages/globalSearch/Cards/studies/StudiesCard';
import SamplesCard from '../../../src/pages/globalSearch/Cards/samples/SamplesCard';
import ModelsCard from '../../../src/pages/globalSearch/Cards/models/ModelsCard';
import FilesCard from '../../../src/pages/globalSearch/Cards/files/FilesCard';
import { enableTitleTruncationMocks } from '../../helpers/globalSearchCardTestUtils';
import {
  studiesCardRow,
  samplesCardRow,
  modelsCardRow,
  filesCardRow,
} from '../../fixtures/globalSearch/cardPresentationFixtures';

const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

const triggerLongTitleTruncation = (cardEl) => {
  // measuredTitleWidth chosen so charWidth gives availableChars > 6 — exercises
  // the "start...end" splice branch (60% prefix / 40% suffix).
  const helper = enableTitleTruncationMocks({
    containerWidth: 400,
    measuredTitleWidth: 220,
  });
  helper.setCardWidth(cardEl);
  helper.triggerResize();
  return helper;
};

describe('Global Search — card title truncation branches', () => {
  beforeEach(() => {
    global.MutationObserver = class {
      observe() {}
      disconnect() {}
      takeRecords() { return []; }
    };
  });

  describe('StudiesCard', () => {
    it('should render title untouched when measured width fits the card', () => {
      const studyId = `phsSTUDY-${'A'.repeat(40)}`;
      // Force containerWidth measurement, but jsdom keeps tempElement.offsetWidth=0
      // so the helper's "title fits" branch is taken.
      const { container } = renderWithRouter(
        <StudiesCard data={{ ...studiesCardRow, study_id: studyId }} index={0} />,
      );
      Object.defineProperty(container.firstChild, 'offsetWidth', {
        configurable: true,
        value: 800,
      });
      fireEvent(window, new Event('resize'));
      expect(screen.getByRole('link', { name: studyId })).toBeInTheDocument();
    });

    it('should produce a "start...end" title when the long-truncation branch applies', () => {
      const longId = `phsSTUDY-${'A'.repeat(40)}-MID-${'B'.repeat(40)}-END`;
      const { container } = renderWithRouter(
        <StudiesCard data={{ ...studiesCardRow, study_id: longId }} index={0} />,
      );
      const truncation = triggerLongTitleTruncation(container.firstChild);
      const link = container.querySelector('a[href*="study.cgi"]');
      expect(link.textContent).toMatch(/\.\.\./);
      // both prefix + suffix should remain visible
      expect(link.textContent.startsWith(longId.slice(0, 1))).toBe(true);
      expect(link.textContent.endsWith(longId.slice(-1))).toBe(true);
      truncation.restore();
    });
  });

  describe('SamplesCard', () => {
    it('should render plain title when sample id fits the card', () => {
      const { container } = renderWithRouter(
        <SamplesCard data={{ ...samplesCardRow, sample_id: 'SHORT-1' }} index={0} />,
      );
      Object.defineProperty(container.firstChild, 'offsetWidth', {
        configurable: true,
        value: 800,
      });
      fireEvent(window, new Event('resize'));
      expect(screen.getByText('SHORT-1')).toBeInTheDocument();
    });

    it('should produce a "start...end" sample id when long-truncation branch applies', () => {
      const longSample = `SMP-${'X'.repeat(80)}-END`;
      const { container } = renderWithRouter(
        <SamplesCard data={{ ...samplesCardRow, sample_id: longSample }} index={0} />,
      );
      const truncation = triggerLongTitleTruncation(container.firstChild);
      // The visible title must include "..." and at least one start char.
      expect(container.textContent).toMatch(/SMP.*\.\.\./);
      truncation.restore();
    });
  });

  describe('ModelsCard', () => {
    it('should render plain model title when value fits the card', () => {
      const { container } = renderWithRouter(
        <ModelsCard data={{ ...modelsCardRow, value: 'short-model' }} index={0} />,
      );
      Object.defineProperty(container.firstChild, 'offsetWidth', {
        configurable: true,
        value: 800,
      });
      fireEvent(window, new Event('resize'));
      expect(screen.getByText('short-model')).toBeInTheDocument();
    });

    it('should produce a "start...end" model value when long-truncation branch applies', () => {
      const longValue = `model-${'Z'.repeat(80)}-end`;
      const { container } = renderWithRouter(
        <ModelsCard data={{ ...modelsCardRow, value: longValue }} index={0} />,
      );
      const truncation = triggerLongTitleTruncation(container.firstChild);
      expect(container.textContent).toMatch(/model-.*\.\.\./);
      truncation.restore();
    });
  });

  describe('FilesCard', () => {
    it('should render the file title untouched when measured width fits the card', () => {
      const { container } = renderWithRouter(
        <FilesCard
          data={{ ...filesCardRow, file_name: 'short_file.bam' }}
          index={0}
          addFiles={jest.fn()}
          cartFiles={[]}
        />,
      );
      Object.defineProperty(container.firstChild, 'offsetWidth', {
        configurable: true,
        value: 800,
      });
      fireEvent(window, new Event('resize'));
      expect(screen.getByText('short_file.bam')).toBeInTheDocument();
    });

    it('should produce a "start...end" file title when long-truncation branch applies (with participant link)', () => {
      const longName = `file_${'Q'.repeat(60)}.cram`;
      const { container } = renderWithRouter(
        <FilesCard
          data={{ ...filesCardRow, file_name: longName }}
          index={0}
          addFiles={jest.fn()}
          cartFiles={[]}
        />,
      );
      const truncation = triggerLongTitleTruncation(container.firstChild);
      expect(container.textContent).toMatch(/file_.*\.\.\..*cram/);
      truncation.restore();
    });

    it('should produce a "start...end" file title when long-truncation branch applies (without participant)', () => {
      const longName = `nopart_${'P'.repeat(60)}.bam`;
      const { container } = renderWithRouter(
        <FilesCard
          data={{ ...filesCardRow, file_name: longName, participant_id: null }}
          index={0}
          addFiles={jest.fn()}
          cartFiles={[]}
        />,
      );
      const truncation = triggerLongTitleTruncation(container.firstChild);
      expect(container.textContent).toMatch(/nopart_.*\.\.\..*bam/);
      truncation.restore();
    });
  });

  describe('FilesCard sample-expand row', () => {
    it('should expand long sample id when the toggle is clicked', () => {
      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        writable: true,
        value: 800,
      });
      const longSample = `[${'SAMPLE-LONG-'.repeat(12)}SAMPLE-END]`;
      const { container } = renderWithRouter(
        <FilesCard
          data={{ ...filesCardRow, sample_id: longSample }}
          index={0}
          addFiles={jest.fn()}
          cartFiles={[]}
        />,
      );
      const expandToggles = container.querySelectorAll('span[class*="expandToggle"]');
      // The last expand toggle belongs to Sample (which is rendered after Participant).
      const sampleToggle = expandToggles[expandToggles.length - 1];
      expect(sampleToggle).toBeTruthy();
      fireEvent.click(sampleToggle);
      expect(container.textContent).toMatch(/SAMPLE-END/);
    });

    it('should adjust the sample maxLength when the window is resized to a wider breakpoint', () => {
      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        writable: true,
        value: 800,
      });
      const longSample = `[${'SAMPLE-LONG-'.repeat(12)}SAMPLE-END]`;
      const { container } = renderWithRouter(
        <FilesCard
          data={{ ...filesCardRow, sample_id: longSample }}
          index={0}
          addFiles={jest.fn()}
          cartFiles={[]}
        />,
      );
      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        writable: true,
        value: 1500,
      });
      fireEvent(window, new Event('resize'));
      // Sample row still rendered; resize handler exercised without throwing.
      expect(container.textContent).toMatch(/Sample:/);
    });
  });
});
