import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Quiz } from './types'; // Assuming the Quiz type is in types.ts or types.tsx


interface EndQuizScreenProps {
    dummyQuiz: Quiz;
    answers: string[];
}


const EndQuizScreen = ({ dummyQuiz, answers }: EndQuizScreenProps) => {
    return (
        <>
            <Typography variant="h6">
                {`You scored ${answers.filter((answer: string, index: any) => answer === dummyQuiz.questions[index]?.correctAnswer).length} out of ${dummyQuiz.questions.length}`}
            </Typography>
            <Button component={Link}
                to={'/dashboard/three'} variant="contained" color="primary" style={{ marginTop: '20px' }}>
                Finish
            </Button>
        </>
    );
};

export default EndQuizScreen;