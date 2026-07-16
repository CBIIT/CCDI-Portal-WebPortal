import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  Button,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  DialogActions,
} from '@material-ui/core';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import * as text from './OverlayText.json';
import DialogThemeProvider from './OverlayThemeConfig';

const OverlayWindow = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    sessionStorage.setItem('overlayLoad', 'true');
  };

  useEffect(() => {
    if (!sessionStorage.length) {
      setOpen(true);
    }
  }, []);

  const content = text.content.map((item) => (
    <DialogContentText key={item.substring(0, 30)}>{item}</DialogContentText>
  ));
  const list = text.list.map((item) => (
    <ListItem key={item.substring(0, 30)}>
      <ListItemIcon>
        <FiberManualRecord style={{ fontSize: 8 }} />
      </ListItemIcon>
      <ListItemText primary={item} />
    </ListItem>
  ));

  return (
    <DialogThemeProvider>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">Warning</DialogTitle>
        <Divider />
        <DialogContent>
          {content}
          {' By using this system, you understand and consent to the following: '}
          <List>
            {list}
          </List>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleClose}>Continue</Button>
        </DialogActions>
      </Dialog>
    </DialogThemeProvider>
  );
};

export default OverlayWindow;
