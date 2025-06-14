import React, { useRef, useEffect} from 'react';
import styled from 'styled-components';
import {
  useLocation, useNavigate
} from "react-router-dom";
import {
  withStyles, Box,
} from '@material-ui/core';

import {
  getPublicSearchPageResults,
} from './store/sitesearchReducer';

import PublicTabView from './components/tabs/publicTabView';
import searchImg from '../../assets/search/Search_Img.png';
import searchIcon from '../../assets/header/Search_Small_Icon.svg';

const SearchViewContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;

  .backgroundImg {
    position: absolute;
    top: -80px;
    right: 0;
    height: 356px;
    width: 604px;
  }

  @media (min-width: 1420px) {
    width: 1420px;
    margin: 0 auto;
  }

  @media (max-width: 1023px) {
    .backgroundImg {
      display: none;
    }
  }
`;

const SearchbarContainer = styled.div`
  position: relative;
  width: 889px;
  height: 179px;
  margin: 80px 0 42px 8%;
  background: #00838F;
  border-radius: 0px 20px;
  padding: 32px 0 38px 0;

  .searchResultTitle {
    font-family: poppins;
    font-weight: 600;
    font-size: 50px;
    line-height: 45px;
    letter-spacing: 1px;
    color: #FFFFFF;
    margin-bottom: 15px;
    margin-left: 69px;
  }

  @media (max-width: 1023px) {
    width: auto;
    margin: 0 15px 35px 15px;
    border-radius: 0 0 20px 20px;

    .searchResultTitle {
      font-size: 35px;
      line-height: 30px;
      text-align: center;
      margin-left: 0;
    }
  }
`;

const SearchBar = styled.div`
  display: flex;
  margin-left: 69px;
  width: 662px;
  height: 53px;
  // border: 2px solid #616161;
  // border-radius: 8px;
  background: white;
  border-radius: 4px;

  .searchButton {
    font-family: 'Open Sans';
    font-weight: 600;
    font-size: 16px;
    line-height: 16px;
    padding: 16px 20px;
    background: #05555C;
    color: #FFFFFF;
    border: 1px solid #FFFFFF;
    border-radius: 0px 4px 4px 0px;
  }

  .searchButton:hover {
    cursor: pointer;
  }

  .deleteIcon {
    height: 18px;
    min-width: 15px;
    padding-top: 19px;
    margin-right: 13px;
  }

  .deleteIconImg:hover {
    cursor: pointer;
  }

  .searchButtonIcon {
    display: none;
  }

  @media (max-width: 1023px) {
    margin: 0 auto;
    maxWidth: 662px;
  }

  @media (max-width: 767px) {
    .searchButtonText {
      display: none;
    }
    .searchButtonIcon {
      display: block;
    }
  }

  @media (max-width: 732px) {
    margin: 0 15px;
    width: auto;
  }
`;

const SearchInput = styled.input`
  margin: 0 20px;
  border: none;
  font-family: 'Open Sans';
  font-weight: 400;
  font-size: 25px;
  line-height: 53px;
  color: #000000;
  width: 650px;
  min-width: 0;
  background: transparent;

  ::placeholder {
    color: #000000;
  }

  :focus {
    outline: none;
  }
