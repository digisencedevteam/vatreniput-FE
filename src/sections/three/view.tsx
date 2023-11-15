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
import QuizResultsModal, {
  QuizResultsModalProps,
} from 'src/components/quiz-results-modal/QuizResultsModal';
import useFetchQuizzes from 'src/hooks/use-quiz-data';
import dayjs from 'dayjs';
import QuizBestOverview from 'src/components/quiz-results-modal/quiz-best-overview';
import { userRoles } from 'src/lib/constants';
import { paths } from 'src/routes/paths';
import { SkeletonDashboardLoader } from 'src/components/skeleton-loader/skeleton-loader-dashboard';
import SkeletonOverviewResults from 'src/components/skeleton-loader/skeleton-overview-results';
import { useResponsive } from 'src/hooks/use-responsive';
import AppWelcome from 'src/components/overview/app-welcome';
import SeoIllustration from 'src/assets/illustrations/seo-illustration';

const ThreeView = () => {
  const settings = useSettingsContext();
  const theme = useTheme();
  const isMobile = useResponsive('down', 'md');
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
    fetchQuizzes,
  } = useFetchQuizzes(currentPage, itemsPerPage);
  const [rewardStatus, setRewardStatus] = useState<Record<string, boolean>>({});
  const totalResolved = resolvedQuizzes ? resolvedQuizzes.length : 0;
  const totalUnresolved = unresolvedQuizzes ? unresolvedQuizzes.length : 0;
  const openModal = (quizData: QuizResultsModalProps['quizResults']) => {
    setSelectedQuizResult(quizData);
    setIsModalOpen(true);
  };

  const buttonProps =
    auth.user && auth.user.role === userRoles.admin
      ? {
          buttonLabel: 'Kreiraj novi kviz',
          buttonLink: `${paths.dashboard.quizGroup.createQuiz}`,
        }
      : {
          buttonLabel: 'Pravila i Nagrade Kvizova',
          buttonLink: `${paths.quizRewardInfo}`,
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
      {isMobile ? (
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
                    backgroundColor: (theme) =>
                      theme.palette.background.default,
                    opacity: 0.8,
                  },
                }}
              >
                Pravila i Nagrade Kvizova
              </Button>
            ))}
        </Box>
      ) : (
        <Grid item>
          <AppWelcome
            title={`Dobrodošli na kvizove`}
            description={`Zaronite u uzbudljivi svijet naših kvizova! Jeste li spremni testirati svoje vještine i zauzeti mjesto među pobjednicima? Pridružite se sada i neka igre počnu!`}
            img={
              <SeoIllustration imageUrl='https://res.cloudinary.com/dzg5kxbau/image/upload/v1698661449/VATROSLAV-vatrene_price-removebg-preview_pa5j2e.png' />
            }
            buttonLabel={buttonProps.buttonLabel}
            buttonLink={buttonProps.buttonLink}
          />
        </Grid>
      )}
      <Grid item xs={12} md={6} lg={8} sx={{ marginY: 5 }}>
        {isLoadingResolved ? (
          <SkeletonOverviewResults />
        ) : resolvedQuiz && resolvedQuiz.length > 0 ? (
          <QuizBestOverview title='Najnoviji rezultati' data={resolvedQuiz} />
        ) : (
          <SkeletonOverviewResults message='Trenutno nema riješenih kvizova. Riješi neki od dostupnih kako bi vidio svoje rezultate!' />
        )}
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
              color='success'
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
              color='error'
              sx={{ display: { xs: 'none', sm: 'inline' } }}
            />
          }
          number={totalUnresolved}
          text='Dostupnih!'
        />
      </Box>
      <SectionWrapper title='Dostupni'>
        <Grid container spacing={2}>
          {isLoadingUnresolved ? (
            <SkeletonDashboardLoader
              isMobileCount={2}
              count={4}
              isTabletCount={3}
            />
          ) : !!unresolvedQuizzes?.length ? (
            unresolvedQuizzes.map((data, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
                <Box>
                  <CustomCard
                    quizId={data._id}
                    onDelete={deleteQuiz}
                    imgUrl={data.thumbnail}
                    cardText={data.title}
                    cardId={data._id}
                    availableUntil={data.availableUntil}
                    linkTo={`${paths.dashboard.quizGroup.quiz}/${data._id}`}
                    linkToEdit={`${paths.dashboard.quizGroup.editQuiz}/${data._id}`}
                    createdAt={data.createdAt}
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
            ))
          ) : (
            <SkeletonDashboardLoader
              message='Svi kvizovi su riješeni! Obavjestiti ćemo te čim izađe novi kviz. Pripremi se za novo nadmetanje uma!'
              count={4}
              isMobileCount={3}
              isTabletCount={4}
              maxWidth={isMobile ? '90px' : '200px'}
            />
          )}
        </Grid>
      </SectionWrapper>
      <SectionWrapper title='Riješeni'>
        {isLoadingResolved ? (
          <SkeletonDashboardLoader
            isMobileCount={3}
            isTabletCount={4}
            count={5}
          />
        ) : !!resolvedQuizzes?.length ? (
          <ScrollableContainer childrenCount={resolvedQuizzes.length}>
            {resolvedQuizzes.map((data: any, index) => (
              <Box
                key={index}
                sx={{
                  flex: '0 0 auto',
                  m: 0,
                  width: '100%',
                  maxWidth: '250px',
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
          </ScrollableContainer>
        ) : (
          <SkeletonDashboardLoader
            message='Još nije riješen nijedan kviz! Pokaži što znaš i osvoji fantastične nagrade koje te čekaju.'
            count={6}
            isMobileCount={3}
            maxWidth={isMobile ? '90px' : '200px'}
          />
        )}
        {totalPages > 1 && (
          <PagingComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </SectionWrapper>
    </Container>
  );
};
export default ThreeView;
