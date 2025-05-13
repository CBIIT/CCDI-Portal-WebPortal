import React from 'react';
import styled from 'styled-components';

const MCITableMobileContainer = styled.div`
margin: 20px 0;
border: 1px solid #BDBDBD;
height: 900;

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
    width: 100%;
    display: grid;
    grid-template-columns: 230px auto;
}

.mciTableHeaderListItem {
    padding: 10px 0;
    font-family: Open Sans;
    font-size: 15px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: -0.02em;
    text-align: center;
}

.headerText {
    position: relative;
    float: left;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.mciTableBody {
    display: flex;
}

.mciTableBodyList {
    width: 100%;
    overflow-x: hidden;
    display: grid;
    grid-template-columns: 230px auto;
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
    padding: 6px 16.5px;
    font-family: Open Sans;
    font-size: 14px;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: 0em;
    background: #F4F5F5;
}

.mciTableHeaderList .mciTableHeaderListItem:nth-child(1) {
    border-right: 1px solid #42779A;
}

.mciTableBodyList .mciTableBodyListItem:nth-child(4n+1),
.mciTableBodyList .mciTableBodyListItem:nth-child(4n+2){
    background: #FFFFFF;
}

.mciTableBodyList .mciTableBodyListItem:nth-child(even){
    border-left: 0.5px solid #000000;
    text-align: center;
}

`;

const MCIDiseaseTableMobile = ({ table }) => {
    return (
        <MCITableMobileContainer>
            <div className='mciTableTitle'>{table.title}</div>
            <div className='mciTableHeader'>
                <div className='mciTableHeaderList'>
                    {table.header.filter(headerItem => headerItem).map((headerItem, idx) => {
                        const key = `mcitable_${idx}`;
                        return (
                            <div className='mciTableHeaderListItem' key={key}>{headerItem}</div>
                        )
                    })}
                </div>
            </div>
            <div className='mciTableBody'>
                <div className='mciTableBodyList'>

                    {
                        table.body.map((bodyItem, idx) => {
                            const key1 =  `diseasemobile1_${idx}`;
                            const key2 =  `diseasemobile2_${idx}`;
                            return (
                                <>
                                    <div className='mciTableBodyListItem' key={key1}>{bodyItem.name}</div>
                                    <div className='mciTableBodyListItem' key={key2}>{bodyItem.value}</div>
                                </>
                            )
                        })
                    }
                </div>
            </div>

        </MCITableMobileContainer>
    )
};

export default MCIDiseaseTableMobile;