`;

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

function searchComponent({
  classes,
}) {
  const navigate = useNavigate();
  const query = useQuery();
  const searchparam = query.get("keyword") ? query.get("keyword").trim() : "";
  const [open] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [searchText, setSearchText] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [deleteIconShow, setDeleteIconShow] = React.useState('none');
  // const [isScreenDestop, setIsScreenDestop] = React.useState(true);

  const getAuthorizedResultQuery = (strValue) => {
    return getPublicSearchPageResults(strValue);
  };

  async function onChange(newValue = []) {
    const searchResp = await getAuthorizedResultQuery(newValue);
    setSearchResults(searchResp);
    setSearchText(newValue);
    navigate(`/sitesearch?keyword=${newValue}`);
  }

  async function getAutoCompleteRes(newValue = []) {
    setInputValue(newValue);
  }

  const handleTextInputChange = (event) => {
    const text = event.target.value;
    setInputValue(text);
  };

  const handleClear = () => {
    setInputValue("");
    setInputFocus();
  };

  const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}
    return [ htmlElRef, setFocus ] 
  };

  const [inputRef, setInputFocus] = useFocus();

  async function handleKeyPress(event) {
    if (event.key === "Enter") {
    const searchResp = await getAuthorizedResultQuery(inputValue);
    setSearchResults(searchResp);
    setSearchText(inputValue);
    navigate(`/sitesearch?keyword=${inputValue}`);
    }
  };

  // const resizeHandler = () => {
  //   if (window.innerWidth < 1024) {
  //     setIsScreenDestop(false);
  //   } else {
  //     setIsScreenDestop(true);
  //   }
  // }

  // useEffect(() => {
  //   window.addEventListener('resize', resizeHandler);
  //   resizeHandler();
  //   return () => window.removeEventListener('resize', resizeHandler);
  // }, []);

  useEffect(() => {
    getAutoCompleteRes(searchparam);
    onChange(searchparam);
  }, [open]);

  return (
    <SearchViewContainer>
      <img className='backgroundImg' src={searchImg} alt="" />
      <SearchbarContainer>
      <label htmlFor='global_search_bar'>
        <div className='searchResultTitle'>Search Results</div>
        <SearchBar onMouseOver={() => setDeleteIconShow('block')} onMouseOut={() => setDeleteIconShow('none')}>
          <SearchInput id='global_search_bar' ref={inputRef} type="text" value={inputValue} onChange={handleTextInputChange} onKeyPress={handleKeyPress} />
          <div className='deleteIcon' onClick={handleClear} >
              <img className="deleteIconImg" style={{display:deleteIconShow}} src='https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/globalSearchDelete.svg' alt='clear icon' />
          </div>
          <div className='searchButton' onClick={() => onChange(inputValue)}>
            <div className='searchButtonText'>Search</div>
            <img className='searchButtonIcon' src={searchIcon} alt="searchIcon" />
          </div>
        </SearchBar>
      </label>
      </SearchbarContainer>
      <div className={classes.bodyContainer}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <PublicTabView
            options={{ searchResults }}
            classes={classes}
            searchText={searchText}
            // isDesktop={isScreenDestop}
          />
        </Box>
      </div>
    </SearchViewContainer>
  );
}

const styles = () => ({
  allText: {
    marginLeft: '8px',
  },
  subjectTab: {
    color: '#142D64',
  },
  indicator: {
    backgroundColor: '#142D64',
  },
  tabContainter: {
    display: 'flex',
    maxWidth: '840px',
    margin: '0 auto',
  },
  sampleTab: { color: '#142D64' },
  fileTab: { color: '#142D64' },
  programTab: { color: '#142D64' },
  studyTab: { color: '#142D64' },
  dataTab: { color: '#142D64' },
  aboutTab: { color: '#142D64' },
  allTab: { color: '#142D64' },
  searchText: {
    color: '#1479D3',
    fontFamily: 'Lato',
    fontSize: '25px',
  },
  buttonRoot: {
    minWidth: '100px',
    padding: '6px, 28px',
    textTransform: 'none',
  },
  notchedOutline: {

  },
  input: {
    borderRadius: '8px',
    borderColor: '#616161',
    color: '#747474',
    fontFamily: 'Lato',
    fontSize: '25px',

  },
  heroArea: {
    width: '100%',
    height: '167px',
    background: '#D9E8F8',
    paddingTop: '59px;'
  },
  autocomplete: {
    margin: '0 auto',
    paddingTop: '57px',
  },
  chipSection: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: '10px',
    },
  },
  button: {
    borderRadius: '30px',
    width: '100px',
    lineHeight: '37px',
    fontSize: '16px',
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    color: '#000',
    backgroundColor: '#fff',
    marginTop: '32px',
    marginBottom: '32px',
    marginRight: '24px',
    borderWidth: '1px',
    borderColor: 'black',
  },
  bodyContainer: {
    color: '#000000',
    fontSize: '15px',
    lineHeight: '22px',
  },
  width1100: {
    maxWidth: '1100px',
    margin: '0px auto 0px auto',
  },
  searchItem: {
    minHeight: '100px',
    padding: '16px',
  },

  backdrop: {
    // position: 'absolute',
    zIndex: 99999,
    background: 'rgba(0, 0, 0, 0.1)',
  },

  filterIcon: {
    height: '0.86rem',
    margin: '0px 16px 0px 6px',
    display: 'inline-flex',
    verticalAlign: 'middle',
  },
  inputRoot: {
    '& .MuiOutlinedInput-root': {
      background: '#fff',
      '& fieldset': {
        border: '2px solid #747474',
      },
      '&:hover fieldset': {
        border: '2px solid #747474',
      },
      '&.Mui-focused fieldset': {
        border: '2px solid #747474',
      },
    },
  },

  root: {
    '& .MuiAutocomplete-listbox': {
      borderRadius: '8px',
      fontFamily: 'Lato',
      fontSize: '18px',
      color: '#142D64',
      fontWeight: 500,
      border: '2px solid #0088FF',
      padding: '0px',
      background: '#fff',
      '& li': {
        // list item specific styling
        border: '1px solid #D2D2D2',
      },
      '& :hover': {
        color: 'white',
        backgroundColor: '#0088FF',
      },
    },
  },
  searchIcon: {
    height: '22px',
    margin: '0px 6px 0px 6px',
  },
  searchIconSpan: {
    cursor: 'pointer',
    zIndex: 40,
  },
  clearIcon: {
    height: '18px',
    margin: '-8px 4px 0px 19px',
  },
});

export default withStyles(styles)(searchComponent);
