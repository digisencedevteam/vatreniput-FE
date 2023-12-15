import React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface ErrorSnackbarProps {
  trigger: boolean;
  severity: 'error' | 'warning' | 'info' | 'success';
  message: string;
  onClose: () => void;
}

const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({
  trigger,
  severity,
  message,
  onClose,
}) => {
  return (
    <Snackbar
      open={trigger}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
