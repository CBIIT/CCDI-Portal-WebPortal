/**
 * Cohort selector reducer — create cohort and clear all; localStorage persistence mocked.
 */

import { reducer, initialState } from '../../../../src/components/CohortSelectorState/store/reducer';

const validParticipant = {
  id: 'pk1',
  participant_id: 'P001',
  study_id: 'S001',
};

describe('CohortSelectorState reducer', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('CREATE_NEW_COHORT', () => {
    it('should add a valid cohort and persist to localStorage', () => {
      const success = jest.fn();
      const next = reducer(initialState, {
        type: 'CREATE_NEW_COHORT',
        payload: {
          cohortId: 'cohort-a',
          cohortName: 'Cohort A',
          cohortDescription: 'desc',
          participants: [validParticipant],
          success,
        },
      });

      expect(next['cohort-a']).toMatchObject({
        cohortId: 'cohort-a',
        cohortName: 'Cohort A',
        participants: [validParticipant],
      });
      expect(localStorage.setItem).toHaveBeenCalled();
      expect(success).toHaveBeenCalledWith(1);
    });
  });

  describe('DELETE_ALL_COHORT', () => {
    it('should reset to an empty object', () => {
      const seeded = {
        'cohort-a': {
          cohortId: 'cohort-a',
          cohortName: 'Cohort A',
          cohortDescription: '',
          participants: [validParticipant],
          lastUpdated: new Date().toISOString(),
        },
      };
      const next = reducer(seeded, {
        type: 'DELETE_ALL_COHORT',
        payload: {},
      });
      expect(next).toEqual({});
      expect(localStorage.setItem).toHaveBeenCalledWith('cohortState', JSON.stringify({}));
    });
  });

  describe('Edge cases', () => {
    it('should return state when action type is unknown', () => {
      expect(reducer(initialState, { type: 'UNKNOWN', payload: {} })).toBe(initialState);
    });
  });
});
