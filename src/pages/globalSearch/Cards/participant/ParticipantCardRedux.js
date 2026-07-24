import React from 'react';
import ParticipantCard from './ParticipantCard';

/**
 * Thin wrapper kept for existing search card wiring.
 * Cart/snackbar behavior was removed when participant actions moved to C3DC.
 */
const ParticipantCardRedux = (props) => <ParticipantCard {...props} />;

export default ParticipantCardRedux;
