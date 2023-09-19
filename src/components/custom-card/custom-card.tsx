import React from "react";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

interface CustomCardProps {
    height?: string;
    imgUrl: string;
    cardText: string;
    linkTo: string;
}

const CustomCard: React.FC<CustomCardProps> = ({
    imgUrl,
    linkTo,
    cardText
}) => {
    return (
        <Card
            sx={{
                borderRadius: "16px",
                overflow: "hidden",
                width: '85%',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                marginX: '10px'
            }}
        >
            <Box sx={{ paddingTop: '50%', position: 'relative' }}>
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
                    flexDirection: "row",
                    justifyContent: 'space-between',
                    alignItems: "center",
                }}
            >
                <Typography variant="h5">{cardText}</Typography>
                <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                        component={Link}
                        to={linkTo}
                        variant="contained"
                        color="error"
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                            borderRadius: "8px",
                        }}
                    >
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
};

export default CustomCard;