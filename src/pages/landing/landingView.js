import React from 'react';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LANDING_PAGE_DATA_QUERY } from '../../bento/landingPageData';

const LandingView = () => {
  const { loading, error, data } = useQuery(GET_LANDING_PAGE_DATA_QUERY);

  useEffect(() => {
    console.log(data);
  },[data]);
  
  return (
    <div style={{marginTop: "140px", height: "250px", fontSize: "100px"}}>Hello World!</div>
  )
};

export default LandingView;
