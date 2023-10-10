import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

const ResetPasswordView = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleResetPassword = () => {
        if (password !== confirmPassword) {
            setError("Lozinke se ne podudaraju!");
            return;
        }
        console.log(password);

        // TODO : HANDLE PASSOWRD RESETiNG LOGIC HERE
    }

    return (
        <Box sx={{ p: 3, borderRadius: 2, textAlign: "left", maxWidth: 500, margin: 'auto' }}>
            <Typography variant="h3">Resetirajte svoju lozinku</Typography>

            <Box mt={3}>
                <Typography variant="body1">
                    Ispuni polja da za novu lozinku
                </Typography>
            </Box>

            <Box mt={2}>
                <TextField
                    fullWidth
                    label="Nova loznika"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nova lozinka" />
            </Box>

            <Box mt={2}>
                <TextField
                    fullWidth
                    label="Potvrdite lozinku"
                    variant="outlined"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ponovo unesite novu lozinku" />
            </Box>

            {error && (
                <Box mt={2}>
                    <Typography variant="body2" color="error">
                        {error}
                    </Typography>
                </Box>
            )}

            <Box mt={2}>
                <Button variant="contained" color="primary" fullWidth onClick={handleResetPassword}>
                    Resetiraj lozinku
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

export default ResetPasswordView;
