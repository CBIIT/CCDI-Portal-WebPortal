/**
 * **`CohortAnalyzerUtil`** — pure helpers for cohort list, query variables, filters, delete.
 *
 * @see src/pages/CohortAnalyzer/CohortAnalyzerUtil.js
 */

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  triggerNotification,
  filterAllParticipantWithDiagnosisName,
  filterAllParticipantWithTreatmentType,
  getIdsFromCohort,
  getAllIds,
  addCohortColumn,
  resetSelection,
  sortBy,
  sortByReturn,
  handleDelete,
  generateQueryVariable,
  handlePopup,
  SearchBox,
} from '../../../src/pages/CohortAnalyzer/CohortAnalyzerUtil';

import { onDeleteAllCohort, onDeleteSingleCohort } from '../../../src/components/CohortSelectorState/store/action';

describe('CohortAnalyzerUtil', () => {
  describe('triggerNotification', () => {
    it('should pluralize message when count > 1', () => {
      const show = jest.fn();
      triggerNotification(3, { show });
      expect(show).toHaveBeenCalledWith(' 3 Participants added ', 5000);
    });

    it('should use singular when count is 1', () => {
      const show = jest.fn();
      triggerNotification(1, { show });
      expect(show).toHaveBeenCalledWith(' 1 Participant added ', 5000);
    });
  });

  describe('filterAllParticipantWithDiagnosisName', () => {
    it('should keep participants whose pid appears in any section list', () => {
      const generalInfo = {
        secA: ['p1', 'p2'],
        secB: ['p3'],
      };
      const allParticipants = [
        { pid: 'p1', x: 1 },
        { pid: 'p9', x: 2 },
        { pid: 'p3', x: 3 },
      ];
      expect(filterAllParticipantWithDiagnosisName(generalInfo, allParticipants)).toEqual([
        { pid: 'p1', x: 1 },
        { pid: 'p3', x: 3 },
      ]);
    });
  });

  describe('filterAllParticipantWithTreatmentType', () => {
    it('should match treatment_type against section lists', () => {
      const generalInfo = {
        s1: ['Chemo'],
      };
      const parts = [{ treatment_type: 'Chemo' }, { treatment_type: 'Radio' }];
      expect(filterAllParticipantWithTreatmentType(generalInfo, parts)).toEqual([
        { treatment_type: 'Chemo' },
      ]);
    });
  });

  describe('getIdsFromCohort', () => {
    it('should flatten participant ids for selected cohort keys', () => {
      const data = {
        c1: { participants: [{ id: 'a' }, { id: 'b' }] },
        c2: { participants: [{ id: 'c' }] },
      };
      expect(getIdsFromCohort(data, ['c1'])).toEqual(['a', 'b']);
    });
  });

  describe('getAllIds', () => {
    it('should concatenate all section id arrays', () => {
      expect(getAllIds({ a: [1, 2], b: [3] })).toEqual([1, 2, 3]);
    });
  });

  describe('generateQueryVariable', () => {
    it('should collect participant ids and set first to 12000', () => {
      const state = {
        c1: {
          participants: [{ id: 'id1' }, { id: 'id2' }],
        },
      };
      expect(generateQueryVariable(['c1'], state)).toEqual({
        id: ['id1', 'id2'],
        first: 12000,
      });
    });
  });

  describe('sortBy / sortByReturn', () => {
    const state = {
      a: { participants: [1, 2] },
      b: { participants: [1],
      },
    };

    it('should sort cohort keys alphabetically', () => {
      const list = ['b', 'a'];
      const setCohortList = jest.fn();
      sortBy('alphabet', list, setCohortList, state);
      expect(list).toEqual(['a', 'b']);
      expect(setCohortList).toHaveBeenCalledWith(['a', 'b']);
    });

    it('should sort by participant count when type is count', () => {
      const list = ['a', 'b'];
      const setCohortList = jest.fn();
      sortBy('count', list, setCohortList, state);
      expect(list[0]).toBe('b');
      expect(list[1]).toBe('a');
    });

    it('should pin selected cohorts first in sortByReturn', () => {
      const list = ['c', 'a', 'b'];
      const ordered = sortByReturn('alphabet', list, state, ['b']);
      expect(ordered[0]).toBe('b');
      expect(ordered.slice(1).sort()).toEqual(['a', 'c']);
    });
  });

  describe('handleDelete', () => {
    it('should delete one cohort and dispatch single delete', () => {
      const setCohortList = jest.fn((fn) => fn(['a', 'b']));
      const setSelected = jest.fn((fn) => fn(['a']));
      const dispatch = jest.fn();
      const setGeneral = jest.fn();
      const setRowData = jest.fn();

      handleDelete(
        'a',
        setCohortList,
        setSelected,
        dispatch,
        onDeleteSingleCohort,
        onDeleteAllCohort,
        setGeneral,
        setRowData,
      );

      expect(dispatch).toHaveBeenCalled();
      expect(setCohortList).toHaveBeenCalled();
      expect(setSelected).toHaveBeenCalled();
    });

    it('should clear everything when cohortId is falsy', () => {
      const setCohortList = jest.fn();
      const setSelected = jest.fn();
      const dispatch = jest.fn();
      const setGeneral = jest.fn();
      const setRowData = jest.fn();

      handleDelete(
        null,
        setCohortList,
        setSelected,
        dispatch,
        onDeleteSingleCohort,
        onDeleteAllCohort,
        setGeneral,
        setRowData,
      );

      expect(setCohortList).toHaveBeenCalledWith([]);
      expect(setSelected).toHaveBeenCalledWith([]);
      expect(setGeneral).toHaveBeenCalledWith({});
      expect(setRowData).toHaveBeenCalledWith([]);
      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe('handlePopup', () => {
    it('should toggle delete confirmation when state has cohorts', () => {
      const setDeleteInfo = jest.fn();
      const deleteInfo = { showDeleteConfirmation: false };
      handlePopup('cid', { x: {} }, setDeleteInfo, deleteInfo);
      expect(setDeleteInfo).toHaveBeenCalledWith({
        showDeleteConfirmation: true,
        deleteType: 'delete this cohort?',
        cohortId: 'cid',
      });
    });

    it('should not open when cohort state is empty', () => {
      const setDeleteInfo = jest.fn();
      handlePopup(null, {}, setDeleteInfo, { showDeleteConfirmation: false });
      expect(setDeleteInfo).not.toHaveBeenCalled();
    });
  });

  describe('resetSelection', () => {
    it('should clear cohort selection and node index', () => {
      const setSel = jest.fn();
      const setNode = jest.fn();
      resetSelection(setSel, setNode);
      expect(setSel).toHaveBeenCalledWith([]);
      expect(setNode).toHaveBeenCalledWith(0);
    });
  });

  describe('addCohortColumn', () => {
    it('should add cohort cell metadata to each row', () => {
      const rowD = [{ id: 'p1', participant_id: 'P1' }];
      const state = {
        cohortKey: {
          cohortName: 'cohortKey',
          participants: [{ id: 'p1' }],
        },
      };
      const out = addCohortColumn(rowD, state, ['cohortKey']);
      expect(out[0]).toMatchObject({
        id: 'p1',
        cohort: expect.any(Array),
      });
    });
  });

  describe('SearchBox', () => {
    it('should render search input with placeholder', () => {
      const { container } = render(
        SearchBox(
          { inputStyleContainer: 'ic', inputStyle: 'is' },
          jest.fn(),
          '',
          { current: null },
        ),
      );
      expect(container.querySelector('input')).toHaveAttribute(
        'placeholder',
        'Search Participant ID',
      );
    });
  });
});
