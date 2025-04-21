import React from 'react';
import styled from 'styled-components';
import headerImg from '../../assets/resources/Studies_Header.png';
import { table } from '../../bento/studiesData';
import { TableView } from '@bento-core/paginated-table';
import { themeConfig } from './tableConfig/Theme';
import { configColumn } from './tableConfig/Column.js';
import studyIcon from '../../assets/icons/Study_Icon.svg';
import breadcrumbIcon from '../../assets/icons/Breadcrumb_Icon.svg';

const StudiesContainer = styled.div`
  .breadcrumb {
    font-family: Public Sans;
    font-weight: 400;
    font-size: 16px;
    line-height: 162%;
    margin-left: 50px;
    padding-top: 8px;
    padding-bottom: 8px;
  }
  .breadcrumbIcon {
    position: relative;
    top: 4px;
  }
  .resourceHeader {
    width: 100%;
    background: #e6ebee;
  }

  .resourceHeaderBackground {
    width: 100%;
    height: 214px;
    background-image: url(${headerImg});
    background-repeat:no-repeat;
    background-position:center;
    background-size: cover;
  }

  .resourceHeaderText {
    // width: 1420px;
    margin: 0 auto;
    padding: 150px 0 0 75px;
    color: #19676D;
    font-family: Poppins;
    font-size: 40px;
    font-weight: 400;
  }

  .resourceTitleContainer {
    background: #0E546E;
  }

  .resourceTitle {
    // width: 1420px;
    margin: 0 auto;
    display: flex;
    line-height: 38px;
    background: #0E546E;
    font-family: Poppins;
    font-weight: 600;
    color: #ffffff;
    font-size: 35px;
    padding: 15px 0 15px 75px;
  }
  .resourceBody {
    margin-left: 50px;
    margin-right: 50px;
  }

  .studyIcon{
    margin-left: 30px;
  }
`;

const StudiesView = () => {

  //const [data, setData] = useState([])
  const initTblState = (initialState) => ({
    ...initialState,
    title: 'Studies Table',
    query: table.api,
    paginationAPIField: table.paginationAPIField,
    dataKey: table.dataKey,
    columns: configColumn(table.columns),
    sortBy: table.defaultSortField,
    sortOrder: table.defaultSortDirection,
    extendedViewConfig: table.extendedViewConfig,
    selectedRows: [],
    rowsPerPage: 10,
    page: 0,
  });
  return (
    <StudiesContainer>
      <div className='breadcrumb'><a href='/'>Home</a>
        <img src={breadcrumbIcon} alt="breadcrumb icon" className='breadcrumbIcon'/>
      Studies
      </div>
      <div className='resourceHeader'>
        <div className='resourceHeaderBackground'>
          <div className='resourceHeaderText'>CCDI Hub</div>
        </div>
      </div>
      <div className='resourceTitleContainer'>
        <div className='resourceTitle'>Studies<img src={studyIcon} alt="study icon" className='studyIcon'/></div>
      </div>
      <div className='resourceBody'>
        <TableView
          initState={initTblState}
          themeConfig={themeConfig}
          queryVariables={{}}
        />
      </div>
    </StudiesContainer>
  );
}

export default StudiesView;