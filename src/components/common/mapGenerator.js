import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import * as echarts from 'echarts';

const MARKER_SERIES_INDEX = 1;

/** Geo SVG sits above the scatter canvas in the DOM; without this, the browser never delivers pointer events to markers. */
function stripGeoSvgPointerEvents(chart) {
  const root = chart.getDom();
  if (!root) return;
  root.querySelectorAll('svg').forEach((svg) => {
    svg.style.pointerEvents = 'none';
  });
}

/** Scatter symbol diameter (px) for enrollment hex markers — scales gently with count, capped for readability. */
function enrollmentMarkerSymbolSizePx(enrollmentCount) {
  const n = typeof enrollmentCount === 'number' ? enrollmentCount : Number(enrollmentCount);
  if (!n || n <= 0) return 0;
  return Math.min(34, Math.max(10, 7 + Math.sqrt(n) * 1.28));
}

/** Matches enrollmentMarkers symbolSize (half-width ≈ hit radius). */
function markerHitRadiusPx(enrollmentCount) {
  const size = enrollmentMarkerSymbolSizePx(enrollmentCount);
  if (!size) return 0;
  return size / 2 + 8;
}

/** Horizontal gap from marker center to tooltip’s left edge (tooltip sits to the right of the pin). */
function tooltipAnchorOffsetPx(enrollmentCount) {
  return markerHitRadiusPx(enrollmentCount) + 10;
}

/** Pixel-space nearest marker under the pointer (works when ECharts item tooltip does not). */
function findNearestMarkerAtPixel(chart, markerRows, zrX, zrY) {
  let best = null;
  let bestDist = Infinity;
  markerRows.forEach((row, dataIndex) => {
    const coords = [row[0], row[1]];
    let p = chart.convertToPixel({ seriesIndex: MARKER_SERIES_INDEX }, coords);
    if (!Array.isArray(p) || p.length < 2 || !Number.isFinite(p[0]) || !Number.isFinite(p[1])) {
      try {
        p = chart.convertToPixel('geo', coords);
      } catch (_e) {
        return;
      }
    }
    if (!Array.isArray(p) || p.length < 2 || !Number.isFinite(p[0]) || !Number.isFinite(p[1])) return;
    const r = markerHitRadiusPx(row[3]);
    const d = Math.hypot(p[0] - zrX, p[1] - zrY);
    if (d <= r && d < bestDist) {
      bestDist = d;
      best = {
        dataIndex,
        left: p[0],
        top: p[1],
        name: row[2],
        count: row[3],
      };
    }
  });
  return best;
}

/** Keep the graphic out of the tab order. Do not set aria-hidden on the geo SVG/canvas — it breaks mouse hit-testing on markers. */
function removeChartFromTabOrder(chart) {
  if (!chart) return;
  const root = chart.getDom();
  if (!root) return;
  root.setAttribute('tabindex', '-1');
  root.querySelectorAll('canvas').forEach((el) => {
    el.setAttribute('tabindex', '-1');
  });
  stripGeoSvgPointerEvents(chart);
}

/** Highlights keyboard selection only — never dispatch showTip (that pinned the native tooltip to marker index 0 / Alaska). */
function applyMapKeyboardSelection(chart, markerRows, index) {
  if (!chart || !markerRows || markerRows.length === 0) return;
  const idx = Math.max(0, Math.min(index, markerRows.length - 1));

  const run = () => {
    chart.dispatchAction({ type: 'hideTip' });
    chart.dispatchAction({ type: 'downplay', seriesIndex: MARKER_SERIES_INDEX });
    chart.dispatchAction({
      type: 'highlight',
      seriesIndex: MARKER_SERIES_INDEX,
      dataIndex: idx,
    });
  };

  requestAnimationFrame(() => {
    requestAnimationFrame(run);
  });
}

/**
 * US enrollment symbol map — keyboard: Tab to the map region, Arrow keys / Home / End move between markers.
 * Table remains an alternative for full state list navigation.
 */
