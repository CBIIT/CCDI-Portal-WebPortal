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
          text: "Enrollment Counts by State",
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
          data: [ 
            [110, 540, "ALASKA", 1], //AK
            [638, 420, "ALABAMA", 80], //AL
            [550, 390, "ARKANSAS", 10], //AR
            [240, 430, "ARIZONA", 54], //AZ
            [100, 280, "CALIFORNIA", 281], //CA
            [320, 290, "COLORADO", 16], //CO
            [834, 228, "CONNECTICUT", 36], //CT
            [790, 305, "DISTRICT OF COLUMBIA", 29], //DC
            [810, 290, "DELEWARE", 37], //DE
            [735, 500, "FLORIDA", 219], //FL
            [720, 450, "GEORGIA", 123], //GA
            [340, 630, "HAWAII", 10], //HI
            [505, 250, "IOWA", 61], //IA
            [240, 220, "IDAHO", 31], //ID
            [600, 320, "ILLINOIS", 72], //IL
            [638, 285, "INDIANA", 75], //IN
            [490, 330, "KANSAS", 0], //KS
            [670, 330, "KENTUCKY", 38], //KY
            [550, 460, "LOUISIANA", 34], //LA
            [840, 208, "MASSACHUSETTS", 29], //MA
            [785, 288, "MARYLAND", 58], //MD
            [860, 120, "MAINE", 16], //ME
            [645, 210, "MICHIGAN", 139], //MI
            [515, 150, "MINNESOTA", 112], //MN
            [530, 310, "MISSOURI", 85], //MO
            [600, 420, "MISSISSIPPI", 38], //MS
            [785, 355, "NORTH CAROLINA", 114], //NC
            [440, 135, "NORTH DAKOTA", 11], //ND
            [460, 285, "NEBRASKA", 39], //NE
            [843, 185, "NEW HAMPSHIRE", 5], //NH
            [815, 265, "NEW JERSEY", 52], //NJ
            [330, 430, "NEW MEXICO", 32], //NM
            [160, 260, "NEVADA", 3], //NV
            [795, 190, "NEW YORK", 227], //NY
            [690, 300, "OHIO", 194], //OH
            [490, 410, "OKLAHOMA", 54], //OK
            [150, 200, "OREGON", 29], //OR
            [780, 245, "PENNSYLVANIA", 139], //PA
            [853, 222, "RHODE ISLAND", 27], //RI
            [720, 395, "SOUTH CAROLINA", 47], //SC
            [410, 195, "SOUTH DAKOTA", 8], //SD
            [675, 370, "TENNESSEE", 76], //TN
            [480, 490, "TEXAS", 413], //TX
            [240, 275, "UTAH", 61], //UT
            [765, 310, "VIRGINIA", 67], //VA
            [825, 170, "VERMONT", 17], //VT
            [150, 100, "WASHINGTON", 188], //WA
            [570, 190, "WISCONSIN", 114], //WI
            [720, 330, "WEST VIRGINIA", 7], //WV
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