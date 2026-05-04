/**
 * MCISearchTableMobile — same filter behavior as desktop with mobile layout.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MCISearchTableMobile from '../../../../src/pages/resource/components/MCISearchTableMobile';
import { mciSearchTableFixture } from '../../../fixtures/resource/resourceComponentsFixtures';

if (typeof global.MutationObserver === 'undefined') {
  global.MutationObserver = class MutationObserver {
    disconnect() {}
    observe() {}
    takeRecords() { return []; }
  };
}

describe('MCISearchTableMobile', () => {
  describe('Rendering', () => {
    it('should render title and gene chips from the body string', () => {
      render(<MCISearchTableMobile table={mciSearchTableFixture} />);

      expect(screen.getByText('Gene search')).toBeInTheDocument();
      expect(screen.getByText('PIK3CA')).toBeInTheDocument();
    });
  });

  describe('Search interaction', () => {
    it('should filter the visible list by substring', async () => {
      render(<MCISearchTableMobile table={mciSearchTableFixture} />);

      fireEvent.change(screen.getByPlaceholderText(/e.g\. A1CF/i), {
        target: { value: 'TP5' },
      });

      await waitFor(() => {
        expect(screen.getByText('TP53')).toBeInTheDocument();
        expect(screen.queryByText('GENE_AA')).not.toBeInTheDocument();
      });
    });
  });
});
