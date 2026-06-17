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

function normalizeKeyboardInstructionItem(item) {
  if (!item || typeof item !== 'object') {
    return null;
  }
  const label = item.label != null ? String(item.label) : '';
  const text = item.text != null
    ? String(item.text)
    : item.description != null
      ? String(item.description)
      : '';
  if (!label && !text) {
    return null;
  }
  return { label, text };
}

/** Reads `keyboardInstructions` from mci-map YAML (title + items[] with label/text). */
export function resolveKeyboardInstructions(mapData) {
  const raw = mapData && (mapData.keyboardInstructions || mapData.keyboard_instructions);
  if (!raw) {
    return null;
  }
  const itemsSource = Array.isArray(raw.items)
    ? raw.items
    : Array.isArray(raw)
      ? raw
      : null;
  if (!itemsSource) {
    return null;
  }
  const items = itemsSource
    .map(normalizeKeyboardInstructionItem)
    .filter(Boolean);
  if (items.length === 0) {
    return null;
  }
  const title = raw.title != null && String(raw.title).trim() !== ''
    ? String(raw.title)
    : '';
  return { title, items };
}

const STATE_LABEL_STYLE = {
  fontFamily: 'Inter, sans-serif',
  fontSize: 9,
  color: '#1B1B1B',
};

function isDistrictOfColumbia(name) {
  if (name == null) return false;
  const normalized = String(name).trim().toUpperCase();
  return normalized === 'DISTRICT OF COLUMBIA'
    || normalized === 'WASHINGTON DC'
    || normalized === 'WASHINGTON, D.C.'
    || normalized === 'D.C.'
    || normalized === 'DC';
}

function stateLabelRowName(row) {
  return Array.isArray(row) && row[2] != null ? String(row[2]) : '';
}

/**
 * ECharts scatter labels on SVG geo maps are unreliable for some points (see apache/echarts#19974).
 * DC is excluded from the scatter label series and rendered as an HTML overlay instead.
 */
export function buildStateLabelSeriesData(rows) {
  if (!Array.isArray(rows)) return [];
  return rows.filter((row) => !isDistrictOfColumbia(stateLabelRowName(row)));
}

export function findDistrictOfColumbiaRow(rows) {
  if (!Array.isArray(rows)) return null;
  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i];
    if (isDistrictOfColumbia(stateLabelRowName(row))) {
      return row;
    }
  }
  return null;
}

/** Callout anchor in SVG space — label sits southeast of the DC marker to clear Maryland. */
export function getDcLabelGeoCoords(row) {
  if (!Array.isArray(row)) return null;
  return {
    marker: [row[0], row[1]],
    label: [row[0] + 48, row[1] + 24],
  };
}

export function resolveDcLabelLayout(chart, layout) {
  if (!chart || !layout) return null;
  const marker = resolveGeoPixelPosition(chart, layout.marker);
  const label = resolveGeoPixelPosition(chart, layout.label);
  if (!marker || !label) return null;
  return { marker, label };
}

export function resolveGeoPixelPosition(chart, coords) {
  if (!chart || !Array.isArray(coords)) return null;
  try {
    const pixel = chart.convertToPixel('geo', coords);
    if (Array.isArray(pixel) && pixel.length >= 2
      && Number.isFinite(pixel[0]) && Number.isFinite(pixel[1])) {
      return { left: pixel[0], top: pixel[1] };
    }
  } catch (_e) {
    return null;
  }
  return null;
}

export function formatStateLabel(params) {
  let row;
  if (Array.isArray(params.data)) {
    row = params.data;
  } else if (params.data && Array.isArray(params.data.value)) {
    row = params.data.value;
  } else {
    row = params.value;
  }
  if (!row) return '';
  return stateLabelRowName(row);
}

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
 */
