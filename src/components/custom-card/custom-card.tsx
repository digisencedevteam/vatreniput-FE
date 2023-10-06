import React, { useContext } from "react";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import { AuthContext } from 'src/auth/context/jwt';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';


interface CustomCardProps {
    width?: string;
    height?: string;
    imgUrl: string;
    cardText: string;
    cardId: string;
    availableUntil?: string;
    isQuiz?: boolean;
}

const CustomCard = ({
    width,
    imgUrl,
    cardText,
    cardId,
    availableUntil,
    isQuiz = false
}: CustomCardProps) => {
    const auth = useContext(AuthContext);

    const formattedAvailableUntil = availableUntil
        ? new Date(availableUntil).toLocaleString("en-GB", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
        })
        : ""

    return (
        <Card
            sx={{
                borderRadius: "16px",
                overflow: "hidden",
                width: width,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                margin: '5px',
                position: 'relative'  // Add relative positioning
            }}
        >

            {isQuiz && auth.user && auth.user.email === 'antonio@test.com' && (
                <Box
                    sx={{
                        position: 'absolute',  // Absolute positioning
                        top: 8,
                        right: 8,
                        display: 'flex',
                        gap: '8px',  // Adjust gap between buttons as needed
                    }}
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                            borderRadius: "50%",
                            padding: "1.3em",
                            border: "2px solid white",
                        }}
                    >
                        <ModeEditIcon fontSize="small" />
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{
                            borderRadius: "50%",
                            padding: "1.3em",
                            border: "2px solid white",
                        }}
                    >
                        <DeleteIcon fontSize="small" />
                    </Button>
                </Box>


            )}
            <Box sx={{ paddingTop: '60%', position: 'relative' }}>
                <CardMedia
                    component="img"
                    style={{ position: "absolute", top: 0, left: 0, width: '100%', height: '100%' }}
                    image={imgUrl}
                    alt="Card Image"
                    sx={{
                        position: "relative",
                        flexShrink: 0,
                        "&:before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                            background: "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
                            zIndex: 1,
                        },
                    }}
                />
            </Box>

            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: 'space-between',
                    alignItems: "flex-start",
                    padding: '22px'
                }}
            >
                {availableUntil && (
                    <Typography variant="subtitle2" sx={{ color: '#999' }}>
                        Dostupan do {formattedAvailableUntil}
                    </Typography>
                )}
                <Typography variant="h6">{cardText}</Typography>
                <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                        component={Link}
                        to={'/dashboard/quiz/' + cardId}
                        variant="contained"
                        color="error"
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                            borderRadius: "999px",
                        }}
                    >
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
};

export default CustomCard;
