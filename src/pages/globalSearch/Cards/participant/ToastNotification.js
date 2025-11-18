import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';

const ToastNotification = ({ 
  open, 
  message, 
  type = 'success', 
  duration = 3000, 
  onClose 
}) => {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    setVisible(open);
    
    if (open && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [open, duration]);

  const handleClose = () => {
    setVisible(false);
    if (onClose) {
      setTimeout(onClose, 300); // Wait for animation to complete
    }
  };

  if (!visible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon style={{ color: 'white', fontSize: '20px' }} />;
      case 'error':
        return <ErrorIcon style={{ color: 'white', fontSize: '20px' }} />;
      case 'info':
        return <CheckCircleIcon style={{ color: 'white', fontSize: '20px' }} />;
      default:
        return <CheckCircleIcon style={{ color: 'white', fontSize: '20px' }} />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return '#4CAF50';
      case 'error':
        return '#F44336';
      case 'info':
        return '#757575';
      default:
        return '#4CAF50';
    }
  };

  return (
    <Box
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: getBackgroundColor(),
        color: 'white',
        padding: '12px 16px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: 9999,
        minWidth: '200px',
        maxWidth: '400px',
        animation: 'slideIn 0.3s ease-out',
        pointerEvents: 'auto',
      }}
    >
      {getIcon()}
      <Typography
        style={{
          color: 'white',
          fontSize: '14px',
          fontWeight: '500',
          flex: 1,
        }}
      >
        {message}
      </Typography>
      <IconButton
        size="small"
        onClick={handleClose}
        style={{
          color: 'white',
          padding: '4px',
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
      
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </Box>
  );
};

export default ToastNotification;
