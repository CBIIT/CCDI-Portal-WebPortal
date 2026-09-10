/**
 * c3dcService — Explore URL builder and CPI GraphQL fetch helpers.
 */

import {
  buildC3dcExploreUrl,
  buildC3dcStudyUrl,
  fetchParticipantCpiData,
  openC3dcExplore,
  openC3dcExploreFiles,
  openC3dcDataModel,
  openC3dcStudy,
} from '../../../../../src/pages/globalSearch/Cards/participant/c3dcService';

describe('c3dcService', () => {
  it('builds a C3DC explore URL with participant id only', () => {
    expect(buildC3dcExploreUrl('P001')).toBe(
      'https://clinicalcommons-integrated-dev.ccdi.cancer.gov/exploreParticipants?p_id=P001',
    );
  });

  it('builds a C3DC explore URL with an optional tab', () => {
    expect(buildC3dcExploreUrl('P001', { tab: 7 })).toBe(
      'https://clinicalcommons-integrated-dev.ccdi.cancer.gov/exploreParticipants?p_id=P001&tab=7',
    );
  });

  it('builds a C3DC study detail URL', () => {
    expect(buildC3dcStudyUrl('phs000001')).toBe(
      'https://clinicalcommons-integrated-dev.ccdi.cancer.gov/studies/phs000001',
    );
  });

  it('builds a C3DC explore files URL', () => {
    expect(buildC3dcExploreUrl(null, { path: '/exploreFiles' })).toBe(
      'https://clinicalcommons-integrated-dev.ccdi.cancer.gov/exploreFiles',
    );
  });

  it('opens the C3DC explore files URL in a new tab', () => {
    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
    openC3dcExploreFiles();
    expect(openSpy).toHaveBeenCalledWith(
      'https://clinicalcommons-integrated-dev.ccdi.cancer.gov/exploreFiles',
      '_blank',
      'noopener,noreferrer',
    );
    openSpy.mockRestore();
  });

  it('opens the C3DC data model URL in a new tab', () => {
    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
    openC3dcDataModel();
    expect(openSpy).toHaveBeenCalledWith(
      'https://clinicalcommons-integrated-dev.ccdi.cancer.gov/data-model',
      '_blank',
      'noopener,noreferrer',
    );
    openSpy.mockRestore();
  });

  it('opens the C3DC study URL in a new tab', () => {
    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
    openC3dcStudy('phs000001');
    expect(openSpy).toHaveBeenCalledWith(
      'https://clinicalcommons-integrated-dev.ccdi.cancer.gov/studies/phs000001',
      '_blank',
      'noopener,noreferrer',
    );
    openSpy.mockRestore();
  });

  it('fetches CPI data from the C3DC GraphQL client', async () => {
    const client = {
      query: jest.fn().mockResolvedValue({
        data: {
          participantOverview: [
            {
              participant_id: 'P001',
              study_id: 'phs000001',
              dbgap_accession: 'phs000001',
              cpi_data: [{
                associated_id: 'ALT-1',
                data_type: 'external',
                p_id: null,
              }],
            },
          ],
        },
      }),
    };

    const result = await fetchParticipantCpiData(client, {
      participantId: 'P001',
      studyId: 'phs000001',
    });

    expect(client.query).toHaveBeenCalledWith(
      expect.objectContaining({
        context: { clientName: 'c3dcService' },
        variables: expect.objectContaining({
          participant_ids: ['P001'],
          dbgap_accession: ['phs000001'],
        }),
      }),
    );
    expect(result).toEqual([{
      associated_id: 'ALT-1',
      data_type: 'external',
      p_id: null,
    }]);
  });

  it('matches CPI rows by study_id when dbgap_accession differs', async () => {
    const client = {
      query: jest.fn().mockResolvedValue({
        data: {
          participantOverview: [
            {
              participant_id: 'P001',
              study_id: 'OTHER',
              dbgap_accession: 'phs-other',
              cpi_data: [{ associated_id: 'WRONG' }],
            },
            {
              participant_id: 'P001',
              study_id: 'phs000001',
              dbgap_accession: 'phs-alt',
              cpi_data: [{ associated_id: 'RIGHT', data_type: 'internal', p_id: 'uuid-1' }],
            },
          ],
        },
      }),
    };

    const result = await fetchParticipantCpiData(client, {
      participantId: 'P001',
      studyId: 'phs000001',
    });

    expect(result).toEqual([
      { associated_id: 'RIGHT', data_type: 'internal', p_id: 'uuid-1' },
    ]);
  });
});
