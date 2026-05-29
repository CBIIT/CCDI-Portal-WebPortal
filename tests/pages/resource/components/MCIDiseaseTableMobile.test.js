/**
 * MCIDiseaseTableMobile — name/value list; falsy header cells are omitted.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MCIDiseaseTableMobile from '../../../../src/pages/resource/components/MCIDiseaseTableMobile';
import { mciDiseaseTableMobileFixture } from '../../../fixtures/resource/resourceComponentsFixtures';

describe('MCIDiseaseTableMobile', () => {
  describe('Rendering', () => {
    it('should render title, non-empty headers, and rows', () => {
      render(<MCIDiseaseTableMobile table={mciDiseaseTableMobileFixture} />);

      expect(screen.getByText('Disease mobile')).toBeInTheDocument();
      expect(screen.getByText('Disease')).toBeInTheDocument();
      expect(screen.getByText('Value')).toBeInTheDocument();
      expect(screen.getByText('Asthma')).toBeInTheDocument();
    });
  });
});
