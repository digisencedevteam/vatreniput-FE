import { Box, Container, Divider, Grid } from '@mui/material';
import ScrollableContainer from 'src/components/scrollable-container/scrollable-container';
import DashboardSectionWrapper from 'src/components/section-wrapper/dashboard-section-wrapper';
import CustomCard from 'src/components/custom-card/custom-card';
import CustomCardSmall from 'src/components/custom-card/custom-card-small';
import AppFeatured, {
  ItemProps,
} from 'src/components/feautred-carousel/app-featured';
import { useSettingsContext } from 'src/components/settings';
import { useEffect } from 'react';
import AppWelcome from 'src/components/overview/app-welcome';
import SeoIllustration from 'src/assets/illustrations/seo-illustration';
import AppCurrentDownload from 'src/components/collection-chart/app-current-download';
import { SkeletonDashboardLoader } from 'src/components/skeleton-loader/skeleton-loader-dashboard';
import useDashboardData from 'src/hooks/use-dashboard-data';
import { CollectionStickerItem } from 'src/components/collection-sticker/collection-sticker-item';
import { paths } from 'src/routes/paths';

export const DesktopViewOne = () => {
  const settings = useSettingsContext();
  const {
    chartData,
    fetchDashboardData,
    cardCount,
    quizzes,
    votings,
    isDashboardLoading,
    deleteVoting,
    cards,
  } = useDashboardData();

  const featuredAppsList = [
    quizzes?.length > 0 && {
      id: quizzes?.[0]._id,
      title: quizzes?.[0].title,
      coverUrl: quizzes?.[0].thumbnail,
      description: 'Novi Kviz je dostupan!!!!',
    },
    votings?.length > 0 && {
      id: votings?.[0]._id,
      title: votings?.[0].title,
      coverUrl: votings?.[0].thumbnail,
      description: 'Novo Glasanje je dostupno!!',
    },
  ].filter(Boolean) as ItemProps[];

  const notVotedVotings = votings
    ? votings.filter((voting) => voting.isVoted === false)
    : [];

  useEffect(() => {
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <AppWelcome
            title={`Dobrodošli na digitalnu platformu Vatrenog Almanaha!`}
            description={`Saznaj što ima novog u Vatrenom svijetu! \n Ne propusti priliku osvojiti vrijedne nagrade.`}
            img={
              <SeoIllustration imageUrl='https://res.cloudinary.com/dzg5kxbau/image/upload/v1698661449/VATROSLAV-vatrene_price-removebg-preview_pa5j2e.png' />
            }
          />
        </Grid>
        <Grid item xs={4} md={4}>
          {quizzes?.length && votings?.length ? (
            <AppFeatured list={featuredAppsList} />
          ) : (
            <SkeletonDashboardLoader
              count={1}
              message='Trenutačno nema novih izazova u obliku kvizova i glasanja!'
              height='250px'
              width='350px'
              maxWidth='350px'
            />
          )}
        </Grid>
      </Grid>
      <Grid
        container
        spacing={3}
        my={5}
        alignItems='center'
        justifyContent='center'
        borderRadius={1}
      >
        <Grid item xl={12} container>
          <DashboardSectionWrapper
            title={'Najnoviji iz digitalnog albuma'}
            link={paths.dashboard.two}
          >
            <ScrollableContainer childrenCount={cards.length}>
              {isDashboardLoading ? (
                <SkeletonDashboardLoader count={5} width='100%' />
              ) : cards.length === 0 ? (
                <Box
                  sx={{
                    width: '100%',
                    borderRadius: 2,
                  }}
                >
                  <SkeletonDashboardLoader
                    isMobileCount={3}
                    isTabletCount={4}
                    count={5}
                    width='100%'
                    message={`Trenutno nema skupljenih, skeniraj QR kod sa jedne od sličica kako bi započeo ispunjavanje digitalnog albuma.`}
                  />
                </Box>
              ) : (
                <>
                  {cards.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        flex: '0 0 auto',
                        maxWidth: '200px',
                        height: '32vh',
                        m: 1,
                      }}
                    >
                      <CollectionStickerItem item={item} />
                    </Box>
                  ))}
                </>
              )}
            </ScrollableContainer>

            <Divider sx={{ margin: '16px 0' }} />
          </DashboardSectionWrapper>
        </Grid>
      </Grid>
      <DashboardSectionWrapper title={'Statistika'} link='dashboard/two'>
        <Grid container spacing={3} mt={3} sx={{ justifyContent: 'center' }}>
          <Grid
            item
            xs={12}
            sx={{
              borderRadius: 2,
              m: '4px',
              mt: -4,
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
                cardCount={cardCount}
              />
            )}
          </Grid>
        </Grid>
      </DashboardSectionWrapper>
      <Grid container spacing={3} mt={3} sx={{ justifyContent: 'center' }}>
        <Grid
          item
          xs={12}
          sx={{
            borderRadius: 2,
            m: '4px',
          }}
        >
          <DashboardSectionWrapper title='Kvizovi' link={paths.dashboard.three}>
            <Grid container justifyContent='center' alignItems='center'>
              {isDashboardLoading ? (
                <SkeletonDashboardLoader count={3} />
              ) : quizzes?.length ? (
                quizzes.map((quiz, index) => (
                  <Grid item md={6} key={index}>
                    <CustomCardSmall
                      imgUrl={quiz.thumbnail}
                      width='100%'
                      cardText={quiz.title}
                      linkTo={`/dashboard/quiz/${quiz._id}`}
                    />
                  </Grid>
                ))
              ) : (
                <SkeletonDashboardLoader
                  isMobileCount={3}
                  isTabletCount={4}
                  count={5}
                  message='Trenutno nema dostupnih kvizova, ali ne brini - uskoro dolaze novi. Pripremi se za nadmetanje uma!'
                />
              )}
            </Grid>
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
            <Grid container>
              {isDashboardLoading ? (
                <SkeletonDashboardLoader count={5} width='100%' />
              ) : notVotedVotings?.length ? (
                notVotedVotings.map((voting, index) => (
                  <Grid item md={6} key={index}>
                    <CustomCard
                      cardId={voting._id}
                      votingId={voting._id}
                      imgUrl={voting.thumbnail}
                      cardText={voting.title}
                      onDelete={deleteVoting}
                      linkTo={`${paths.dashboard.voting.vote}/${voting._id}`}
                      linkToEdit={`${paths.dashboard.voting.editVoting}/${voting._id}`}
                    />
                  </Grid>
                ))
              ) : (
                <SkeletonDashboardLoader
                  count={5}
                  isMobileCount={3}
                  isTabletCount={4}
                  width='100%'
                  message='Trenutno nema dostupnih glasanja, ali bez brige! Uskoro ćemo ponovno trebati tvoje mišljenje!'
                />
              )}
            </Grid>
          </DashboardSectionWrapper>
        </Grid>
      </Grid>
    </Container>
  );
};
