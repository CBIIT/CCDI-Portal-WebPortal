import React, { useState, useEffect } from 'react';
import axios from 'axios';
import env from '../../../utils/env';
import parseFaqMarkdown from './parseFaqMarkdown';
import FaqView from './FaqView';

const FAQ_MD_URL = `${env.REACT_APP_STATIC_CONTENT_URL}/faqData.md`;

const FaqController = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let resultData = null;
      try {
        const fileUrl = `${FAQ_MD_URL}?ts=${new Date().getTime()}`;
        const result = await axios.get(fileUrl);
        resultData = parseFaqMarkdown(result.data);
      } catch (_error) {
        resultData = null;
      }
      setData(resultData);
    };
    fetchData();
  }, []);

  if (data && Array.isArray(data.faqs)) {
    return <FaqView data={data} />;
  }
  return <div />;
};

export default FaqController;
