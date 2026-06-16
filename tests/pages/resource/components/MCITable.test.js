/**
 * MCITable — desktop grid table from props.title / header / body.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MCITable from '../../../../src/pages/resource/components/MCITable';
import { mciThreeColumnTableFixture } from '../../../fixtures/resource/resourceComponentsFixtures';

describe('MCITable', () => {
  describe('Rendering', () => {
    it('should render title, headers, and body cells', () => {
      render(<MCITable table={mciThreeColumnTableFixture} />);

      expect(screen.getByText('Test MCI Table')).toBeInTheDocument();
      expect(screen.getByText('Col A')).toBeInTheDocument();
      expect(screen.getByText('a1')).toBeInTheDocument();
      expect(screen.getByText('c3')).toBeInTheDocument();
    });
  });
});
