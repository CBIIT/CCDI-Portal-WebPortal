import React, { Fragment } from 'react';
import MCIJson2TsvMarkdown, { resolveStaticContentAssetUrl } from './MCIJson2TsvMarkdown';
import MCITable from '../components/MCITable';
import MCITableMobile from '../components/MCITableMobile';
import MCISearchTable from '../components/MCISearchTable';
import MCISearchTableMobile from '../components/MCISearchTableMobile';
import MCIDiseaseTable from '../components/MCIDiseaseTable';
import MCIDiseaseTableMobile from '../components/MCIDiseaseTableMobile';
import MapView from '../../../components/common/mapGenerator';
import MapViewMobile from '../components/MapViewMobile';
import { resolveResponsiveImgCaption } from '../MCIResourcePage/parseMciMarkdown';

/**
 * Renders parsed markdown/widget segments the same way as MCI
 * (tables, map, responsive-img). Relative image URLs resolve against static content.
 * `responsive-img` may omit `mobile` — wide is used for both breakpoints.
 */
function MCIJson2TsvContentSegments({ segments, pageData }) {
  if (!Array.isArray(segments) || segments.length === 0) {
    return null;
  }
  return (
    <>
      {segments.map((seg, i) => {
        const k = `json2tsv_seg_${i}`;
        if (seg.type === 'markdown' && seg.markdown) {
          return <MCIJson2TsvMarkdown key={k}>{seg.markdown}</MCIJson2TsvMarkdown>;
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
          const wideSrc = resolveStaticContentAssetUrl(ri.wide);
          const mobileSrc = resolveStaticContentAssetUrl(ri.mobile || ri.wide);
          const riCaption = resolveResponsiveImgCaption(ri, pageData);
          return (
            <Fragment key={k}>
              <img className="ecosystemImg" src={wideSrc} alt={ri.alt || ''} loading="lazy" />
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

export default MCIJson2TsvContentSegments;
