import { Button, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'src/auth/context/jwt';
import { useSettingsContext } from 'src/components/settings';
import useFetchQuizzes from 'src/hooks/use-quiz-data';

interface QuizResult {
    _id: string;
    userId: string;
    quizId: string;
    score: number;
    dateTaken: string;
    duration: number;
    __v: number;
}

// Dummy data
const quizResults: QuizResult[] = [
    {
        _id: '651d37ce8506932332232323232c3316c1338',
        userId: '651d37ce850693c3316c1279',
        quizId: '651d37ce312312312850693c3316c1335',
        score: 60,
        dateTaken: '2023-10-04T10:00:46.224+00:00',
        duration: 30,
        __v: 0,
    },
    {
        _id: '611d37ce8506923232323c3316c1338',
        userId: '6551d37ce850693c3316c1279',
        quizId: '651d37ce32131321850693c3316c1335',
        score: 60,
        dateTaken: '2023-10-04T10:00:46.224+00:00',
        duration: 30,
        __v: 0,
    },
    {
        _id: '621d37ce82131212150693c3316c1338',
        userId: '651d37ce850693c3316c1279',
        quizId: '621d37c3213123e850693c3316c1335',
        score: 60,
        dateTaken: '2023-10-04T10:00:46.224+00:00',
        duration: 30,
        __v: 0,
    },
    {
        _id: '651d37ce850693c3313123123123123123216c1338',
        userId: '651d37ce850693c3316c1279',
        quizId: '651d37ce850693c3313213213126c1335',
        score: 60,
        dateTaken: '2023-10-04T10:00:46.224+00:00',
        duration: 30,
        __v: 0,
    },
];

export default function QuizResults() {
    const settings = useSettingsContext();
    const auth = useContext(AuthContext);
    const [quizFilter, setQuizFilter] = useState('');
    const [showOnlyCurrentUser, setShowOnlyCurrentUser] = useState(false);
    const {
        fetchAllQuizzes,
        allQuizzes,
        getResultsById,
        resultsById
    } = useFetchQuizzes();
    const [selectedQuiz, setSelectedQuiz] = useState(allQuizzes && allQuizzes.length > 0 ? allQuizzes[allQuizzes.length - 1]._id : '');

    useEffect(() => {
        fetchAllQuizzes();
    }, []);
    useEffect(() => {
        if (selectedQuiz) {
            getResultsById(selectedQuiz, 1, 10);
            console.log(resultsById);

        }
    }, [selectedQuiz]);


    useEffect(() => {
        if (allQuizzes && allQuizzes.length > 0) {
            setSelectedQuiz(allQuizzes[allQuizzes.length - 1]._id);
        }
    }, [allQuizzes]);


    const filteredResults = quizResults.filter(result => {
        const quizMatches = result.quizId.includes(quizFilter);
        const userMatches = !showOnlyCurrentUser || (auth.user && auth.user._id === result.userId);
        return quizMatches && userMatches;
    });

    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
            <Typography variant="h3" color={'primary'}>Rezultati Kviza</Typography>
            <Typography variant="h3" color={'primary'}>{allQuizzes && allQuizzes[0]._id}</Typography>
            <Select
                value={selectedQuiz}
                onChange={e => setSelectedQuiz(e.target.value as string)}
                variant="outlined"
                size="small"
            >
                {allQuizzes && allQuizzes.map(quiz => (
                    <MenuItem key={quiz._id} value={quiz._id}>
                        {quiz.title}
                    </MenuItem>
                ))}
            </Select>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                    label="Quiz ID"
                    value={quizFilter}
                    onChange={e => setQuizFilter(e.target.value)}
                    variant="outlined"
                    size="small"
                />
                <Button
                    variant="contained"
                    onClick={() => setShowOnlyCurrentUser(prev => !prev)}
                >
                    {showOnlyCurrentUser ? 'Show All Users' : 'Show Only My Results'}
                </Button>
            </Box>
            <Box sx={{ mt: 2 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>User</TableCell>
                                <TableCell>Quiz</TableCell>
                                <TableCell>Score</TableCell>
                                <TableCell>Date Taken</TableCell>
                                <TableCell>Duration</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredResults.map((result) => (
                                <TableRow
                                    key={result._id}
                                    sx={{
                                        backgroundColor: auth.user && auth.user._id === result.userId
                                            ? theme => alpha(theme.palette.primary.main, 0.3)
                                            : 'inherit'
                                    }}
                                >
                                    <TableCell>{result.userId}</TableCell>
                                    <TableCell>{result.quizId}</TableCell>
                                    <TableCell>{result.score} %</TableCell>
                                    <TableCell>{result.dateTaken}</TableCell>
                                    <TableCell>{result.duration}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
}
