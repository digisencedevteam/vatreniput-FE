
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

  useEffect(() => {
    fetchCollectedStatistic()
    fetchDashboardStats()
  }, [])

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
          <Box >
            <HorizontalScrollStatisticCards collectedStatistic={collectedStatistic} />
          </Box>
        </Grid>
        <Grid item xs={12} >
          {/* TODO: fetch data from API and remove hardcoded data */}
          <DashboardSectionWrapper title='Najvise skupljenih' link='dashboard/two'>
            <DashboardCollectionCategory imageSrc='https://res.cloudinary.com/dzg5kxbau/image/upload/v1694443453/hrvatska_momc%CC%8Cadska_2_ruhebv.jpg' name={dashboardStats?.topEvents[0].name} percentageCollected={dashboardStats?.topEvents[0].percentageCollected} />
            <DashboardCollectionCategory imageSrc='https://res.cloudinary.com/dzg5kxbau/image/upload/v1694443581/zajednic%CC%8Cka_2018_a_svqtdz.jpg' name={dashboardStats?.topEvents[1].name} percentageCollected={dashboardStats?.topEvents[1].percentageCollected} />
          </DashboardSectionWrapper>
          <DashboardSectionWrapper title='Preostali Kvizovi' link='dashboard/three'>
            <ScrollableContainer >
              <CustomCardSmall width='96%' height='100%' imgUrl='https://res.cloudinary.com/dzg5kxbau/image/upload/v1693927996/Niko_Kovac%CC%8C_12_i3ct1j.jpg' cardText='Vatreni treneri' linkTo='/dashboard/quiz' />
              <CustomCardSmall width='96%' height='100%' imgUrl='https://res.cloudinary.com/dzg5kxbau/image/upload/v1691679864/prso_spycher1306_ycclpt.jpg' cardText='Vatreni napadači' linkTo='/dashboard/quiz' />
              <CustomCardSmall width='96%' height='100%' imgUrl='https://res.cloudinary.com/dzg5kxbau/image/upload/v1691140208/jo%C5%A1ko_gvardiol_3_tcgdcz.jpg' cardText='Vatreni braniči' linkTo='/dashboard/quiz' />
              <CustomCardSmall width='96%' height='100%' imgUrl='https://res.cloudinary.com/dzg5kxbau/image/upload/v1693927996/Niko_Kovac%CC%8C_12_i3ct1j.jpg' cardText='Vatreni treneri' linkTo='/dashboard/quiz' />
            </ScrollableContainer>
          </DashboardSectionWrapper>
          <DashboardSectionWrapper title='Rješeni Kvizovi' link='dashboard/three'>
            <ScrollableContainer >
              <CustomCardSmall width='96%' height='100%' imgUrl='https://res.cloudinary.com/dzg5kxbau/image/upload/v1693928447/rebic%CC%81_kopenhagen_1_2_d4fflt.jpg' cardText='Vatreni dribleri' linkTo='/dashboard/quiz' />
              <CustomCardSmall width='96%' height='100%' imgUrl='https://res.cloudinary.com/dzg5kxbau/image/upload/v1693926850/subas%CC%8Cic%CC%81_obrana_1_z9olsm.jpg' cardText='Vatreni golmani' linkTo='/dashboard/quiz' />
              <CustomCardSmall width='96%' height='100%' imgUrl='https://res.cloudinary.com/dzg5kxbau/image/upload/v1693926829/Messi_Modric%CC%81_2_ubx2uz.jpg' cardText='Vatreni vezni' linkTo='/dashboard/quiz' />
            </ScrollableContainer>
          </DashboardSectionWrapper>
        </Grid>
      </Grid>
    </Container>
  );
}
