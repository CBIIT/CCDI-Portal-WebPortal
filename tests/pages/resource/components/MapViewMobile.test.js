/**
 * MapViewMobile — state / enrollment rows from mapData.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MapViewMobile from '../../../../src/pages/resource/components/MapViewMobile';
import { mapMobileFixture } from '../../../fixtures/resource/resourceComponentsFixtures';

describe('MapViewMobile', () => {
  describe('Rendering', () => {
    it('should render title, column headers, and row values', () => {
      render(<MapViewMobile mapData={mapMobileFixture} />);

      expect(screen.getByText('Enrollment by State')).toBeInTheDocument();
      expect(screen.getByText('State')).toBeInTheDocument();
      expect(screen.getByText('Number Enrolled')).toBeInTheDocument();
      expect(screen.getByText('California')).toBeInTheDocument();
      expect(screen.getByText('120')).toBeInTheDocument();
      expect(screen.getByText('Texas')).toBeInTheDocument();
    });
  });
});
