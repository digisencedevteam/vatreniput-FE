import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Link, MenuItem, Snackbar, TextField, useTheme } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import * as Yup from 'yup';

const ContactSchema = Yup.object().shape({
    reason: Yup.string().required('Reason is required'),
    message: Yup.string().required('Message is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
});

interface ContactFormData {
    reason: string;
    message: string;
    email: string;
}

export default function ContactUsForm() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const { control, handleSubmit, formState: { isSubmitting, errors }, reset } = useForm({
        resolver: yupResolver(ContactSchema),
    });


    const onSubmit = (data: ContactFormData) => {
        setSubmitted(true);
        setOpen(false);
        reset();
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box mt={2}>
            <Button color="inherit" onClick={() => setOpen(true)}>
                Kontaktirajte nas
            </Button>
            <Button color="inherit">
                <Link href="/faq" underline="none">
                    Cesta Pitanja
                </Link>
            </Button>

            <Dialog open={open} onClose={handleClose}
                PaperProps={{
                    style: {
                        width: '100%',
                        maxWidth: '500px',
                    }
                }}>
                <DialogTitle sx={{ background: theme.palette.background.default }}>Kontaktirajte nas</DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <DialogContent sx={{ background: theme.palette.background.default, pt: 1 }} >
                        <Controller
                            name="reason"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    sx={{ mb: 2 }}
                                    {...field}
                                    select
                                    label="Reason"
                                    fullWidth
                                    error={!!errors.reason}
                                    helperText={errors.reason?.message}
                                >
                                    <MenuItem value="problem">Imam problem</MenuItem>
                                    <MenuItem value="question">Imam pitanje</MenuItem>
                                    <MenuItem value="other">Ostalo</MenuItem>
                                </TextField>
                            )}
                        />

                        <Controller
                            name="message"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    sx={{ mb: 2 }}
                                    {...field}
                                    multiline
                                    maxRows={4}
                                    label="Message"
                                    fullWidth
                                    error={!!errors.message}
                                    helperText={errors.message?.message}
                                />
                            )}
                        />

                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Email Address"
                                    fullWidth
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            )}
                        />
                    </DialogContent>

                    <DialogActions sx={{ background: theme.palette.background.default }}>
                        <LoadingButton
                            color="inherit"
                            type="submit"
                            loading={isSubmitting}
                        >
                            Pošalji
                        </LoadingButton>
                        <Button onClick={handleClose} color="primary">
                            Odustani
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            <Snackbar
                open={submitted}
                autoHideDuration={6000}
                onClose={() => setSubmitted(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setSubmitted(false)} severity="success">
                    Vaša poruka je uspješno poslana podršci Vatrenog Puta!
                </Alert>
            </Snackbar>
        </Box >
    );
}
