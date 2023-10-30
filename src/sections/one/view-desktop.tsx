import { Box, Button, Container, Grid, useTheme } from '@mui/material';
import WelcomeComponent from 'src/components/welcome-component/welcome-component';
import Vesela from 'src/assets/illustrations/vesela3.png';
import { CollectionStickerItem } from 'src/components/collection-sticker/collection-sticker-item';
import ScrollableContainer from 'src/components/scrollable-container/scrollable-container';
import { DashboardSectionWrapper } from 'src/components/section-wrapper/dashboard-section-wrapper';
import CustomCard from 'src/components/custom-card/custom-card';
import CustomCardSmall from 'src/components/custom-card/custom-card-small';
import StatisticCards from 'src/components/stats-box/statistic-box';
import useCardData from 'src/hooks/use-card-data';
import AppFeatured from 'src/components/feautred-carousel/app-featured';
import { useSettingsContext } from 'src/components/settings';
import useFetchQuizzes from 'src/hooks/use-quiz-data';
import { useEffect } from 'react';
import useVoting from 'src/hooks/use-voting-data';

export const DesktopViewOne = () => {
  const theme = useTheme();
  const { collectedStatistic, collectedCards } = useCardData();
  const settings = useSettingsContext();
  const featuredAppsList = [
    {
      id: '1',
      title: 'Vatreni Challange',
      coverUrl: 'assets/images/mandzukicPerisic.jpg',
      description: 'Novi Kviz je dostupan!!',
    },
    {
      id: '2',
      title: 'Najbolji golman',
      coverUrl: 'assets/images/doha_medalje.png',
      description: 'Novo Glasanje je dostupno!!',
    },
  ];
  const { votings } = useVoting();
  const voting = votings && votings[1];

  const { isLoadingUnresolved, unresolvedQuizzes, fetchQuizzes } =
    useFetchQuizzes(1, 4);

  useEffect(() => {
    fetchQuizzes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <WelcomeComponent
            title={`Pozdrav 👋`}
            description='Dobrodošli natrag na svoju kolekciju. Pogledaj koje imaš i koji ti još nedostaju kako bi ih skupio sve!'
            img={<img src={Vesela} alt='Vesela' />}
            action={
              <Button variant='contained' color='primary'>
                Istraži
              </Button>
            }
          />
        </Grid>
        <Grid item xs={4} md={4}>
          <AppFeatured list={featuredAppsList} />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={8} md={7}>
          <DashboardSectionWrapper title={'Kolekcija'} link='dashboard/two'>
            <ScrollableContainer>
              {collectedCards.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    flex: '0 0 auto',
                    width: '60%',
                    maxWidth: '175px',
                    height: '35vh',
                    m: 1,
                  }}
                >
                  <CollectionStickerItem item={item} />
                </Box>
              ))}
            </ScrollableContainer>
          </DashboardSectionWrapper>
        </Grid>
        <Grid item xs={4} md={5} mt={3}>
          <StatisticCards collectedStatistic={collectedStatistic} />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'center', alignContent: 'center' }}
      >
        <Grid
          item
          md={4.9}
          sx={{
            borderRadius: 2,
            bgcolor: theme.palette.background.neutral,
            m: '4px',
          }}
        ></Grid>
        <Grid
          item
          xs={6.9}
          sx={{
            borderRadius: 2,
            bgcolor: theme.palette.background.default,
            w: '100%',
            m: '4px',
          }}
        >
          <DashboardSectionWrapper
            title='Ispunjenost prica'
            link='dashboard/five'
          ></DashboardSectionWrapper>
        </Grid>
      </Grid>
      <Grid container spacing={3} mt={3} sx={{ justifyContent: 'center' }}>
        <Grid
          item
          xs={5.9}
          sx={{
            borderRadius: 2,
            bgcolor: theme.palette.background.neutral,
            m: '4px',
          }}
        >
          <DashboardSectionWrapper title='Kvizovi' link='dashboard/three'>
            <Grid container spacing={2}>
              {!isLoadingUnresolved &&
                unresolvedQuizzes?.map((quiz, index) => (
                  <Grid item md={6} key={quiz._id} maxWidth={'260px'}>
                    <CustomCardSmall
                      imgUrl={quiz.thumbnail}
                      width='100%'
                      cardText={quiz.title}
                      linkTo={`/dashboard/quiz/${quiz._id}`}
                    />
                  </Grid>
                ))}
            </Grid>
          </DashboardSectionWrapper>
        </Grid>
        <Grid
          item
          md={5.9}
          sx={{
            borderRadius: 2,
            bgcolor: theme.palette.background.neutral,
            w: '100%',
            m: '4px',
          }}
        >
          <DashboardSectionWrapper title='Glasanja' link='dashboard/five'>
            {voting && (
              <CustomCard
                cardId={voting._id}
                width='96%'
                height='100%'
                imgUrl={voting.thumbnail}
                cardText={voting.title}
                linkTo={`/dashboard/voting/${voting._id}`}
                linkToEdit={`/dashboard/voting/${voting._id}`}
              />
            )}
          </DashboardSectionWrapper>
        </Grid>
      </Grid>
    </Container>
  );
};
