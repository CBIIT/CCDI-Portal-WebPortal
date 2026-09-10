import React from 'react';
import ResourceContentSegments from '../components/ResourceContentSegments';
import MCIJson2TsvMarkdown, { resolveStaticContentAssetUrl } from './MCIJson2TsvMarkdown';

/**
 * Renders parsed markdown/widget segments the same way as MCI
 * (tables, map, responsive-img). Relative image URLs resolve against static content.
 * `responsive-img` may omit `mobile` — wide is used for both breakpoints.
 */
function MCIJson2TsvContentSegments({ segments, pageData }) {
  return (
    <ResourceContentSegments
      segments={segments}
      pageData={pageData}
      MarkdownComponent={MCIJson2TsvMarkdown}
      resolveImgUrl={resolveStaticContentAssetUrl}
      keyPrefix="json2tsv_seg"
    />
  );
}

export default MCIJson2TsvContentSegments;
