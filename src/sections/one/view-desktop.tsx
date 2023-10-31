import { Box, Button, Container, Divider, Grid, Skeleton } from '@mui/material';
import ScrollableContainer from 'src/components/scrollable-container/scrollable-container';
import { DashboardSectionWrapper } from 'src/components/section-wrapper/dashboard-section-wrapper';
import CustomCard from 'src/components/custom-card/custom-card';
import CustomCardSmall from 'src/components/custom-card/custom-card-small';
import useCardData from 'src/hooks/use-card-data';
import AppFeatured from 'src/components/feautred-carousel/app-featured';
import { useSettingsContext } from 'src/components/settings';
import useFetchQuizzes from 'src/hooks/use-quiz-data';
import { useEffect } from 'react';
import useVoting from 'src/hooks/use-voting-data';
import AppWelcome from 'src/components/overview/app-welcome';
import SeoIllustration from 'src/assets/illustrations/seo-illustration';
import AppCurrentDownload from 'src/components/collection-chart/app-current-download';
import { SkeletonDashboardLoader } from 'src/components/skeleton-loader/skeleton-loader-dashboard';
import useDashboardData from 'src/hooks/use-dashboard-data';
import { CollectionStickerItem } from 'src/components/collection-sticker/collection-sticker-item';
import { paths } from 'src/routes/paths';


export const DesktopViewOne = () => {
  const { collectedCards, isCardLoading, fetchCollectedCards } = useCardData();
  const { chartData, fetchDashboardData } = useDashboardData();
  const { isLoadingUnresolved, unresolvedQuizzes, fetchQuizzes } =
    useFetchQuizzes(1, 4);
  const { votings, fetchAllVotings, deleteVoting } = useVoting();
  const settings = useSettingsContext();

  const featuredAppsList = [
    {
      id: '1',
      title: 'Vatreni Challange',
      coverUrl: 'assets/images/mandzukicPerisic.jpg',
      description: 'Novi Kviz je dostupan!!!',
    },
    {
      id: '2',
      title: 'Najbolji golman',
      coverUrl: 'assets/images/doha_medalje.png',
      description: 'Novo Glasanje je dostupno!!',
    },
  ];

  // Kada zavrsimo dashboard endpoint u backend cemo ovo refactorat da je sve jedan call
  useEffect(() => {
    fetchDashboardData();
    fetchCollectedCards();
    fetchQuizzes();
    fetchAllVotings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <AppWelcome
            title={`Dobrodošao 👋, \n Matej`}
            description="If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything."
            img={<SeoIllustration />}
            action={
              <Button variant="contained" color="primary">
                Istraži
              </Button>
            }
          />
        </Grid>
        <Grid item xs={4} md={4}>
          <AppFeatured list={featuredAppsList} />
        </Grid>
      </Grid>
      <Grid container spacing={3} my={5} alignItems="center" justifyContent="center" borderRadius={1}>
        <Grid item xl={12} container   >
          <DashboardSectionWrapper title={'Kolekcija'} link='dashboard/two'>
            <ScrollableContainer>
              {isCardLoading ? (
                <SkeletonDashboardLoader count={8} maxWidth="175px" />
              ) : collectedCards?.length ? (
                collectedCards.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      flex: '0 0 auto',
                      width: '100%',
                      maxWidth: '175px',
                      height: '35vh',
                      m: 1,
                    }}
                  >
                    <CollectionStickerItem item={item} />
                  </Box>
                ))
              ) : (
                <SkeletonDashboardLoader count={8} maxWidth="175px" />
              )}
            </ScrollableContainer>
            <Divider sx={{ margin: "16px 0" }} />
          </DashboardSectionWrapper>
        </Grid>
      </Grid>
      <Grid container spacing={3} mt={3} sx={{ justifyContent: 'center' }}>
        <Grid
          item
          xs={12}
          sx={{
            borderRadius: 2,
            m: '4px',
          }}
        >
          {chartData && (
            <AppCurrentDownload
              chart={{
                series: chartData.categories.map((category, index) => ({
                  label: category,
                  value: chartData.series[index],
                })),
              }}
            />
          )}
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={3} sx={{ justifyContent: 'center' }}>
        <Grid
          item
          xs={12}
          sx={{
            borderRadius: 2,
            m: '4px',
          }}
        >
          <DashboardSectionWrapper title='Kvizovi' link='dashboard/three'>
            <ScrollableContainer>
              {isLoadingUnresolved ? (
                <SkeletonDashboardLoader count={4} maxWidth='320px' />
              ) : unresolvedQuizzes?.length ? (
                unresolvedQuizzes.map((quiz, index) => (
                  <CustomCardSmall
                    key={index}
                    imgUrl={quiz.thumbnail}
                    width='96%'
                    cardText={quiz.title}
                    linkTo={`/dashboard/quiz/${quiz._id}`}
                  />
                ))
              ) : (
                <SkeletonDashboardLoader count={4} maxWidth='320px' />
              )}
            </ScrollableContainer>
          </DashboardSectionWrapper>
        </Grid>
        <Grid
          item
          md={12}
          sx={{
            borderRadius: 2,
            w: '100%',
            m: '4px',
          }}
        >
          <DashboardSectionWrapper title='Glasanja' link='dashboard/five'>
            <ScrollableContainer>
              {isCardLoading ? (
                <SkeletonDashboardLoader count={4} maxWidth='320px' />
              ) : votings?.length ? (
                votings.map((voting, index) => (
                  <CustomCard
                    key={index}
                    cardId={voting._id}
                    votingId={voting._id}
                    imgUrl={voting.thumbnail}
                    cardText={voting.title}
                    onDelete={deleteVoting}
                    linkTo={`${paths.dashboard.voting.vote}/${voting._id}`}
                    linkToEdit={`${paths.dashboard.voting.editVoting}/${voting._id}`}
                  />
                ))
              ) : (
                <SkeletonDashboardLoader count={4} maxWidth='320px' />
              )}
            </ScrollableContainer>
          </DashboardSectionWrapper>
        </Grid>
      </Grid>
    </Container>
  );
};
