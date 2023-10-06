import { useSettingsContext } from 'src/components/settings';
import { Container, Typography, Box, Grid, Button, useMediaQuery, } from '@mui/material';
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

export default function ThreeView() {
  const settings = useSettingsContext();
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [resolvedQuizzes, setResolvedQuizzes] = useState<Quiz[]>();
  const [unresolvedQuizzes, setUnresolvedQuizzes] = useState<Quiz[]>();
  const itemsPerPage = 5;

  useEffect(() => {
    fetchResolvedQuizzes();
    fetchUnresolvedQuizzes();
  }, [currentPage]);

  useEffect(() => {
    // Calculating totalPages based on the total number of resolved quizzes
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

  const fetchUnresolvedQuizzes = async () => {
    try {
      const response = await axios.get(`${endpoints.quiz.unresolved}?page=${currentPage}&limit=${itemsPerPage}`);
      setUnresolvedQuizzes(response.data.unresolvedQuizzes);
    } catch (error) {
      console.error('Error fetching unresolved quizzes' + error);
      setUnresolvedQuizzes([]);
    }
  };

  const fetchResolvedQuizzes = async () => {
    try {
      const response = await axios.get(`${endpoints.quiz.resolved}?page=${currentPage}&limit=${itemsPerPage}`);
      setResolvedQuizzes(response.data.resolvedQuizzes);
    } catch (error) {
      console.error('Error fetching resolved quizzes' + error);
      setResolvedQuizzes([]);
    }
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h2" color={theme.palette.primary.main}>Kvizovi</Typography>
      <SectionWrapper title="Riješeni Kvizovi">
        <ScrollableContainer>
          {Array.isArray(resolvedQuizzes) && resolvedQuizzes.length > 0 ? (
            resolvedQuizzes.map((data: any, index) => (
              <Box key={index} sx={{ width: '100%', maxWidth: '300px', mx: 1 }} >
                <CustomCardSmall width='100%' height='90%' imgUrl={data?.quiz?.thumbnail} cardText={data?.quiz?.title} quizResults={data} />
              </Box>
            ))
          ) : (
            <Typography variant="body1" align="center" color="textSecondary" m={5}>
              Zasada nema riješenih kvizova!
            </Typography>
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
        <StatusCard icon={<CheckIcon fontSize="large" sx={{ color: green[500], display: { xs: 'none', sm: 'inline' } }} />} number={21} text="Rjesen!" />
        <StatusCard icon={<CloseIcon fontSize="large" sx={{ color: red[500], display: { xs: 'none', sm: 'inline' } }} />} number={25} text="Jos Cekaju!" />
      </Box>
      <SectionWrapper title="Preostali kvizovi">
        <Grid container spacing={2}>
          {Array.isArray(unresolvedQuizzes) && unresolvedQuizzes.length > 0 ? (
            unresolvedQuizzes.map((data, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
                <CustomCard imgUrl={data.thumbnail} cardText={data.title!} cardId={data?._id} availableUntil={data.availableUntil} />
              </Grid>
            ))
          ) : (
            <Typography variant="body1" align="center" color="textSecondary" m={5}>
              Čestitam! Svi kvizovi su riješeni! Obavjestiti ćemo te čim izađe novi kviz.
            </Typography>
          )}
        </Grid>
      </SectionWrapper>
    </Container>
  );
}
