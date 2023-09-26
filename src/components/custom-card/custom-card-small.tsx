import React from "react";
import { Box, Card, CardActions, CardContent, CardMedia, Fab, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

interface CustomCardProps {
    width?: string;
    height?: string;
    imgUrl: string;
    cardText: string;
    linkTo: string;
}

const CustomCardSmall = ({
    width,
    imgUrl,
    linkTo,
    cardText,
    height
}: CustomCardProps) => {
    return (
        <Card
            sx={{
                borderRadius: "16px",
                overflow: "hidden",
                width: width,
                height: height,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                margin: '5px'
            }}
        >
            <Box sx={{ paddingTop: '70%', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
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
                            background: "linear-gradient(0deg, rgba(0,0,0,0.7) 30%, transparent 100%)",
                            zIndex: 1,
                        },
                    }}
                />
                <CardContent
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        width: '100%',
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: 'space-between',
                        alignItems: "center",
                        padding: '22px',

                        background: "linear-gradient(0deg, rgba(0,0,0,0.7), transparent)",

                    }}
                >
                    <Typography variant="h6" color="common.white">{cardText}</Typography>
                    <CardActions sx={{ justifyContent: "center" }}>
                        <Fab
                            color="error"
                            component={Link}
                            to={linkTo}
                            sx={{
                                width: '35px',
                                height: '35px',
                                ml: 2,

                            }}
                        >
                            <ArrowForwardIcon fontSize="small" />
                        </Fab>

                    </CardActions>
                </CardContent>
            </Box>
        </Card>
    );
};

export default CustomCardSmall;
