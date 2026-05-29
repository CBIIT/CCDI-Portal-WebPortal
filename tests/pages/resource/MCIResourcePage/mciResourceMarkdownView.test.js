/**
 * Unit tests for MCIResourceMarkdownView (parsed mciData.md shape as static props).
 */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { clickTopicNav, triggerResourceScroll } from '../shared/resourceViewTestUtils';
import '@testing-library/jest-dom';
import MCIResourceMarkdownView from '../../../../src/pages/resource/MCIResourcePage/MCIResourceMarkdownView';
import { defaultMciMarkdownViewData } from '../../../fixtures/resource/mciMarkdownSamples';
import { multiTopicMciData } from '../../../fixtures/resource/resourceInteractionData';

jest.mock('../../../../src/pages/resource/MCIResourcePage/MciMarkdown', () => {
  const React = require('react');
  return function MockMciMarkdown({ children }) {
    return <div data-testid="mci-markdown">{children}</div>;
  };
});

jest.mock('../../../../src/pages/resource/components/MCITable', () => function MockMCITable() {
  return <div data-testid="mci-table" />;
});
jest.mock('../../../../src/pages/resource/components/MCITableMobile', () => function MockMCITableMobile() {
  return <div data-testid="mci-table-mobile" />;
});
jest.mock('../../../../src/pages/resource/components/MCISearchTable', () => function MockMCISearchTable() {
  return <div data-testid="mci-search-table" />;
});
jest.mock('../../../../src/pages/resource/components/MCISearchTableMobile', () => function MockMCISearchTableMobile() {
  return <div data-testid="mci-search-table-mobile" />;
});
jest.mock('../../../../src/pages/resource/components/MCIDiseaseTable', () => function MockMCIDiseaseTable() {
  return <div data-testid="mci-disease-table" />;
});
jest.mock('../../../../src/pages/resource/components/MCIDiseaseTableMobile', () => function MockMCIDiseaseTableMobile() {
  return <div data-testid="mci-disease-table-mobile" />;
});
jest.mock('../../../../src/components/common/mapGenerator', () => function MockMapView() {
  return <div data-testid="mci-map" />;
});
jest.mock('../../../../src/pages/resource/components/MapViewMobile', () => function MockMapViewMobile() {
  return <div data-testid="mci-map-mobile" />;
});

function renderMciMarkdownView(data = defaultMciMarkdownViewData) {
  return render(
    <MemoryRouter initialEntries={['/MCI']}>
      <MCIResourceMarkdownView data={data} />
    </MemoryRouter>,
  );
}

/** Adapt YAML-shaped multi-topic fixture to markdown view (segments). */
function toMarkdownViewData(yamlShape) {
  return {
    introText: yamlShape.introText?.replace(/<[^>]+>/g, '') || '',
    mciContent: (yamlShape.mciContent || []).map((topic) => ({
      ...topic,
      list: (topic.list || []).map((sub) => ({
        ...sub,
        segments: sub.segments || [
          {
            type: 'markdown',
            markdown: (sub.content || '').replace(/<[^>]+>/g, ''),
          },
        ],
      })),
    })),
  };
}

beforeEach(() => {
  window.scrollTo = jest.fn();
  ['f0', 'f1', 'f2'].forEach(() => {
    document.body.appendChild(document.createElement('footer'));
  });
});

afterEach(() => {
  document.querySelectorAll('footer').forEach((el) => el.remove());
});

describe('MCIResourceMarkdownView', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { container } = renderMciMarkdownView();
      expect(container).toBeInTheDocument();
    });

    it('should render page title and topic content from fixtures', () => {
      renderMciMarkdownView();
      expect(screen.getByText(/Molecular Characterization Initiative/i)).toBeInTheDocument();
      expect(screen.getByText('TOPICS')).toBeInTheDocument();
      expect(screen.getAllByText('Overview Section').length).toBeGreaterThan(0);
      expect(screen.getByText(/Subsection body copy for testing/i)).toBeInTheDocument();
    });
  });

  describe('Navigation and links', () => {
    it('should link Home to root path', () => {
      renderMciMarkdownView();
      expect(screen.getByRole('link', { name: /Home/i, hidden: true })).toHaveAttribute('href', '/');
    });
  });

  describe('Widgets', () => {
    it('should render mocked table widget segment', () => {
      const data = {
        introText: '',
        mciContent: [
          {
            id: 'tables',
            topic: 'Tables',
            list: [
              {
                id: 'table-sub',
                subtopic: 'Table Sub',
                segments: [
                  { type: 'widget', widget: 'table', data: { title: 'Seg Table', footer: 'Foot' } },
                ],
              },
            ],
          },
        ],
      };
      renderMciMarkdownView(data);
      expect(screen.getByTestId('mci-table')).toBeInTheDocument();
      expect(screen.getByText('Foot')).toBeInTheDocument();
    });
  });

  describe('Side effects', () => {
    it('should call window.scrollTo on mount', () => {
      const scrollToMock = jest.fn();
      window.scrollTo = scrollToMock;
      renderMciMarkdownView();
      expect(scrollToMock).toHaveBeenCalledWith(0, 0);
    });

    it('should apply sticky nav class when page is scrolled', () => {
      renderMciMarkdownView(toMarkdownViewData(multiTopicMciData));
      triggerResourceScroll('MCIBody');
      expect(document.getElementById('leftNav').className).toContain('navListSticky');
    });
  });
});
