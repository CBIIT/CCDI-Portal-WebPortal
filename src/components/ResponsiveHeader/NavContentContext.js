import React, {
  createContext, useContext, useEffect, useState, useMemo,
} from 'react';
import axios from 'axios';
import env from '../../utils/env';
import {
  navMobileList as defaultNavMobileList,
  navbarSublists as defaultNavbarSublists,
} from '../../bento/globalHeaderData';
import parseNavMarkdown from '../../bento/parseNavMarkdown';

const NAV_URL = `${env.REACT_APP_STATIC_CONTENT_URL}/navData.md`;

const NavContentContext = createContext({
  navMobileList: defaultNavMobileList,
  navbarSublists: defaultNavbarSublists,
});

export function NavContentProvider({ children }) {
  const [navMobileList, setNavMobileList] = useState(defaultNavMobileList);
  const [navbarSublists, setNavbarSublists] = useState(defaultNavbarSublists);

  useEffect(() => {
    let cancelled = false;
    const fetchNav = async () => {
      try {
        const fileUrl = `${NAV_URL}?ts=${new Date().getTime()}`;
        const result = await axios.get(fileUrl);
        const parsed = parseNavMarkdown(result.data);
        if (!cancelled && parsed) {
          // Preserve cart item from defaults when remote omits it.
          const hasCart = parsed.navMobileList.some((item) => item.className === 'cart');
          const mergedPrimary = hasCart
            ? parsed.navMobileList
            : [
              ...parsed.navMobileList,
              ...defaultNavMobileList.filter((item) => item.className === 'cart'),
            ];
          setNavMobileList(mergedPrimary);
          setNavbarSublists({
            Resources: parsed.navbarSublists.Resources.length
              ? parsed.navbarSublists.Resources
              : defaultNavbarSublists.Resources,
            About: parsed.navbarSublists.About.length
              ? parsed.navbarSublists.About
              : defaultNavbarSublists.About,
          });
        }
      } catch (_error) {
        /* keep JS defaults */
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
