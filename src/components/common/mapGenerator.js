import React, { useEffect } from 'react';
import * as echarts from "echarts";

const MapView = () => {
    const option = {
        tooltip: {
            trigger: 'item',
            position: 'right',
            borderColor: '#000000',
            textStyle: {
                font: 'Poppins',
                fontSize: '13px',
                fontWeight: '400',
                lineHeight: '18px',
                letterSpacing: '-0.01em',
                color: '#286067',
            },
            extraCssText: "border-radius: 8px;",
            formatter: function (params) {
                return '<span>' + params.data[2] + ' enrolled</span>'
            },
        },
        geo: {
          tooltip: {
            show: true
          },
          map: 'usa_svg',
          roam: false
        },
        series: {
          type: 'scatter',
          symbol: 'image://./HexagonIcon.svg',
          coordinateSystem: 'geo',
          geoIndex: 0,
          zlevel: 1,
          symbolSize: function (params) {
            return params[2]
          },
          itemStyle: {
            color: '#187C85',
            opacity: 1,
          },
          encode: {
            tooltip: 2
          },
          data: [
            [160, 97, 10],
            [100, 570, 10],
            [200, 300, 20],
            [300, 443, 17],
            [400, 200, 31],
            [400, 400, 20],
            [500, 500, 20],
            [700, 500, 18],
            [800, 500, 18],
          ],
          symbolKeepAspect: true,
        }
    }
    useEffect(() => {
        // "map.svg" is in the public directory
        fetch('./map.svg')
        .then((response) => response.text())
        .then((svgText) => {
            console.log(svgText);
            echarts.registerMap('usa_svg', { svg: svgText });
            let myChart = echarts.init(document.getElementById('beef'));
            myChart.setOption(option);
       })
       .catch(e => console.error('fetch error', e));
    }, []);

    return (
        <div>
            <div style={{ width: '1000px', height: '770px' }} id='beef'></div>
        </div>
    )
}

export default MapView;