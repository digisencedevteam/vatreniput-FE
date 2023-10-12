import { Box, Card, CardActions, CardContent, CardMedia, Fab, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import { CustomCardProps } from "src/sections/quiz/types";

const CustomCardSmall = ({
    width,
    imgUrl,
    linkTo,
    height,
    cardText,
    onCardClick
}: CustomCardProps) => {

    const handleCardClick = () => {
        if (!linkTo && onCardClick) {
            onCardClick();
        }
    };

    const CommonCardMedia = () => (
        <CardMedia
            component="img"
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
            }}
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
    );

    return (
        <Card
            {...(linkTo ? { component: Link, to: linkTo } : { onClick: handleCardClick })}
            sx={{
                borderRadius: "16px",
                overflow: "hidden",
                width: width,
                height: height,
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                mx: 1,
                cursor: linkTo ? "default" : "pointer",

            }}
        >
            <Box
                sx={{
                    paddingTop: "70%",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: linkTo ? "flex-end" : "space-between",
                }}
            >
                <CommonCardMedia />

                <CardContent
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        padding: "22px",
                        background: "linear-gradient(0deg, rgba(0,0,0,0.8), transparent)",
                    }}
                >
                    <Typography
                        variant="caption"
                        color="common.white"
                        noWrap
                        sx={{
                            flexGrow: 1,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                        }}
                    >
                        {cardText}
                    </Typography>

                    {linkTo && !onCardClick && (
                        <CardActions sx={{ justifyContent: "center", padding: 0, margin: 0 }}>
                            <Fab
                                color="error"
                                sx={{
                                    width: "35px",
                                    height: "35px",
                                    ml: 2,
                                }}
                            >
                                <ArrowForwardIcon fontSize="small" />
                            </Fab>
                        </CardActions>
                    )}
                </CardContent>
            </Box>
        </Card>
    );
};

export default CustomCardSmall;
