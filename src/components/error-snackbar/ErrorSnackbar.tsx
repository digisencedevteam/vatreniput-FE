import React, { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';

interface ErrorSnackbarProps {
  trigger: boolean;
  severity: 'error' | 'warning' | 'info' | 'success';
  message: string;
}

const ErrorSnackbar = ({ trigger, severity, message }: ErrorSnackbarProps) => {
  const [isOpen, setIsOpen] = useState(trigger);

  useEffect(() => {
    setIsOpen(trigger);
  }, [trigger]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
