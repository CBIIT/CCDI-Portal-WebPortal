/**
 * Cards barrel export — smoke import of all card components.
 */

jest.mock('../../../src/components/CohortSelectorState/CohortStateContext', () => {
  const React = require('react');
  const ctx = React.createContext({ state: {}, dispatch: jest.fn() });
  return {
    CohortStateContext: ctx,
    CohortStateProvider: ({ children }) => children,
  };
});

jest.mock('../../../src/pages/globalSearch/Cards/participant/ParticipantCardRedux', () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock('../../../src/pages/globalSearch/Cards/files/FilesCardRedux', () => ({
  __esModule: true,
  default: () => null,
}));

import * as Cards from '../../../src/pages/globalSearch/Cards';

describe('Global Search Cards index', () => {
  it('should export all result card components', () => {
    expect(Cards.StudiesCard).toBeDefined();
    expect(Cards.ParticipantCard).toBeDefined();
    expect(Cards.SamplesCard).toBeDefined();
    expect(Cards.FilesCard).toBeDefined();
    expect(Cards.ModelsCard).toBeDefined();
    expect(Cards.AboutCard).toBeDefined();
    expect(Cards.ValueCard).toBeDefined();
  });
});
