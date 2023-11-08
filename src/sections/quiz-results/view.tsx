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
  Pagination,
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useSettingsContext } from 'src/components/settings';
import useFetchQuizzes from 'src/hooks/use-quiz-data';
import { QuizResult } from 'src/types';
import icon from '../../assets/illustrations/vatroslav_upute_2.jpg';
import duration from 'dayjs/plugin/duration';
import TableSkeleton from 'src/components/skeleton-loader/table-skeleton';
dayjs.extend(duration);

const NoResultLayout = ({ message }: { message: string }) => (
  <Box
    display='flex'
    flexDirection='column'
    alignItems='center'
    justifyContent='center'
    height='100%'
    padding={2}
  >
    <Box mb={2}>
      <img
        src='https://res.cloudinary.com/dzg5kxbau/image/upload/v1695824037/vatroslav_upute_2_xjcpuj.png'
        alt='Instruction'
        style={{ width: '200px', height: 'auto' }}
      />
    </Box>
    <Typography variant='h3' color='primary'>
      {message}
    </Typography>
  </Box>
);

const QuizResults = () => {
  const settings = useSettingsContext();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    fetchAllQuizzes,
    allQuizzes,
    getResultsById,
    resultsById,
    totalPages,
    isResultsLoading,
  } = useFetchQuizzes(currentPage, 5);
  const [selectedQuiz, setSelectedQuiz] = useState('');

  useEffect(() => {
    (async () => {
      await fetchAllQuizzes();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    if (selectedQuiz) {
      getResultsById(selectedQuiz, currentPage, 5);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedQuiz, currentPage]);

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
          Izaberi kviz
        </MenuItem>
        {allQuizzes?.map((quiz) => (
          <MenuItem key={quiz._id} value={quiz._id}>
            {quiz.title}
          </MenuItem>
        ))}
      </Select>
      <Box sx={{ mt: 2 }}>
        {isResultsLoading && <TableSkeleton />}
        {!isResultsLoading && (
          <>
            {selectedQuiz ? (
              resultsById && resultsById.length > 0 ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Korisničko Ime</TableCell>
                        <TableCell>Rezultat</TableCell>
                        <TableCell>Riješen na datum</TableCell>
                        <TableCell>Prolazno vrijeme</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {resultsById.map((result: QuizResult) => (
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
                            {dayjs(result.dateTaken).format('DD/MM/YYYY')}
                          </TableCell>
                          <TableCell>
                            {dayjs
                              .duration(result.duration * 1000)
                              .format('m:ss')}{' '}
                            minuta
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <NoResultLayout message='Kviz nema rezultate' />
              )
            ) : (
              <TableSkeleton
                imageURL='https://res.cloudinary.com/dzg5kxbau/image/upload/v1695824037/vatroslav_upute_2_xjcpuj.png'
                message='Izaberi kviz da vidiš rezultate!'
              />
            )}
          </>
        )}
        {resultsById && resultsById.length > 4 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default QuizResults;
