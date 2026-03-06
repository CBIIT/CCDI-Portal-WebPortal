import React from 'react';
import styled from 'styled-components';

const PMTLTableContainer = styled.div`
    margin: 40px 74px;
    border: 1px solid #BDBDBD;

    .pmtlTableTitle {
        padding: 15px 0;
        font-family: Poppins;
        font-size: 19px;
        font-weight: 400;
        line-height: 21px;
        letter-spacing: 0.02em;
        text-align: center;
        background: #EEF4F8;
    }

    .pmtlTableTitleText {
        display: block;
        margin: 0 auto;
        width: 390px;
    }

    .pmtlTableHeader {
        border-top: 3px solid #42779A;
        border-bottom: 3px solid #42779A;
    }

    .pmtlTableHeaderList {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }

    .pmtlTableHeaderListItem {
        padding: 10px 0;
        font-family: Open Sans;
        font-size: 15px;
        font-weight: 700;
        line-height: 20px;
        letter-spacing: -0.02em;
        text-align: center;
        border-right: 1px solid #42779A;

    }

    .pmtlTableHeaderListItem:last-child {
        border-right: 0;
    }

    .pmtlTableBodyList {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }

    .pmtlTableBodyListItem {
        padding: 16.5px;
        font-family: Open Sans;
        font-size: 16px;
        font-weight: 400;
        line-height: 17px;
        letter-spacing: 0em;
        text-align: left;
        background: #F4F5F5;
    }

    .pmtlTableBodyList .pmtlTableBodyListItem:nth-child(8n+1),
    .pmtlTableBodyList .pmtlTableBodyListItem:nth-child(8n+2),
    .pmtlTableBodyList .pmtlTableBodyListItem:nth-child(8n+3),
    .pmtlTableBodyList .pmtlTableBodyListItem:nth-child(8n+4){
        background: #ffffff;
    }
      
`;

const PMTLTable = ( {table} ) => {
    return (
        <PMTLTableContainer>
            <div className='pmtlTableTitle'><span className='pmtlTableTitleText'>{table.title}</span></div>
            <div className='pmtlTableHeader'>
                <div className='pmtlTableHeaderList'>
                    {table.header.map((headerItem, idx) => {
                        const key =  `pmtltable_${idx}`;
                        return (
                            <div className='pmtlTableHeaderListItem' key={key}>{headerItem}</div>
                        )
                    })}
                </div>
            </div>
            <div className='pmtlTableBodyList'>
                {
                    table.body.map((bodyItem, idx) => {
                        const key =  `pmtltable_${idx}`;
                        return (
                            <div className='pmtlTableBodyListItem' key={key}>{bodyItem}</div>
                        )
                    })
                }
            </div>
        </PMTLTableContainer>
    )
};

export default PMTLTable;