import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Answer, Quiz } from './types';

interface EndQuizScreenProps {
    quiz: Quiz;
    answers: Answer[];
    onQuizFinish: () => void;
    elapsedTime: number;
}

const EndQuizScreen = ({ quiz, answers, elapsedTime, onQuizFinish }: EndQuizScreenProps) => {

    const correctAnswers = answers.filter((answer) => {
        if (quiz) {
            const question = quiz.questions?.[answers.indexOf(answer)];
            return question && answer.correct;
        }
        return false;
    });

    const handleFinishQuiz = async () => {
        if (typeof onQuizFinish === 'function') {
            await onQuizFinish();
        }
    };
    return (
        <>
            <Typography variant="h6">
                {`Imate ${correctAnswers.length} točnih od ${quiz.questions!.length}`}
            </Typography>
            <Typography variant="caption">
                {`Vrijeme: ${Math.floor(elapsedTime / 60)}:${(elapsedTime % 60).toString().padStart(2, '0')}`}
            </Typography>
            <Button component={Link}
                to={'/dashboard/three'} variant="contained" color="primary" style={{ marginTop: '20px' }}
                onClick={handleFinishQuiz}
            >
                Završi
            </Button>
        </>
    );
};

export default EndQuizScreen;