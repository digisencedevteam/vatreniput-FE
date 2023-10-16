import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';



export const TimerSnackbar = ({ open, onClose, elapsedTime, limit, onTimeExceeded }: any) => {
    useEffect(() => {
        if (elapsedTime >= limit) {
            onTimeExceeded();
        }
    }, [elapsedTime, limit, onTimeExceeded]);

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={open}
            message={`Time: ${elapsedTime} / ${limit}`}
            action={
                <>
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={onClose}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </>
            }
        />
    );
};
