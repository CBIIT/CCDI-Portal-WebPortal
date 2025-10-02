import React, { useEffect, useState } from 'react';
import * as echarts from "echarts";

const MapView = ({mapData}) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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
          roam: false,
          // layoutCenter: ['50%', '50%'], // Center the map
          layoutSize: '100%',           // Fill the container height
          aspectScale: 1,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
        title: {
          text: mapData.title,
          left: "center",
          top: "21px",
          textStyle: {
            fontFamily: 'Poppins',
            fontSize: 19,
            fontWeight: 400,
            lineHeight: 21,
            letterSpacing: 0.38,
          },
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
            
            const handleResize = () => {
                setWindowWidth(window.innerWidth); // Update window width state
                myChart.resize();
            };
            
            window.addEventListener('resize', handleResize);
            
            // Cleanup function
            return () => {
                window.removeEventListener('resize', handleResize);
                if (myChart) {
                    myChart.dispose();
                }
            };
       })
       .catch(e => console.error('fetch error', e));
    }, []);

    return (
        <div>
            <div style={{ 
                width: '100%', 
                height: `${Math.max(400, Math.min(720, windowWidth * 0.5))}px`,
                marginTop: '40px',
            }} id='beef'></div>
        </div>
    )
}

export default MapView;