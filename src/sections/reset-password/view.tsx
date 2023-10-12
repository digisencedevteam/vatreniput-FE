import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

const ResetPasswordView = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const { tokenId } = useParams();

    const handleResetPassword = async () => {
        if (password !== confirmPassword) {
            setError("Lozinke se ne podudaraju!");
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/password-reset/reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: tokenId,
                    newPassword: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                const userConfirmed = window.confirm('Your password has been reset successfully. Would you like to login now?');
                if (userConfirmed) {
                    navigate('/auth/jwt/login');
                }
            } else {
                if (data.message === 'Invalid or expired token' || data.error === 'Invalid or expired token') {
                    setError('Pruženi link je nevažeći');
                } else {
                    setError(data.message || 'Something went wrong. Please try again.');
                }
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };


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
        </Box>
    );
};

export default ResetPasswordView;
