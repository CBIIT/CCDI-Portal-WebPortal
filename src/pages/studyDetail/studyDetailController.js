import React from 'react';
import StudyDetailView from './studyDetailView';
import { useParams } from 'react-router-dom';

const studyDetailContainer = () => {
    const {studyId} = useParams();
  
    return (
      <StudyDetailView studyId={studyId} />
    );
  };

  export default studyDetailContainer;