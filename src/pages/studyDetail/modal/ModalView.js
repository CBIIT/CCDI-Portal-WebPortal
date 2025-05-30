import React, { useState } from 'react';
import { Modal, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import { withStyles } from '@material-ui/core';
import styles from './ModalStyle';
import TabsView from '../tabs/TabsView';

/**
 * ModalView component displays a modal with detailed study profile information.
 * Renders a button to open a modal dialog showing study details in a tabbed view.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.data - Data object containing study details, including study_id and other relevant information.
 * @param {Object} props.classes - CSS classes for styling the component.
 * @returns {JSX.Element} The rendered ModalView component.
 */
const ModalView = ({ data, classes }) => {
  // State to control modal open/close
  const [open, setOpen] = useState(false);

  // Open modal handler
  const handleOpen = () => setOpen(true);
  // Close modal handler
  const handleClose = () => setOpen(false);

  return (
    // Root container for modal trigger and modal itself
    <div className={classes.root}>
      {/* Button to open the modal */}
      <Button
        variant="text"
        onClick={handleOpen}
        endIcon={<ZoomInIcon fontSize="large" className={classes.openButtonIcon} />}
        className={classes.openButton}
      >
        See Enlarged View
      </Button>
      {/* Modal dialog */}
      <Modal open={open} onClose={handleClose}>
        <div className={classes.modalContainer}>
          {/* Modal header with title and close button */}
          <div className={classes.modalHeader}>
            <h2 className={classes.modalTitle}>
              Study Profile:{' '}
              <span className={classes.titleSpan}>{data.study_id}</span>
            </h2>
            <Button onClick={handleClose} className={classes.closeButton}>
              <CloseIcon />
            </Button>
          </div>
          {/* Modal body with tabbed study details */}
          <div className={classes.modalBody}>
            <TabsView data={data} isModalView={true} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Export ModalView component
export default withStyles(styles)(ModalView);
