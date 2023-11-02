import { useSettingsContext } from 'src/components/settings';
import { Container, Typography, Box, Grid, Button } from '@mui/material';
import CustomCard from 'src/components/custom-card/custom-card';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
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
import QuizResultsModal, {
  QuizResultsModalProps,
} from 'src/components/quiz-results-modal/QuizResultsModal';
import useFetchQuizzes from 'src/hooks/use-quiz-data';
import dayjs from 'dayjs';
import { QuizBestOverview } from 'src/components/quiz-results-modal/quiz-best-overview';
import { userRoles } from 'src/lib/constants';
import { paths } from 'src/routes/paths';

const ThreeView = () => {
  const settings = useSettingsContext();
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;
  const auth = useContext(AuthContext);
  const [selectedQuizResult, setSelectedQuizResult] =
    useState<QuizResultsModalProps['quizResults']>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    isLoadingResolved,
    isLoadingUnresolved,
    resolvedQuizzes,
    unresolvedQuizzes,
    deleteQuiz,
    isDeleting,
    fetchQuizzes,
  } = useFetchQuizzes(currentPage, itemsPerPage);
  const [rewardStatus, setRewardStatus] = useState<Record<string, boolean>>({});
  const totalResolved = resolvedQuizzes ? resolvedQuizzes.length : 0;
  const totalUnresolved = unresolvedQuizzes ? unresolvedQuizzes.length : 0;
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
  const resolvedQuiz = resolvedQuizzes?.map((quiz, index) => ({
    label: quiz,
    totalAmount: quiz.score,
    value: quiz.duration,
  }));

  useEffect(() => {
    fetchQuizzes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const formattedDateTaken = selectedQuizResult
    ? new Date(selectedQuizResult.dateTaken).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

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
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        sx={{ marginTop: 1 }}
      >
        <Typography
          sx={{ margin: 1 }}
          variant='h2'
          color={theme.palette.primary.main}
        >
          Kvizovi
        </Typography>

        {auth.user &&
          (auth.user.role === userRoles.admin ? (
            <Button
              variant='contained'
              color='primary'
              component={Link}
              to={`${paths.dashboard.quizGroup.createQuiz}`}
            >
              Kreiraj novi kviz
            </Button>
          ) : (
            <Button
              variant='contained'
              component={Link}
              to={`${paths.quizRewardInfo}`}
              sx={{
                backgroundColor: (theme) => theme.palette.background.default,
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                color:
                  theme.palette.mode === 'dark'
                    ? theme.palette.text.primary
                    : theme.palette.text.primary,
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.background.default,
                  opacity: 0.8,
                },
              }}
            >
              Pravila i Nagrade Kvizova
            </Button>
          ))}
      </Box>
      <Grid item xs={12} md={6} lg={8} sx={{ marginY: 5 }}>
        <QuizBestOverview title='Najnoviji rezultati' data={resolvedQuiz} />
      </Grid>
      <Box
        borderRadius={2}
        p={2}
        sx={{
          bgcolor: theme.palette.background.default,
          [theme.breakpoints.up('md')]: {
            bgcolor: theme.palette.background.neutral,
          },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <StatusCard
          icon={
            <CheckIcon
              fontSize='large'
              sx={{ display: { xs: 'none', sm: 'inline' } }}
            />
          }
          number={totalResolved}
          text='Riješenih!'
        />
        <StatusCard
          icon={
            <CloseIcon
              fontSize='large'
              sx={{ display: { xs: 'none', sm: 'inline' } }}
            />
          }
          number={totalUnresolved}
          text='Dostupnih!'
        />
      </Box>
      <SectionWrapper title='Riješeni'>
        <ScrollableContainer>
          {!!resolvedQuizzes?.length &&
            !isLoadingResolved &&
            resolvedQuizzes.map((data: any, index) => (
              <Box
                key={index}
                sx={{
                  flex: '0 0 auto',
                  m: 0,
                  width: '100%',
                  maxWidth: '250px',
                  transition: 'transform .2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <CustomCardSmall
                  width='96%'
                  height='100%'
                  imgUrl={data?.quiz?.thumbnail}
                  cardText={data?.quiz?.title}
                  onCardClick={() => openModal(data)}
                />
              </Box>
            ))}
          {!resolvedQuizzes?.length && !isLoadingResolved && (
            <Typography
              variant='body1'
              align='center'
              color='textSecondary'
              m={5}
            >
              Za sada nema riješenih kvizova!
            </Typography>
          )}
          {isLoadingResolved && <LoadingScreen />}
        </ScrollableContainer>
        {totalPages > 1 && (
          <PagingComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </SectionWrapper>
      <SectionWrapper title='Dostupni'>
        <Grid container spacing={2}>
          {!!unresolvedQuizzes?.length &&
            !isLoadingUnresolved &&
            unresolvedQuizzes.map((data, index) => {
              return (
                <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
                  <Box
                    sx={{
                      transition: 'transform .2s',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <CustomCard
                      quizId={data._id}
                      onDelete={deleteQuiz}
                      imgUrl={data.thumbnail}
                      cardText={data.title!}
                      cardId={data?._id}
                      availableUntil={data.availableUntil}
                      linkTo={`${paths.dashboard.quizGroup.quiz}/${data?._id}`}
                      linkToEdit={`${paths.dashboard.quizGroup.editQuiz}/${data?._id}`}
                      createdAt={data?.createdAt}
                      status={
                        data.status && data.status.length > 0
                          ? data.status[0].status
                          : undefined
                      }
                      startTime={
                        data.status && data.status.length > 0
                          ? data.status[0].startTime
                          : undefined
                      }
                      isRewarded={rewardStatus}
                    />
                  </Box>
                </Grid>
              );
            })}

          {!unresolvedQuizzes?.length && !isLoadingUnresolved && (
            <Typography
              variant='body1'
              align='center'
              color='textSecondary'
              m={5}
            >
              Čestitam! Svi kvizovi su riješeni! Obavjestiti ćemo te čim izađe
              novi kviz.
            </Typography>
          )}
          {isLoadingUnresolved && <LoadingScreen />}
          {isDeleting && <LoadingScreen />}
        </Grid>
      </SectionWrapper>
    </Container>
  );
};
export default ThreeView;
