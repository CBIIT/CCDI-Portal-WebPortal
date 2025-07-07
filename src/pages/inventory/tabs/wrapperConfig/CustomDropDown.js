import { onRowSeclect, TableContext } from '@bento-core/paginated-table';
import { onRowSelectHidden } from '@bento-core/paginated-table/dist/table/state/Actions';
import { KeyboardArrowDownOutlined } from '@material-ui/icons';
import React, { useContext, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { onAddParticipantsToCohort } from '../../../../components/CohortSelectorState/store/action';
import { CohortStateContext } from '../../../../components/CohortSelectorState/CohortStateContext';
import { useGlobal } from '../../../../components/Global/GlobalProvider';
import DeleteConfirmationModal from '../../cohortModal/components/deleteConfirmationModal';

const DropdownContainer = styled.div`
  position: relative;
  margin-top: 10px;
  display: inline-block;
  width: 200px;
  margin-left: 20px;
  margin-bottom: 10px;
  top: -6px;
`;

const DropdownHeader = styled.div`
  font-size: 12px;
  font-family: 'Poppins';
  color: white;
  min-width: 189px;
  max-height: 41px;
  min-height: 41px;
  max-width: 189px;
  border-radius: 5px 5px 0 0;
  border-radius: ${(props) => (props.isOpen ? '5px 5px 0 0' : '5px')};
  background:  ${(props) => (props.backgroundColor)};
  border: 1.25px solid ${(props) => (props.borderColor)};
  opacity: ${(props) => (props.isActive ? "1" : "0.4")}
  cursor: pointer;
  font-weight: 600;
  text-align: left;
  line-height: 1;
  display: flex;
  overflow: hidden;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-overflow: ellipsis;
  

`;

const Title = styled.div`
paddingLeft: 20px;
    align-self: center;
    justify-content: center;
    align-self: center;
    width: 70%;
    display: flex;
    font-size: 12px;
    overflow: hidden;
`


const Arrow = styled.span`
  transition: transform 0.3s;
  transform: ${(props) => (props.isOpen ? 'rotate(180deg)' : 'rotate(0)')};
   display: ${(props) => (props.isHidden ? ' none' : ' block)')};
`;

const DropdownList = styled.ul`
  position: absolute;
  min-width: 189px;
  max-width: 189px;
  left: 0;
  scrollbar-color: #003F74 #003F74;
  right: 0;
  background-color: #2A6E93;
  list-style: none;
  margin: 0;
  padding: 0;
  border-radius: 0 0 5px 5px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border:  1px #73A9C7 solid;
  z-index: 1;
  overflow-y: scroll;
  max-height: 200px;
`;

const DropdownItem = styled.li`
 
    font-family: Poppins;
    font-size: 14px;
    font-weight: 500;
    line-height: 13px;
    letter-spacing: 0.02em;
    text-align: left;
    cursor: pointer;
    padding: 4px;
    border-bottom: 1px solid #ccc;
    max-height: 27px;
    text-align: left;
    padding-left: 18px;
    border: 0px 1px 1px 1px;
    border-color: #73A9C7;
    background-color: #EFF2F6;
    color: #343434;
    &:nth-child(even){
        background-color: #CCD5E1; 
    }
  &:last-child {
    border-bottom: none;
  }
`;

export const CustomDropDown = ({ options, label, isHidden, backgroundColor, borderColor }) => {

  const [isOpen, setIsOpen] = useState(false);
  const tableContext = useContext(TableContext);
  const [isActive, setIsActive] = useState(false);
  const [showPopupMessage,setShowPopupMessage] = useState("");

  useEffect(() => {
    const { context } = tableContext;
    const {
      hiddenSelectedRows = [],
    } = context;
    setIsActive(hiddenSelectedRows.length > 0 && options.length > 0);
  }, [tableContext])

  const toggleDropdown = () => isActive && setIsOpen(!isOpen);

  const clearSelection = () => {
    const { context } = tableContext;
    const {
      dispatch
    } = context;

    dispatch(onRowSeclect([]));
    dispatch(onRowSelectHidden([]));

  }

  const { Notification } = useGlobal();

  const triggerNotification = (count) => {
    if (count > 1) {
      Notification.show(" " + count + ' Participants added ', 5000,);
    } else {
      Notification.show(" " + count + ' Participant added ', 5000,);
    }

  };
  
  const { state, dispatch } = useContext(CohortStateContext);

  // Checks if adding the selected participants to the cohort would exceed the 4000 participant limit
  const exceedLimitSelectedParticipant = (selectedCohort, hiddenSelectedRows) => {
    let existingParticipantCount = 0;
    let selectedRowsCount = 0;

    // Get the cohort object from state
    const cohort = state[selectedCohort];
    // Count existing participants in the cohort
    if (cohort && cohort.participants && Array.isArray(cohort.participants)) {
      existingParticipantCount = cohort.participants.length;
    }

    // Count the number of newly selected participants
    if (hiddenSelectedRows && Array.isArray(hiddenSelectedRows)) {
      selectedRowsCount = hiddenSelectedRows.length;
    }

    // Return true if the total would exceed 4000, otherwise false
    if ((existingParticipantCount + selectedRowsCount) > 4000) {
      return true;
    }

    return false;
  }

  // Handles the selection of a cohort from the dropdown
  const handleSelect = (selectedCohort) => {
   if (isActive) { // Only proceed if the dropdown is active (i.e., there are selected rows)
    const { context } = tableContext;
    const { hiddenSelectedRows = [] } = context;

    // Check if adding the selected participants would exceed the cohort limit
    if (exceedLimitSelectedParticipant(selectedCohort, hiddenSelectedRows)) {
      // Show Popup notification if the participant limit would be exceeded
      setShowPopupMessage("You are not allowed to add more than 4000 participants in a single cohort");
      return;
    }

    // If the limit is not exceeded, proceed with adding participants
    setIsOpen(false); // Close the dropdown
    clearSelection(); // Clear the current selection in the table

    // Dispatch action to add participants to the selected cohort
    dispatch(onAddParticipantsToCohort(
      selectedCohort,
      hiddenSelectedRows,
      (count) => triggerNotification(count) // Pass as a callback
    ));
   }
  };

  const dropDownListRef = useRef(null);

  function useClickOutside(ref, onClickOutside) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          onClickOutside();
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, onClickOutside]);
  }

  useClickOutside(dropDownListRef, () => setIsOpen(false));

  return (
    <DropdownContainer isHidden={isHidden}>
      <DropdownHeader isOpen={isOpen} isActive={isActive} backgroundColor={backgroundColor} borderColor={borderColor} onClick={toggleDropdown}>
        <Title> {label} </Title>
        <Arrow isOpen={isOpen} isHidden={isHidden}>
          <KeyboardArrowDownOutlined />

        </Arrow>

      </DropdownHeader>
      {isOpen && (
        <DropdownList ref={dropDownListRef}>
          {options.map((option, index) => {
            return (
              <DropdownItem key={index} onClick={() => { handleSelect(option) }}>{option}</DropdownItem>
            )
          })}
        </DropdownList>
      )}
      <DeleteConfirmationModal
        classes={""}
        open={showPopupMessage}
        setOpen={() => { setShowPopupMessage("")  }}
        handleDelete={() => { setShowPopupMessage("") }}
        deletionType={false}
        message={showPopupMessage}
      />
    </DropdownContainer>
  );
};
