import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataAvailabilityHeader from '../../../../src/pages/studies/tableConfig/DataAvailabilityHeader';

describe('DataAvailabilityHeader', () => {
  it('should render title and info icon', () => {
    render(<DataAvailabilityHeader />);
    expect(screen.getByText('Data Availability')).toBeInTheDocument();
    expect(screen.getByAltText('Info')).toBeInTheDocument();
  });
});
