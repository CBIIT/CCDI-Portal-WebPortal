export const initialState = {
    initialLoading: true,
    isDataloading: false,
    activeFilters: null,
    dashData: null,
  };
  
  export const AFTER_INITIAL_LOADING = 'Inventory/AFTER_INITIAL_LOADING';
  export const DATA_LOADING = 'Inventory/DATA_LOADING';
  export const FACET_VALUE_CHANGED = 'Inventory/FACET_VALUE_CHANGED';
  export const DASHBOARD_DATA_CHANGED = 'Inventory/DASHBOARD_DATA_CHANGED';
  
  export const afterInitialLoading = () => ({
    type: AFTER_INITIAL_LOADING,
    payload: {
        initialLoading: false,
    },
  });

  export const inDataloading = (isDataloading) => ({
    type: DATA_LOADING,
    payload: {
        isDataloading,
    },
  });

  export const syncUpFacets = (facets) => ({
    type: FACET_VALUE_CHANGED,
    payload: {
        facets,
    },
  });

  export const syncUpDashboard = (facets, dashData) => ({
    type: DASHBOARD_DATA_CHANGED,
    payload: {
        facets,
        dashData,
    },
  });
  
  export default function InventoryReducer(state = initialState, { type, payload }) {
    switch (type) {
        case AFTER_INITIAL_LOADING:
            return {
                ...state,
                initialLoading: payload.initialLoading,
            };
        case DATA_LOADING:
            return {
                ...state,
                isDataloading: payload.isDataloading,
            };
        case FACET_VALUE_CHANGED:
            return {
                ...state,
                activeFilters: payload.facets,
            };
        case DASHBOARD_DATA_CHANGED:
            return {
                ...state,
                activeFilters: payload.facets,
                dashData: payload.dashData,
            };
        default:
            return state;
    }
  }
  