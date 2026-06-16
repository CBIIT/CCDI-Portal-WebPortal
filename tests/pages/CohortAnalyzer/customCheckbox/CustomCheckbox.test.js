/**
 * **`CheckBoxCustom`** — selection cap (3) and checked state (Cohort Analyzer).
 *
 * @see src/pages/CohortAnalyzer/customCheckbox/CustomCheckbox.js
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import CheckBoxCustom from '../../../../src/pages/CohortAnalyzer/customCheckbox/CustomCheckbox';

describe('CheckBoxCustom', () => {
  it('should call handleCheckbox when toggling a selected cohort', () => {
    const handleCheckbox = jest.fn();
    render(
      <CheckBoxCustom
        selectedCohorts={['c1']}
        cohort="c1"
        handleCheckbox={handleCheckbox}
      />,
    );

    const cb = screen.getByRole('checkbox');
    expect(cb).toBeChecked();

    fireEvent.click(cb);
    expect(handleCheckbox).toHaveBeenCalledWith('c1', expect.any(Object));
  });

  it('should show capped selection styling for a fourth cohort', () => {
    const handleCheckbox = jest.fn();
    render(
      <CheckBoxCustom
        selectedCohorts={['a', 'b', 'c']}
        cohort="d"
        handleCheckbox={handleCheckbox}
      />,
    );

    const cb = screen.getByRole('checkbox');
    expect(cb).not.toBeChecked();
    expect(cb).toHaveStyle({ opacity: '0.3', cursor: 'not-allowed' });
  });
});
