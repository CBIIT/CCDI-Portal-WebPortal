import React from 'react';
// import {  useQuery } from '@apollo/client';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import { Typography } from '../../components/Wrappers/Wrappers';
// import { GET_STUDY_DETAIL_DATA_QUERY } from '../../bento/studyDetailData';
import StudyDetailView from './studyDetailView';
import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import env from '../../utils/env';

const data = {
  study_id: 'phs000463',
  study_name: 'Molecular Characterization Initiative',
  dbgap_accession: '',
  publications: ['123', '234', '345'],
  study_description: 'The National Cancer Institute (NCI) Childhood Cancer Data Initiative (CCDI) focuses on the critical need to collect, analyze, and share data to address the burden of cancer in children, adolescents, and young adults (AYAs). The Molecular Characterization Initiative (MCI) will further the CCDIs goals by providing access to better diagnostic tests for pediatric and AYA patients. The molecular characterizations of solid tumors, soft tissue sarcomas, and rare diseases are performed in a CLIA-certified setting as results may be used to screen for and/or confirm clinical trial eligibility, direct treatment, or otherwise contribute to the conduct of the trial. ',
  num_of_participants: 11111,
  num_of_samples: 22222,
  num_of_files: 33333,
}

const studyDetailContainer = () => {
  const {studyId} = useParams();
  // const { loading, error, data } = useQuery(GET_STUDY_DETAIL_DATA_QUERY, {
  //   variables: { "study_id": studyId },
  // });
 
  // if (loading) return <CircularProgress />;
  // if (error || !data || !data.studyDetails ) {
  //   return (
  //     <Typography variant="h5" color="error" size="sm">
  //       {error ? `An error has occurred in loading stats component: ${error}` : 'Recieved wrong data'}
  //     </Typography>
  //   );
  // }

  return (
    <StudyDetailView data={data} />
  );
};

export default studyDetailContainer;