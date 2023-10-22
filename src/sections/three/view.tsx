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
import PagingComponent from 'src/components/paging/paging-component';
import { AuthContext } from 'src/auth/context/jwt';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoadingScreen } from 'src/components/loading-screen';
import QuizResultsModal, { QuizResultsModalProps } from 'src/components/quiz-results-modal/QuizResultsModal';
import useFetchQuizzes from 'src/hooks/use-quiz-data';
import dayjs from 'dayjs';

export default function ThreeView() {
  const settings = useSettingsContext();
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;
  const auth = useContext(AuthContext);
  const [selectedQuizResult, setSelectedQuizResult] = useState<QuizResultsModalProps['quizResults']>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    isLoadingResolved,
    isLoadingUnresolved,
    resolvedQuizzes,
    unresolvedQuizzes,
    deleteQuiz,
    isDeleting,
    fetchQuizzes
  } = useFetchQuizzes(currentPage, itemsPerPage);

  const [rewardStatus, setRewardStatus] = useState<Record<string, boolean>>({});


  const openModal = (quizData: QuizResultsModalProps['quizResults']) => {
    setSelectedQuizResult(quizData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (unresolvedQuizzes) {
      const newRewardStatus: Record<string, boolean> = {};
      unresolvedQuizzes.forEach((data) => {
        const today = dayjs();
        const createdAt = dayjs(data.createdAt);
        const diffInDays = today.diff(createdAt, 'day');
        newRewardStatus[data._id] = diffInDays <= 3;
      });
      setRewardStatus(newRewardStatus);
    }
  }, [unresolvedQuizzes]);

  useEffect(() => {
    fetchQuizzes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const formattedDateTaken = selectedQuizResult
    ? new Date(selectedQuizResult.dateTaken).toLocaleString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    : "";

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
      <QuizResultsModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        quizResults={selectedQuizResult}
        formattedDateTaken={formattedDateTaken}
      />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h2" color={theme.palette.primary.main}>Kvizovi</Typography>

        {auth.user && auth.user.email === 'antonio@test.com' && (
          <Button variant="contained" color="primary" component={Link}
            to={'/dashboard/createQuiz '}>
            Create Quiz
          </Button>
        )}
      </Box>

      <SectionWrapper title="Riješeni Kvizovi">
        <ScrollableContainer>
          {!!resolvedQuizzes?.length && !isLoadingResolved && (
            resolvedQuizzes.map((data: any, index) => (
              <Box key={index} sx={{
                flex: '0 0 auto', m: 0, width: '100%', maxWidth: '250px', transition: 'transform .2s',
                "&:hover": {
                  transform: 'scale(1.05)',
                }
              }}>
                <CustomCardSmall
                  width='96%' height='100%'
                  imgUrl={data?.quiz?.thumbnail}
                  cardText={data?.quiz?.title}
                  onCardClick={() => openModal(data)}
                />
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
        <StatusCard icon={<CheckIcon fontSize="large" sx={{ color: green[500], display: { xs: 'none', sm: 'inline' } }} />} number={21} text="Rjesen!" />
        <StatusCard icon={<CloseIcon fontSize="large" sx={{ color: red[500], display: { xs: 'none', sm: 'inline' } }} />} number={25} text="Jos Cekaju!" />
      </Box>
      <SectionWrapper title="Preostali kvizovi">
        <Grid container spacing={2}>
          {!!unresolvedQuizzes?.length && !isLoadingUnresolved && (

            unresolvedQuizzes.map((data, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
                <Box sx={{
                  transition: 'transform .2s',
                  "&:hover": {
                    transform: 'scale(1.05)',
                  }
                }}>
                  <CustomCard isRewarded={rewardStatus} quizId={data._id} createdAt={data.createdAt} onDeleteQuiz={deleteQuiz} imgUrl={data.thumbnail} cardText={data.title!} cardId={data?._id} availableUntil={data.availableUntil} linkTo={`/dashboard/editQuiz/${data?._id}`} isQuiz={true} />
                </Box>
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
          {isDeleting && (
            <LoadingScreen />
          )}
        </Grid>
      </SectionWrapper>

    </Container>
  );
}
