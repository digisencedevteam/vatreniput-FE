import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Alert, Button, Link, MenuItem, Snackbar, TextField } from "@mui/material";
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

export default function ContactUsForm() {
    const [open, setOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const { control, handleSubmit, formState: { isSubmitting, errors }, reset } = useForm({
        resolver: yupResolver(ContactSchema),
    });

    const onSubmit = (data: any) => {
        console.log(data);
        setSubmitted(true);
        setOpen(false);
        reset();
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button color="inherit" onClick={() => setOpen(true)}>
                Contact us
            </Button>
            <Button color="inherit" onClick={() => setOpen(true)}>
                <Link href="/faq">
                    Cesta Pitanja
                </Link>
            </Button>

            <Dialog open={open} onClose={handleClose} >
                <DialogTitle sx={{ background: "#030D25" }}>Contact Support</DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <DialogContent sx={{ background: "#030D25" }} >
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
                                    <MenuItem value="problem">I'm having a problem</MenuItem>
                                    <MenuItem value="question">I have a question</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
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

                    <DialogActions sx={{ background: "#030D25" }}>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <LoadingButton
                            color="primary"
                            type="submit"
                            loading={isSubmitting}
                        >
                            Submit
                        </LoadingButton>
                    </DialogActions>
                </form>
            </Dialog>

            <Snackbar
                open={submitted}
                autoHideDuration={6000}
                onClose={() => setSubmitted(false)}
            >
                <Alert onClose={() => setSubmitted(false)} severity="success">
                    Your message was sent successfully to VatreniPut support!
                </Alert>
            </Snackbar>
        </div>
    );
}
