/**
 * MCISearchTable — comma-separated body with client-side filter and clear.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MCISearchTable from '../../../../src/pages/resource/components/MCISearchTable';
import { mciSearchTableFixture } from '../../../fixtures/resource/resourceComponentsFixtures';

if (typeof global.MutationObserver === 'undefined') {
  global.MutationObserver = class MutationObserver {
    disconnect() {}
    observe() {}
    takeRecords() { return []; }
  };
}

describe('MCISearchTable', () => {
  describe('Rendering', () => {
    it('should render title and all comma-separated entries initially', () => {
      render(<MCISearchTable table={mciSearchTableFixture} />);

      expect(screen.getByText('Gene search')).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/e.g\. A1CF/i)).toBeInTheDocument();
      expect(screen.getByText('GENE_AA')).toBeInTheDocument();
      expect(screen.getByText('TP53')).toBeInTheDocument();
    });
  });

  describe('Search interaction', () => {
    it('should narrow rows when the filter matches part of a gene', async () => {
      render(<MCISearchTable table={mciSearchTableFixture} />);

      fireEvent.change(screen.getByPlaceholderText(/e.g\. A1CF/i), {
        target: { value: 'PIK3' },
      });

      await waitFor(() => {
        expect(screen.queryByText('GENE_AA')).not.toBeInTheDocument();
      });
      expect(screen.getByText('PIK3CA')).toBeInTheDocument();
    });

    it('should clear the filter when the clear control is clicked', async () => {
      render(<MCISearchTable table={mciSearchTableFixture} />);
      const input = screen.getByPlaceholderText(/e.g\. A1CF/i);

      fireEvent.change(input, { target: { value: 'TP53' } });
      await waitFor(() => {
        expect(screen.queryByText('GENE_AA')).not.toBeInTheDocument();
      });

      fireEvent.click(document.querySelector('.clearIconContainer'));
      await waitFor(() => {
        expect(screen.getByText('GENE_AA')).toBeInTheDocument();
      });
      expect(input).toHaveValue('');
    });
  });
});
