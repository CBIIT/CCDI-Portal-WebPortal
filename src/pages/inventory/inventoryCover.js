import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useApolloClient } from '@apollo/client';
import { getFilters } from '@bento-core/facet-filter';
import store from '../../store';
import { withStyles, CircularProgress, Backdrop } from '@material-ui/core';
import {
    inDataloading, syncUpDashboard, afterInitialLoading,
} from '../../components/Inventory/InventoryState';
import styles from './inventoryStyle';
import { DASHBOARD_QUERY_NEW } from '../../bento/dashboardTabData';


const InventoryCover = ({
  classes,
}) => {
    const filterState = useSelector((state) => state.statusReducer.filterState);
    const localFindAutocomplete = useSelector((state) => state.localFind.autocomplete);
    const localFindUpload = useSelector((state) => state.localFind.upload);
    const isDataloading = useSelector((state) => state.inventoryReducer.isDataloading);
    const initialLoading = useSelector((state) => state.inventoryReducer.initialLoading);
    
    const client = useApolloClient();

    async function getData(filters) {
        let result = await client.query({
        query: DASHBOARD_QUERY_NEW,
        variables: filters,
        })
        .then((response) => response.data);
        return result;
    }

    useEffect(() => {
        const filters = {
            ...getFilters(filterState),
            participant_ids: [
                ...(localFindUpload || []).map((obj) => obj.participant_id),
                ...(localFindAutocomplete || []).map((obj) => obj.title),
            ],
        };
        store.dispatch(inDataloading(true));
        getData(filters).then((result) => {
            if (result.searchParticipants) {
                store.dispatch(afterInitialLoading());
                store.dispatch(inDataloading(false));
                store.dispatch(syncUpDashboard(filters, result.searchParticipants));
            }
        });
    }, [filterState, localFindUpload, localFindAutocomplete]);

    return (
        <Backdrop className={classes.backdrop} open={!initialLoading && isDataloading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default withStyles(styles)(InventoryCover);
