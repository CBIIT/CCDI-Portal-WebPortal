/**
 * Ensures semicolon-delimited lists render with a space after each semicolon.
 *
 * Arrays are joined with "; ". Strings keep a single space after every
 * semicolon whether the source used "a;b" or "a; b".
 *
 * @param {*} value field value from search results
 * @returns {*} formatted string, or the original value when it is not a list
 */
const formatSemicolonList = (value) => {
  if (value == null || value === '') {
    return value;
  }
  if (Array.isArray(value)) {
    return value
      .filter((item) => item != null && item !== '')
      .map(String)
      .join('; ');
  }
  if (typeof value !== 'string') {
    return value;
  }
  return value.replace(/;\s*/g, '; ');
};

export default formatSemicolonList;
