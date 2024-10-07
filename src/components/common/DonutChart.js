import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {
  ResponsiveContainer, PieChart, Pie, Cell, Sector
} from 'recharts';

const COLORS_EVEN = [
    '#137E87',
    '#99A4E4',
    '#DFC798',
    '#9FD1D6',
    '#4555AB',
    '#CB2809',
    '#CECECE',
];

const COLORS_ODD = [
    '#137E87',
    '#99A4E4',
    '#DFC798',
    '#9FD1D6',
    '#4555AB',
    '#CB2809',
    '#CECECE',
];

const DonutChart = ({
    data,
    innerRadiusP,
    outerRadiusP,
    paddingSpace,
    textColor
}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
      setActiveIndex(0);
    }, [data]);

    const renderActiveShape1 = ({
      cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value
    }) => {
          return (
              <g>
                  <text
                    x={cx}
                    y={cy}
                    dy="0"
                    textAnchor="middle"
                    fill={textColor}
                    fontSize="14px"
                    fontWeight="700"
                    fontFamily="Nunito"
                  >
                      {value}
                  </text>
                  <text
                    x={cx}
                    y={cy+16}
                    dy="0"
                    textAnchor="middle"
                    fill={textColor}
                    fontSize="14px"
                    fontWeight="400"
                    fontFamily="Nunito"
                  >
                      Participants
                  </text>
                  <text
                    x={cx}
                    y={cy+130}
                    dy="12"
                    textAnchor="middle"
                    fill={textColor}
                    fontSize="16px"
                    fontWeight="500"
                    fontFamily="Nunito"
                  >
                      {payload.name.length > 20 ? <title>{payload.name}</title> : null}
                      {payload.name.length > 20 ? `${payload.name.substring(0, 20)}...` : payload.name}
                  </text>
                  <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                    aria-label={'active-cell'}
                  />
                  <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 8}
                    fill={fill}
                    aria-label={'active-cell'}
                  />
              </g>
          );
      };

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    return (
      <ResponsiveContainer height={300} width="100%">
        <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape1}
              data={data}
              textColor={textColor}
              innerRadius={innerRadiusP}
              outerRadius={outerRadiusP}
              dataKey="value"
              onMouseEnter={onPieEnter}
              animationBegin={100}
              paddingAngle={paddingSpace}
            >
                {
                    data.map((entry, index) => {
                        const key = "cell-".concat(index);
                        const fill = data.length % 2 === 0 ? COLORS_EVEN[index % COLORS_EVEN.length] : COLORS_ODD[index % COLORS_ODD.length];
                        return <Cell key={key} fill={fill} textColor={textColor} aria-label={key} />;
                    })
                }
            </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
};

DonutChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    innerRadiusP: PropTypes.number.isRequired,
    outerRadiusP: PropTypes.number.isRequired,
    paddingSpace: PropTypes.number.isRequired,
    textColor: PropTypes.string.isRequired
};

export default DonutChart;