/**
 * Unit tests for ToolsResourceView (toolsData.md parsed props).
 *
 * Structure follows tests/TEST_STRUCTURE.md:
 * Rendering → feature sections → Side effects → Edge cases.
 * Fixtures: tests/fixtures/resource/resourceDataViewProps.js (no network).
 */

jest.mock('../../../../src/pages/resource/ToolsResourcePage/ToolsMarkdown', () => (
  function MockToolsMarkdown({ children }) {
    return <div data-testid="tools-markdown">{children}</div>;
  }
));

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { clickTopicNav, triggerResourceScroll, toggleMobileSection } from '../shared/resourceViewTestUtils';
import '@testing-library/jest-dom';
import ToolsResourceView from '../../../../src/pages/resource/ToolsResourcePage/ToolsResourceView';
import { minimalToolsResourceData } from '../../../fixtures/resource/resourceDataViewProps';
import { multiTopicToolsData } from '../../../fixtures/resource/resourceInteractionData';

function renderToolsView(data = minimalToolsResourceData) {
  return render(
    <MemoryRouter initialEntries={['/explore']}>
      <ToolsResourceView data={data} />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  window.scrollTo = jest.fn();
  for (let i = 0; i < 3; i += 1) {
    document.body.appendChild(document.createElement('footer'));
  }
});

afterEach(() => {
  document.querySelectorAll('footer').forEach((el) => el.remove());
});

describe('ToolsResourceView', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { container } = renderToolsView();
      expect(container).toBeInTheDocument();
    });

    it('should render with default fixture data', () => {
      renderToolsView();
      expect(screen.getByText('Tools')).toBeInTheDocument();
      expect(screen.getByText('TOPICS')).toBeInTheDocument();
    });
  });

  describe('Topics and intro content', () => {
    it('should show topics and subsection from nested toolsContent', () => {
      renderToolsView();
      expect(screen.getAllByText('Tools Topic One').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Tool Subsection A').length).toBeGreaterThan(0);
      expect(screen.getByText(/Tool section body for testing/i)).toBeInTheDocument();
    });

    it('should render toolsIntroText', () => {
      renderToolsView();
      expect(screen.getByText(/Tools intro for unit test/i)).toBeInTheDocument();
      expect(screen.getAllByTestId('tools-markdown').length).toBeGreaterThan(0);
    });
  });

  describe('Side effects', () => {
    it('should call window.scrollTo on mount', () => {
      const scrollToMock = jest.fn();
      window.scrollTo = scrollToMock;
      renderToolsView();
      expect(scrollToMock).toHaveBeenCalledWith(0, 0);
    });
  });

  describe('Edge cases', () => {
    it('should render with empty toolsContent array', () => {
      expect(() =>
        renderToolsView({ ...minimalToolsResourceData, toolsContent: [] }),
      ).not.toThrow();
      expect(screen.getByText('Tools')).toBeInTheDocument();
    });
  });

  describe('Navigation interactions', () => {
    it('should highlight topic when nav item is clicked', () => {
      const scrollTo = jest.fn();
      window.scrollTo = scrollTo;
      renderToolsView(multiTopicToolsData);
      const topic = clickTopicNav('Tools B');
      expect(topic).toHaveClass('selected');
      expect(scrollTo).toHaveBeenCalled();
    });

    it('should apply sticky nav on scroll', () => {
      renderToolsView(multiTopicToolsData);
      triggerResourceScroll('ToolsBody');
      expect(document.getElementById('leftNav').className).toContain('navListSticky');
    });

    it('should toggle mobile section visibility', () => {
      renderToolsView(multiTopicToolsData);
      const mobileHeader = toggleMobileSection();
      expect(mobileHeader.className).not.toContain('sectionCollapse');
    });
  });
});
