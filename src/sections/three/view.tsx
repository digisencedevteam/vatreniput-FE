import { useSettingsContext } from 'src/components/settings';
import { Container, Typography, Box, Grid, Button } from '@mui/material';
import CustomCard from 'src/components/custom-card/custom-card';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { green, red } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import ScrollableContainer from 'src/components/scrollable-container/scrollable-container';
import StatusCard from 'src/components/status-card/status-card';
import SectionWrapper from 'src/components/section-wrapper/section-wrapper';
import CustomCardSmall from 'src/components/custom-card/custom-card-small';
import { useEffect, useState } from 'react';
import { Quiz } from '../quiz/types';
import axios, { endpoints } from 'src/utils/axios';
import PagingComponent from 'src/components/paging/paging-component';
import { AuthContext } from 'src/auth/context/jwt';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoadingScreen } from 'src/components/loading-screen';
import { useTimerContext } from 'src/context/timer-context';

export default function ThreeView() {
  const settings = useSettingsContext();
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingResolved, setIsLoadingResolved] = useState(false);
  const [isLoadingUnresolved, setIsLoadingUnresolved] = useState(false);
  const [resolvedQuizzes, setResolvedQuizzes] = useState<Quiz[]>();
  const [unresolvedQuizzes, setUnresolvedQuizzes] = useState<Quiz[]>();
  const itemsPerPage = 5;
  const auth = useContext(AuthContext);
  const [resolvedCount, setResolvedCount] = useState<number>(0);
  const [unresolvedCount, setUnresolvedCount] = useState<number>(0);

  useEffect(() => {
    const fetchUnresolvedQuizzes = async () => {
      setIsLoadingUnresolved(true);
      try {
        const response = await axios.get(`${endpoints.quiz.unresolved}?page=${currentPage}&limit=${itemsPerPage}`);
        setUnresolvedQuizzes(response.data.unresolvedQuizzes);
        setUnresolvedCount(response.data.unresolvedQuizzes.length);
      } catch (error) {
        console.error('Error fetching unresolved quizzes' + error);
        setUnresolvedQuizzes([]);
        setUnresolvedCount(0);
      }
      setIsLoadingUnresolved(false);
    };

    const fetchResolvedQuizzes = async () => {
      setIsLoadingResolved(true);
      try {
        const response = await axios.get(`${endpoints.quiz.resolved}?page=${currentPage}&limit=${itemsPerPage}`);
        setResolvedQuizzes(response.data.resolvedQuizzes);
        setResolvedCount(response.data.resolvedQuizzes.length);
      } catch (error) {
        console.error('Error fetching resolved quizzes' + error);
        setResolvedQuizzes([]);
        setResolvedCount(0);
      }
      setIsLoadingResolved(false);
    };

    fetchResolvedQuizzes();
    fetchUnresolvedQuizzes();
  }, [currentPage]);

  useEffect(() => {
    if (resolvedQuizzes) {
      const totalResolvedQuizzes = resolvedQuizzes.length;
      setTotalPages(Math.ceil(totalResolvedQuizzes / itemsPerPage));
    }
  }, [resolvedQuizzes]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h2" color={theme.palette.primary.main}>Kvizovi</Typography>

        {auth.user && auth.user.email === 'antonio@test.com' && (
          <Button variant="contained" color="primary" component={Link}
            to={'/dashboard/createQuiz '}>
            Kreiraj Novi Kviz
          </Button>
        )}
      </Box>

      <SectionWrapper title="Riješeni Kvizovi">
        <ScrollableContainer>
          {!!resolvedQuizzes?.length && !isLoadingResolved && (
            resolvedQuizzes.map((data: any, index) => (
              <Box key={index} sx={{ width: '90%', maxWidth: '300px', minWidth: '300px', mx: 1 }} >
                <CustomCardSmall width='100%' height='90%' imgUrl={data?.quiz?.thumbnail} cardText={data?.quiz?.title} quizResults={data} />
              </Box>
            ))
          )}
          {!resolvedQuizzes?.length && !isLoadingResolved && (
            <Typography variant="body1" align="center" color="textSecondary" m={5}>
              Zasada nema riješenih kvizova!
            </Typography>
          )}
          {isLoadingResolved && (
            <LoadingScreen />
          )}
        </ScrollableContainer>
        {totalPages > 1 && (
          <PagingComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </SectionWrapper>
      <Box borderRadius={2} p={2} mt={2} sx={{
        bgcolor: theme.palette.background.default,
        [theme.breakpoints.up('md')]: {
          bgcolor: theme.palette.background.neutral
        },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <StatusCard icon={<CheckIcon fontSize="large" sx={{ color: green[500], display: { xs: 'none', sm: 'inline' } }} />} number={resolvedCount} text="Riješenih" />
        <StatusCard icon={<CloseIcon fontSize="large" sx={{ color: red[500], display: { xs: 'none', sm: 'inline' } }} />} number={unresolvedCount} text="Dostupnih" />
      </Box>
      <SectionWrapper title="Preostali kvizovi">
        <Grid container spacing={2}>
          {!!unresolvedQuizzes?.length && !isLoadingUnresolved && (
            unresolvedQuizzes.map((data, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
                <CustomCard imgUrl={data.thumbnail} cardText={data.title!} cardId={data?._id} availableUntil={data.availableUntil} isQuiz={true} />
              </Grid>
            ))
          )}

          {!unresolvedQuizzes?.length && !isLoadingUnresolved && (
            <Typography variant="body1" align="center" color="textSecondary" m={5}>
              Čestitam! Svi kvizovi su riješeni! Obavjestiti ćemo te čim izađe novi kviz.
            </Typography>
          )}

          {isLoadingUnresolved && (
            <LoadingScreen />
          )}

        </Grid>
      </SectionWrapper>
    </Container>
  );
}
