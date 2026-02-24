import React from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { updateImportfrom } from '../../../components/Inventory/InventoryState';
import { clearAllFilters, clearFacetSection, clearSliderSection, toggleCheckBox } from '@bento-core/facet-filter';
import store from '../../../store';
import { resetAllData, resetUploadData, updateAutocompleteData } from '@bento-core/local-find';
import { generateQueryStr } from '@bento-core/util';
import { QueryBarGenerator } from '@bento-core/query-bar';
import { facetsConfig, queryParams } from '../../../bento/dashTemplate';

/**
 * Generate the Explore Tab Query Bar
 *
 * @param {object} props
 * @param {object} props.data API search resultset
 * @param {object} props.statusReducer Facet Filter State
 * @param {object} props.localFind Local Find State
 * @returns {JSX.Element}
 */
const QueryBarView = ({ data, hasImportFrom, statusReducer, localFind, unknownAgesState }) => {
  const dispatch = useDispatch();
  const query = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();

  const sectionOrder = facetsConfig.map((v) => v.datafield);
  
  // Create mapped filter state from regular facets
  const mappedFilterState = Object.keys(statusReducer || {}).map((facet) => {
    const config = facetsConfig.find((config) => config.datafield === facet);
    if (!config) {
      console.warn(`No configuration found for facet: ${facet}`);
      return null;
    }
    return {
      ...config,
      items: statusReducer[facet],
      data: data[config.apiForFiltering],
    }
  }).filter(Boolean);
  
  // Add unknownAges parameters to existing entries or create new ones
  // Check both Redux state and URL parameters for unknownAges
  const ageRelatedParams = ['age_at_diagnosis', 'age_at_treatment_start', 'age_at_response', 'age_at_last_known_survival_status', 'participant_age_at_collection'];
  
  ageRelatedParams.forEach(param => {
    let unknownAges = 'include'; // default value
    
    // First check Redux state
    if (unknownAgesState && unknownAgesState[param]) {
      unknownAges = unknownAgesState[param];
    }
    // If not in Redux state, check URL parameters for page load
    else {
      const unknownAgesParam = `${param}_unknownAges`;
      const urlUnknownAges = query.get(unknownAgesParam);
      if (urlUnknownAges) {
        unknownAges = urlUnknownAges;
      }
    }
    
    if (unknownAges && unknownAges !== 'include') {
      // Check if there's already an entry for this parameter (with range)
      const existingEntryIndex = mappedFilterState.findIndex(entry => entry.datafield === param);
      
      if (existingEntryIndex !== -1) {
        // Add unknownAges to existing entry
        mappedFilterState[existingEntryIndex].unknownAges = unknownAges;
      } else {
        // Create a new entry only if there's no range selected
        const config = facetsConfig.find((config) => config.datafield === param);
        if (config) {
          const unknownAgesItem = {
            ...config,
            datafield: `${param}_unknownAges`,
            label: config.label, // Use original label, let SliderFilter handle unknownAges formatting
            items: [unknownAges],
            data: data[config.apiForFiltering],
            isUnknownAges: true,
            parentDatafield: param,
            unknownAges: unknownAges,
          };
          mappedFilterState.push(unknownAgesItem);
        }
      }
    }
  });
  
  mappedFilterState.sort((a, b) => sectionOrder.indexOf(a.datafield) - sectionOrder.indexOf(b.datafield));

  const { QueryBar } = QueryBarGenerator({
    functions: {
      clearAll: () => {
        const paramValue = {
          'import_from': '', 'p_id': '', 'u': '', 'u_fc': '', 'u_um': '', 'sex_at_birth': '', 'race': '',
          'age_at_diagnosis': '', 'age_at_diagnosis_unknownAges': '', 'diagnosis': '', 'diagnosis_anatomic_site': '', 'diagnosis_classification_system': '', 'diagnosis_category': '', 'diagnosis_basis': '', 'disease_phase': '',
          'treatment_type': '', 'treatment_agent': '', 'age_at_treatment_start': '', 'age_at_treatment_start_unknownAges': '', 'response_category': '', 'age_at_response': '', 'age_at_response_unknownAges': '',
          'age_at_last_known_survival_status': '', 'age_at_last_known_survival_status_unknownAges': '', 'first_event': '', 'last_known_survival_status': '', 
          'participant_age_at_collection': '', 'participant_age_at_collection_unknownAges': '', 'sample_anatomic_site': '', 'sample_tumor_status': '', 'tumor_classification': '', 
          'data_category': '', 'file_type': '', 'file_mapping_level': '', 'dbgap_accession': '', 'study_name': '', 'study_status': '',
          'library_selection': '', 'library_strategy': '', 'library_source_material': '', 'library_source_molecule': ''
        };
        const queryStr = generateQueryStr(query, queryParams, paramValue);
        navigate(`/explore${queryStr}`, { replace: true });
        dispatch(resetAllData());
        dispatch(clearAllFilters());
        
        // Reset unknownAges state to default values
        const ageRelatedParams = ['age_at_diagnosis', 'age_at_treatment_start', 'age_at_response', 'age_at_last_known_survival_status', 'participant_age_at_collection'];
        ageRelatedParams.forEach(param => {
          store.dispatch({
            type: 'UNKNOWN_AGES_CHANGED',
            payload: {
              datafield: param,
              unknownAges: 'include',
            },
          });
        });
      },
      clearImportFrom: () => {
        const paramValue = {
          'import_from': '',
        };
        const queryStr = generateQueryStr(query, queryParams, paramValue);
        navigate(`/explore${queryStr}`, { replace: true });
        dispatch(updateImportfrom(null, []));
      },
      clearUpload: () => {
        const paramValue = {
          'u': '',
          'u_fc': '',
          'u_um': '',
        };
        const queryStr = generateQueryStr(query, queryParams, paramValue);
        navigate(`/explore${queryStr}`, { replace: true });
        dispatch(resetUploadData());
      },
      clearAutocomplete: () => {
        const paramValue = {
          'p_id': ''
        };
        const queryStr = generateQueryStr(query, queryParams, paramValue);
        navigate(`/explore${queryStr}`, { replace: true });
        dispatch(updateAutocompleteData([]));
      },
      deleteAutocompleteItem: (title) => {
        const { autocomplete } = localFind;
        const newdata = [...autocomplete];
        const index = newdata.findIndex((v) => v.title === title);

        if (index > -1) {
          newdata.splice(index, 1);
          const paramValue = {
            'p_id': newdata.map((dt) => dt.title).join('|')
          };
          const queryStr = generateQueryStr(query, queryParams, paramValue);
          navigate(`/explore${queryStr}`, { replace: true });
          dispatch(updateAutocompleteData(newdata));
        }
      },
      resetFacetSection: (section) => {
        const field = section.datafield;
        let paramValue = {};
        paramValue[field] = '';
        const queryStr = generateQueryStr(query, queryParams, paramValue);
        navigate(`/explore${queryStr}`, { replace: true });
        dispatch(clearFacetSection(section));
      },
      resetFacetSlider: (section) => {
        const field = section.datafield;
        let paramValue = {};
        
        // Check if this is an unknownAges entry
        if (section.isUnknownAges) {
          // For unknownAges entries, clear the unknownAges parameter
          const unknownAgesField = `${section.parentDatafield}_unknownAges`;
          paramValue[unknownAgesField] = '';
          
          const queryStr = generateQueryStr(query, queryParams, paramValue);
          navigate(`/explore${queryStr}`, { replace: true });
          
          // Reset the unknownAges parameter in Redux state
          store.dispatch({
            type: 'UNKNOWN_AGES_CHANGED',
            payload: {
              datafield: section.parentDatafield,
              unknownAges: 'include',
            },
          });
        } else {
          // For regular slider entries, clear the slider range
          paramValue[field] = '';
          
          // Also clear the corresponding unknownAges parameter if it exists
          const unknownAgesField = `${field}_unknownAges`;
          if (queryParams.includes(unknownAgesField)) {
            paramValue[unknownAgesField] = '';
          }
          
          const queryStr = generateQueryStr(query, queryParams, paramValue);
          navigate(`/explore${queryStr}`, { replace: true });
          dispatch(clearSliderSection(section));
          
          // Reset the corresponding unknownAges parameter in Redux state
          if (queryParams.includes(unknownAgesField)) {
            store.dispatch({
              type: 'UNKNOWN_AGES_CHANGED',
              payload: {
                datafield: field,
                unknownAges: 'include',
              },
            });
          }
        }
      },
      resetUnknownAges: (section) => {
        const field = section.parentDatafield || section.datafield.replace('_unknownAges', '');
        const unknownAgesField = `${field}_unknownAges`;
        let paramValue = {};
        paramValue[unknownAgesField] = '';
        
        const queryStr = generateQueryStr(query, queryParams, paramValue);
        navigate(`/explore${queryStr}`, { replace: true });
        
        // Reset the corresponding unknownAges parameter in Redux state
        store.dispatch({
          type: 'UNKNOWN_AGES_CHANGED',
          payload: {
            datafield: field,
            unknownAges: 'include',
          },
        });
      },
      resetFacetCheckbox: (section, checkbox) => {
        const field = section.datafield;
        const items = section.items;
        const idx = items.indexOf(checkbox);
        if (idx > -1) {
          items.splice(idx, 1);
        }
        let paramValue = {};
        paramValue[field] = items.length > 0 ? items.join('|') : '';
        const queryStr = generateQueryStr(query, queryParams, paramValue);
        navigate(`/explore${queryStr}`, { replace: true });
        dispatch(toggleCheckBox({
          datafield: section.datafield,
          isChecked: false,
          name: checkbox
        }));
      },
    },
  });

  return (
    <QueryBar
      hasImportFrom={hasImportFrom}
      statusReducer={mappedFilterState}
      localFind={localFind}
    />
  );
};

const mapStateToProps = (state) => ({
  hasImportFrom: state.inventoryReducer.importFromData.length > 0,
  statusReducer: state.statusReducer.filterState,
  localFind: state.localFind,
});

export default connect(mapStateToProps, null)(QueryBarView);
