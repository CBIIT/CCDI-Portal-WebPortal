import React, {
  createContext, useContext, useEffect, useState, useMemo,
} from 'react';
import axios from 'axios';
import env from '../../utils/env';
import parseNavMarkdown from '../../bento/parseNavMarkdown';

const NAV_URL = `${env.REACT_APP_STATIC_CONTENT_URL}/navData.md`;
const PARTICIPANT_INDEX_URL = 'https://ccdi.cancer.gov/ccdi-participant-index';

function withParticipantIndexLink(items) {
  if (!Array.isArray(items)) {
    return items;
  }
  return items.map((item) => {
    if (!item || typeof item !== 'object') {
      return item;
    }
    const next = { ...item };
    const label = String(next.name || '');
    const link = String(next.link || '');
    if (/participant index/i.test(label) || /ccdi-participant-index/i.test(link)) {
      next.link = PARTICIPANT_INDEX_URL;
    }
    if (Array.isArray(next.children)) {
      next.children = withParticipantIndexLink(next.children);
    }
    return next;
  });
}

const emptyNav = {
  navMobileList: [],
  navbarSublists: {
    Resources: [],
    About: [],
  },
};

const NavContentContext = createContext(emptyNav);

export function NavContentProvider({ children }) {
  const [navMobileList, setNavMobileList] = useState(emptyNav.navMobileList);
  const [navbarSublists, setNavbarSublists] = useState(emptyNav.navbarSublists);

  useEffect(() => {
    let cancelled = false;
    const fetchNav = async () => {
      try {
        const fileUrl = `${NAV_URL}?ts=${new Date().getTime()}`;
        const result = await axios.get(fileUrl);
        const parsed = parseNavMarkdown(result.data);
        if (cancelled) {
          return;
        }
        if (parsed) {
          setNavMobileList(withParticipantIndexLink(parsed.navMobileList));
          setNavbarSublists({
            Resources: withParticipantIndexLink(parsed.navbarSublists.Resources || []),
            About: withParticipantIndexLink(parsed.navbarSublists.About || []),
          });
        } else {
          setNavMobileList(emptyNav.navMobileList);
          setNavbarSublists(emptyNav.navbarSublists);
        }
      } catch (_error) {
        if (!cancelled) {
          setNavMobileList(emptyNav.navMobileList);
          setNavbarSublists(emptyNav.navbarSublists);
        }
      }
    };
    fetchNav();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => ({
    navMobileList,
    navbarSublists,
  }), [navMobileList, navbarSublists]);

  return (
    <NavContentContext.Provider value={value}>
      {children}
    </NavContentContext.Provider>
  );
}

export function useNavContent() {
  return useContext(NavContentContext);
}

export default NavContentContext;
