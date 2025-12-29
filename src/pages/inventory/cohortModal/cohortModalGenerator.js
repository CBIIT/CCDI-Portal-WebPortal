import React, { useState, useContext, useEffect } from 'react';
import { CohortStateContext } from '../../../components/CohortSelectorState/CohortStateContext.js';
import {
    onDeleteSingleCohort,
    onDeleteAllCohort,
    onMutateSingleCohort,
    onCreateNewCohort,
} from '../../../components/CohortSelectorState/store/action.js';
import {
    Modal, withStyles,
} from '@material-ui/core';
import DEFAULT_STYLES from './styles';
import DEFAULT_CONFIG from './config';
import CohortList from './components/cohortList';
import CohortDetails from './components/cohortDetails';
import DeleteConfirmationModal from './components/deleteConfirmationModal';
import { deletionTypes } from './components/deleteConfirmationModal';
import Alert from '@material-ui/lab/Alert';
import { GET_COHORT_MANIFEST_QUERY, GET_COHORT_METADATA_QUERY } from '../../../bento/dashboardTabData.js';
import client from '../../../utils/graphqlClient.js'
import { arrayToCSVDownload, objectToJsonDownload, hasUnsavedChanges} from './utils.js';
import { CohortModalContext } from './CohortModalContext.js'

/**
 * Generator function to create cohortModal component with custom configuration
 * applied.
 *
 * @param {object} [uiConfig] component configuration object
 * @returns {object} { cohortModal }
 */
