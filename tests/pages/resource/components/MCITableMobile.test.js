/**
 * MCITableMobile — stacked sections per column from a 3-column flat body.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MCITableMobile from '../../../../src/pages/resource/components/MCITableMobile';
import { mciThreeColumnTableFixture } from '../../../fixtures/resource/resourceComponentsFixtures';

describe('MCITableMobile', () => {
  describe('Rendering', () => {
    it('should render title and reorganized header blocks', () => {
      render(<MCITableMobile table={mciThreeColumnTableFixture} />);

      expect(screen.getByText('Test MCI Table')).toBeInTheDocument();
      expect(screen.getByText('Col A')).toBeInTheDocument();
      expect(screen.getByText('a1')).toBeInTheDocument();
      expect(screen.getByText('a2')).toBeInTheDocument();
    });
  });
});
