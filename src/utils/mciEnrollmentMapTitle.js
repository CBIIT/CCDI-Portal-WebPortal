/** Default aligns with Metrics section enrollment tables in static content. */
export const DEFAULT_ENROLLMENT_MAP_AS_OF_DATE = 'February 10, 2025';

/**
 * Title for the MCI enrollment symbol map and companion table.
 * mapData.asOfDate or mapData.as_of in YAML/MD overrides the default date phrase.
 */
export function buildEnrollmentMapTitle(mapData) {
  let date = DEFAULT_ENROLLMENT_MAP_AS_OF_DATE;
  if (mapData != null) {
    if (mapData.asOfDate != null && mapData.asOfDate !== '') {
      date = mapData.asOfDate;
    } else if (mapData.as_of != null && mapData.as_of !== '') {
      date = mapData.as_of;
    }
  }
  return `Enrollment Counts by State as of ${date}`;
}
