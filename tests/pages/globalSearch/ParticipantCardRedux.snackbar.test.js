/**
 * **`ParticipantCardRedux`** — pass-through wrapper after cart actions were removed.
 *
 * @see src/pages/globalSearch/Cards/participant/ParticipantCardRedux.js
 */

jest.mock('../../../src/pages/globalSearch/Cards/participant/ParticipantCard', () => {
  function MockParticipantCard(props) {
    return <div data-testid="participant-card">{props.data?.participant_id || 'card'}</div>;
  }
  return MockParticipantCard;
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ParticipantCardRedux from '../../../src/pages/globalSearch/Cards/participant/ParticipantCardRedux';

describe('ParticipantCardRedux', () => {
  it('should render the participant card', () => {
    render(<ParticipantCardRedux data={{ participant_id: 'P-123' }} />);
    expect(screen.getByTestId('participant-card')).toHaveTextContent('P-123');
  });
});