const MapView = ({ mapData }) => {
  const chartIdRef = useRef(`mci-enrollment-map-chart-${Math.random().toString(36).slice(2, 11)}`);
  const chartInstRef = useRef(null);
  const rowRefs = useRef([]);

  const headingId = useMemo(() => `mci-map-title-${chartIdRef.current}`, []);
  const descId = useMemo(() => `mci-map-desc-${chartIdRef.current}`, []);
  const tableId = 'mci-enrollment-keyboard-table';

  const chartTitle = useMemo(() => {
    if (!mapData || mapData.title == null || mapData.title === '') return '';
    return String(mapData.title);
  }, [mapData]);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const [focusedRowIndex, setFocusedRowIndex] = useState(0);
  const [skipLinkFocus, setSkipLinkFocus] = useState(false);
  const [chartReady, setChartReady] = useState(false);
  const [keyboardMarkerIndex, setKeyboardMarkerIndex] = useState(0);
  const [mapRegionFocused, setMapRegionFocused] = useState(false);
  /** Pixel position of keyboard tooltip over chart ({x,y} from ECharts) or fallback corner. */
  const [markerTooltipPos, setMarkerTooltipPos] = useState(null);
  /** Fixed-position tooltip for focused table row. */
  const [tableRowTooltip, setTableRowTooltip] = useState(null);
  /** Nearest-enrollment-marker tooltip under the pointer (custom — ECharts geo+scatter tooltips are unreliable here). */
  const [mouseHoverTip, setMouseHoverTip] = useState(null);
  const mapRegionFocusedRef = useRef(false);

  const sortedRows = useMemo(() => {
    if (!mapData || !Array.isArray(mapData.data)) return [];
    return [...mapData.data].sort((a, b) => String(a[2]).localeCompare(String(b[2]), 'en'));
  }, [mapData]);

  const markerRows = useMemo(() => {
    if (!mapData || !Array.isArray(mapData.data)) return [];
    return mapData.data.filter((row) => row[3] > 0);
  }, [mapData]);

  useEffect(() => {
    mapRegionFocusedRef.current = mapRegionFocused;
  }, [mapRegionFocused]);

  useEffect(() => {
    const chart = chartInstRef.current;
    if (!chart || !chartReady || markerRows.length === 0) return undefined;

    let lastDataIndex = null;
    let scheduled = false;
    let rafId = 0;
    const pending = { x: 0, y: 0 };

    const flush = () => {
      scheduled = false;
      const zrX = pending.x;
      const zrY = pending.y;
      const nearest = findNearestMarkerAtPixel(chart, markerRows, zrX, zrY);
      const keyboardFocused = mapRegionFocusedRef.current;

      if (!nearest) {
        if (lastDataIndex !== null) {
          lastDataIndex = null;
          setMouseHoverTip(null);
          if (!keyboardFocused) {
            chart.dispatchAction({ type: 'downplay', seriesIndex: MARKER_SERIES_INDEX });
          }
        }
        return;
      }

      setMouseHoverTip({
        left: nearest.left,
        top: nearest.top,
        name: nearest.name,
        count: nearest.count,
      });

      if (!keyboardFocused) {
        if (lastDataIndex !== nearest.dataIndex) {
          chart.dispatchAction({ type: 'downplay', seriesIndex: MARKER_SERIES_INDEX });
          chart.dispatchAction({
            type: 'highlight',
            seriesIndex: MARKER_SERIES_INDEX,
            dataIndex: nearest.dataIndex,
          });
        }
      }
      lastDataIndex = nearest.dataIndex;
    };

    const onMove = (e) => {
      const zrX = e.zrX != null ? e.zrX : e.offsetX;
      const zrY = e.zrY != null ? e.zrY : e.offsetY;
      pending.x = zrX;
      pending.y = zrY;
      if (!scheduled) {
        scheduled = true;
        rafId = requestAnimationFrame(flush);
      }
    };

    const clear = () => {
      if (scheduled) {
        cancelAnimationFrame(rafId);
        scheduled = false;
      }
      lastDataIndex = null;
      setMouseHoverTip(null);
      if (!mapRegionFocusedRef.current) {
        chart.dispatchAction({ type: 'downplay', seriesIndex: MARKER_SERIES_INDEX });
      }
    };

    stripGeoSvgPointerEvents(chart);
    const zr = chart.getZr();
    zr.on('mousemove', onMove);
    zr.on('globalout', clear);
    const dom = chart.getDom();
    dom.addEventListener('pointerleave', clear);

    return () => {
      zr.off('mousemove', onMove);
      zr.off('globalout', clear);
      dom.removeEventListener('pointerleave', clear);
      if (scheduled) cancelAnimationFrame(rafId);
    };
  }, [chartReady, markerRows]);

  const focusRow = useCallback(
    (next) => {
      const max = sortedRows.length - 1;
      const i = Math.max(0, Math.min(max, next));
      setFocusedRowIndex(i);
      requestAnimationFrame(() => {
        const r = rowRefs.current[i];
        if (r) {
          r.focus();
        }
      });
    },
    [sortedRows.length]
  );

  const onRowKeyDown = useCallback(
    (e, idx) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (idx < sortedRows.length - 1) {
          focusRow(idx + 1);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (idx > 0) {
          focusRow(idx - 1);
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        focusRow(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        focusRow(sortedRows.length - 1);
      }
    },
    [focusRow, sortedRows.length]
  );

  const onMapRegionKeyDown = useCallback(
    (e) => {
      if (markerRows.length === 0) return;
      const last = markerRows.length - 1;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setKeyboardMarkerIndex((prev) => (prev + 1 > last ? 0 : prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setKeyboardMarkerIndex((prev) => (prev - 1 < 0 ? last : prev - 1));
      } else if (e.key === 'Home') {
        e.preventDefault();
        setKeyboardMarkerIndex(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setKeyboardMarkerIndex(last);
      }
    },
    [markerRows.length]
  );

  const onMapRegionFocus = useCallback(() => {
    setMapRegionFocused(true);
    setKeyboardMarkerIndex((i) => Math.min(i, Math.max(0, markerRows.length - 1)));
  }, [markerRows.length]);

  const onMapRegionBlur = useCallback(() => {
    setMapRegionFocused(false);
    const chart = chartInstRef.current;
    if (chart) {
      chart.dispatchAction({ type: 'hideTip' });
      chart.dispatchAction({ type: 'downplay', seriesIndex: MARKER_SERIES_INDEX });
    }
  }, []);

  useEffect(() => {
    if (!mapData || !Array.isArray(mapData.data) || mapData.data.length === 0) {
      return undefined;
    }

    let cancelled = false;
    const publicUrl = (process.env.PUBLIC_URL || '').replace(/\/$/, '');
    const mapUrl = `${publicUrl}/map.svg`;
    const hexUrl = `${window.location.origin}${publicUrl}/HexagonIcon.svg`;
    const chartDomId = chartIdRef.current;
    const rowsForMarkers = markerRows;

    fetch(mapUrl)
      .then((response) => response.text())
      .then((svgText) => {
        if (cancelled) return;
        const el = document.getElementById(chartDomId);
        if (!el) return;

        echarts.registerMap('usa_svg', { svg: svgText });

        const prev = chartInstRef.current;
        if (prev) {
          prev.dispose();
        }
        chartInstRef.current = echarts.init(el);

        chartInstRef.current.setOption({
          /** Native tooltip disabled — hover uses custom HTML via ZRender + convertToPixel (geo SVG blocks scatter hits). */
          tooltip: {
            show: false,
          },
          title: {
            text: mapData.title != null && mapData.title !== '' ? String(mapData.title) : '',
            left: 'center',
            top: 21,
            textStyle: {
              fontFamily: 'Poppins, sans-serif',
              fontSize: 19,
              fontWeight: 400,
              lineHeight: 21,
              letterSpacing: 0.38,
              color: '#05555C',
            },
          },
          geo: {
            map: 'usa_svg',
            /** Required so scatter markers receive hover/click; otherwise geo SVG regions sit on top and steal hit tests. */
            silent: true,
            roam: false,
            layoutSize: '100%',
            aspectScale: 1,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            tooltip: { show: false },
          },
          series: [
            {
              name: 'stateLabels',
              type: 'scatter',
              coordinateSystem: 'geo',
              geoIndex: 0,
              zlevel: 0,
              silent: true,
              data: mapData.data,
              symbol: 'circle',
              symbolSize: 0.001,
              itemStyle: {
                opacity: 0,
              },
              tooltip: { show: false },
              emphasis: {
                disabled: true,
              },
              label: {
                show: true,
                formatter(p) {
                  return p.data[2];
                },
                fontFamily: 'Inter, sans-serif',
                fontSize: 9,
                color: '#1B1B1B',
                distance: 5,
              },
              labelLayout: {
                hideOverlap: false,
              },
            },
            {
              name: 'enrollmentMarkers',
              type: 'scatter',
              coordinateSystem: 'geo',
              geoIndex: 0,
              zlevel: 1,
              data: rowsForMarkers,
              symbol: `image://${hexUrl}`,
              symbolKeepAspect: true,
              symbolSize(value) {
                return enrollmentMarkerSymbolSizePx(value[3]);
              },
              itemStyle: {
                color: '#187C85',
                opacity: 1,
              },
              label: {
                show: false,
              },
              emphasis: {
                scale: 1.08,
                itemStyle: {
                  shadowBlur: 8,
                  shadowColor: 'rgba(24, 124, 133, 0.45)',
                },
              },
            },
          ],
        });

        setChartReady(true);
        requestAnimationFrame(() => {
          const inst = chartInstRef.current;
          if (inst) {
            removeChartFromTabOrder(inst);
            inst.resize();
          }
        });
      })
      .catch((e) => {
        console.error('MCI enrollment map fetch error', e);
      });

    return () => {
      cancelled = true;
      setChartReady(false);
      const inst = chartInstRef.current;
      if (inst) {
        inst.dispose();
      }
      chartInstRef.current = null;
    };
  }, [mapData, markerRows]);

  useEffect(() => {
    if (!chartReady || !mapRegionFocused) return undefined;
    const chart = chartInstRef.current;
    if (!chart) return undefined;
    if (markerRows.length === 0) return undefined;
    applyMapKeyboardSelection(chart, markerRows, keyboardMarkerIndex);
    return undefined;
  }, [chartReady, mapRegionFocused, keyboardMarkerIndex, markerRows]);

  useEffect(() => {
    const onResize = () => {
      setWindowWidth(window.innerWidth);
      const inst = chartInstRef.current;
      if (inst) {
        removeChartFromTabOrder(inst);
        inst.resize();
      }
    };
    window.addEventListener('resize', onResize);
    const el = document.getElementById(chartIdRef.current);
    let ro;
    if (el && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        const inst = chartInstRef.current;
        if (inst) {
          removeChartFromTabOrder(inst);
          inst.resize();
        }
      });
      ro.observe(el);
    }
    return () => {
      window.removeEventListener('resize', onResize);
      if (ro) {
        ro.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const inst = chartInstRef.current;
    if (inst) {
      removeChartFromTabOrder(inst);
      inst.resize();
    }
  }, [windowWidth]);

  useEffect(() => {
    rowRefs.current = rowRefs.current.slice(0, sortedRows.length);
  }, [sortedRows.length]);

  useLayoutEffect(() => {
    if (!mapRegionFocused || !chartReady) {
      setMarkerTooltipPos(null);
      return;
    }
    const row = markerRows[keyboardMarkerIndex];
    if (!row) {
      setMarkerTooltipPos(null);
      return;
    }
    const chart = chartInstRef.current;
    if (!chart) {
      setMarkerTooltipPos({ fallback: true });
      return;
    }

    const measure = () => {
      const coords = [row[0], row[1]];
      try {
        let p = chart.convertToPixel({ seriesIndex: MARKER_SERIES_INDEX }, coords);
        if (!Array.isArray(p) || p.length < 2 || !Number.isFinite(p[0]) || !Number.isFinite(p[1])) {
          p = chart.convertToPixel('geo', coords);
        }
        if (Array.isArray(p) && p.length >= 2 && Number.isFinite(p[0]) && Number.isFinite(p[1])) {
          setMarkerTooltipPos({ left: p[0], top: p[1] });
          return;
        }
      } catch (_e) {
        /* use fallback */
      }
      setMarkerTooltipPos({ fallback: true });
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(measure);
    });
  }, [mapRegionFocused, chartReady, keyboardMarkerIndex, markerRows, windowWidth]);

  const onTableRowFocus = useCallback((e, row, idx) => {
    setFocusedRowIndex(idx);
    const rect = e.currentTarget.getBoundingClientRect();
    const pad = 8;
    const estimatedWidth = 220;
    setTableRowTooltip({
      top: rect.top + rect.height / 2,
      left: Math.min(rect.right + pad, window.innerWidth - estimatedWidth),
      name: row[2],
      count: row[3],
    });
  }, []);

  const onTableRowBlur = useCallback((e) => {
    const { relatedTarget } = e;
    const tbody = e.currentTarget.closest('tbody');
    if (relatedTarget && tbody && tbody.contains(relatedTarget)) {
      return;
    }
    setTableRowTooltip(null);
  }, []);

  const liveRow = markerRows[keyboardMarkerIndex];

  const mapKeyboardTooltipStyle = useMemo(() => {
    if (!markerTooltipPos || markerTooltipPos.fallback) {
      return {
        position: 'absolute',
        zIndex: 50,
        right: 12,
        top: 12,
        pointerEvents: 'none',
      };
    }
    const count = liveRow ? liveRow[3] : 0;
    const dx = tooltipAnchorOffsetPx(count);
    return {
      position: 'absolute',
      zIndex: 50,
      left: markerTooltipPos.left + dx,
      top: markerTooltipPos.top,
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
    };
  }, [markerTooltipPos, liveRow]);

  const mouseHoverTooltipStyle = useMemo(() => {
    if (!mouseHoverTip) return {};
    const dx = tooltipAnchorOffsetPx(mouseHoverTip.count);
    return {
      position: 'absolute',
      zIndex: 55,
      left: mouseHoverTip.left + dx,
      top: mouseHoverTip.top,
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
    };
  }, [mouseHoverTip]);

  if (!mapData || !Array.isArray(mapData.data) || mapData.data.length === 0) {
    return null;
  }

  const heightPx = Math.max(400, Math.min(720, windowWidth * 0.5));

  const liveMessage = liveRow
    ? `Selected: ${liveRow[2]}, ${liveRow[3]} enrolled.`
    : 'No states with enrollees.';

  const skipLinkHiddenStyle = {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: 0,
  };

  const skipLinkVisibleStyle = {
    position: 'fixed',
    top: 8,
    left: 8,
    zIndex: 100000,
    width: 'auto',
    height: 'auto',
    margin: 0,
    clip: 'auto',
    overflow: 'visible',
    padding: '12px 16px',
    background: '#fff',
    color: '#035D63',
    border: '2px solid #035D63',
    fontFamily: 'Inter, sans-serif',
    fontSize: 16,
    fontWeight: 600,
    textDecoration: 'none',
    borderRadius: 4,
    whiteSpace: 'normal',
  };

  return (
    <section
      className="mci-enrollment-map-section"
      aria-labelledby={headingId}
      aria-describedby={descId}
      style={{ marginTop: '24px', position: 'relative' }}
    >
      <a
        href={`#${tableId}`}
        className="mci-map-skip-link"
        style={skipLinkFocus ? skipLinkVisibleStyle : skipLinkHiddenStyle}
        onFocus={() => setSkipLinkFocus(true)}
        onBlur={() => setSkipLinkFocus(false)}
      >
        Skip enrollment map, go to data table
      </a>

      <h4
        id={headingId}
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        {chartTitle}
      </h4>

      <p
        id={descId}
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '20px',
          color: '#1B1B1B',
          margin: '0 0 12px',
          maxWidth: 720,
          marginLeft: 'auto',
          marginRight: 'auto',
          textAlign: 'center',
        }}
      >
        <strong>Keyboard:</strong> press Tab to enter the map region below, then use Arrow keys to move between
        enrollment markers (tooltip shows counts). Home and End jump to the first or last marker. Tab again to
        leave the map, or use the skip link to jump to the data table. The canvas itself is not focused—keyboard
        control uses the surrounding region so focus cannot get trapped inside the graphic.
      </p>
     

      <div
        className="mci-map-keyboard-region"
        tabIndex={0}
        role="group"
        aria-label={`${chartTitle}. Keyboard: Arrow keys move between enrollment markers. Tab exits.`}
        aria-describedby={descId}
        onKeyDown={onMapRegionKeyDown}
        onFocus={onMapRegionFocus}
        onBlur={onMapRegionBlur}
        onMouseDown={(e) => {
          if (e.button === 0 && e.currentTarget.contains(document.activeElement)) {
            e.preventDefault();
          }
        }}
        style={{
          position: 'relative',
          borderRadius: 4,
        }}
      >
        <div
          id={`mci-map-live-${chartIdRef.current}`}
          aria-live="polite"
          aria-atomic="true"
          style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            border: 0,
          }}
        >
          {liveMessage}
        </div>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: `${heightPx}px`,
            marginTop: 0,
          }}
        >
          <div
            id={chartIdRef.current}
            tabIndex={-1}
            role="presentation"
            style={{
              width: '100%',
              height: '100%',
            }}
          />
          {mapRegionFocused && liveRow && !mouseHoverTip && (
            <div
              className={`mci-map-keyboard-tooltip-mirror mci-map-tooltip-floating ${!markerTooltipPos || markerTooltipPos.fallback ? '' : 'mci-map-tooltip-floating--arrow-left'}`}
              role="tooltip"
              style={mapKeyboardTooltipStyle}
            >
              <span style={{ fontWeight: 700, fontSize: 10 }}>{liveRow[2]}:</span>
              <br />
              <span>{liveRow[3]} enrolled</span>
            </div>
          )}
          {mouseHoverTip && (
            <div
              className="mci-map-mouse-tooltip mci-map-tooltip-floating mci-map-tooltip-floating--arrow-left"
              style={mouseHoverTooltipStyle}
              aria-hidden
            >
              <span style={{ fontWeight: 700, fontSize: 10 }}>{mouseHoverTip.name}:</span>
              <br />
              <span>{mouseHoverTip.count} enrolled</span>
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          .mci-map-keyboard-region:focus {
            outline: 3px solid #42779A;
            outline-offset: 3px;
            box-shadow: 0 0 0 2px rgba(66, 119, 154, 0.35);
          }
          .mci-enrollment-map-row:focus {
            outline: 2px solid #035D63;
            outline-offset: 2px;
            background: rgba(3, 93, 99, 0.06);
          }
          .mci-map-tooltip-floating {
            border: 1px solid #000000;
            border-radius: 8px;
            padding: 10px 12px;
            background: #ffffff;
            font-family: Poppins, sans-serif;
            font-size: 13px;
            font-weight: 400;
            color: #286067;
            line-height: 15px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
            max-width: 240px;
          }
          .mci-map-tooltip-floating--arrow-left {
            position: relative;
          }
          .mci-map-tooltip-floating--arrow-left::before {
            content: '';
            position: absolute;
            left: -6px;
            top: 50%;
            transform: translateY(-50%);
            border-style: solid;
            border-width: 4px 6px 4px 0;
            border-color: transparent #000000 transparent transparent;
          }
          .mci-map-tooltip-floating--arrow-left::after {
            content: '';
            position: absolute;
            left: -5px;
            top: 50%;
            transform: translateY(-50%);
            border-style: solid;
            border-width: 3px 5px 3px 0;
            border-color: transparent #ffffff transparent transparent;
          }
        `}
      </style>

      <details
        className="mci-enrollment-map-a11y-details"
        open
        style={{
          marginTop: '20px',
          border: '1px solid #BDBDBD',
          borderRadius: 4,
          padding: '4px 12px 12px',
          background: '#FAFAFA',
        }}
      >
        <summary
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 16,
            fontWeight: 600,
            color: '#05555C',
            cursor: 'pointer',
            padding: '8px 0',
            outline: 'none',
          }}
        >
          Enrollment by state (full data table)
        </summary>
     
        <div style={{ overflowX: 'auto', maxHeight: 360, overflowY: 'auto' }}>
          <p
            id="mci-map-table-instructions"
            style={{
              position: 'absolute',
              width: 1,
              height: 1,
              padding: 0,
              margin: -1,
              overflow: 'hidden',
              clip: 'rect(0, 0, 0, 0)',
              whiteSpace: 'nowrap',
              border: 0,
            }}
          >
            Use Arrow keys to navigate between rows in the enrollment table by jurisdiction.
          </p>
          <table
            id={tableId}
            tabIndex={-1}
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
            }}
            aria-describedby="mci-map-table-instructions"
            aria-labelledby={headingId}
          >
            <caption style={{ captionSide: 'top', textAlign: 'left', padding: '8px 8px 12px' }}>
              {chartTitle}; all jurisdictions from enrollment metrics.
            </caption>
            <thead>
              <tr style={{ borderBottom: '2px solid #42779A' }}>
                <th scope="col" style={{ textAlign: 'left', padding: '8px' }}>
                  State
                </th>
                <th scope="col" style={{ textAlign: 'right', padding: '8px' }}>
                  Number enrolled
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedRows.map((row, idx) => {
                const name = row[2];
                const count = typeof row[3] === 'number' ? row[3] : Number(row[3]);
                const displayCount = Number.isFinite(count) ? count : row[3];
                return (
                  <tr
                    key={String(name)}
                    ref={(el) => {
                      rowRefs.current[idx] = el;
                    }}
                    tabIndex={focusedRowIndex === idx ? 0 : -1}
                    style={{
                      borderBottom: '1px solid #e0e0e0',
                      outline: 'none',
                    }}
                    className="mci-enrollment-map-row"
                    onFocus={(e) => onTableRowFocus(e, row, idx)}
                    onBlur={onTableRowBlur}
                    onClick={(e) => onTableRowFocus(e, row, idx)}
                    onKeyDown={(e) => onRowKeyDown(e, idx)}
                    aria-label={`${name}, ${displayCount} enrolled`}
                  >
                    <td style={{ padding: '8px' }}>{name}</td>
                    <td style={{ padding: '8px', textAlign: 'right' }}>{displayCount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </details>

      {tableRowTooltip && (
        <div
          role="tooltip"
          className="mci-map-tooltip-floating mci-map-tooltip-floating--arrow-left"
          style={{
            position: 'fixed',
            top: tableRowTooltip.top,
            left: tableRowTooltip.left,
            zIndex: 100002,
            pointerEvents: 'none',
            transform: 'translateY(-50%)',
          }}
        >
          <span style={{ fontWeight: 700, fontSize: 10 }}>{tableRowTooltip.name}:</span>
          <br />
          <span>{tableRowTooltip.count} enrolled</span>
        </div>
      )}
    </section>
  );
};

export default MapView;
