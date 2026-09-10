import React, { Fragment } from 'react';
import FederationMarkdown from './FederationMarkdown';
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
 * Renders parsed markdown/widget segments the same way as MCI (tables, map, responsive-img).
 * `responsive-img` may omit `mobile` — wide is used for both breakpoints.
 */
function FederationContentSegments({ segments, pageData }) {
  if (!Array.isArray(segments) || segments.length === 0) {
    return null;
  }
  return (
    <>
      {segments.map((seg, i) => {
        const k = `federation_seg_${i}`;
        if (seg.type === 'markdown' && seg.markdown) {
          return <FederationMarkdown key={k}>{seg.markdown}</FederationMarkdown>;
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
          const mobileSrc = ri.mobile || ri.wide;
          const riCaption = resolveResponsiveImgCaption(ri, pageData);
          return (
            <Fragment key={k}>
              <img className="ecosystemImg" src={ri.wide} alt={ri.alt || ''} loading="lazy" />
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

export default FederationContentSegments;
