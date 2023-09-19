import { Typography, Button } from '@mui/material';
import { Quiz } from './types';

interface StartQuizScreenProps {
    dummyQuiz: Quiz;
    startQuiz: () => void;
}
const StartQuizScreen = ({ dummyQuiz, startQuiz }: StartQuizScreenProps) => {

    return (
        <>
            <img src={dummyQuiz.imageURL} alt="Quiz" style={{ maxWidth: '70%', margin: '0' }} />
            <Typography variant="h4" style={{ textTransform: 'uppercase', fontWeight: 'bold', margin: '10px' }}>
                {dummyQuiz.title}
            </Typography>
            <Typography variant="body2" sx={{ width: '85%', textAlign: 'center' }}>{dummyQuiz.description}</Typography>
            <Button variant="contained" color="primary" onClick={startQuiz} style={{ marginTop: '20px', width: '75%' }}>
                Start Quiz
            </Button>
        </>
    );
};

export default StartQuizScreen;
