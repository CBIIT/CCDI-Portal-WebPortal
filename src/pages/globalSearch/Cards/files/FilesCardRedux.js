import React from 'react';
import { connect } from 'react-redux';
import { onAddCartFiles } from '@bento-core/cart';
import FilesCard from './FilesCard';

const FilesCardRedux = (props) => {
  return (
    <FilesCard {...props} />
  );
};

/**
 * Map Redux state to component props
 */
const mapStateToProps = (state) => ({
  count: state.cartReducer && state.cartReducer.count,
  cartFiles: state.cartReducer && state.cartReducer.filesId,
});

/**
 * Map dispatch actions to component props
 */
const mapDispatchToProps = (dispatch) => ({
  addFiles: (files) => { dispatch(onAddCartFiles(files)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(FilesCardRedux);

