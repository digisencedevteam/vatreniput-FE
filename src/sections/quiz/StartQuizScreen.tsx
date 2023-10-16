import { Typography, Button, Snackbar, Alert } from '@mui/material';
import { Quiz } from './types';

interface StartQuizScreenProps {
    quiz: Quiz;
    startQuiz: () => void;
}
const StartQuizScreen = ({ quiz, startQuiz }: StartQuizScreenProps) => {
    return (
        <>
            <img src={quiz?.thumbnail} alt="Quiz" style={{ maxWidth: '90%', margin: '0', borderRadius: 10 }} />
            <Snackbar
                open={true}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="warning">
                    <Typography variant="caption">Kviz sa postojećim odgovorima, biti će automatski poslan ukoliko izađeš iz njega prije završetka</Typography>
                </Alert>
            </Snackbar>
            <Typography variant="h5" style={{ textTransform: 'uppercase', fontWeight: 'bold', margin: 30, textAlign: 'center' }}>
                {quiz?.title}
            </Typography>
            <Typography variant="caption" sx={{ width: '90%', textAlign: 'center' }}>{quiz?.description}</Typography>
            <Button variant="contained" color="primary" onClick={startQuiz} style={{ marginTop: '20px', width: '50%' }}>
                Start Quiz
            </Button>
        </>
    );
};

export default StartQuizScreen;
