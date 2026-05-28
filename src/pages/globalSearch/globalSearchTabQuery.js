import { queryCountAPI, queryResultAPI } from '../../bento/sitesearch';

/**
 * Determine the correct datafield and offset for the All tab based
 * off of the current offset and the number of results for each datafield
 *
 * @param {string} searchText
 * @param {number} calcOffset
 * @param {number} pageSize
 * @param {boolean} isPublic
 */
export async function getAllQueryField(searchText, calcOffset, pageSize, isPublic) {
  const searchResp = await queryCountAPI(searchText, isPublic);

  const custodianConfigForTabData = [
    { countField: 'participant_count', nameField: 'participants' },
    { countField: 'study_count', nameField: 'studies' },
    { countField: 'sample_count', nameField: 'samples' },
    { countField: 'file_count', nameField: 'files' },
    { countField: 'model_count', nameField: 'model' },
    { countField: 'about_count', nameField: 'about_page' },
  ];

  let acc = 0;
  const mapCountAndName = custodianConfigForTabData.map((obj) => {
    acc += searchResp[obj.countField];
    return { ...obj, value: acc };
  });

  const filter = mapCountAndName.filter((obj) => obj.value > calcOffset)[0];
  const filterForOffset = mapCountAndName.filter((obj) => obj.value <= calcOffset);
  const val = filterForOffset.length === 0
    ? 0
    : filterForOffset[filterForOffset.length - 1].value;

  if (filter !== undefined) {
    return {
      datafieldValue: filter.nameField,
      offsetValue: (Math.abs(calcOffset - val) / pageSize) * pageSize,
    };
  }

  return { datafieldValue: 'participants', offsetValue: 0 };
}

/**
 * Wrapper for the queryResultAPI function to get the All tab's data
 *
 * @param {string} search the search input value
 * @param {number} offset the offset value
 * @param {number} pageSize the pagination page size
 * @param {boolean} isPublic whether to use a public or private query
 */
export async function queryAllAPI(search, offset, pageSize, isPublic) {
  const {
    datafieldValue, offsetValue,
  } = await getAllQueryField(search, offset, pageSize, isPublic);
  const input = {
    input: search,
    first: pageSize,
    offset: offsetValue,
  };
  let results = await queryResultAPI(datafieldValue, input, isPublic);
  results = results.map((e) => {
    return { ...e, type: datafieldValue };
  });

  return results;
}
