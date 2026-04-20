/**
 * Unit tests for RareCancerResourceView (`resourceData.yaml` — rare cancer fields as static props).
 *
 * Structure follows tests/TEST_STRUCTURE.md:
 * Rendering → feature sections → Side effects → Edge cases.
 * Fixtures: tests/fixtures/resource/resourceDataViewProps.js (no network).
 */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RareCancerResourceView from '../../../../src/pages/resource/RareCancerResourcePage/RareCancerResourceView';
import { minimalRareCancerResourceData } from '../../../fixtures/resource/resourceDataViewProps';

function renderRareCancerView(data = minimalRareCancerResourceData) {
  return render(
    <MemoryRouter initialEntries={['/explore']}>
      <RareCancerResourceView data={data} />
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

describe('RareCancerResourceView', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { container } = renderRareCancerView();
      expect(container).toBeInTheDocument();
    });

    it('should render with default fixture data', () => {
      renderRareCancerView();
      expect(
        screen.getByText(/Pediatric, Adolescent, and Young Adult Rare Cancer Study/i),
      ).toBeInTheDocument();
      expect(screen.getByText('TOPICS')).toBeInTheDocument();
    });
  });

  describe('Navigation and links', () => {
    it('should link Home to root (breadcrumb is display:none; query with hidden: true)', () => {
      renderRareCancerView();
      expect(screen.getByRole('link', { name: /Home/i, hidden: true })).toHaveAttribute('href', '/');
    });
  });

  describe('Topics and body content', () => {
    it('should show topic nav, intro, and subsection from rareCancerContent', () => {
      renderRareCancerView();
      expect(screen.getAllByText('Rare Cancer Topic').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Rare Subsection').length).toBeGreaterThan(0);
      expect(screen.getByText(/Rare cancer intro for unit test/i)).toBeInTheDocument();
      expect(screen.getByText(/Rare cancer subsection body/i)).toBeInTheDocument();
    });
  });

  describe('Side effects', () => {
    it('should call window.scrollTo when there is no location hash', () => {
      const scrollToMock = jest.fn();
      window.scrollTo = scrollToMock;
      renderRareCancerView();
      expect(scrollToMock).toHaveBeenCalledWith(0, 0);
    });
  });
});
