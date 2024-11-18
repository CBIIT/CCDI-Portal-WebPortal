import React from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { clearAllFilters, clearFacetSection, clearSliderSection, toggleCheckBox } from '@bento-core/facet-filter';
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
const QueryBarView = ({ data, statusReducer, localFind }) => {
  const dispatch = useDispatch();
  const query = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();

  const sectionOrder = facetsConfig.map((v) => v.datafield);
  const mappedFilterState = Object.keys(statusReducer || {}).map((facet) => {
    const config = facetsConfig.find((config) => config.datafield === facet);

    return {
      ...config,
      items: statusReducer[facet],
      data: data[config.apiForFiltering],
    }
  });
  mappedFilterState.sort((a, b) => sectionOrder.indexOf(a.datafield) - sectionOrder.indexOf(b.datafield));

  const { QueryBar } = QueryBarGenerator({
    functions: {
      clearAll: () => {
        const paramValue = {
          'p_id': '', 'u': '', 'u_fc': '', 'u_um': '', 'sex_at_birth': '', 'race': '',
          'age_at_diagnosis': '', 'diagnosis': '', 'diagnosis_anatomic_site': '', 'diagnosis_classification_system': '', 'diagnosis_basis': '', 'disease_phase': '',
          'treatment_type': '', 'treatment_agent': '', 'age_at_treatment_start': '', 'response_category': '', 'age_at_response': '', 
          'age_at_last_known_survival_status': '', 'first_event': '', 'last_known_survival_status': '', 
          'participant_age_at_collection': '', 'sample_anatomic_site': '', 'sample_tumor_status': '', 'tumor_classification': '', 
          'data_category': '', 'file_type': '', 'dbgap_accession': '', 'study_name': '', 
          'library_selection': '', 'library_strategy': '', 'library_source_material': '', 'library_source_molecule': ''
        };
        const queryStr = generateQueryStr(query, queryParams, paramValue);
        navigate(`/explore${queryStr}`, { replace: true });
        dispatch(resetAllData());
        dispatch(clearAllFilters());
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
        paramValue[field] = '';
        const queryStr = generateQueryStr(query, queryParams, paramValue);
        navigate(`/explore${queryStr}`, { replace: true });
        dispatch(clearSliderSection(section));
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
      statusReducer={mappedFilterState}
      localFind={localFind}
    />
  );
};

const mapStateToProps = (state) => ({
  statusReducer: state.statusReducer.filterState,
  localFind: state.localFind,
});

export default connect(mapStateToProps, null)(QueryBarView);
