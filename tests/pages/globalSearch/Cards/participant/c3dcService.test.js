/**
 * c3dcService — Explore URL builder and CPI GraphQL fetch helpers.
 */

jest.mock('../../../../../src/utils/env', () => ({
  __esModule: true,
  default: {
    REACT_APP_BACKEND_API: 'https://ccdi-dev.cancer.gov/v1/graphql/',
  },
}));

import {
  buildC3dcExploreUrl,
  buildC3dcStudyUrl,
  fetchParticipantCpiData,
  openC3dcExploreFiles,
  openC3dcDataModel,
  openC3dcStudy,
  resolveC3dcBaseUrl,
} from '../../../../../src/pages/globalSearch/Cards/participant/c3dcService';

describe('c3dcService', () => {
  it('maps Hub backend hosts to matching C3DC tiers', () => {
    expect(resolveC3dcBaseUrl('https://ccdi-dev.cancer.gov/v1/graphql/')).toBe(
      'https://clinicalcommons-integrated-dev.ccdi.cancer.gov',
    );
    expect(resolveC3dcBaseUrl('https://ccdi-qa.cancer.gov/v1/graphql/')).toBe(
      'https://clinicalcommons-qa.ccdi.cancer.gov',
    );
    expect(resolveC3dcBaseUrl('https://ccdi-stage.cancer.gov/v1/graphql/')).toBe(
      'https://clinicalcommons-stage.ccdi.cancer.gov',
    );
    expect(resolveC3dcBaseUrl('https://ccdi.cancer.gov/v1/graphql/')).toBe(
      'https://clinicalcommons.ccdi.cancer.gov',
    );
    expect(resolveC3dcBaseUrl('http://localhost:8080/v1/graphql/')).toBe(
      'https://clinicalcommons-integrated-dev.ccdi.cancer.gov',
    );
  });

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
              dbgap_accession: 'phs000001',
              cpi_data: [{ associated_id: 'ALT-1', data_type: 'external' }],
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
          participant_id: ['P001'],
          dbgap_accession: ['phs000001'],
        }),
      }),
    );
    expect(result).toEqual([{ associated_id: 'ALT-1', data_type: 'external' }]);
  });
});
