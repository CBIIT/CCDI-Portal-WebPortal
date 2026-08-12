/**
 * Parses newsData.md into newsList / newsImgUrlList for NewsView and landing Latest Updates.
 * Blocks use the same # / ### / content-table / property-table shape as release-notes MD.
 */

import axios from 'axios';
import env from '../../utils/env';
import { altList as fallbackAltList } from '../../bento/newsData';
import { parseReleaseNotesMarkdown } from '../releaseNotePage/parseReleaseNotesMarkdown';

export const NEWS_MD_URL = `${env.REACT_APP_STATIC_CONTENT_URL}/newsData.md`;

const DEFAULT_IMG_BY_TYPE = {
  News: 'updateImgMiscNews',
  'CCDI Application Updates': 'updateImgNewApplicationRelease',
};

function defaultImgForType(type) {
  return DEFAULT_IMG_BY_TYPE[type] || 'updateImgMiscNews';
}

/**
 * @param {string} rawMarkdown
 * @returns {{ newsList: object[], newsImgUrlList: Record<string, string>, altList: Record<string, string> }}
 */
export function parseNewsMarkdown(rawMarkdown) {
  const empty = {
    newsList: [],
    newsImgUrlList: {},
    altList: { ...fallbackAltList },
  };

  if (!rawMarkdown || !String(rawMarkdown).trim()) {
    return empty;
  }

  const { releaseNotesList } = parseReleaseNotesMarkdown(rawMarkdown);
  const newsImgUrlList = {};

  const newsList = releaseNotesList
    .filter((item) => item.type !== 'Release Notes')
    .map((item) => {
      const next = { ...item };

      // extractImgFromLines defaults missing <img> to updateImgReleaseNotes — remap for news cards.
      if (!next.imgSrc && next.img === 'updateImgReleaseNotes') {
        next.img = defaultImgForType(next.type);
      }

      if (next.imgSrc && next.img) {
        newsImgUrlList[next.img] = next.imgSrc;
      }

      if (!next.highlight && next.fullText) {
        next.highlight = next.fullText;
      }

      return next;
    });

  return {
    newsList,
    newsImgUrlList,
    altList: { ...fallbackAltList },
  };
}

/** Fetches and parses newsData.md; never throws. */
export async function fetchNewsData() {
  try {
    const result = await axios.get(`${NEWS_MD_URL}?ts=${Date.now()}`);
    return parseNewsMarkdown(result.data);
  } catch (_error) {
    return {
      newsList: [],
      newsImgUrlList: {},
      altList: { ...fallbackAltList },
    };
  }
}

export default parseNewsMarkdown;
