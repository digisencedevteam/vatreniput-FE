import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

const ForgotPasswordView = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ p: 3, borderRadius: 2, textAlign: "left", maxWidth: 500, margin: 'auto' }}>
            <Typography variant="h3">Resetirajte svoju lozinku</Typography>

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
                    placeholder="Unesite vaš email" />
            </Box>

            <Box mt={2}>
                <Button variant="contained" color="primary" fullWidth>
                    Pošalji upute
                </Button>
            </Box>

            <Box mt={2}>
                <Button color="primary" onClick={() => navigate(-1)}>
                    Povratak
                </Button>
            </Box>
        </Box>
    );
};

export default ForgotPasswordView;
