import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import axiosInstance, { endpoints } from 'src/utils/axios';

const ForgotPasswordView = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState<string | null>(null);

    const handlePasswordReset = async () => {
        try {
            const response = await axiosInstance.post(endpoints.passwordReset.reqest, {
                email: email
            });
            setMessage(response.data.message);

        } catch (error) {
            setMessage('There was an error sending the request. Please try again.');

            if (error.response && error.response.data) {
                console.error("Error: ", error.response.data);
            } else if (error.message) {
                console.error("Error: ", error.message); // Logging the generic error message
            }
        }
    };

    return (
        <Box sx={{ p: 3, borderRadius: 2, textAlign: "left", maxWidth: 500, margin: 'auto' }}>
            <Typography variant="h3">Zaboravili ste lozinku?</Typography>

            <Box mt={3}>
                <Typography variant="body1">
                    Unesite vašu email adresu kako bismo vam poslali upute za resetiranje lozinke.
                </Typography>
            </Box>

            <Box mt={2}>
                <TextField
                    fullWidth
                    label="Email adresa"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Unesite vaš email" />
            </Box>

            <Box mt={2}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handlePasswordReset}>
                    Pošalji upute
                </Button>
            </Box>

            <Box mt={2}>
                <Button color="primary" onClick={() => navigate(-1)}>
                    Povratak
                </Button>
            </Box>

            {message && (
                <Typography variant="body2" color="textSecondary" mt={2}>
                    {message}
                </Typography>
            )}
        </Box>
    );
};

export default ForgotPasswordView;
