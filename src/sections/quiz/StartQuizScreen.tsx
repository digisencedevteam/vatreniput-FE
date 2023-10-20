import { Typography, Button } from '@mui/material';
import { Quiz } from './types';

interface StartQuizScreenProps {
    quiz: Quiz;
    startQuiz: () => void;
}
const StartQuizScreen = ({ quiz, startQuiz }: StartQuizScreenProps) => {
    return (
        <>
            <img src={quiz?.thumbnail} alt="Quiz" style={{ width: '90%', maxWidth: '350px', margin: '0', borderRadius: 10 }} />
            <Typography variant="h5" style={{ textTransform: 'uppercase', fontWeight: 'bold', margin: 30, textAlign: 'center' }}>
                {quiz?.title}
            </Typography>
            <Typography variant="body2" sx={{ width: '80%', textAlign: 'center' }}>{quiz?.description}</Typography>
            <Button variant="contained" color="primary" onClick={startQuiz} style={{ marginTop: '20px', width: '50%' }}>
                Start Quiz
            </Button>
        </>
    );
};

export default StartQuizScreen;
