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
            return Math.log(params[2]) * 4
          },
          itemStyle: {
            color: '#187C85',
            opacity: 1,
          },
          encode: {
            tooltip: 2
          },
          data: [ 
            [110, 540, 126], //AK
            [638, 420, 174], //AL
            [550, 390, 56], //AR
            [240, 430, 203], //AZ
            [100, 280, 1649], //CA
            [320, 290, 175], //CO
            [834, 228, 208], //CT
            [790, 305, 169], //DC
            [810, 290, 35], //DE
            [735, 500, 1402], //FL
            [720, 450, 336], //GA
            [340, 630, 165], //HI
            [505, 250, 231], //IA
            [240, 220, 74], //ID
            [600, 320, 702], //IL
            [638, 285, 98], //IN
            [490, 330, 119], //KS
            [670, 330, 118], //KY
            [550, 460, 178], //LA
            [840, 208, 310], //MA
            [785, 288, 367], //MD
            [860, 120, 124], //ME
            [645, 210, 426], //MI
            [515, 150, 313], //MN
            [530, 310, 416], //MO
            [600, 420, 102], //MS
            [785, 355, 593], //NC
            [440, 135, 39], //ND
            [460, 285, 138], //NE
            [843, 185, 92], //NH
            [815, 265, 709], //NJ
            [330, 430, 224], //NM
            [160, 260, 132], //NV
            [795, 190, 1248], //NY
            [690, 300, 443], //OH
            [490, 410, 185], //OK
            [150, 200, 161], //OR
            [780, 245, 490], //PA
            [853, 222, 115], //RI
            [720, 395, 195], //SC
            [410, 195, 114], //SD
            [675, 370, 317], //TN
            [480, 490, 1355], //TX
            [240, 275, 114], //UT
            [765, 310, 533], //VA
            [825, 170, 110], //VT
            [150, 100, 346], //WA
            [570, 190, 320], //WI
            [720, 330, 245], //WV
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