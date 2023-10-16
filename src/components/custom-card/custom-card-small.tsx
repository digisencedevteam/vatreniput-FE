import { useState } from "react";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Fab, Modal, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import { CustomCardProps } from "src/sections/quiz/types";

const CustomCardSmall = ({
    width,
    imgUrl,
    linkTo,
    height,
    cardText,
    quizResults,
}: CustomCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleCardClick = () => {
        if (!linkTo) {
            openModal();
        }
    };

    const formattedDateTaken = quizResults
        ? new Date(quizResults.dateTaken).toLocaleString("en-GB", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
        : "";

    return (
        <>
            {linkTo ? (
                <Card
                    component={Link}
                    to={linkTo}
                    sx={{
                        borderRadius: "16px",
                        overflow: "hidden",
                        width: width,
                        height: height,
                        flexShrink: 0,
                        display: "flex",
                        flexDirection: "column",
                        margin: "5px",
                    }}
                >
                    <Box
                        sx={{
                            paddingTop: "70%",
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                        }}
                    >
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
                                    background:
                                        "linear-gradient(0deg, rgba(0,0,0,0.7) 30%, transparent 100%)",
                                    zIndex: 1,
                                },
                            }}
                        />
                        <CardContent
                            sx={{
                                position: "absolute",
                                bottom: 0,
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                                padding: "22px",
                                background: "linear-gradient(0deg, rgba(0,0,0,0.8), transparent)",
                            }}
                        >
                            <Typography variant="caption" color="common.white" noWrap>
                                {cardText}
                            </Typography>
                        </CardContent>
                    </Box>
                </Card>
            ) : (
                <Card
                    onClick={handleCardClick}
                    sx={{
                        borderRadius: "16px",
                        overflow: "hidden",
                        width: width,
                        height: height,
                        flexShrink: 0,
                        display: "flex",
                        flexDirection: "column",
                        margin: "5px",
                        cursor: "pointer",
                    }}
                >
                    <Box
                        sx={{
                            paddingTop: "70%",
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
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
                                    background:
                                        "linear-gradient(0deg, rgba(0,0,0,0.7) 30%, transparent 100%)",
                                    zIndex: 1,
                                },
                            }}
                        />
                        <CardContent
                            sx={{
                                position: "absolute",
                                bottom: 0,
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "22px",
                                background: "linear-gradient(0deg, rgba(0,0,0,0.8), transparent)",
                            }}
                        >
                            <Typography variant="caption" color="common.white" noWrap>
                                {cardText}
                            </Typography>
                            <CardActions sx={{ justifyContent: "center" }}>
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
                        </CardContent>
                    </Box>
                </Card>
            )}
            <Modal
                open={isModalOpen}
                onClose={closeModal}
                aria-labelledby="quiz-results-modal"
                aria-describedby="quiz-results-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        borderRadius: "16px",
                        boxShadow: 24,
                        p: 4,
                        textAlign: "center",
                    }}
                >
                    {quizResults && (
                        <>
                            <Typography variant="h5">
                                {quizResults.quiz.title}
                            </Typography>
                            <CardMedia
                                component="img"
                                src={quizResults.quiz.thumbnail}
                                alt="Slika kviza"
                                sx={{
                                    width: "100%",
                                    height: "auto",
                                    borderRadius: "16px",
                                    marginY: '16px',
                                }}
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', m: 5 }}>
                                <Typography variant="caption" id="quiz-results-description">
                                    Riješenost kviza: {Math.round(quizResults.score)}%
                                </Typography>
                                <Typography variant="caption">
                                    Kviz riješen za {quizResults.duration} sekundi
                                </Typography>
                                <Typography variant="caption">
                                    Kviz riješen: {formattedDateTaken}
                                </Typography>
                            </Box>
                        </>
                    )}
                    <Button onClick={closeModal} variant="contained">
                        Zatvori
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default CustomCardSmall;
