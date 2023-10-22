import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Box, Container, Typography, Select, MenuItem } from '@mui/material';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'src/auth/context/jwt';
import { useSettingsContext } from 'src/components/settings';
import useFetchQuizzes from 'src/hooks/use-quiz-data';
import { QuizResult } from 'src/types';

export default function QuizResults() {
    const settings = useSettingsContext();
    const auth = useContext(AuthContext);
    const { fetchAllQuizzes, allQuizzes, getResultsById, resultsById } = useFetchQuizzes();
    const [selectedQuiz, setSelectedQuiz] = useState('');
    const [quizName, setQuizName] = useState('');

    useEffect(() => {
        (async () => {
            await fetchAllQuizzes();
        })();
    }, []);

    useEffect(() => {
        if (selectedQuiz) {
            (async () => {
                await getResultsById(selectedQuiz, 1, 5);
            })();
        }
    }, [selectedQuiz]);

    useEffect(() => {
        if (allQuizzes && allQuizzes.length > 0) {
            setSelectedQuiz(allQuizzes[allQuizzes.length - 1]._id);
        }
    }, [allQuizzes]);

    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
            <Typography variant="h3" color={'primary'}>Rezultati Kviza</Typography>

            <Select
                value={selectedQuiz}
                onChange={e => setSelectedQuiz(e.target.value as string)}
                variant="outlined"
                size="small"
            >
                {allQuizzes?.map(quiz => (
                    <MenuItem key={quiz._id} onClick={() => { setQuizName(quiz.title) }} value={quiz._id}>
                        {quiz.title}
                    </MenuItem>
                ))}
            </Select>
            <Typography variant="h3" color={'primary'}>{quizName}</Typography>
            <Box sx={{ mt: 2 }}>


                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>User</TableCell>
                                <TableCell>Score</TableCell>
                                <TableCell>Date Taken</TableCell>
                                <TableCell>Duration</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {resultsById?.map((result: QuizResult) => (

                                <TableRow key={result._id}>
                                    <TableCell>{result.userId.username}</TableCell>
                                    <TableCell>{result.score} %</TableCell>
                                    <TableCell>{dayjs(result.dateTaken).format('MMMM D, YYYY h:mm A')}</TableCell>
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
