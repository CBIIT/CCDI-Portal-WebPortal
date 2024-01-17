import React from 'react';
import styled from 'styled-components';

const MCINumberTableContainer = styled.div`
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

    .mciTableHeaderList {
        display: grid;
        grid-template-columns: 500px 120px 120px 120px;
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
        height: 348px;
        overflow: scroll;
        overflow-x: hidden;
        display: grid;
        grid-template-columns: 500px 120px 120px 120px;
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
        line-height: 17px;
        letter-spacing: 0em;
        text-align: left;
        background: #F4F5F5;
    }

    .Name {
        padding-left: 30px;
        border-right: 1px solid #42779A;
    }

    .Number {
        text-align: center;
        border-right: 1px solid #42779A;
    }

    .Last {
        text-align: center;
    }

    .mciTableBodyList .mciTableBodyListItem:nth-child(8n+1),
    .mciTableBodyList .mciTableBodyListItem:nth-child(8n+2),
    .mciTableBodyList .mciTableBodyListItem:nth-child(8n+3),
    .mciTableBodyList .mciTableBodyListItem:nth-child(8n+4){
        background: #FFFFFF;
    }
      
`;

const MCINumberTable = ( {table} ) => {
    return (
        <MCINumberTableContainer>
            <div className='mciTableTitle'>{table.title}</div>
            <div className='mciTableHeader'>
                <div className='mciTableHeaderList'>
                    {table.header.map((headerItem, idx) => {
                        const key =  `mcitable_${idx}`;
                        return (
                            <div className='mciTableHeaderListItem' key={key}><p className='headerText'>{headerItem}</p></div>
                        )
                    })}
                </div>
            </div>
            <div className='mciTableBodyList'>
                {
                    table.body.map((bodyItem, idx) => {
                        const key =  `mcitable_${idx}`;
                        return (
                            <>
                                <div className='mciTableBodyListItem Name' key={key}>{bodyItem[0]}</div>
                                <div className='mciTableBodyListItem Number' key={key}>{bodyItem[1]}</div>
                                <div className='mciTableBodyListItem Number' key={key}>{bodyItem[2]}</div>
                                <div className='mciTableBodyListItem Last' key={key}>{bodyItem[3]}</div>
                            </>
                        )
                    })
                }
            </div>
        </MCINumberTableContainer>
    )
};

export default MCINumberTable;