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
                {`Imate ${answers.filter((answer: string, index: any) => answer === dummyQuiz.questions[index]?.correctAnswer).length} točnih od ${dummyQuiz.questions.length}`}
            </Typography>
            <Button component={Link}
                to={'/dashboard/three'} variant="contained" color="primary" style={{ marginTop: '20px' }}>
                Završi
            </Button>
        </>
    );
};

export default EndQuizScreen;