import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Container,
  Typography,
  Select,
  MenuItem,
  Avatar,
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useSettingsContext } from 'src/components/settings';
import useFetchQuizzes from 'src/hooks/use-quiz-data';
import { QuizResult } from 'src/types';
import icon from '../../assets/illustrations/vatroslav_upute_2.jpg';

export default function QuizResults() {
  const settings = useSettingsContext();
  const { fetchAllQuizzes, allQuizzes, getResultsById, resultsById } =
    useFetchQuizzes();
  const [selectedQuiz, setSelectedQuiz] = useState('');

  useEffect(() => {
    (async () => {
      await fetchAllQuizzes();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedQuiz) {
      (async () => {
        await getResultsById(selectedQuiz, 1, 5);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedQuiz]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant='h3' color={'primary'}>
        Rezultati Kvizova
      </Typography>
      <Select
        displayEmpty
        value={selectedQuiz}
        onChange={(e) => setSelectedQuiz(e.target.value as string)}
        variant='outlined'
        size='small'
        sx={{ my: 2 }}
      >
        <MenuItem value='' disabled>
          Izaberi svoj kviz
        </MenuItem>
        {allQuizzes?.map((quiz) => (
          <MenuItem key={quiz._id} value={quiz._id}>
            {quiz.title}
          </MenuItem>
        ))}
      </Select>

      <Box sx={{ mt: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Korisničko Ime</TableCell>
                <TableCell>Rezultat</TableCell>
                <TableCell>Riješen</TableCell>
                <TableCell>Datum</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedQuiz ? (
                resultsById?.map((result: QuizResult) => (
                  <TableRow key={result._id}>
                    <TableCell>
                      <Box display={'flex'} justifyContent={'center'}>
                        <Avatar
                          src={
                            result.userId.photoURL
                              ? result.userId.photoURL
                              : icon
                          }
                          alt='User Image'
                          sx={{
                            width: 65,
                            height: 65,
                            border: '2px solid white',
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>{result.userId.username}</TableCell>
                    <TableCell>{Math.round(result.score)} %</TableCell>
                    <TableCell>
                      {dayjs(result.dateTaken).format('MMMM D, YYYY h:mm A')}
                    </TableCell>
                    <TableCell>{result.duration} s</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align='center'>
                    Izaberi kviz da vidiš rezultate
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
