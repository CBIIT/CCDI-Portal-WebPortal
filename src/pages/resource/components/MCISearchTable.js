import React, { useState, useEffect } from 'react';
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
        display: flex;
        padding: 20px 0;
        border-top: 3px solid #42779A;
        border-bottom: 3px solid #42779A;
        justify-content: center;
    }

    .mciTableHeaderTitle {
        font-family: Open Sans;
        font-size: 17px;
        font-weight: 700;
        line-height: 23px;
        letter-spacing: -0.02em;
        color: #4D889E;
    }

    .searchboxContainer {
        width: 229px;
        height: 28px;
        border: 1.5px solid #4D889E;
        border-radius: 8px;
        margin-left: 10px;
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

const SearchInput = styled.input`
  margin-left: 10px;
  border: none;
  font-family: 'Open Sans';
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #000000;
  width: 200px;
  background: transparent;

  ::placeholder {
    font-family: Nunito;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    color: #646464;
  }

  :focus {
    outline: none;
  }
`;

const MCISearchTable = ( {table} ) => {
    const tableListAll = table.body.split(", ");
    const [inputValue, setInputValue] = useState('');
    const [tableList, setTableList] = useState(tableListAll);

    const handleTextInputChange = (event) => {
        const text = event.target.value;
        setInputValue(text);
    };

    useEffect(() => {
        const newTableList = tableList.filter((item) => item.includes(inputValue));
        setTableList(newTableList);
    }, [inputValue]);

    return (
        <MCISearchTableContainer>
            <div className='mciTableTitle'>{table.title}</div>
            <div className='mciTableHeader'>
                <div className='mciTableHeaderTitle'>Search</div>
                <div className='searchboxContainer'>
                    <SearchInput type="text" value={inputValue} placeholder='e.g. A1CF, CREB3L1, PIK3CA' onChange={handleTextInputChange} />
                </div>
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
