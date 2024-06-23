import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import clearIcon from '../../../assets/resources/ClearAll_Inactive.svg';
import clearIconHover from '../../../assets/resources/ClearAll_Hover.svg';
import clearIconActive from '../../../assets/resources/ClearAll_Active.svg';
import searchIcon from '../../../assets/resources/Search_Icon.svg';

const MCISearchTableContainer = styled.div`
    margin: 40px auto;
    border: 1px solid #BDBDBD;
    max-width: 836px;

    .mciTableTitle {
        font-family: Poppins;
        font-size: 19px;
        font-weight: 400;
        line-height: 21px;
        letter-spacing: 0.02em;
        text-align: center;
        background: #EEF4F8;
    }

    .mciTableTitleText {
        max-width: 434px;
        margin: 0 auto;
        padding: 15px 10px;
        background: #EEF4F8;
    }

    .mciTableHeader {
        padding-bottom: 12px;
        border-top: 3px solid #42779A;
        border-bottom: 3px solid #42779A;
        justify-content: center;
    }

    .mciTableHeaderTitle {
        font-family: Open Sans;
        font-size: 17px;
        font-weight: 700;
        line-height: 30px;
        letter-spacing: -0.02em;
        color: #4D889E;
        text-align: center;
    }

    .searchBox {
        display: flex;
    }

    .searchboxContainer {
        width: calc(100% - 60px);
        height: 30px;
        border: 1.5px solid #4D889E;
        border-radius: 8px;
        margin: 0 10px;
        padding-right: 5px;
        background: url(${searchIcon}) right 5px center no-repeat;
    }

    .clearIconContainer {
        height: 30px;
        width: 32px;
        background-image: url(${clearIcon});
    }

    .active {
        background-image: url(${clearIconActive});
    }

    .clearIconContainer:hover {
        background-image: url(${clearIconHover});
        cursor: pointer;
    }

    .mciTableBodyList {
        height: 200px;
        overflow: scroll;
        overflow-x: hidden;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(4, 1fr);
    }

    .mciTableBodyList::-webkit-scrollbar {
        width: 16px;
        padding: 3px;
    }

    .mciTableBodyList::-webkit-scrollbar-thumb {
        border: 4px solid transparent;
        background: #4D889E;
        border-radius: 20px;
        background-clip: content-box;
    }

    .mciTableBodyListItem {
        font-family: Open Sans;
        font-size: 14px;
        font-weight: 400;
        line-height: 50px;
        padding-left: 10px;
        border-right: 0.5px solid #000000;
        border-bottom: 0.5px solid #000000;
        background: #F4F5F5;
    }

    .mciTableBodyList .mciTableBodyListItem:nth-child(8n+1),
    .mciTableBodyList .mciTableBodyListItem:nth-child(8n+2),
    .mciTableBodyList .mciTableBodyListItem:nth-child(8n+3),
    .mciTableBodyList .mciTableBodyListItem:nth-child(8n+4){
        background: #FFFFFF;
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
  height: 26px;
  width: calc(100% - 23px);
  background: transparent;

  ::placeholder {
    font-family: Nunito;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    color: #646464;
    text-align: center;
  }

  :focus {
    outline: none;
  }
`;

const MCISearchTableMobile = ( {table} ) => {
    const tableListAll = table.body.split(", ");
    const [inputValue, setInputValue] = useState('');
    const [tableList, setTableList] = useState(tableListAll);

    const handleTextInputChange = (event) => {
        const text = event.target.value;
        setInputValue(text);
    };

    useEffect(() => {
        let newTableList = [];
        const keyList = inputValue.toUpperCase().split(',').filter((item) => item.trim() !== '');
        if (keyList.length === 0) {
            newTableList = tableListAll;
        } else {
            for (let i = 0; i < tableListAll.length; i++) {
                const tableItem = tableListAll[i];
                for (let j = 0; j < keyList.length; j++) {
                    const key = keyList[j].trim();
                    if (key === '' || tableItem.toUpperCase().includes(key)) {
                        newTableList.push(tableItem);
                        break;
                    }
                }
            }
        }
        setTableList(newTableList);
    }, [inputValue]);

    return (
        <MCISearchTableContainer>
            <div className='mciTableTitle'><div className='mciTableTitleText'>{table.title}</div></div>
            <div className='mciTableHeader'>
                <div className='mciTableHeaderTitle'>Search</div>
                <div className='searchBox'>
                    <div className='searchboxContainer'>
                        <SearchInput type="text" value={inputValue} placeholder='e.g. A1CF, CREB3L1, PIK3CA' onChange={handleTextInputChange} />
                    </div>
                    <div className={inputValue !== '' ? 'clearIconContainer active' : 'clearIconContainer'} onClick={() => setInputValue("")} />
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

export default MCISearchTableMobile;
