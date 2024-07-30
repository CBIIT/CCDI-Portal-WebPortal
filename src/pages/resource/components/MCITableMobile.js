import React from 'react';
import styled from 'styled-components';

const MCITableContainer = styled.div`
    margin: 40px 0;
    border: 1px solid #BDBDBD;

    .mciTableTitle {
        padding: 15px 10px;
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
    }

    .mciTableHeader {
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

    .mciTableHeaderListItem:last-child {
        border-right: 0;
    }

    .mciTableBodyListItem {
        padding: 15px 16.5px;
        font-family: Open Sans;
        font-size: 14px;
        font-weight: 400;
        line-height: 17px;
        letter-spacing: 0em;
        text-align: left;
        background: #F4F5F5;
    }

    .mciTableBodyList .mciTableBodyListItem:nth-child(2n+1){
        background: #FFFFFF;
    }
      
`;

const MCITableMobile = ( {table} ) => {

    const reorderTable = (table) => {
        const newList = [];
        for (let i = 0; i < table.body.length/3; i++) {
            const newItem = {};
            newItem.header = table.header[i];
            newItem.items = [table.body[i], table.body[i+3], table.body[i+6]];
            newList.push(newItem);
        }
        return newList
    };

    const newTable = reorderTable(table);

    return (
        <MCITableContainer>
            <div className='mciTableTitle'><span className='mciTableTitleText'>{table.title}</span></div>
            {
                newTable.map((tableItem, idx) => {
                    const key =  `mcitableMobile_${idx}`;
                    return (
                        <>
                            <div className='mciTableHeader' key={key}>{tableItem.header}</div>
                            <div className='mciTableBodyList'>
                            {tableItem.items.map((bodyItem, itemidx) => {
                                const key =  `mcitableMobileItem_${itemidx}`;
                                return (
                                    <div className='mciTableBodyListItem' key={key}>{bodyItem}</div>
                                )
                            })}
                            </div>
                        </>
                    )
                })
            }
        </MCITableContainer>
    )
};

export default MCITableMobile;