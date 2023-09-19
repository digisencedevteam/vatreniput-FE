
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSettingsContext } from 'src/components/settings';
import { Box, Button, Grid, useTheme } from '@mui/material';
import { DashboardButton } from 'src/components/dashboard-button/dashboard-button';
import { DashboardSectionWrapper } from 'src/components/section-wrapper/dashboard-section-wrapper';
import DashboardCollectionCategory from 'src/components/dashboard-collection-category/dashboard-collection-category';
import CustomCard from 'src/components/custom-card/custom-card';
import ScrollableContainer from 'src/components/scrollable-container/scrollable-container';
import CollectedStatisticWidget from '../two/collected-statistic-widget';
import SelectionStatistic from 'src/components/selection-statistic/selection-statistic';
import CollectionStatisticIllustration from 'src/assets/illustrations/collection-statistic-illustration';
import { useEffect, useState } from 'react';
import { CollectedStatistic, DashboardStats } from 'src/types';
import axios, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export default function OneView() {
  const settings = useSettingsContext();
  const theme = useTheme();
  const [collectedStatistic, setCollectedStatistic] = useState<CollectedStatistic | null>(null);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null)


  const imageSrc =
    theme.palette.mode === "dark"
      ? "https://res.cloudinary.com/dzg5kxbau/image/upload/v1694513740/qr-code-white_kdalqi.png"
      : "https://res.cloudinary.com/dzg5kxbau/image/upload/v1694436034/qr-code_lkopl7.png";

  const mojaKolekcijaImageSrc =
    theme.palette.mode === "dark"
      ? "https://res.cloudinary.com/dzg5kxbau/image/upload/v1694513743/collection_white_sjtvox.png"
      : "https://res.cloudinary.com/dzg5kxbau/image/upload/v1694444294/library_vqp6pn.png";

  useEffect(() => {
    fetchCollectedStatistic()
    fetchDashboardStats()
  })

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
      const response = await axios.get(endpoints.card.statsDashboard)
      setDashboardStats(response.data)
    } catch (error) {
      console.error('Error fetching dashboard statistics: ' + error);
    }
  }


  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h3" sx={{ marginY: 1, paddingTop: 2 }}> Bok, Pero 👋 </Typography>
      <Grid container spacing={2} sx={{ marginTop: 5 }}>
        <Grid item xs={6} >
          <DashboardButton
            imageSrc={imageSrc}
            title='Skeniraj novu'
          />
        </Grid>
        <Grid item xs={6}>
          <DashboardButton
            imageSrc={mojaKolekcijaImageSrc}
            title='Moja Kolekcija'
            link='/dashboard/two'
          />
        </Grid>
        <Grid item xs={12} >
          <Box
            sx={{
              marginTop: '5%',
              display: 'flex',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              height: '80%',
              [theme.breakpoints.up('md')]: {
                scrollbarWidth: 'thin',
                '&::-webkit-scrollbar': {
                  width: '5px',
                },
                '&::-webkit-scrollbar-track': {
                  background: '#f1f1f1',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#888',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: '#555',
                },
              },
            }}
          >
            <CollectedStatisticWidget
              chart={{
                series: [
                  {
                    label: 'Ukupno Skupljenih',
                    percent: dashboardStats?.percentageOfCollectedCards || 0,
                    total: dashboardStats?.numberOfCollectedCards || 0,
                  },
                ],
              }}
              sx={{
                flex: '0 0 auto',
                paddingRight: { xs: 1, md: theme.spacing(5) },
                marginRight: { xs: 1, md: theme.spacing(1) },
                height: '100%',
              }}
            />
            <SelectionStatistic
              title='još do otključavanja neke od priča'
              total={78}
              icon={<CollectionStatisticIllustration />}
              sx={{
                flex: '0 0 auto',
                paddingRight: { xs: theme.spacing(2), md: theme.spacing(2) },
                marginRight: { xs: theme.spacing(2), md: theme.spacing(2) },
              }}
            />
          </Box>
          {/* <Button
            variant="contained"
            color="primary"
            sx={{
              width: '100%',
              borderRadius: 2,
              padding: '1rem 2rem',
              fontSize: '1.2rem',
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.background.neutral,
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
              transition: 'background-color 0.3s',
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Vatrene Priče
          </Button> */}
        </Grid>
        <Grid item xs={12} >
          <DashboardSectionWrapper title='Najvise skupljenih' link='dashboard/two'>
            <DashboardCollectionCategory imageSrc='https://res.cloudinary.com/dzg5kxbau/image/upload/v1694443453/hrvatska_momc%CC%8Cadska_2_ruhebv.jpg' name={dashboardStats?.topEvents[0].name} percentageCollected={dashboardStats?.topEvents[0].percentageCollected} />
            <DashboardCollectionCategory imageSrc='https://res.cloudinary.com/dzg5kxbau/image/upload/v1694443581/zajednic%CC%8Cka_2018_a_svqtdz.jpg' name={dashboardStats?.topEvents[1].name} percentageCollected={dashboardStats?.topEvents[1].percentageCollected} />
          </DashboardSectionWrapper>
          <DashboardSectionWrapper title='Preostali Kvizovi' link='dashboard/three'>
            <ScrollableContainer >
              <CustomCard imgUrl='https://res.cloudinary.com/dzg5kxbau/image/upload/v1693927996/Niko_Kovac%CC%8C_12_i3ct1j.jpg' cardText='Vatreni treneri' linkTo='/dashboard/quiz' />
              <CustomCard imgUrl='https://res.cloudinary.com/dzg5kxbau/image/upload/v1691679864/prso_spycher1306_ycclpt.jpg' cardText='Vatreni napadači' linkTo='/dashboard/quiz' />
              <CustomCard imgUrl='https://res.cloudinary.com/dzg5kxbau/image/upload/v1691140208/jo%C5%A1ko_gvardiol_3_tcgdcz.jpg' cardText='Vatreni braniči' linkTo='/dashboard/quiz' />
            </ScrollableContainer>
          </DashboardSectionWrapper>
          <DashboardSectionWrapper title='Rješeni Kvizovi' link='dashboard/three'>
            <ScrollableContainer >
              <CustomCard imgUrl='https://res.cloudinary.com/dzg5kxbau/image/upload/v1693928447/rebic%CC%81_kopenhagen_1_2_d4fflt.jpg' cardText='Vatreni dribleri' linkTo='/dashboard/quiz' />
              <CustomCard imgUrl='https://res.cloudinary.com/dzg5kxbau/image/upload/v1693926850/subas%CC%8Cic%CC%81_obrana_1_z9olsm.jpg' cardText='Vatreni golmani' linkTo='/dashboard/quiz' />
              <CustomCard imgUrl='https://res.cloudinary.com/dzg5kxbau/image/upload/v1693926829/Messi_Modric%CC%81_2_ubx2uz.jpg' cardText='Vatreni vezni' linkTo='/dashboard/quiz' />
            </ScrollableContainer>
          </DashboardSectionWrapper>
        </Grid>
      </Grid>
    </Container>
  );
}
