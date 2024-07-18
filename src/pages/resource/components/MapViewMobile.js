import React from 'react';
import styled from 'styled-components';

const MapViewMobileContainer = styled.div`
    margin: 40px 0;
    border: 1px solid #BDBDBD;

    .mciTableTitle {
        padding: 15px;
        font-family: Poppins;
        font-size: 19px;
        font-weight: 400;
        line-height: 21px;
        letter-spacing: 0.02em;
        text-align: center;
        background: #EEF4F8;
    }

    .mciTableHeader {
        border-top: 3px solid #42779A;
        border-bottom: 3px solid #42779A;
    }

    .mciTableHeaderList {
        display: grid;
        grid-template-columns: 190px auto;
    }

    .mciTableHeaderListItem {
        font-family: Open Sans;
        font-size: 15px;
        font-weight: 700;
        line-height: 20px;
        letter-spacing: -0.02em;
        text-align: center;
        border-right: 1px solid #42779A;
    }

    .mciTableHeaderListItem:last-child {
        border-right: 0;
    }

    .headerText {
        position: relative;
        float: left;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .mciTableBodyList {
        height: 228px;
        overflow: scroll;
        overflow-x: hidden;
        display: grid;
        grid-template-columns: 190px auto;
    }

    .mciTableBodyList::-webkit-scrollbar {
        width: 16px;
        padding: 3px;
    }

    .mciTableBodyList::-webkit-scrollbar-thumb {
        border: 3px solid transparent;
        background: #4D889E;
        border-radius: 20px;
        background-clip: content-box;
    }

    .mciTableBodyListItem {
        padding: 6px 16px;
        font-family: Open Sans;
        font-size: 14px;
        font-weight: 400;
        line-height: 26px;
        letter-spacing: 0em;
        text-align: left;
        background: #F4F5F5;
    }

    .Name {
        border-right: 0.5px solid #000000;
    }

    .Number {
        text-align: center;
        border-right: 0.5px solid #000000;
    }

    .Last {
        text-align: center;
    }

    .mciTableBodyList .mciTableBodyListItem:nth-child(4n+1),
    .mciTableBodyList .mciTableBodyListItem:nth-child(4n+2){
        background: #FFFFFF;
    }
      
`;

const MapMobileView = ( {mapData} ) => {
    return (
        <MapViewMobileContainer>
            <div className='mciTableTitle'>Enrollment Counts by State as of July 10, 2024</div>
            <div className='mciTableHeader'>
                <div className='mciTableHeaderList'>
                    <div className='mciTableHeaderListItem' key="mapMobileHeader_1"><p className='headerText'>State</p></div>
                    <div className='mciTableHeaderListItem' key="mapMobileHeader_2"><p className='headerText'>Number Enrolled</p></div>
                </div>
            </div>
            <div className='mciTableBodyList'>
                {
                    mapData.data.map((bodyItem, idx) => {
                        const key1 =  `maptable1_${idx}`;
                        const key2 =  `maptable2_${idx}`;
                        return (
                            <>
                                <div className='mciTableBodyListItem Name' key={key1}>{bodyItem[2]}</div>
                                <div className='mciTableBodyListItem Number' key={key2}>{bodyItem[3]}</div>
                            </>
                        )
                    })
                }
            </div>
        </MapViewMobileContainer>
    )
};

export default MapMobileView;