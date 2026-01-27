import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import headerImg from '../../assets/resources/Studies_Header.png';
import { table } from '../../bento/studiesData';
import { TableView } from '@bento-core/paginated-table';
import { themeConfig } from './tableConfig/Theme';
import { configColumn } from './tableConfig/Column.js';
import studyIcon from '../../assets/icons/Study_Icon.svg';
import breadcrumbIcon from '../../assets/icons/Breadcrumb_Icon.svg';
import { useApolloClient } from '@apollo/client';
import { GET_NUMBER_OF_STUDIES } from '../../bento/studiesData';

const StudiesContainer = styled.div`
  .breadcrumb {
    font-family: Public Sans;
    font-weight: 400;
    font-size: 16px;
    line-height: 162%;
    padding-left: 30px;
    // margin-left: 50px;
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
    padding: 150px 0 0 88px;
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
    padding: 13px 0 13px 88px;
  }

  .resourceBody {
    margin-left: 45px;
    margin-right: 45px;
    padding-top: 45px;
    padding-bottom: 45px;
  }

  .studyIcon{
    margin-left: 30px;
  }

  @media (min-width: 1420px) {
    .breadcrumb {
        width: 1420px;
        margin: 0 auto;
    }
  }
`;

const StudiesView = () => {

  const client = useApolloClient();

  const [studies, setNumStudies] = useState(0);
  const [studiesData, setStudiesData] = useState([]);
  const [loading, setLoading] = useState(true);
  
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
    rowsPerPageOptions: [50, 100],
    rowsPerPage: 50,
    page: 0,
  });

  async function fetchAllStudies() {
    try {
      setLoading(true);
      const [studiesResult, countResult] = await Promise.all([
        client.query({
          query: table.api,
          variables: {
            first: 10000, // Fetch all studies
            offset: 0,
            order_by: table.defaultSortField,
            sort_direction: table.defaultSortDirection,
          },
        }),
        client.query({
          query: GET_NUMBER_OF_STUDIES,
          variables: {},
        })
      ]);
      
      setStudiesData(studiesResult.data[table.paginationAPIField] || []);
      setNumStudies(countResult.data.numberOfStudies);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching studies:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllStudies();
  }, [])

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
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>Loading studies...</div>
        ) : (
          <TableView
            initState={initTblState}
            themeConfig={themeConfig}
            server={false}
            tblRows={studiesData}
            totalRowCount={studies}
          />
        )}
      </div>
    </StudiesContainer>
  );
}

export default StudiesView;