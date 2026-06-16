/**
 * `src/bento/jbrowseDetailData.js` — JBrowse query and viewer options.
 */

import {
  caseIDField,
  jBrowseOptions,
  GET_JBROWSE_DETAIL_DATA_QUERY,
} from '../../src/bento/jbrowseDetailData';

describe('jbrowseDetailData', () => {
  it('should use subject_id as the case identifier field', () => {
    expect(caseIDField).toBe('subject_id');
  });

  it('should enable jBrowse tracks and reference URIs', () => {
    expect(jBrowseOptions.jBrowse).toBe(true);
    expect(jBrowseOptions.variants).toBe(true);
    expect(jBrowseOptions.alignments).toBe(true);
    expect(jBrowseOptions.referenceSequenceUris.fastaLocation.uri).toContain('hg19');
    expect(jBrowseOptions.variantsUris.vcfGzLocationUri).toContain('.vcf.gz');
  });

  it('should expose subject detail GraphQL query', () => {
    expect(GET_JBROWSE_DETAIL_DATA_QUERY).toBeDefined();
    const printed = GET_JBROWSE_DETAIL_DATA_QUERY.loc.source.body;
    expect(printed).toContain('subjectDetail');
    expect(printed).toContain('subject_id');
  });
});
