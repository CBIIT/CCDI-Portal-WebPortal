import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useApolloClient } from '@apollo/client';
import { onAddCartFiles } from '@bento-core/cart';
import ParticipantCard from './ParticipantCard';
import SnackbarView from './Snackbar/Snackbar';
import AlertView from './AddToCartDialog/AddToCartDialogAlertView';

const ParticipantCardRedux = (props) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [displayAlter, setAlterDisplay] = useState(false);
  const client = useApolloClient();

  const alertMessage = 'The cart is limited to 200,000 files. Please narrow the search criteria or remove some files from the cart to add more.';

  return (
    <>
      <ParticipantCard
        {...props}
        client={client}
        setAlterDisplay={setAlterDisplay}
        setOpenSnackbar={setOpenSnackbar}
        alertMessage={alertMessage}
      />
      <SnackbarView
        open={openSnackbar}
        count={props.count}
        onClose={() => setOpenSnackbar(false)}
      />
      {displayAlter && (
        <AlertView
          alertMessage={alertMessage}
          open={displayAlter}
          onClose={() => setAlterDisplay(false)}
        />
      )}
    </>
  );
};

/**
 * create query variable with active filters
 */
const mapStateToProps = (state) => ({
  count: state.cartReducer && state.cartReducer.count,
  cartFiles: state.cartReducer && state.cartReducer.filesId,
});

const mapDispatchToProps = (dispatch) => ({
  addFiles: (files) => { dispatch(onAddCartFiles(files)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantCardRedux);