const MapView = ({ mapData }) => {
  const chartIdRef = useRef(`mci-enrollment-map-chart-${Math.random().toString(36).slice(2, 11)}`);
  const chartInstRef = useRef(null);

  const headingId = useMemo(() => `mci-map-title-${chartIdRef.current}`, []);
  const descId = useMemo(() => `mci-map-desc-${chartIdRef.current}`, []);

  const chartTitle = useMemo(() => {
    if (!mapData || mapData.title == null || mapData.title === '') return '';
    return String(mapData.title);
  }, [mapData]);
  const keyboardInstructions = useMemo(
    () => resolveKeyboardInstructions(mapData),
    [mapData],
  );
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const [chartReady, setChartReady] = useState(false);
  const [keyboardMarkerIndex, setKeyboardMarkerIndex] = useState(0);
  const [mapRegionFocused, setMapRegionFocused] = useState(false);
  /** Pixel position of keyboard tooltip over chart ({x,y} from ECharts) or fallback corner. */
  const [markerTooltipPos, setMarkerTooltipPos] = useState(null);
  /** Nearest-enrollment-marker tooltip under the pointer (custom — ECharts geo+scatter tooltips are unreliable here). */
  const [mouseHoverTip, setMouseHoverTip] = useState(null);
  const mapRegionFocusedRef = useRef(false);

  const markerRows = useMemo(() => {
    if (!mapData || !Array.isArray(mapData.data)) return [];
    return mapData.data.filter((row) => row[3] > 0);
  }, [mapData]);

  const dcLabelRow = useMemo(
    () => findDistrictOfColumbiaRow(mapData && mapData.data),
    [mapData],
  );

  const [dcLabelLayout, setDcLabelLayout] = useState(null);

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
              data: buildStateLabelSeriesData(mapData.data),
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
                formatter: formatStateLabel,
                ...STATE_LABEL_STYLE,
                distance: 5,
                clip: false,
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

  useLayoutEffect(() => {
    if (!chartReady || !dcLabelRow) {
      setDcLabelLayout(null);
      return undefined;
    }
    const chart = chartInstRef.current;
    if (!chart) {
      setDcLabelLayout(null);
      return undefined;
    }

    const measure = () => {
      const layout = getDcLabelGeoCoords(dcLabelRow);
      setDcLabelLayout(resolveDcLabelLayout(chart, layout));
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(measure);
    });
    return undefined;
  }, [chartReady, dcLabelRow, windowWidth]);

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

  return (
    <section
      className="mci-enrollment-map-section"
      aria-labelledby={headingId}
      aria-describedby={keyboardInstructions ? descId : undefined}
      style={{ marginTop: '24px', position: 'relative' }}
    >
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

      <div
        className="mci-map-keyboard-region"
        tabIndex={0}
        role="group"
        aria-label={`${chartTitle}. Keyboard: Arrow keys move between enrollment markers. Tab exits.`}
        aria-describedby={keyboardInstructions ? descId : undefined}
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
          {dcLabelLayout && (
            <>
              <svg
                className="mci-map-dc-callout-line"
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 3,
                  pointerEvents: 'none',
                  overflow: 'visible',
                }}
              >
                <line
                  x1={dcLabelLayout.marker.left}
                  y1={dcLabelLayout.marker.top}
                  x2={dcLabelLayout.label.left}
                  y2={dcLabelLayout.label.top}
                  stroke="#1B1B1B"
                  strokeWidth={1}
                />
              </svg>
              <div
                className="mci-map-dc-state-label"
                aria-hidden
                style={{
                  position: 'absolute',
                  zIndex: 4,
                  left: dcLabelLayout.label.left + 4,
                  top: dcLabelLayout.label.top,
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 9,
                  lineHeight: '11px',
                  color: '#1B1B1B',
                  textAlign: 'left',
                  whiteSpace: 'nowrap',
                }}
              >
                DISTRICT OF
                <br />
                COLUMBIA
              </div>
            </>
          )}
        </div>
      </div>

      {keyboardInstructions && (
        <div
          id={descId}
          className="mci-map-keyboard-instructions"
          style={{
            marginTop: 16,
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '16px 20px',
            border: '1px solid #BDBDBD',
            borderRadius: 4,
            width: '100%',
            fontFamily: 'Inter, sans-serif',
            fontSize: 14,
            paddingLeft: 0,
            fontWeight: 400,
            color: '#1B1B1B',
          }}
        >
          {keyboardInstructions.title ? (
            <p className="mci-map-keyboard-instructions-title">
              {keyboardInstructions.title}
            </p>
          ) : null}
          <ul className="mci-map-keyboard-instructions-list">
            {keyboardInstructions.items.map((item, idx) => (
              <li key={idx}>
                {item.label ? <strong>{item.label}</strong> : null}
                {item.label && item.text ? ' ' : null}
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      )}

      <style>
        {`
          .mci-map-keyboard-region:focus {
            outline: 3px solid #42779A;
            outline-offset: 3px;
            box-shadow: 0 0 0 2px rgba(66, 119, 154, 0.35);
          }
          .mci-map-keyboard-instructions-title {
            margin: 0 0 6px;
            padding-left: 1.25rem;
            font-family: Inter, sans-serif;
            font-weight: 600;
            font-size: 16px;
            line-height: 20px;
            letter-spacing: -0.02em;
            color: #1b1b1b;
          }
          .mci-map-keyboard-instructions-list {
            margin: 0;
            padding-left: 1.25rem;
            list-style-type: disc;
            list-style-position: outside;
          }
          .mci-map-keyboard-instructions-list li {
            margin: 0;
            padding: 0;
            font-size: 14px;
            line-height: 18px;
          }
          .mci-map-keyboard-instructions-list li + li {
            margin-top: 2px;
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
    </section>
  );
};

export default MapView;
