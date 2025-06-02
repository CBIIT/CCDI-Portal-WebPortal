import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import styles from './ChartStyle';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

// Define a color palette for the bars
const DEFAULT_COLORS = [
  '#4555AB',
  '#9FD1D6',
  '#137E87',
  '#99A4E4',
  '#CB2809',
  '#DFC798',
  '#CECECE',
];

/**
 * ChartView component displays a bar chart visualization for study details.
 * Renders a responsive bar chart with custom legend, tooltip, and interactive highlighting
 * of groups on hover. Supports modal and non-modal view styling.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.data - Array of data objects for each group/bar, each containing at least a 'group' and 'subjects' property.
 * @param {Object} props.classes - CSS classes for styling the chart and its elements.
 * @param {boolean} [props.isModalView=true] - Whether the chart is rendered in a modal view (affects layout and legend).
 * @returns {JSX.Element} The rendered ChartView component.
 */
const ChartView = ({ data, classes, isModalView = true }) => {
  // State to track the currently hovered bar group
  const [hoveredGroup, setHoveredGroup] = useState(null); // State to track hovered group

  // Event handler for mouse move over the chart
  const handleMouseMove = (state) => {
    if (state.activePayload && state.activePayload.length) {
      setHoveredGroup(state.activePayload[0].payload.group);
    } else {
      setHoveredGroup(null); // Clear hovered group if not over a bar
    }
  };

  // Event handler for mouse leave from the chart
  const handleMouseLeave = () => {
    setHoveredGroup(null); // Clear hovered group when mouse leaves chart
  };

  // Custom legend component for displaying group labels and their colors
  // Highlights the legend item when its corresponding bar is hovered
  const CustomizedLegend = ({ hoveredGroup }) => {
    return (
      <ul className={classes.legendList}>
        {data.map((entry, index) => {
          const isAlt = index % 2 === 1; // Alternate styling for even/odd items
          const isHovered = entry.group === hoveredGroup; // Highlight if hovered
          let itemClass = classes.legendItem;
          if (isAlt) itemClass += ' ' + classes.legendItemAlt;
          if (isHovered) itemClass += ' ' + classes.legendItemHovered;
          return (
            <li key={`legend-${index}`} className={itemClass}>
              {/* Color box for legend */}
              <div
                className={classes.legendColorBox}
                style={{
                  backgroundColor:
                    DEFAULT_COLORS[index % DEFAULT_COLORS.length],
                }}
              />
              <span className={classes.legendItemLabel}>{entry.group}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  // Custom Tooltip component for displaying value on hover
  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={classes.tooltip}>
          <div className={classes.tooltipLabel}>
            {label}:{' '}
            <span className={classes.tooltipValue}>{payload[0].value}</span>{' '}
          </div>
        </div>
      );
    }
    return null;
  };

  // Render the Bar Chart view
  return (
    <div
      className={
        isModalView ? classes.chartContainerModal : classes.chartContainer
      }
    >
      {/* Responsive container to make chart adapt to parent size */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          width={isModalView ? 900 : 500}
          height={isModalView ? 550 : 370}
        >
          {/* Grid lines for better readability */}
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          {/* X axis for group labels */}
          <XAxis
            dataKey="group"
            axisLine={{ stroke: '#9e9e9e' }}
            style={{ fontSize: '12px' }}
            tick={false}
          />
          {/* Y axis for participant counts */}
          <YAxis
            tickLine={false}
            axisLine={{ stroke: '#9e9e9e' }}
            tick={{ fill: '#4A5C5E' }}
            label={{
              value: 'PARTICIPANTS',
              angle: -90,
              position: 'insideLeft',
              offset: 15,
              style: { textAnchor: 'middle', fontSize: '14px', fill: '#555' },
            }}
            style={{ fontSize: '12px' }}
          />
          {/* Tooltip shows value on hover */}
          <Tooltip
            content={<CustomBarTooltip />}
            wrapperStyle={{
              outline: 'none',
            }}
            cursor={{ fill: '#eee' }}
          />
          {/* Custom legend only in modal view */}
          {isModalView && (
            <Legend
              align="right"
              verticalAlign="middle"
              layout="vertical"
              wrapperStyle={{
                paddingLeft: '20px',
                lineHeight: '24px',
                fontSize: '14px',
                color: '#555',
                maxHeight: '505px',
                overflow: 'hidden overlay',
              }}
              content={<CustomizedLegend hoveredGroup={hoveredGroup} />}
            />
          )}
          {/* Bar series for subjects, each bar colored from palette */}
          <Bar dataKey="subjects" name="subjects" activeBar={false}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Export ChartView component
export default withStyles(styles)(ChartView);
