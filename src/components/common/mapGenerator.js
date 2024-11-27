import React, { useEffect } from 'react';
import * as echarts from "echarts";

const MapView = ({mapData}) => {
    const option = {
        tooltip: {
            trigger: 'item',
            position: 'right',
            borderColor: '#000000',
            textStyle: {
                font: 'Poppins',
                fontSize: '13px',
                fontWeight: '400',
                lineHeight: '15px',
                letterSpacing: '-1%',
                color: '#286067',
            },
            extraCssText: "border-radius: 8px;",
            formatter: function (params) {
                return '<span style="font-weight: 700; font-size:10px;">' + params.data[2] + ':</span><br/><span>' + params.data[3] + ' enrolled</span>'
            },
        },
        geo: {
          tooltip: {
            show: true
          },
          map: 'usa_svg',
          roam: false
        },
        title: {
          text: "Enrollment Counts by State as of November 12, 2024",
          left: "center",
          top: "15%",
        },
        series: {
          type: 'scatter',
          symbol: 'image://./HexagonIcon.svg',
          coordinateSystem: 'geo',
          geoIndex: 0,
          zlevel: 1,
          symbolSize: function (params) {
            return params[3] > 0 ? Math.max(Math.log(params[3]) * 5, 10) : 0
          },
          itemStyle: {
            color: '#187C85',
            opacity: 1,
          },
          encode: {
            tooltip: 2
          },
          data: mapData.data,
          symbolKeepAspect: true,
        }
    }
    useEffect(() => {
        // "map.svg" is in the public directory
        fetch('./map.svg')
        .then((response) => response.text())
        .then((svgText) => {
            echarts.registerMap('usa_svg', { svg: svgText });
            let myChart = echarts.init(document.getElementById('beef'));
            myChart.setOption(option);
            window.addEventListener('resize', function() {
              myChart.resize();
            });
       })
       .catch(e => console.error('fetch error', e));
    }, []);

    return (
        <div>
            <div style={{ width: '100%', height: '660px' }} id='beef'></div>
        </div>
    )
}

export default MapView;