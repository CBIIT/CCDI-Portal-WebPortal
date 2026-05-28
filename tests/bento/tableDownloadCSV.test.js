/**
 * `src/bento/tableDownloadCSV.js` — explore and cart CSV download configs.
 */

import {
  GET_PARTICIPANTS_TAB,
  customParticipantsTabDownloadCSV,
  GET_SAMPLES_TAB,
  customSamplesTabDownloadCSV,
  GET_FILES_TAB,
  customFilesTabDownloadCSV,
  GET_STUDY_TAB,
  customStudyTabDownloadCSV,
  MY_CART,
  customMyFilesTabDownloadCSV,
} from '../../src/bento/tableDownloadCSV';

describe('tableDownloadCSV', () => {
  const downloadConfigs = [
    ['participants', customParticipantsTabDownloadCSV, GET_PARTICIPANTS_TAB, 'participantOverView'],
    ['samples', customSamplesTabDownloadCSV, GET_SAMPLES_TAB, 'sampleOverview'],
    ['files', customFilesTabDownloadCSV, GET_FILES_TAB, 'fileOverview'],
    ['studies', customStudyTabDownloadCSV, GET_STUDY_TAB, 'studyOverview'],
    ['cart', customMyFilesTabDownloadCSV, MY_CART, 'filesInList'],
  ];

  it.each(downloadConfigs)(
    'should define %s tab CSV export metadata',
    (_label, config, query, apiVariable) => {
      expect(config.query).toBe(query);
      expect(config.apiVariable).toBe(apiVariable);
      expect(config.keysToInclude.length).toBeGreaterThan(0);
      expect(config.header.length).toBeGreaterThan(0);
      expect(config.defaultFullTableDownload).toBe(false);
      expect(config.fileName).toBeTruthy();
    },
  );

  it('should align participant keys and headers', () => {
    expect(customParticipantsTabDownloadCSV.keysToInclude[0]).toBe('participant_id');
    expect(customParticipantsTabDownloadCSV.header[0]).toBe('Participant ID');
  });
});
