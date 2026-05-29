/**
 * MCINumberTable — four numeric columns per row.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MCINumberTable from '../../../../src/pages/resource/components/MCINumberTable';
import { mciNumberTableFixture } from '../../../fixtures/resource/resourceComponentsFixtures';

describe('MCINumberTable', () => {
  describe('Rendering', () => {
    it('should render headers and body columns', () => {
      render(<MCINumberTable table={mciNumberTableFixture} />);

      expect(screen.getByText('Site counts')).toBeInTheDocument();
      expect(screen.getByText('Site A')).toBeInTheDocument();
      expect(screen.getByText('6')).toBeInTheDocument();
    });
  });
});
