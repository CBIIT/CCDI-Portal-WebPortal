import React from 'react';
import styled from 'styled-components';
import DonutChart from '../../../components/common/DonutChart';

const MCITableContainer = styled.div`
margin: 20px 74px;
border: 1px solid #BDBDBD;

.mciTableTitle {
    padding: 15px 250px;
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



.headerText {
    position: relative;
    float: left;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.mciTableBody{
    height: 348px;  
    display: flex;
}

.mciTableDonut {
    width: 33.33%
}

.mciTableBodyList {
    width: 66.66%
    overflow: scroll;
    overflow-x: hidden;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
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
    text-align: center;
    background: #F4F5F5;
    border-left: 1px solid #42779A;
}

.donutContainer {
    display: flex;
}

.donutTitleContainer {
    width: 100%;
    font-family: Poppins;
    font-size: 19px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0.02em;
    text-align: center;

    h4 {
        width: 400px;
        margin: 120px 0 0 150px;
    }
}


.mciTableBodyList .mciTableBodyListItem:nth-child(4n+1),
.mciTableBodyList .mciTableBodyListItem:nth-child(4n+2)
{
    background: #FFFFFF;
}
`;

const MCIDiseaseTable = ({ table, donut }) => {
    return (
        <MCITableContainer>
            <div className='mciTableTitle'>{table.title}</div>
            <div className='mciTableHeader'>
                <div className='mciTableHeaderList'>
                    {table.header.map((headerItem, idx) => {
                        const key = `mcitable_${idx}`;
                        return (
                            <div className='mciTableHeaderListItem' key={key}>{headerItem}</div>
                        )
                    })}
                </div>
            </div>
            <div className='mciTableBody'>
                <div className='mciTableDonut'>
                    <DonutChart
                        data={donut.data}
                        innerRadiusP={65}
                        outerRadiusP={115}
                        paddingSpace={donut.length === 1 ? 0 : 0.5}
                        textColor="black"
                    />
                </div>
                <div className='mciTableBodyList'>

                    {
                        table.body.map((bodyItem, idx) => {
                            const key = `mcitable_${idx}`;
                            return (
                                <>

                                    <div className='mciTableBodyListItem' key={key}>{bodyItem[0]}</div>
                                    <div className='mciTableBodyListItem' key={key}>{bodyItem[1]}</div>
                                </>
                            )
                        })
                    }
                </div>
            </div>

        </MCITableContainer>
    )
};

export default MCIDiseaseTable;