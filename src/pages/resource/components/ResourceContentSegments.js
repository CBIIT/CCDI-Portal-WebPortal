import React, { Fragment } from 'react';
import MCITable from './MCITable';
import MCITableMobile from './MCITableMobile';
import MCISearchTable from './MCISearchTable';
import MCISearchTableMobile from './MCISearchTableMobile';
import MCIDiseaseTable from './MCIDiseaseTable';
import MCIDiseaseTableMobile from './MCIDiseaseTableMobile';
import MapView from '../../../components/common/mapGenerator';
import MapViewMobile from './MapViewMobile';
import { resolveResponsiveImgCaption } from '../MCIResourcePage/parseMciMarkdown';

/**
 * Shared renderer for left-nav MD resource pages: markdown + MCI widgets + responsive-img.
 * `responsive-img` may omit `mobile` — wide is used for both breakpoints.
 *
 * @param {{
 *   segments: Array,
 *   pageData?: object,
 *   MarkdownComponent: React.ComponentType<{ children: string }>,
 *   resolveImgUrl?: (url: string) => string,
 *   keyPrefix?: string,
 * }} props
 */
function ResourceContentSegments({
  segments,
  pageData,
  MarkdownComponent,
  resolveImgUrl,
  keyPrefix = 'resource_seg',
}) {
  if (!Array.isArray(segments) || segments.length === 0 || !MarkdownComponent) {
    return null;
  }
  const resolve = typeof resolveImgUrl === 'function' ? resolveImgUrl : (url) => url;

  return (
    <>
      {segments.map((seg, i) => {
        const k = `${keyPrefix}_${i}`;
        if (seg.type === 'markdown' && seg.markdown) {
          return <MarkdownComponent key={k}>{seg.markdown}</MarkdownComponent>;
        }
        if (seg.type !== 'widget' || !seg.data) {
          return null;
        }
        if (seg.widget === 'diseaseTable') {
          const t = seg.data;
          return (
            <Fragment key={k}>
              <div className="MCIDiseaseTableContainer"><MCIDiseaseTable table={t} /></div>
              <div className="MCIDiseaseTableMobileContainer"><MCIDiseaseTableMobile table={t} /></div>
              <p>{t.footer}</p>
            </Fragment>
          );
        }
        if (seg.widget === 'map') {
          return (
            <Fragment key={k}>
              <div className="MapContainer"><MapView mapData={seg.data} /></div>
              <div className="MapMobileContainer"><MapViewMobile mapData={seg.data} /></div>
            </Fragment>
          );
        }
        if (seg.widget === 'table') {
          const t = seg.data;
          return (
            <Fragment key={k}>
              <div className="MCITableContainer"><MCITable table={t} /></div>
              <div className="MCITableMobileContainer"><MCITableMobile table={t} /></div>
              <p>{t.footer}</p>
            </Fragment>
          );
        }
        if (seg.widget === 'searchTable') {
          return (
            <Fragment key={k}>
              <div className="MCISearchTableContainer"><MCISearchTable table={seg.data} /></div>
              <div className="MCISearchTableMobileContainer"><MCISearchTableMobile table={seg.data} /></div>
            </Fragment>
          );
        }
        if (seg.widget === 'responsiveImg') {
          const ri = seg.data;
          if (!ri || !ri.wide) {
            return null;
          }
          const mobileSrc = resolve(ri.mobile || ri.wide);
          const riCaption = resolveResponsiveImgCaption(ri, pageData);
          return (
            <Fragment key={k}>
              <img className="ecosystemImg" src={resolve(ri.wide)} alt={ri.alt || ''} loading="lazy" />
              <img
                className="ecosystemImgMobile"
                src={mobileSrc}
                alt={ri.altMobile || ri.alt || ''}
                loading="lazy"
              />
              {riCaption ? <div className="ImgCaption">{riCaption}</div> : null}
            </Fragment>
          );
        }
        return null;
      })}
    </>
  );
}

export default ResourceContentSegments;
