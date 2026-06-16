/**
 * Axios mocks for resource pages that load a single YAML file from static content.
 * - Group A: dedicated files, e.g. `/mciData.yaml`, `/pmtlData.yaml`
 * - Group B: shared `/resourceData.yaml` (pass the payload your test’s controller needs)
 * Controllers call axios.get(`${BASE_URL}/<file>.yaml?ts=...`).
 */

import yaml from 'js-yaml';

/**
 * Returns a jest mock implementation for axios.get that resolves YAML strings per path suffix.
 * @param {Record<string, object>} pathSuffixToData — e.g. { '/mciData.yaml': { mciContent: [...] } }
 */
export function createDedicatedYamlAxiosMock(pathSuffixToData) {
  const yamlStrings = Object.fromEntries(
    Object.entries(pathSuffixToData).map(([suffix, obj]) => [suffix, yaml.dump(obj)]),
  );

  return (url) => {
    const pathPart = String(url).split('?')[0];
    const entry = Object.entries(yamlStrings).find(([suffix]) => pathPart.endsWith(suffix));
    if (entry) {
      return Promise.resolve({ data: entry[1] });
    }
    return Promise.reject(new Error(`Unexpected axios.get URL in test: ${url}`));
  };
}
