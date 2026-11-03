import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import env from '../../utils/env';

function c3dcBaseUrl() {
  return String(env.REACT_APP_C3DC || '').replace(/\/$/, '');
}

/**
 * Send a deprecated Hub path to C3DC.
 * Pass `to` when the C3DC path differs from the current path.
 */
const C3dcRedirect = ({ to }) => {
  const location = useLocation();

  useEffect(() => {
    const path = to || location.pathname;
    const url = `${c3dcBaseUrl()}${path}${location.search}${location.hash}`;
    window.location.replace(url);
  }, [to, location.pathname, location.search, location.hash]);

  return null;
};

export default C3dcRedirect;
