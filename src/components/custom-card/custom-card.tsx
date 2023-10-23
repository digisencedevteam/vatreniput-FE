import { useContext, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Fade,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from "react-router-dom";
import { AuthContext } from 'src/auth/context/jwt';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import dayjs from 'dayjs';
import Label from '../label';
import DeleteModal from '../delete-modal/deleteModal';

interface CustomCardProps {
    width?: string;
    height?: string;
    imgUrl: string;
    cardText: string;
    cardId: string;
    availableUntil?: string;
    isQuiz?: boolean;
    linkTo?: string;
    quizId?: string;
    createdAt?: string;
    isRewarded?: Record<string, boolean>;
    onDeleteQuiz?: (quizId: string) => void;
}

const CustomCard = ({
    width,
    imgUrl,
    cardText,
    cardId,
    availableUntil,
    linkTo,
    isQuiz = false,
    quizId,
    onDeleteQuiz,
    createdAt,
    isRewarded
}: CustomCardProps) => {
    const auth = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const handleToggleMenu = () => setMenuOpen(prev => !prev);
    const formattedCreatedAt = createdAt ? new Date(createdAt).toLocaleString("en-GB", { day: "numeric", month: "numeric", year: "numeric", hour: "numeric", minute: "numeric" }) : "";
    const isAdmin = auth.user && auth.user.email === "antonio@test.com";
    const rewardedUntil = dayjs(createdAt).add(3, 'day');
    const formattedRewarded = dayjs(rewardedUntil).format('DD/MM/YYYY-hh:mm');
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const handleConfirmDelete = () => {
        if (onDeleteQuiz && quizId) {
            onDeleteQuiz(quizId);
        }
        setDeleteModalOpen(false);
    };


    return (
        <>        <Card sx={{ borderWidth: 2, overflow: "hidden", width, flexShrink: 0, display: 'flex', flexDirection: 'column', margin: '5px', position: 'relative' }}>
            {isQuiz && isAdmin && (
                <Box sx={{ position: "absolute", top: 8, right: 8, display: "flex", flexDirection: "row", alignItems: "center", zIndex: 2 }}>
                    <Fade in={menuOpen}>
                        <Box sx={{ display: "flex", flexDirection: "row", gap: "8px" }}>
                            {quizId && (
                                <Button variant="contained" color="error" onClick={() => setDeleteModalOpen(true)} sx={{ borderRadius: "50%", padding: "0.8em", border: "2px solid white", minWidth: 0 }}>
                                    <DeleteIcon fontSize="inherit" />
                                </Button>
                            )}
                            <Button href={linkTo} variant="contained" color="secondary" sx={{ borderRadius: "50%", padding: "0.8em", border: "2px solid white", minWidth: 0 }}>
                                <ModeEditIcon fontSize="inherit" />
                            </Button>
                        </Box>
                    </Fade>
                    <Button onClick={handleToggleMenu} variant="contained" color="primary" sx={{ borderRadius: "50%", padding: "0.8em", border: "2px solid white", minWidth: 0, ml: 1 }}>
                        {menuOpen ? <CloseIcon fontSize="inherit" /> : <MoreHorizIcon fontSize="inherit" />}
                    </Button>
                </Box>
            )}
            <Box pt="60%" sx={{ position: 'relative' }}>
                <CardMedia component="img" image={imgUrl} alt="Card Image" sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", flexShrink: 0, "&:before": { content: '""', position: "absolute", top: 0, right: 0, bottom: 0, left: 0, background: "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)", zIndex: 1 } }} />
            </Box>
            <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: 'space-between', alignItems: "flex-start", p: 3 }}>
                {isRewarded && isRewarded[cardId] && (
                    <Box sx={{ borderRadius: 1, display: "flex", justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', zIndex: 3, my: 0.5 }}>
                        <Label color="primary" variant="soft">Nagradan</Label>
                    </Box>
                )}
                {availableUntil && <Typography variant="subtitle2" sx={{ color: '#999' }}>Nagradan do {formattedRewarded}</Typography>}
                {isAdmin && <Typography variant="subtitle2" sx={{ color: '#999' }}>Kreinran {formattedCreatedAt}</Typography>}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant="h6">{cardText}</Typography>
                    <Button component={Link} to={'/dashboard/quiz/' + cardId} variant="contained" color="error" sx={{ borderRadius: "999px" }}>
                        <ArrowForwardIcon fontSize="small" />
                    </Button>
                </Box>
            </CardContent>
        </Card>
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirmDelete={handleConfirmDelete}
                modalText="Jeste li sigurni da želite izbrisati kviz?"
                confirmButtonText="Izbriši"
            />
        </>

    );
};

export default CustomCard;
