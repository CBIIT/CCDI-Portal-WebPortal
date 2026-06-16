/**
 * Cohort selector action creators — shape and action types.
 */

import {
  actionTypes,
  onCreateNewCohort,
  onMutateSingleCohort,
  onDeleteSingleCohort,
  onDeleteAllCohort,
  onAddParticipantsToCohort,
} from '../../../../src/components/CohortSelectorState/store/action';

describe('CohortSelectorState actions', () => {
  const success = jest.fn();
  const error = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should expose stable action type constants', () => {
    expect(actionTypes).toEqual({
      CREATE_NEW_COHORT: 'CREATE_NEW_COHORT',
      MUTATE_SINGLE_COHORT: 'MUTATE_SINGLE_COHORT',
      DELETE_SINGLE_COHORT: 'DELETE_SINGLE_COHORT',
      DELETE_ALL_COHORT: 'DELETE_ALL_COHORT',
      ADD_PARTICIPANTS_TO_COHORT: 'ADD_PARTICIPANTS_TO_COHORT',
    });
  });

  it('should build CREATE_NEW_COHORT action', () => {
    const participants = [{ participantId: 'p1' }];
    expect(onCreateNewCohort('c1', 'desc', participants, success, error)).toEqual({
      type: actionTypes.CREATE_NEW_COHORT,
      payload: {
        cohortId: 'c1',
        cohortDescription: 'desc',
        participants,
        success,
        error,
      },
    });
  });

  it('should build MUTATE_SINGLE_COHORT action', () => {
    const data = { cohortName: 'Renamed' };
    expect(onMutateSingleCohort('c1', data, success, error)).toEqual({
      type: actionTypes.MUTATE_SINGLE_COHORT,
      payload: { cohortId: 'c1', data, success, error },
    });
  });

  it('should build DELETE_SINGLE_COHORT action', () => {
    expect(onDeleteSingleCohort('c1', success, error)).toEqual({
      type: actionTypes.DELETE_SINGLE_COHORT,
      payload: { cohortId: 'c1', success, error },
    });
  });

  it('should build DELETE_ALL_COHORT action', () => {
    expect(onDeleteAllCohort(success, error)).toEqual({
      type: actionTypes.DELETE_ALL_COHORT,
      payload: { success, error },
    });
  });

  it('should build ADD_PARTICIPANTS_TO_COHORT action', () => {
    const participants = [{ participantId: 'p2' }];
    expect(onAddParticipantsToCohort('c1', participants, success, error)).toEqual({
      type: actionTypes.ADD_PARTICIPANTS_TO_COHORT,
      payload: { cohortId: 'c1', participants, success, error },
    });
  });
});
