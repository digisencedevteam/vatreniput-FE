import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const ExitConfirmationModal = ({ open, onClose, onConfirm }: any) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Potvrdi izlazak</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Jeste li sigurni da želite izaći iz kviza? Vrijeme nastavlja teći iako
          izađeš!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Ostani
        </Button>
        <Button onClick={onConfirm} color='primary'>
          Izađi
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExitConfirmationModal;
