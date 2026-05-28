/**
 * **`CohortModalProvider`** exposes modal + warning state via context.
 *
 * @see src/pages/inventory/cohortModal/CohortModalContext.js
 */

import React, { useContext } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import {
  CohortModalContext,
  CohortModalProvider,
} from '../../../../src/pages/inventory/cohortModal/CohortModalContext';

function ConsumerProbe() {
  const {
    showCohortModal,
    setShowCohortModal,
    warningMessage,
    setWarningMessage,
  } = useContext(CohortModalContext);

  return (
    <div>
      <span data-testid="open-flag">{showCohortModal ? 'open' : 'closed'}</span>
      <span data-testid="warning">{warningMessage}</span>
      <button type="button" onClick={() => setShowCohortModal(true)}>open-modal</button>
      <button type="button" onClick={() => setWarningMessage('stay')}>set-warning</button>
    </div>
  );
}

describe('CohortModalContext', () => {
  it('should provide defaults and allow toggling showCohortModal', () => {
    render(
      <CohortModalProvider>
        <ConsumerProbe />
      </CohortModalProvider>,
    );

    expect(screen.getByTestId('open-flag')).toHaveTextContent('closed');
    fireEvent.click(screen.getByRole('button', { name: /open-modal/i }));
    expect(screen.getByTestId('open-flag')).toHaveTextContent('open');
  });

  it('should allow setting warningMessage', () => {
    render(
      <CohortModalProvider>
        <ConsumerProbe />
      </CohortModalProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: /set-warning/i }));
    expect(screen.getByTestId('warning')).toHaveTextContent('stay');
  });
});
