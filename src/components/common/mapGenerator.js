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
            [638, 420, "ALABAMA", 68], //AL
            [550, 390, "ARKANSAS", 5], //AR
            [240, 430, "ARIZONA", 49], //AZ
            [100, 280, "CALIFORNIA", 214], //CA
            [320, 290, "COLORADO", 10], //CO
            [834, 228, "CONNECTICUT", 30], //CT
            [790, 305, "DISTRICT OF COLUMBIA", 20], //DC
            [810, 290, "DELEWARE", 33], //DE
            [735, 500, "FLORIDA", 190], //FL
            [720, 450, "GEORGIA", 103], //GA
            [340, 630, "HAWAII", 31], //HI
            [505, 250, "IOWA", 53], //IA
            [240, 220, "IDAHO", 22], //ID
            [600, 320, "ILLINOIS", 67], //IL
            [638, 285, "INDIANA", 67], //IN
            [490, 330, "KANSAS", 0], //KS
            [670, 330, "KENTUCKY", 22], //KY
            [550, 460, "LOUISIANA", 28], //LA
            [840, 208, "MASSACHUSETTS", 19], //MA
            [785, 288, "MARYLAND", 49], //MD
            [860, 120, "MAINE", 11], //ME
            [645, 210, "MICHIGAN", 121], //MI
            [515, 150, "MINNESOTA", 100], //MN
            [530, 310, "MISSOURI", 67], //MO
            [600, 420, "MISSISSIPPI", 29], //MS
            [785, 355, "NORTH CAROLINA", 96], //NC
            [440, 135, "NORTH DAKOTA", 6], //ND
            [460, 285, "NEBRASKA", 32], //NE
            [843, 185, "NEW HAMPSHIRE", 3], //NH
            [815, 265, "NEW JERSEY", 40], //NJ
            [330, 430, "NEW MEXICO", 28], //NM
            [160, 260, "NEVADA", 3], //NV
            [795, 190, "NEW YORK", 193], //NY
            [690, 300, "OHIO", 164], //OH
            [490, 410, "OKLAHOMA", 46], //OK
            [150, 200, "OREGON", 2], //OR
            [780, 245, "PENNSYLVANIA", 109], //PA
            [853, 222, "RHODE ISLAND", 25], //RI
            [720, 395, "SOUTH CAROLINA", 41], //SC
            [410, 195, "SOUTH DAKOTA", 6], //SD
            [675, 370, "TENNESSEE", 60], //TN
            [480, 490, "TEXAS", 362], //TX
            [240, 275, "UTAH", 50], //UT
            [765, 310, "VIRGINIA", 46], //VA
            [825, 170, "VERMONT", 15], //VT
            [150, 100, "WASHINGTON", 154], //WA
            [570, 190, "WISCONSIN", 104], //WI
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