/**
 * CPI page: static YAML (`resourceData.yaml`) + JSON from participant index API.
 * URL must match `CPIResourceController.js` for contract assertions.
 */

export const CPI_PARTICIPANT_STATS_URL =
  'https://participantindex.ccdi.cancer.gov/v1/statistic';

/** Minimal `resourceData.yaml` payload for CPIResourceView (keys used by the view). */
export const minimalCpiResourceYamlData = {
  cpiIntroText: '<p>CPI intro for unit test.</p>',
  CPI_Header_URL: '',
  CPI_Unique_Participants_Icon_URL: '',
  CPI_Total_Mapped_Participants_Ids_Icon_URL: '',
  CPI_Cross_Dataset_Linkages_Icon_URL: '',
  CPI_Domain_Coverage_Icon_URL: '',
  CPI_Img_URL: '',
  cpiContent: [
    {
      id: 'overview_section',
      topic: 'Overview Topic',
      content: '<p>CPI section body for testing.</p>',
    },
    {
      id: 'CPI_Components_block',
      topic: 'Components Topic',
      content: '<p>Components section body.</p>',
    },
  ],
};

/**
 * Shape expected by CPIResourceView when rendering the stats grid (subset of production API).
 */
export const minimalCpiStatsApiResponse = {
  participant_statistics: {
    unique_participant_count: 4242,
    mapped_participant_count: 9001,
    unique_participants_by_dataset: [
      { participant_count: 111, dataset_count: 2 },
      { participant_count: 222, dataset_count: 3 },
    ],
  },
  counts_by_domain: [
    { domain_category: 'organizational_identifier' },
    { domain_category: 'dataset' },
    { domain_category: 'study' },
    { domain_category: 'dataset' },
  ],
};