export const CohortModalGenerator = (uiConfig = DEFAULT_CONFIG) => {
    const {
        config, functions,
    } = uiConfig;

    const { currentCohortChanges, setCurrentCohortChanges } = useContext(CohortModalContext);
    const { state, dispatch } = useContext(CohortStateContext);
    const [selectedCohort, setSelectedCohort] = useState(null); // Default to the first entry
    const [alert, setAlert] = useState({ type: '', message: '' });

    const unSavedChanges = currentCohortChanges ? hasUnsavedChanges(currentCohortChanges, state[selectedCohort]) : false;
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deleteModalProps, setDeleteModalProps] = useState({
        handleDelete: () => { },
        deletionType: "",
    });


    useEffect(() => {
        if (alert.message) {
            const timer = setTimeout(() => {
                setAlert({ type: '', message: '' }); // Clear the alert after 3 seconds
            }, 2500);

            // Cleanup timer on component unmount
            return () => clearTimeout(timer);
        }
    }, [alert]);

    const modalClosed = functions && typeof functions.modalClosed === 'function'
        ? functions.modalClosed
        : DEFAULT_CONFIG.functions.modalClosed;

    const modalTitle = config && config.title && typeof config.title === 'string'
        ? config.title
        : DEFAULT_CONFIG.config.title;

    
    const downloadCohortManifest = async () => {
        const id = state[selectedCohort].participants.map(item => item.id);
        const { data } = await client.query({
            query: GET_COHORT_MANIFEST_QUERY,
            variables: { "id": id, "first": state[selectedCohort].participants.length },
        });
        
        arrayToCSVDownload(data['cohortManifest'], selectedCohort);
    };

    const downloadCohortMetadata = async () => {
        const id = state[selectedCohort].participants.map(item => item.id);
        const { data } = await client.query({
            query: GET_COHORT_METADATA_QUERY,
            variables: { "id": id, "first": state[selectedCohort].participants.length },
        });
        objectToJsonDownload(data['cohortMetadata'], selectedCohort);
    };

    const handleDeleteCohort = (cohortId) => {
        dispatch(onDeleteSingleCohort(
            cohortId
        ));
    };

    const handleDeleteAllCohorts = () => {
        dispatch(onDeleteAllCohort());
    };

    // Handle saving updates to cohort
    const handleSetCurrentCohortChanges = (localCohort) => {
        if (!localCohort.cohortId) return;
        setCurrentCohortChanges({
            cohortId: localCohort.cohortId,
            cohortName: localCohort.cohortName,
            cohortDescription: localCohort.cohortDescription,
            participants: localCohort.participants,
            searchText: localCohort.searchText,
        })
    };

    const handleClearCurrentCohortChanges = () => {
        setCurrentCohortChanges(null);
    };

    // Handle saving updates to cohort
    const handleSaveCohort = (localCohort) => {
        if (!localCohort.cohortId) return;
        dispatch(onMutateSingleCohort(
            localCohort.cohortId,
            {
                cohortName: localCohort.cohortName,
                cohortDescription: localCohort.cohortDescription,
                participants: localCohort.participants
            },
            () => {
                setAlert({ type: 'success', message: 'Cohort updated successfully!' })
                handleClearCurrentCohortChanges();
            },
            (error) => setAlert({ type: 'error', message: `Failed to update cohort: ${error.message}` })
        ));
    };

    // Helper function to escape special regex characters
    const escapeRegExp = (string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    // Handle duplicating a cohort
    const handleDuplicateCohort = (cohortId) => {
        const cohortToDuplicate = state[cohortId];
        if (!cohortToDuplicate) return;

        // Extract the base name by removing existing copy suffixes
        let baseName = cohortToDuplicate.cohortName;

        // Remove existing " (Copy)" or " (Copy N)" patterns
        baseName = baseName.replace(/\s*\(Copy(?:\s+\d+)?\)$/, '');

        // Find the highest copy number for this base name
        let highestCopyNumber = 0;
        const existingCohortNames = Object.values(state).map(cohort => cohort.cohortName);

        existingCohortNames.forEach(name => {
            if (name === baseName) {
                // Original exists, so we need at least Copy
                highestCopyNumber = Math.max(highestCopyNumber, 0);
            } else if (name === `${baseName} (Copy)`) {
                // First copy exists
                highestCopyNumber = Math.max(highestCopyNumber, 1);
            } else {
                // Check for numbered copies
                const match = name.match(new RegExp(`^${escapeRegExp(baseName)}\\s*\\(Copy\\s+(\\d+)\\)$`));
                if (match) {
                    const copyNumber = parseInt(match[1], 10);
                    highestCopyNumber = Math.max(highestCopyNumber, copyNumber);
                }
            }
        });

        // Generate the new name
        let newCohortName;
        if (highestCopyNumber === 0) {
            newCohortName = `${baseName} (Copy)`;
        } else {
            newCohortName = `${baseName} (Copy ${highestCopyNumber + 1})`;
        }

        dispatch(onCreateNewCohort(
            newCohortName, // Use the new cohort name as the ID
            cohortToDuplicate.cohortDescription,
            cohortToDuplicate.participants,
            () => {
                setAlert({ type: 'success', message: 'Cohort duplicated successfully!' });
                // The new cohort ID will be the normalized version of newCohortName
                const normalizedCohortId = newCohortName.trim().toLowerCase();
                setSelectedCohort(normalizedCohortId);
            },
            (error) => {
                setAlert({ type: 'error', message: `Failed to duplicate cohort: ${error.message}` });
            }
        ));
    };

    return {
        CohortModal: withStyles(DEFAULT_STYLES, { withTheme: true })((props) => {
            const {
                classes, open,
            } = props;

            const {
                CohortList: cohortListClasses,
                CohortDetails: cohortDetailsClasses,
                DeleteConfirmation: deleteConfirmationClasses,
            } = classes;

            // Wrapper function to handle closing the modal and cleanup
            const closeModalWrapper = () => {
                modalClosed();
                // Call the onCloseModal prop if provided
                if (props.onCloseModal) {
                    props.onCloseModal();
                }
                // Clear current cohort changes
                handleClearCurrentCohortChanges();
                // Reset the selected cohort state
                setSelectedCohort(null);
            };

            const unSavedChangesCheck = () => {
                if (unSavedChanges) {
                    setDeleteModalProps({
                        handleDelete: () => closeModalWrapper(),
                        deletionType: deletionTypes.CLEAR_UNSAVED_CHANGES,
                    });
                    setShowDeleteConfirmation(true)
                }
                else {
                    closeModalWrapper()
                }
            }

            return (
                <>
                <Modal
                    {...props}
                    open={open}
                    className={classes.modal}
                    onClose={unSavedChangesCheck}
                >
                    <div className={classes.paper}>
                        <h1 className={classes.modalTitle}>
                            <span>{modalTitle}</span>
                            <span className={classes.closeIcon} onClick={unSavedChangesCheck}>
                                <img
                                    src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/LocalFindCaseDeleteIcon.svg"
                                    alt="close icon"
                                    className={classes.closeRoot}
                                />
                            </span>
                            {alert.message && (
                                <Alert severity={alert.type} className={classes.alert} onClose={() => setAlert({ type: '', message: '' })}>
                                    {alert.message}
                                </Alert>
                            )}
                        </h1>
                        <div className={classes.modalContainer}>
                            <CohortList
                
                                classes={cohortListClasses}
                                config={config.cohortList}
                                selectedCohort={selectedCohort}
                                setSelectedCohort={setSelectedCohort}
                                unSavedChanges={unSavedChanges}
                                setChangingConfirmation={setDeleteModalProps}
                                setShowChangingConfirmation={setShowDeleteConfirmation}
                                closeParentModal={unSavedChangesCheck}
                                handleDeleteCohort={handleDeleteCohort}
                                handleDeleteAllCohorts={handleDeleteAllCohorts}
                                handleDuplicateCohort={handleDuplicateCohort}
                                handleClearCurrentCohortChanges={handleClearCurrentCohortChanges}
                                deleteConfirmationClasses={deleteConfirmationClasses}
                                state={state}
                            />
                            <CohortDetails
                                classes={cohortDetailsClasses}
                                config={config.cohortDetails}
                                activeCohort={state[selectedCohort]}
                                temporaryCohort={currentCohortChanges}
                                closeModal={unSavedChangesCheck}
                                handleSaveCohort={handleSaveCohort}
                                handleSetCurrentCohortChanges={handleSetCurrentCohortChanges}
                                downloadCohortManifest={downloadCohortManifest}
                                downloadCohortMetadata={downloadCohortMetadata}
                                deleteConfirmationClasses={deleteConfirmationClasses}
                                setAlert={setAlert}
                            />
                        </div>
                    </div>
                </Modal>
                
                <DeleteConfirmationModal
                    classes={deleteConfirmationClasses}
                    open={showDeleteConfirmation}
                    setOpen={setShowDeleteConfirmation}
                    handleDelete={deleteModalProps.handleDelete}
                    deletionType={deleteModalProps.deletionType}
                />

                </>
            )
        }),
    };
};

export default CohortModalGenerator;