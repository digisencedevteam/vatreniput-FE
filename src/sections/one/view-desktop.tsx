import { Box, Button, Container, Grid, useTheme } from '@mui/material';
import WelcomeComponent from 'src/components/welcome-component/welcome-component';
import Vesela from 'src/assets/illustrations/vesela3.png';
import CollectionStickerItem from 'src/components/collection-sticker/collection-sticker-item';
import ScrollableContainer from 'src/components/scrollable-container/scrollable-container';
import { DashboardSectionWrapper } from 'src/components/section-wrapper/dashboard-section-wrapper';
import VotingOverview from 'src/components/voting-overview/voting-overview';
import CustomCard from 'src/components/custom-card/custom-card';
import CustomCardSmall from 'src/components/custom-card/custom-card-small';
import StatisticCards from 'src/components/stats-box/statistic-box';
import useCardData from 'src/hooks/use-card-data';
import AppFeatured from 'src/components/feautred-carousel/app-featured';
import { useSettingsContext } from 'src/components/settings';
import useFetchQuizzes from 'src/hooks/use-quiz-data';
import { useEffect } from 'react';

export const DesktopViewOne = () => {
  const theme = useTheme();
  const { collectedStatistic, collectedCards } = useCardData();
  const settings = useSettingsContext();

  const hardcodedData = [
    { label: 'Zlatna Generacija 98', value: 60, totalAmount: 6000 },
    { label: 'Od Zadra do Madrida', value: 40, totalAmount: 4000 },
    { label: 'Srebrni San 2018', value: 20, totalAmount: 2000 },
    { label: 'Put do finala', value: 40, totalAmount: 4000 },
  ];

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

  const {
    isLoadingUnresolved,
    unresolvedQuizzes,
    fetchQuizzes
  } = useFetchQuizzes(1, 4);

  useEffect(() => {
    fetchQuizzes()

  }, [])


  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3} >
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
      <Grid container spacing={3} >
        <Grid item xs={8} md={7} >
          <DashboardSectionWrapper title={'Kolekcija'} link='dashboard/two'>
            <ScrollableContainer>
              {collectedCards.map((item, index) => (
                <Box key={index} sx={{ flex: '0 0 auto', width: '60%', maxWidth: '175px', height: '35vh', m: 1 }}>
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
      <Grid container spacing={3} sx={{ justifyContent: 'center', alignContent: 'center' }}>
        <Grid
          item
          md={4.9}
          sx={{
            borderRadius: 2,
            bgcolor: theme.palette.background.neutral,
            m: '4px'

          }}
        >
          <DashboardSectionWrapper title='Zadnje otkljucana prica' link='dashboard/five'>
            <CustomCard imgUrl='https://res.cloudinary.com/dzg5kxbau/image/upload/v1693924116/vlaovic2_copy_l1j3rf.jpg' cardText='Zlatna Generacija' cardId='123' />
          </DashboardSectionWrapper>
        </Grid>

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
          <DashboardSectionWrapper title='Ispunjenost prica' link='dashboard/five' >
            <VotingOverview data={hardcodedData} />
          </DashboardSectionWrapper>
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={3} sx={{ justifyContent: 'center' }}>
        <Grid
          item
          xs={5.9}
          sx={{
            borderRadius: 2,
            bgcolor: theme.palette.background.neutral,
            m: '4px'
          }}
        >
          <DashboardSectionWrapper title='Kvizovi' link='dashboard/three'>
            <Grid container spacing={2}>
              {
                !isLoadingUnresolved && unresolvedQuizzes?.map((quiz, index) => (
                  <Grid item md={6} key={quiz._id} maxWidth={'260px'}>
                    <CustomCardSmall
                      imgUrl={quiz.thumbnail}
                      width='100%'
                      cardText={quiz.title}
                      linkTo={`/dashboard/quiz/${quiz._id}`}
                    />
                  </Grid>
                ))
              }
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
            m: '4px'
          }}
        >
          <DashboardSectionWrapper title='Glasanja' link='dashboard/five'>
            <CustomCard imgUrl='https://res.cloudinary.com/dzg5kxbau/image/upload/v1692357089/SLAVLJE4_copy_g1wd89.jpg' cardText='Najbolji igrač' cardId='123' />
          </DashboardSectionWrapper>
        </Grid>
      </Grid>

    </Container>
  );
}