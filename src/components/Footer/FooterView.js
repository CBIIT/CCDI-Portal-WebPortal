import React from 'react';
import { Footer } from 'bento-components';
import FooterData from '../../bento/globalFooterData';

const styles = {
  horizontalLine: 'horizontalLineStyles',
  footorVersiontext: 'customizedFootorVersiontext',
};

const PortalFooter = () => {
  return (
    <Footer classes={styles} data={FooterData} />
  )
};

export default PortalFooter;
