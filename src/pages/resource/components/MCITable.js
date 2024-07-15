import React from 'react';
import styled from 'styled-components';

const MCITableContainer = styled.div`
    margin: 40px 74px;
    border: 1px solid #BDBDBD;

    .mciTableTitle {
        padding: 15px 0;
        font-family: Poppins;
        font-size: 19px;
        font-weight: 400;
        line-height: 21px;
        letter-spacing: 0.02em;
        text-align: center;
        background: #EEF4F8;
    }

    .mciTableTitleText {
        display: block;
        margin: 0 auto;
        width: 390px;
    }

    .mciTableHeader {
        border-top: 3px solid #42779A;
        border-bottom: 3px solid #42779A;
    }

    .mciTableHeaderList {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }

    .mciTableHeaderListItem {
        padding: 10px 0;
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

    .mciTableBodyList {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }

    .mciTableBodyListItem {
        padding: 16.5px;
        font-family: Open Sans;
        font-size: 14px;
        font-weight: 400;
        line-height: 17px;
        letter-spacing: 0em;
        text-align: left;
        background: #F4F5F5;
    }

    .mciTableBodyList .mciTableBodyListItem:nth-child(6n+1),
    .mciTableBodyList .mciTableBodyListItem:nth-child(6n+2),
    .mciTableBodyList .mciTableBodyListItem:nth-child(6n+3){
        background: #FFFFFF;
    }
      
`;

const MCITable = ( {table} ) => {
    return (
        <MCITableContainer>
            <div className='mciTableTitle'><span className='mciTableTitleText'>{table.title}</span></div>
            <div className='mciTableHeader'>
                <div className='mciTableHeaderList'>
                    {table.header.map((headerItem, idx) => {
                        const key =  `mcitable_${idx}`;
                        return (
                            <div className='mciTableHeaderListItem' key={key}>{headerItem}</div>
                        )
                    })}
                </div>
            </div>
            <div className='mciTableBodyList'>
                {
                    table.body.map((bodyItem, idx) => {
                        const key =  `mcitable_${idx}`;
                        return (
                            <div className='mciTableBodyListItem' key={key}>{bodyItem}</div>
                        )
                    })
                }
            </div>
        </MCITableContainer>
    )
};

export default MCITable;