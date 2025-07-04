import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    useLocation,
    useSearchParams,
    useNavigate,
  } from "react-router-dom";
import { useApolloClient } from '@apollo/client';
import { updateFilterState } from '@bento-core/facet-filter';
import { updateUploadData, updateAutocompleteData, updateUploadMetadata, resetUploadData, } from '@bento-core/local-find';
import store from '../../store';
import { withStyles, CircularProgress, Backdrop } from '@material-ui/core';
import {
    inDataloading, updateImportfrom, syncUpDashboard, afterInitialLoading, return2Page, returnQueryUrl, changeTab, restoreActionType,
} from '../../components/Inventory/InventoryState';
import styles from './inventoryStyle';
import { DASHBOARD_QUERY_NEW } from '../../bento/dashboardTabData';
import { queryParams } from '../../bento/dashTemplate';

const InventoryCover = ({
  classes,
}) => {
    const [searchParams] = useSearchParams();
    // const filterState = useSelector((state) => state.statusReducer.filterState);
    // const localFindAutocomplete = useSelector((state) => state.localFind.autocomplete);
    // const localFindUpload = useSelector((state) => state.localFind.upload);
    const isDataloading = useSelector((state) => state.inventoryReducer.isDataloading);
    const initialLoading = useSelector((state) => state.inventoryReducer.initialLoading);
    const return_2_page= useSelector((state) => state.inventoryReducer.return_2_page);
    const return_query_url= useSelector((state) => state.inventoryReducer.return_query_url);
    const action_type= useSelector((state) => state.inventoryReducer.action_type);
    
    const client = useApolloClient();

    const query = new URLSearchParams(useLocation().search);
    const navigate = useNavigate();

    async function getData(filters) {
        let result = await client.query({
        query: DASHBOARD_QUERY_NEW,
        variables: filters,
        })
        .then((response) => response.data);
        return result;
    }

    const generateFacetFilters = (filters, query, queryParams) => {
        let newFilterState = {};
        queryParams.forEach((param) => {
            if (param === 'import_from' || param === 'p_id' || param === 'u' || param === 'u_fc' || param === 'u_um' || param === 'tab') {
                    return;
            }
            const paramValues = query.get(param);
            if (paramValues) {
                if (param === 'age_at_diagnosis' || param === 'age_at_treatment_start' || param === 'age_at_response' || param === 'age_at_last_known_survival_status' || param === 'participant_age_at_collection') {
                    const rangeParams = paramValues.split(',');
                    const lowerBound = parseInt(rangeParams[0]);
                    const upperBound = parseInt(rangeParams[1]);
                    if (rangeParams.length !== 2 || typeof lowerBound !==  'number' || Number.isNaN(lowerBound) || typeof upperBound !==  'number' || Number.isNaN(upperBound)) {
                        return;
                    } else {
                        filters[param] = [lowerBound, upperBound];
                        newFilterState[param] = [lowerBound, upperBound];
                    }
                } else {
                    filters[param] = paramValues.split('|');
                    newFilterState[param] = {};
                    paramValues.split('|').forEach((item) => {
                        newFilterState[param][item] = true;
                    });
                }
            }
        });
        return newFilterState;
    }

    useEffect(() => {
        if (query.size === 0 && return_2_page) {
            navigate(`/explore${return_query_url}`);
            return;
        }
        
        // Parse all query params
        let filters = {};
        const import_from = query.get('import_from');
        const participant_id = query.get('p_id');
        const upload = query.get('u');
        const upload_filecontent = query.get('u_fc');
        const upload_unmatched = query.get('u_um');
        const tab = query.get('tab');
        
        // Helper to finish the rest of the logic after import_from is handled
        const continueWithFilters = (extraParticipantIds = []) => {
            filters.participant_ids = [];
            if (participant_id) {
                filters.participant_ids = [...filters.participant_ids, ...participant_id.split('|')];
            }
            if (upload) {
                filters.participant_ids = [...filters.participant_ids, ...upload.split('|')];
            }
            if (extraParticipantIds.length > 0) {
                filters.import_data = extraParticipantIds;
            }
            const newFilterState = generateFacetFilters(filters, query, queryParams);

            // Update autocomplete data
            if (participant_id) {
                const data = participant_id.split('|').map((item) => ({
                    type: 'participantIds',
                    title: item,
                }));
                store.dispatch(updateAutocompleteData(data));
            } else {
                store.dispatch(updateAutocompleteData([]));
            }

            // Update upload data and metadata
            if (upload) {
                const data = upload.split('|').map((item) => ({
                    participant_id: item,
                }));
                let fc = '';
                let um = [];
                if (upload_filecontent && upload_unmatched) {
                    fc = upload_filecontent.split('|').join(',');
                    um = upload_unmatched.split('|');
                } else {
                    fc = upload.split('|').join(',');
                    um = [];
                }
                const metadata = {
                    filename: "",
                    fileContent: fc,
                    matched: data,
                    unmatched: um,
                };
                store.dispatch(updateUploadData(data));
                store.dispatch(updateUploadMetadata(metadata));
            } else {
                store.dispatch(resetUploadData());
            }

            store.dispatch(updateFilterState(newFilterState));

            // Handle tab
            if (tab) {
                const tab_number = parseInt(tab, 10);
                !isNaN(tab_number) && store.dispatch(changeTab(tab_number, 'facet'));
            } else {
                store.dispatch(changeTab(0, 'facet'));
            }

            // Data loading logic
            if (action_type === "facet") {
                store.dispatch(inDataloading(true));
                getData(filters).then((result) => {
                    if (result.searchParticipants) {
                        store.dispatch(return2Page(false));
                        store.dispatch(returnQueryUrl(window.location.search));
                        store.dispatch(afterInitialLoading());
                        store.dispatch(inDataloading(false));
                        store.dispatch(syncUpDashboard(filters, result.searchParticipants));
                    }
                });
            } else {
                store.dispatch(return2Page(false));
                store.dispatch(returnQueryUrl(window.location.search));
                store.dispatch(restoreActionType());
            }
        };

        // Handle import_from if present
        if (import_from) {
            fetch(import_from)
                .then(response => response.json())
                .then(jsonData => {
                    store.dispatch(updateImportfrom(import_from, jsonData));
                    // If jsonData is an array of participant IDs, pass them to continueWithFilters
                    continueWithFilters(Array.isArray(jsonData) ? jsonData.map(obj => JSON.stringify(obj)) : []);
                })
                .catch(error => {
                    console.error("Failed to fetch import_from JSON:", error);
                    store.dispatch(updateImportfrom(null, []));
                    continueWithFilters();
                });
        } else {
            store.dispatch(updateImportfrom(null, []));
            continueWithFilters();
        }
    }, [searchParams]);

    useEffect(() => {
        return () => {
            // console.log("do something when left!");
            store.dispatch(return2Page(true));
        };
    }, []);

    return (
        <Backdrop className={classes.backdrop} open={!initialLoading && isDataloading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default withStyles(styles)(InventoryCover);
