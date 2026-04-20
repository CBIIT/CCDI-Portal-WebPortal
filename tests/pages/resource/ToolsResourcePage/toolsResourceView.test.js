/**
 * Unit tests for ToolsResourceView (`resourceData.yaml` — `toolsContent` / `toolsIntroText` as static props).
 *
 * Structure follows tests/TEST_STRUCTURE.md:
 * Rendering → feature sections → Side effects → Edge cases.
 * Fixtures: tests/fixtures/resource/resourceDataViewProps.js (no network).
 */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToolsResourceView from '../../../../src/pages/resource/ToolsResourcePage/ToolsResourceView';
import { minimalToolsResourceData } from '../../../fixtures/resource/resourceDataViewProps';

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
});
