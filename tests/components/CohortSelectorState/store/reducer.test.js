/**
 * Cohort selector reducer — CRUD, participants, persistence, and error handling.
 */

import { reducer, initialState } from '../../../../src/components/CohortSelectorState/store/reducer';
import { actionTypes } from '../../../../src/components/CohortSelectorState/store/action';

const validParticipant = {
  id: 'pk1',
  participant_id: 'P001',
  study_id: 'S001',
};

const secondParticipant = {
  id: 'pk2',
  participant_id: 'P002',
  study_id: 'S002',
};

function buildCohort(cohortId, overrides = {}) {
  const now = new Date().toISOString();
  return {
    cohortId,
    cohortName: cohortId,
    cohortDescription: '',
    participants: [validParticipant],
    lastUpdated: now,
    ...overrides,
  };
}

function seedState(cohortId = 'cohort-a') {
  return { [cohortId]: buildCohort(cohortId) };
}

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
        type: actionTypes.CREATE_NEW_COHORT,
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

    it('should auto-generate cohort id when none is provided', () => {
      const next = reducer(initialState, {
        type: actionTypes.CREATE_NEW_COHORT,
        payload: {
          participants: [validParticipant],
        },
      });

      expect(next['New Cohort']).toBeDefined();
      expect(next['New Cohort'].cohortName).toBe('New Cohort');
    });

    it('should increment default cohort name when "New Cohort" already exists', () => {
      const seeded = seedState('New Cohort');
      const next = reducer(seeded, {
        type: actionTypes.CREATE_NEW_COHORT,
        payload: {
          participants: [secondParticipant],
        },
      });

      expect(next['New Cohort 1']).toBeDefined();
      expect(next['New Cohort']).toBeDefined();
    });

    it('should call error and return previous state when cohort id already exists', () => {
      const error = jest.fn();
      const seeded = seedState('cohort-a');
      const next = reducer(seeded, {
        type: actionTypes.CREATE_NEW_COHORT,
        payload: {
          cohortId: 'cohort-a',
          cohortName: 'Duplicate',
          participants: [validParticipant],
          error,
        },
      });

      expect(next).toBe(seeded);
      expect(error).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should call error when participant data is invalid', () => {
      const error = jest.fn();
      const next = reducer(initialState, {
        type: actionTypes.CREATE_NEW_COHORT,
        payload: {
          cohortId: 'bad-cohort',
          cohortName: 'Bad',
          participants: [{ id: '', participant_id: '', study_id: '' }],
          error,
        },
      });

      expect(next).toBe(initialState);
      expect(error).toHaveBeenCalled();
    });
  });

  describe('ADD_PARTICIPANTS_TO_COHORT', () => {
    it('should append new participants and report added count', () => {
      const success = jest.fn();
      const seeded = seedState('cohort-a');
      const next = reducer(seeded, {
        type: actionTypes.ADD_PARTICIPANTS_TO_COHORT,
        payload: {
          cohortId: 'cohort-a',
          participants: [secondParticipant],
          success,
        },
      });

      expect(next['cohort-a'].participants).toHaveLength(2);
      expect(success).toHaveBeenCalledWith(1);
    });

    it('should skip duplicate participant ids', () => {
      const success = jest.fn();
      const seeded = seedState('cohort-a');
      const next = reducer(seeded, {
        type: actionTypes.ADD_PARTICIPANTS_TO_COHORT,
        payload: {
          cohortId: 'cohort-a',
          participants: [validParticipant, secondParticipant],
          success,
        },
      });

      expect(next['cohort-a'].participants).toHaveLength(2);
      expect(success).toHaveBeenCalledWith(1);
    });

    it('should call error when cohort does not exist', () => {
      const error = jest.fn();
      const next = reducer(initialState, {
        type: actionTypes.ADD_PARTICIPANTS_TO_COHORT,
        payload: {
          cohortId: 'missing',
          participants: [validParticipant],
          error,
        },
      });

      expect(next).toBe(initialState);
      expect(error).toHaveBeenCalled();
    });
  });

  describe('MUTATE_SINGLE_COHORT', () => {
    it('should update cohort fields in place', () => {
      const success = jest.fn();
      const seeded = seedState('cohort-a');
      const next = reducer(seeded, {
        type: actionTypes.MUTATE_SINGLE_COHORT,
        payload: {
          cohortId: 'cohort-a',
          data: { cohortDescription: 'updated description' },
          success,
        },
      });

      expect(next['cohort-a'].cohortDescription).toBe('updated description');
      expect(success).toHaveBeenCalled();
    });

    it('should re-key cohort when cohortName changes', () => {
      const seeded = seedState('cohort-a');
      const next = reducer(seeded, {
        type: actionTypes.MUTATE_SINGLE_COHORT,
        payload: {
          cohortId: 'cohort-a',
          data: { cohortName: 'Renamed Cohort' },
        },
      });

      expect(next['cohort-a']).toBeUndefined();
      expect(next['Renamed Cohort']).toMatchObject({
        cohortId: 'Renamed Cohort',
        cohortName: 'Renamed Cohort',
      });
    });

    it('should call error when renaming to an existing cohort name', () => {
      const error = jest.fn();
      const seeded = {
        ...seedState('cohort-a'),
        'other-cohort': buildCohort('other-cohort'),
      };
      const next = reducer(seeded, {
        type: actionTypes.MUTATE_SINGLE_COHORT,
        payload: {
          cohortId: 'cohort-a',
          data: { cohortName: 'other-cohort' },
          error,
        },
      });

      expect(next).toBe(seeded);
      expect(error).toHaveBeenCalled();
    });
  });

  describe('DELETE_SINGLE_COHORT', () => {
    it('should remove a cohort by id', () => {
      const success = jest.fn();
      const seeded = seedState('cohort-a');
      const next = reducer(seeded, {
        type: actionTypes.DELETE_SINGLE_COHORT,
        payload: { cohortId: 'cohort-a', success },
      });

      expect(next).toEqual({});
      expect(success).toHaveBeenCalled();
    });

    it('should call error when deleting a missing cohort', () => {
      const error = jest.fn();
      const next = reducer(initialState, {
        type: actionTypes.DELETE_SINGLE_COHORT,
        payload: { cohortId: 'missing', error },
      });

      expect(next).toBe(initialState);
      expect(error).toHaveBeenCalled();
    });
  });

  describe('DELETE_ALL_COHORT', () => {
    it('should reset to an empty object', () => {
      const seeded = seedState('cohort-a');
      const next = reducer(seeded, {
        type: actionTypes.DELETE_ALL_COHORT,
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
