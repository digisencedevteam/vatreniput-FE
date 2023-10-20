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
            <DialogTitle>Confirm Exit</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Jeste li sigurni da želite izaći iz kviza? Nakon izlaska kviz više nije dostupan!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Ostani
                </Button>
                <Button onClick={onConfirm} color="primary">
                    Izađi
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ExitConfirmationModal;
