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
                return '<b>' + params.data[2] + ':</b><br/><span>' + params.data[3] + ' enrolled</span>'
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
            return Math.log(params[3]) * 4
          },
          itemStyle: {
            color: '#187C85',
            opacity: 1,
          },
          encode: {
            tooltip: 2
          },
          data: [ 
            [110, 540, "ALASKA", 126], //AK
            [638, 420, "ALABAMA", 174], //AL
            [550, 390, "ARKANSAS", 56], //AR
            [240, 430, "ARIZONA", 203], //AZ
            [100, 280, "CALIFORNIA", 1649], //CA
            [320, 290, "COLORADO", 175], //CO
            [834, 228, "CONNECTICUT", 208], //CT
            [790, 305, "DISTRICT OF COLUMBIA", 169], //DC
            [810, 290, "DELEWARE", 35], //DE
            [735, 500, "FLORIDA", 1402], //FL
            [720, 450, "GEORGIA", 336], //GA
            [340, 630, "HAWAII", 165], //HI
            [505, 250, "IOWA", 231], //IA
            [240, 220, "IDAHO", 74], //ID
            [600, 320, "ILLINOIS", 702], //IL
            [638, 285, "INDIANA", 98], //IN
            [490, 330, "KANSAS", 119], //KS
            [670, 330, "KENTUCKY", 118], //KY
            [550, 460, "LOUISIANA", 178], //LA
            [840, 208, "MASSACHUSETTS", 310], //MA
            [785, 288, "MARYLAND", 367], //MD
            [860, 120, "MAINE", 124], //ME
            [645, 210, "MICHIGAN", 426], //MI
            [515, 150, "MINNESOTA", 313], //MN
            [530, 310, "MISSOURI", 416], //MO
            [600, 420, "MISSISSIPPI", 102], //MS
            [785, 355, "NORTH CAROLINA", 593], //NC
            [440, 135, "NORTH DAKOTA", 39], //ND
            [460, 285, "NEBRASKA", 138], //NE
            [843, 185, "NEW HAMPSHIRE", 92], //NH
            [815, 265, "NEW JERSEY", 709], //NJ
            [330, 430, "NEW MEXICO", 224], //NM
            [160, 260, "NEVADA", 132], //NV
            [795, 190, "NEW YORK", 1248], //NY
            [690, 300, "OHIO", 443], //OH
            [490, 410, "OKLAHOMA", 185], //OK
            [150, 200, "OREGON", 161], //OR
            [780, 245, "PENNSYLVANIA", 490], //PA
            [853, 222, "RHODE ISLAND", 115], //RI
            [720, 395, "SOUTH CAROLINA", 195], //SC
            [410, 195, "SOUTH DAKOTA", 114], //SD
            [675, 370, "TENNESSEE", 317], //TN
            [480, 490, "TEXAS", 1355], //TX
            [240, 275, "UTAH", 114], //UT
            [765, 310, "VIRGINIA", 533], //VA
            [825, 170, "VERMONT", 110], //VT
            [150, 100, "WASHINGTON", 346], //WA
            [570, 190, "WISCONSIN", 320], //WI
            [720, 330, "WEST VIRGINIA", 245], //WV
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