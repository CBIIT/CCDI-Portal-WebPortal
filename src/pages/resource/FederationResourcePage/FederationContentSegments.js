import React from 'react';
import ResourceContentSegments from '../components/ResourceContentSegments';
import FederationMarkdown from './FederationMarkdown';

/**
 * Renders parsed markdown/widget segments the same way as MCI (tables, map, responsive-img).
 * `responsive-img` may omit `mobile` — wide is used for both breakpoints.
 */
function FederationContentSegments({ segments, pageData }) {
  return (
    <ResourceContentSegments
      segments={segments}
      pageData={pageData}
      MarkdownComponent={FederationMarkdown}
      keyPrefix="federation_seg"
    />
  );
}

export default FederationContentSegments;
