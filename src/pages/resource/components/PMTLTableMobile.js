import React from 'react';
import styled from 'styled-components';

const PMTLTableMobileContainer = styled.div`
    margin: 40px 0;
    border: 1px solid #BDBDBD;

    .pmtlTableTitle {
        padding: 15px 10px;
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
    }

    .pmtlTableHeader {
        border-top: 3px solid #42779A;
        border-bottom: 3px solid #42779A;
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

    .pmtlTableBodyListItem {
        padding: 15px 16.5px;
        font-family: Open Sans;
        font-size: 14px;
        font-weight: 400;
        line-height: 17px;
        letter-spacing: 0em;
        text-align: left;
        background: #F4F5F5;
    }

    .pmtlTableBodyList .pmtlTableBodyListItem:nth-child(2n+1){
        background: #FFFFFF;
    }
      
`;

const PMTLTableMobile = ( {table} ) => {

    const reorderTable = (table) => {
        const numCols = table.header.length;
        const numRows = table.body.length / numCols;
        const newList = [];
        for (let i = 0; i < numCols; i++) {
            const newItem = {};
            newItem.header = table.header[i];
            newItem.items = [];
            for (let j = 0; j < numRows; j++) {
                newItem.items.push(table.body[i + j * numCols]);
            }
            newList.push(newItem);
        }
        return newList;
    };

    const newTable = reorderTable(table);

    return (
        <PMTLTableMobileContainer>
            <div className='pmtlTableTitle'><span className='pmtlTableTitleText'>{table.title}</span></div>
            {
                newTable.map((tableItem, idx) => {
                    const key =  `pmtltableMobile_${idx}`;
                    return (
                        <>
                            <div className='pmtlTableHeader' key={key}>{tableItem.header}</div>
                            <div className='pmtlTableBodyList'>
                            {tableItem.items.map((bodyItem, itemidx) => {
                                const key =  `pmtltableMobileItem_${itemidx}`;
                                return (
                                    <div className='pmtlTableBodyListItem' key={key}>{bodyItem}</div>
                                )
                            })}
                            </div>
                        </>
                    )
                })
            }
        </PMTLTableMobileContainer>
    )
};

export default PMTLTableMobile;