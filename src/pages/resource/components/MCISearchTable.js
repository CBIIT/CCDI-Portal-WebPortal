import React from 'react';
import styled from 'styled-components';

const MCISearchTableContainer = styled.div`
    margin: 40px 74px;
    border: 1px solid #BDBDBD;

    .mciTableTitle {
        padding: 15px 230px;
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

    .mciTableBodyList {
        height: 281px;
        overflow: auto;
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        grid-template-rows: repeat(18, 35px);
    }

    .mciTableBodyListItem {
        font-family: Open Sans;
        font-size: 14px;
        font-weight: 400;
        line-height: 35px;
        text-align: center;

    }

    .mciTableBodyList .mciTableBodyListItem:nth-child(16n+1),
    .mciTableBodyList .mciTableBodyListItem:nth-child(16n+2),
    .mciTableBodyList .mciTableBodyListItem:nth-child(16n+3),
    .mciTableBodyList .mciTableBodyListItem:nth-child(16n+4),
    .mciTableBodyList .mciTableBodyListItem:nth-child(16n+5),
    .mciTableBodyList .mciTableBodyListItem:nth-child(16n+6),
    .mciTableBodyList .mciTableBodyListItem:nth-child(16n+7),
    .mciTableBodyList .mciTableBodyListItem:nth-child(16n+8){
        background: #F4F5F5;
    }
      
`;

const MCISearchTable = ( {table} ) => {
    const tableList = table.body.split(", ");
    return (
        <MCISearchTableContainer>
            <div className='mciTableTitle'>{table.title}</div>
            <div className='mciTableHeader'>
                search
            </div>
            <div className='mciTableBodyList'>
                {
                    tableList.map((bodyItem, idx) => {
                        const key =  `mcitable_${idx}`;
                        return (
                            <div className='mciTableBodyListItem' key={key}>{bodyItem}</div>
                        )
                    })
                }
            </div>
        </MCISearchTableContainer>
    )
};

export default MCISearchTable;
