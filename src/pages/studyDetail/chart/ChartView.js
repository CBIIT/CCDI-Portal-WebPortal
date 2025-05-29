import React, { useState } from "react";
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
} from "recharts";

// Define a color palette for the bars
const DEFAULT_COLORS = [
  "#4555AB",
  "#9FD1D6",
  "#137E87",
  "#99A4E4",
  "#CB2809",
  "#DFC798",
  "#CECECE",
];

const ChartView = ({ data, isModalView = true }) => {
  const [hoveredMonth, setHoveredMonth] = useState(null); // State to track hovered month

  // Event handler for mouse move over the chart
  const handleMouseMove = (state) => {
    if (state.activePayload && state.activePayload.length) {
      setHoveredMonth(state.activePayload[0].payload.group);
    } else {
      setHoveredMonth(null); // Clear hovered month if not over a bar
    }
  };

  // Event handler for mouse leave from the chart
  const handleMouseLeave = () => {
    setHoveredMonth(null); // Clear hovered month when mouse leaves chart
  };

  // Custom Legend component to display months and their colors
  const CustomizedLegend = ({ payload, hoveredMonth }) => {
    return (
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {data.map((entry, index) => {
          const liBackgroundColor = index % 2 === 1 ? "#f0f0f0" : "transparent";
          const isHovered = entry.group === hoveredMonth; // Check if this month is hovered

          return (
            <li
              key={`legend-${index}`}
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "14px",
                color: "#555",
                backgroundColor: liBackgroundColor,
                padding: "0 5px",
                ...(isHovered
                  ? {
                      boxShadow: "2px 2px 4px #ccc",
                      position: "relative",
                    }
                  : {}),
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "2px",
                  backgroundColor:
                    DEFAULT_COLORS[index % DEFAULT_COLORS.length],
                  marginRight: "8px",
                }}
              />
              <span>{entry.group}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  // Custom Tooltip component
  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: "#fff",
            border: "1px solid #CCCCCC",
            padding: "8px",
            color: "#000",
            borderRadius: "4px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            fontSize: "12px",
          }}
        >
          <div style={{ fontWeight: 400 }}>
            {label}: <span style={{ fontWeight: 700 }}>{payload[0].value}</span>{" "}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      style={{
        width: "100%",
        minWidth: isModalView ? 900 : 500,
        height: isModalView ? 550 : 400,
        minHeight: 400,
        margin: "25px 0 15px",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          width={isModalView ? 900 : 500}
          height={isModalView ? 550 : 370}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="group"
            axisLine={{ stroke: "#9e9e9e" }}
            style={{ fontSize: "12px" }}
            tick={false}
          />
          <YAxis
            tickLine={false}
            axisLine={{ stroke: "#9e9e9e" }}
            tick={{ fill: "#4A5C5E" }}
            label={{
              value: "PARTICIPANTS",
              angle: -90,
              position: "insideLeft",
              offset: 15,
              style: { textAnchor: "middle", fontSize: "14px", fill: "#555" },
            }}
            style={{ fontSize: "12px" }}
          />
          <Tooltip
            content={<CustomBarTooltip />}
            wrapperStyle={{
              outline: "none",
            }}
            cursor={{ fill: "#eee" }}
          />
          {isModalView && (
            <Legend
              align="right"
              verticalAlign="middle"
              layout="vertical"
              wrapperStyle={{
                paddingLeft: "20px",
                lineHeight: "24px",
                fontSize: "14px",
                color: "#555",
              }}
              content={<CustomizedLegend hoveredMonth={hoveredMonth} />}
            />
          )}
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

export default ChartView;
