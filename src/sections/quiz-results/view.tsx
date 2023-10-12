// Import necessary MUI components
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, alpha } from '@mui/material';
// Other imports
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useContext, useState } from 'react';
import { AuthContext } from 'src/auth/context/jwt';
import { useSettingsContext } from 'src/components/settings';

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
        _id: '651d37ce850693c3316c1338',
        userId: '651d37ce850693c3316c1279',
        quizId: '651d37ce850693c3316c1335',
        score: 60,
        dateTaken: '2023-10-04T10:00:46.224+00:00',
        duration: 30,
        __v: 0,
    },
    {
        _id: '611d37ce850693c3316c1338',
        userId: '6551d37ce850693c3316c1279',
        quizId: '651d37ce850693c3316c1335',
        score: 60,
        dateTaken: '2023-10-04T10:00:46.224+00:00',
        duration: 30,
        __v: 0,
    },
    {
        _id: '621d37ce850693c3316c1338',
        userId: '651d37ce850693c3316c1279',
        quizId: '621d37ce850693c3316c1335',
        score: 60,
        dateTaken: '2023-10-04T10:00:46.224+00:00',
        duration: 30,
        __v: 0,
    },
    {
        _id: '651d37ce850693c3316c1338',
        userId: '651d37ce850693c3316c1279',
        quizId: '651d37ce850693c3316c1335',
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

    const filteredResults = quizResults.filter(result => {
        const quizMatches = result.quizId.includes(quizFilter);
        const userMatches = !showOnlyCurrentUser || (auth.user && auth.user._id === result.userId);
        return quizMatches && userMatches;
    });

    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
            <Typography variant="h3" color={'primary'}>Rezultati Kviza</Typography>
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
