import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useSettingsContext } from 'src/components/settings';
import { Box, Grid, useTheme } from '@mui/material';
import { DashboardButton } from 'src/components/dashboard-button/dashboard-button';
import { DashboardSectionWrapper } from 'src/components/section-wrapper/dashboard-section-wrapper';
import DashboardCollectionCategory from 'src/components/dashboard-collection-category/dashboard-collection-category';
import ScrollableContainer from 'src/components/scrollable-container/scrollable-container';
import { useEffect, useState } from 'react';
import { CollectedStatistic, DashboardStats } from 'src/types';
import axios, { endpoints } from 'src/utils/axios';
import HorizontalScrollStatisticCards from 'src/components/stats-box/statistic-box-horizontal';
import CustomCardSmall from 'src/components/custom-card/custom-card-small';
import QRScanner from 'src/components/qr-scanner/QRScanner';
import useFetchQuizzes from 'src/hooks/use-quiz-data';
import useVoting from 'src/hooks/use-voting-data';

export default function OneView() {
  const settings = useSettingsContext();
  const theme = useTheme();
  const [collectedStatistic, setCollectedStatistic] =
    useState<CollectedStatistic | null>(null);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(
    null
  );

  const { votings, fetchAllVotings } = useVoting();

  const imageSrc =
    theme.palette.mode === 'dark'
      ? 'https://res.cloudinary.com/dzg5kxbau/image/upload/v1694513740/qr-code-white_kdalqi.png'
      : 'https://res.cloudinary.com/dzg5kxbau/image/upload/v1694436034/qr-code_lkopl7.png';

  const mojaKolekcijaImageSrc =
    theme.palette.mode === 'dark'
      ? 'https://res.cloudinary.com/dzg5kxbau/image/upload/v1694513743/collection_white_sjtvox.png'
      : 'https://res.cloudinary.com/dzg5kxbau/image/upload/v1694444294/library_vqp6pn.png';

  const fetchCollectedStatistic = async () => {
    try {
      const response = await axios.get(endpoints.card.stats);
      setCollectedStatistic(response.data);
    } catch (error) {
      console.error('Error fetching collected statistic: ' + error);
      setCollectedStatistic(null);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get(endpoints.card.statsDashboard);
      setDashboardStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard statistics: ' + error);
    }
  };
  const [isScanning, setIsScanning] = useState(false);

  const toggleScanning = () => {
    setIsScanning(!isScanning);
  };

  const { isLoadingUnresolved, unresolvedQuizzes, fetchQuizzes } =
    useFetchQuizzes(1, 7);

  useEffect(() => {
    fetchCollectedStatistic();
    fetchDashboardStats();
    fetchQuizzes();
    fetchAllVotings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant='h3' sx={{ marginY: 1, paddingTop: 2 }}>
        {' '}
        Bok, Pero 👋{' '}
      </Typography>
      <Grid container spacing={2} sx={{ marginTop: 5 }}>
        <Grid item xs={6}>
          <DashboardButton
            imageSrc={imageSrc}
            title={isScanning ? 'Stop Scanning' : 'Skeniraj novu'}
            onClick={toggleScanning}
          />
        </Grid>
        <Grid item xs={6}>
          <DashboardButton
            imageSrc={mojaKolekcijaImageSrc}
            title='Moja Kolekcija'
            link='/dashboard/two'
          />
        </Grid>
        <Grid item xs={12}>
          {isScanning && <QRScanner />}
        </Grid>
        <Grid item xs={12}>
          <Box>
            <HorizontalScrollStatisticCards
              collectedStatistic={collectedStatistic}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          {/* TODO: fetch data from API and remove hardcoded data */}
          <DashboardSectionWrapper
            title='Najvise skupljenih'
            link='dashboard/two'
          >
            <DashboardCollectionCategory
              imageSrc='https://res.cloudinary.com/dzg5kxbau/image/upload/v1694443453/hrvatska_momc%CC%8Cadska_2_ruhebv.jpg'
              name={dashboardStats?.topEvents[0].name}
              percentageCollected={Math.round(
                dashboardStats?.topEvents[0].percentageCollected || 0
              )}
            />
            <DashboardCollectionCategory
              imageSrc='https://res.cloudinary.com/dzg5kxbau/image/upload/v1694443581/zajednic%CC%8Cka_2018_a_svqtdz.jpg'
              name={dashboardStats?.topEvents[1].name}
              percentageCollected={Math.round(
                dashboardStats?.topEvents[1].percentageCollected || 0
              )}
            />
          </DashboardSectionWrapper>
          <DashboardSectionWrapper
            title='Preostali Kvizovi'
            link='dashboard/three'
          >
            <ScrollableContainer>
              {!isLoadingUnresolved &&
                unresolvedQuizzes?.map((quiz, index) => (
                  <CustomCardSmall
                    key={index}
                    imgUrl={quiz.thumbnail}
                    width='96%'
                    height='100%'
                    cardText={quiz.title}
                    linkTo={`/dashboard/quiz/${quiz._id}`}
                  />
                ))}
            </ScrollableContainer>
          </DashboardSectionWrapper>
          <DashboardSectionWrapper title='Glasanja' link='dashboard/five'>
            <ScrollableContainer>
              {votings &&
                votings.map((voting, index) => (
                  <CustomCardSmall
                    key={index}
                    width='96%'
                    height='100%'
                    imgUrl={voting.thumbnail}
                    cardText={voting.title}
                    linkTo={`/dashboard/voting/${voting._id}`}
                  />
                ))}
            </ScrollableContainer>
          </DashboardSectionWrapper>
        </Grid>
      </Grid>
    </Container>
  );
}
