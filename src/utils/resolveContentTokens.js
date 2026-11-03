import env from './env';

const C3DC_TOKEN = /\{\{\s*C3DC\s*\}\}/g;
const CONTENT_VARIABLE = /\{\{\s*([A-Za-z][A-Za-z0-9_]*)\s*\}\}/g;

function c3dcBase() {
  return String(env.REACT_APP_C3DC || '').replace(/\/$/, '');
}

/**
 * Replace `{{C3DC}}` in a string with the configured C3DC base URL (no trailing slash).
 */
export function resolveContentTokenString(value) {
  if (typeof value !== 'string') {
    return value;
  }
  const base = c3dcBase();
  return value.replace(C3DC_TOKEN, base);
}

/**
 * Replace `{{variableName}}` placeholders with values known at render time.
 * Unknown names are left unchanged. A provided empty value removes the token.
 * @param {string} value
 * @param {Record<string, string|number|null|undefined>} variables
 */
export function applyContentVariables(value, variables = {}) {
  if (typeof value !== 'string' || !value) {
    return value;
  }
  return value.replace(CONTENT_VARIABLE, (match, name) => {
    if (!Object.prototype.hasOwnProperty.call(variables, name)) {
      return match;
    }
    const replacement = variables[name];
    return replacement == null ? '' : String(replacement);
  });
}

/**
 * Deep-replace `{{C3DC}}` in strings within plain objects/arrays.
 */
export default function resolveContentTokens(input) {
  if (input == null) {
    return input;
  }
  if (typeof input === 'string') {
    return resolveContentTokenString(input);
  }
  if (Array.isArray(input)) {
    return input.map((item) => resolveContentTokens(item));
  }
  if (typeof input === 'object') {
    const out = {};
    Object.keys(input).forEach((key) => {
      out[key] = resolveContentTokens(input[key]);
    });
    return out;
  }
  return input;
}
