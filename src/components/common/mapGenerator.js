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
            [638, 420, "ALABAMA", 66], //AL
            [550, 390, "ARKANSAS", 9], //AR
            [240, 430, "ARIZONA", 50], //AZ
            [100, 280, "CALIFORNIA", 254], //CA
            [320, 290, "COLORADO", 19], //CO
            [834, 228, "CONNECTICUT", 31], //CT
            [790, 305, "DISTRICT OF COLUMBIA", 21], //DC
            [810, 290, "DELEWARE", 35], //DE
            [735, 500, "FLORIDA", 203], //FL
            [720, 450, "GEORGIA", 105], //GA
            [340, 630, "HAWAII", 8], //HI
            [505, 250, "IOWA", 55], //IA
            [240, 220, "IDAHO", 26], //ID
            [600, 320, "ILLINOIS", 63], //IL
            [638, 285, "INDIANA", 70], //IN
            [490, 330, "KANSAS", 0], //KS
            [670, 330, "KENTUCKY", 29], //KY
            [550, 460, "LOUISIANA", 30], //LA
            [840, 208, "MASSACHUSETTS", 27], //MA
            [785, 288, "MARYLAND", 51], //MD
            [860, 120, "MAINE", 14], //ME
            [645, 210, "MICHIGAN", 118], //MI
            [515, 150, "MINNESOTA", 103], //MN
            [530, 310, "MISSOURI", 77], //MO
            [600, 420, "MISSISSIPPI", 30], //MS
            [785, 355, "NORTH CAROLINA", 100], //NC
            [440, 135, "NORTH DAKOTA", 7], //ND
            [460, 285, "NEBRASKA", 35], //NE
            [843, 185, "NEW HAMPSHIRE", 4], //NH
            [815, 265, "NEW JERSEY", 43], //NJ
            [330, 430, "NEW MEXICO", 30], //NM
            [160, 260, "NEVADA", 3], //NV
            [795, 190, "NEW YORK", 202], //NY
            [690, 300, "OHIO", 167], //OH
            [490, 410, "OKLAHOMA", 48], //OK
            [150, 200, "OREGON", 24], //OR
            [780, 245, "PENNSYLVANIA", 125], //PA
            [853, 222, "RHODE ISLAND", 25], //RI
            [720, 395, "SOUTH CAROLINA", 42], //SC
            [410, 195, "SOUTH DAKOTA", 6], //SD
            [675, 370, "TENNESSEE", 69], //TN
            [480, 490, "TEXAS", 388], //TX
            [240, 275, "UTAH", 53], //UT
            [765, 310, "VIRGINIA", 59], //VA
            [825, 170, "VERMONT", 16], //VT
            [150, 100, "WASHINGTON", 169], //WA
            [570, 190, "WISCONSIN", 108], //WI
            [720, 330, "WEST VIRGINIA", 5], //WV
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