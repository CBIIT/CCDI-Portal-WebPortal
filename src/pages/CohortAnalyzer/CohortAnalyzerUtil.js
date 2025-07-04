import React from "react";
import search_icon from '../../assets/icons/Search_Icon.svg';

export const triggerNotification = (count, Notification) => {
    if (count > 1) {
        Notification.show(" " + count + ' Participants added ', 5000,);
    } else {
        Notification.show(" " + count + ' Participant added ', 5000,);
    }

};



export const filterAllParticipantWithDiagnosisName=(generalInfo,allParticipants)=>{
    let finalIds = [];
    Object.keys(generalInfo).forEach((section) => {
        allParticipants.forEach((part) => {
            if(generalInfo[section].includes(part.pid)){
                finalIds = [...finalIds,part]
            }
        })
    });
    return finalIds;
}

export const filterAllParticipantWithTreatmentType=(generalInfo,allParticipants)=>{
    let finalIds = [];
    
    Object.keys(generalInfo).forEach((section) => {
        allParticipants.forEach((part) => {
            if(generalInfo[section].includes(part.treatment_type)){
                finalIds = [...finalIds,part]
            }
        })
    });
    return finalIds;
}


export const getIdsFromCohort = (data,selectedCohorts) => {
    const allParticipantPKs = [];

    for (const cohortKey in data) {
        if(selectedCohorts.includes(cohortKey)){
        if (data[cohortKey].participants) {
            const participantPKs = data[cohortKey].participants.map(participant => participant.id);
            allParticipantPKs.push(...participantPKs);
        }
    }
    }

    return allParticipantPKs;
}



export const getAllIds = (generalInfo) => {
    let finalIds = [];
    Object.keys(generalInfo).forEach((section) => {
        
            finalIds = [...finalIds, ...generalInfo[section]]
        
    })
    return finalIds;
}
 
export const addCohortColumn = (rowD, state, selectedCohorts) => {
    let finalRowData = rowD.map((row) => {
        // Get the cohort name for the current participants
        let cohortName = getCohortName(row.id ? row.id : row.pid, state, selectedCohorts);
        // Return a new object with the added cohort property
        return {
            ...row,
            cohort: cohortName
        };
    });
    return finalRowData;
}

const getCohortName = (pk, state, selectedCohorts) => {
    const cohortNames = selectedCohorts
        .filter(cohortKey => 
            state[cohortKey].participants.some(participant => participant.id === pk)
        ).map(cohortKey => state[cohortKey].cohortName);
    let finalResponse = [];
    const baseColorArray = ["#F0D571", "#A4E9CB", "#A3CCE8"];
    selectedCohorts.forEach((cohort, index) => {
        let indexOfHashKey = cohortNames.map(name => name.toLowerCase()).indexOf(cohort.toLowerCase());
        if (indexOfHashKey >= 0) {
            finalResponse.push({ color: baseColorArray[index], "cohort": cohortNames[indexOfHashKey] })
        }
    })
    return finalResponse;
}

export const resetSelection = (setSelectedCohorts,setNodeIndex) => {
    setSelectedCohorts([]);
    setNodeIndex(0);
}

export const sortBy = (type, cohortList, setCohortList, state) => {
    let listOfCohortsLocal = cohortList;
    if (type === "alphabet") {
        listOfCohortsLocal.sort((a, b) =>
            a.localeCompare(b))
        setCohortList(listOfCohortsLocal);
    } else if (type === "count") {
        listOfCohortsLocal.sort((a, b) =>
            state[a].participants.length - state[b].participants.length)
        setCohortList(listOfCohortsLocal);
    }

    return listOfCohortsLocal;
}

export const sortByReturn = (type, cohortList, state, selected) => {
    let listOfCohortsLocal = cohortList;
    if (type === "alphabet") {
        listOfCohortsLocal.sort((a, b) =>
            a.localeCompare(b))
    } else {
        listOfCohortsLocal.sort((a, b) =>
            state[a].participants.length - state[b].participants.length)

    }

    let reArranged = [];
    listOfCohortsLocal.forEach((cohort) => {
        if (!selected.includes(cohort)) {
            reArranged.push(cohort);
        }
    });
    reArranged = [...selected, ...reArranged];

    return reArranged;
}

const deleteCohort = (cohortId, dispatch, onDeleteSingleCohort) => {
    dispatch(onDeleteSingleCohort(cohortId, () => { }, () => { }));
}

const deleteAllCohort = (dispatch, onDeleteAllCohort) => {
    dispatch(onDeleteAllCohort(() => { }, () => { }));
}

export const handleDelete = (cohortId,
    setCohortList,
    setSelectedCohorts,
    dispatch, onDeleteSingleCohort,
    onDeleteAllCohort,
    setGeneralInfo,
    setRowData) => {
    if (cohortId) {
        setCohortList(prevCohortList => prevCohortList.filter(cohort => cohort !== cohortId))
        setSelectedCohorts(prevSelectedCohortList => prevSelectedCohortList.filter(cohort => cohort !== cohortId));
        deleteCohort(cohortId, dispatch, onDeleteSingleCohort);
    } else {
        setCohortList([]);
        setSelectedCohorts([]);
        setGeneralInfo({});
        setRowData([]);
        deleteAllCohort(dispatch, onDeleteAllCohort);
    }
}

export const SearchBox = (classes, handleSearchValue ,searchValue,searchReference) => {  
    return (
        <div className={classes.inputStyleContainer}>
            <input
                onChange={handleSearchValue}
                ref={searchReference}
                type="text"
                placeholder={"Search Participant ID"}
                className={classes.inputStyle}
            />
            <img alt={"Search Icon"} src={search_icon} />
        </div>
    )
}

export function generateQueryVariable(cohortNames, state) {
    let query = {};
    query['id'] = [];
    query["first"] = 12000;
    cohortNames.forEach((cName) => {
        state[cName].participants.forEach((participant) => {
            query["id"].push(participant.id);
        });
    });
    return query;
}

export const handlePopup = (cohortId, state, setDeleteInfo, deleteInfo) => {
    let deleteType = cohortId ? "this cohort" : "ALL cohorts";
    if (Object.keys(state).length > 0) {
        setDeleteInfo({ showDeleteConfirmation: !deleteInfo.showDeleteConfirmation, deleteType: deleteType, cohortId: cohortId });
    }
}