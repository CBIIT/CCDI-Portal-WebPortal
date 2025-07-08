import { onRowSeclect, TableContext } from '@bento-core/paginated-table';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobal } from '../../../../components/Global/GlobalProvider';
import { onCreateNewCohort } from '../../../../components/CohortSelectorState/store/action';
import { CohortStateContext } from '../../../../components/CohortSelectorState/CohortStateContext';
import { CohortModalContext } from '../../cohortModal/CohortModalContext';
import { onRowSelectHidden } from '@bento-core/paginated-table/dist/table/state/Actions';
import DeleteConfirmationModal from '../../cohortModal/components/deleteConfirmationModal';

const ButtonContainer = styled.div`
  position: relative;
  margin-top: 10px;
  display: inline-block;
  width: 200px;
  margin-left: 20px;
`;

const ButtonStyled = styled.button`
  font-size: 18px;
  font-family: 'Poppins';
  color: white;
  width: 189px;
  min-height: 41px;
  max-width: 189px;
  border-radius: 5px;
  border: 1.25px ${(props) => (props.borderColor)} solid;
  background: ${(props) => (props.backgroundColor)};
  cursor: pointer;
  font-weight: 600;
  text-align: center;
  line-height: 1;
  opacity: ${(props) => props.isActive ? "1" : "0.4"}
  display: flex;
  justify-content: center;
  align-items: center;
  text-overflow: ellipsis;

  
  &:hover {
    background-color:${(props) => (props.hoverColor)};
  }
  
  .title {
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 12px;
    
  }
`;

export const CustomButton = ({ label, backgroundColor, type, hoverColor, cohortsAvailable, borderColor }) => {

  const tableContext = useContext(TableContext);
  const { state, dispatch } = useContext(CohortStateContext);
  const { setShowCohortModal} = useContext(CohortModalContext);
  const { Notification } = useGlobal();
  const [isActive, setIsActive] = useState(false);
  const [showPopupMessage, setShowPopupMessage] = useState("");

  const triggerNotification = (count) => {
    if (count > 1) {
      Notification.show(" " + count + ' Participants added ', 5000,);
    } else {
      Notification.show(" " + count + ' Participant added ', 5000,);
    }

  };

  useEffect(() => {
    if (type === "VIEW") {
      setIsActive(cohortsAvailable);
    } else {
      const { context } = tableContext;
      const {
        hiddenSelectedRows = [],
      } = context;
      setIsActive(hiddenSelectedRows.length > 0);
    }

  }, [tableContext])

  const clearSelection = () => {
    const { context } = tableContext;
    const {
      dispatch
    } = context;

    dispatch(onRowSeclect([]));
    dispatch(onRowSelectHidden([]));
  }

  // Checks if the created cohorts exceed the 20 cohort limit
  const exceedLimitCreatedCohost = (hiddenCohortState) => {
    let cohortStateCount = 0;

    // Count the number of cohost
    if (hiddenCohortState && typeof hiddenCohortState === 'object') {
        cohortStateCount = Object.keys(hiddenCohortState).length;
    }

    // Return true if the cohort total would exceed 4, otherwise false
    if (cohortStateCount >=  20) {
        return true;
    }

    return false;
  }

  // Checks if the selected participants for the new cohort exceed the 4000 participant limit
  const exceedLimitSelectedParticipant = (hiddenSelectedRows) => {
    let selectedRowsCount = 0;

    // Count the number of selected participants
    if (hiddenSelectedRows && Array.isArray(hiddenSelectedRows)) {
      selectedRowsCount = hiddenSelectedRows.length;
    }

    // Return true if the total would exceed 4000, otherwise false
    if (selectedRowsCount > 4000) {
      return true;
    }

    return false;
  }

  const handleClick = () => {
    if (isActive) {
      if (type === "VIEW") {
        setShowCohortModal(true);
      } else {
        const { context } = tableContext;
        const {
          hiddenSelectedRows = []
        } = context;

        // Check if the created cohorts exceed the 20 cohort limit
        if (exceedLimitCreatedCohost(state)) {
          // Show Popup notification if the cohort limit would be exceeded
          setShowPopupMessage("You are not allowed to create more that 20 cohorts");
          return;
        }

        // Check if the selected participants exceed the cohort limit
        if (exceedLimitSelectedParticipant(hiddenSelectedRows)) {
          // Show Popup notification if the participant limit would be exceeded
          setShowPopupMessage("You are not allowed to create a new cohort with more than 4000 participants");
          return;
        }

        clearSelection();
        dispatch(onCreateNewCohort(
          "",
          "",
          hiddenSelectedRows,
          (count) => { 
            triggerNotification(count);
            setShowCohortModal(true);
          },
          (error) => alert(error)
        ));
      }

    }
  };

  return (
    <ButtonContainer>
      <ButtonStyled borderColor={borderColor} isActive={isActive} backgroundColor={backgroundColor} onClick={handleClick} hoverColor={hoverColor}>
        <span className="title">{label}</span>
      </ButtonStyled>
      {/* Popup modal to show participant limit exceeded message */}
      <DeleteConfirmationModal
        classes={""}
        open={showPopupMessage}
        setOpen={() => { setShowPopupMessage("")  }}
        handleDelete={() => { setShowPopupMessage("") }}
        deletionType={false}
        message={showPopupMessage}
      />
    </ButtonContainer>
  );
};
