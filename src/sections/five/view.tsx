import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useSettingsContext } from 'src/components/settings';
import { Button, Grid, useMediaQuery } from '@mui/material';
import { green, yellow } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import VotingOverview from 'src/components/voting-overview/voting-overview';
import StatusCard from 'src/components/status-card/status-card';
import SectionWrapper from 'src/components/section-wrapper/section-wrapper';
import ScrollableContainer from 'src/components/scrollable-container/scrollable-container';
import CustomCardSmall from 'src/components/custom-card/custom-card-small';
import { EmojiEvents, SportsSoccer } from '@mui/icons-material';
import WelcomeComponent from 'src/components/welcome-component/welcome-component';

export default function FiveView() {
  const settings = useSettingsContext();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  //TODO: implement data from API and remove dummy
  const dummyData = [
    { imgUrl: "https://res.cloudinary.com/dzg5kxbau/image/upload/v1692357089/SLAVLJE4_copy_g1wd89.jpg", cardText: "Najbolji igrač", linkTo: "/link-1" },
    { imgUrl: "https://res.cloudinary.com/dzg5kxbau/image/upload/v1692358241/strini%C4%87_mbappe_guigky.jpg", cardText: "Najbolja utakmica", linkTo: "/link-2" },
    { imgUrl: "https://res.cloudinary.com/dzg5kxbau/image/upload/v1692359054/gvardiol_4_rmm414.jpg", cardText: "Najbrzi igrač", linkTo: "/link-2" },
    { imgUrl: "https://res.cloudinary.com/dzg5kxbau/image/upload/v1693584480/sammir_kamerun_2_w7dryp.jpg", cardText: "Najbolji golman", linkTo: "/link-2" },
    { imgUrl: "https://res.cloudinary.com/dzg5kxbau/image/upload/v1693584123/livaja_1_a8kxbj.jpg", cardText: "Najbolji napadač", linkTo: "/link-2" },
  ];

  //TODO: implement data from API and remove dummy
  const hardcodedData = [
    { label: 'Luka Modric', value: 60, totalAmount: 6000 },
    { label: 'Mateo Kovacic', value: 40, totalAmount: 4000 },
    { label: 'Davor Suker', value: 20, totalAmount: 2000 }
  ];

  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h2" color={theme.palette.primary.main}> Glasanja </Typography>

      {!isMobile && (
        <Grid item xs={12} md={7}>
          <WelcomeComponent
            title={`Pozdrav 👋`}
            description='Dobrodošli natrag na svoju kolekciju. Pogledaj koje imaš i koji ti još nedostaju kako bi ih skupio sve!'
            img={<img src={'https://res.cloudinary.com/dzg5kxbau/image/upload/v1696246116/WhatsApp_Image_2023-09-26_at_20.25.25_rqlsao.jpg'} alt='Vesela' />}
            action={
              <Button variant='contained' color='primary'>
                Istraži
              </Button>
            }
          />
        </Grid>
      )}

      <Box borderRadius={2} p={2} my={2} sx={{ bgcolor: theme.palette.background.default, [theme.breakpoints.up('md')]: { bgcolor: theme.palette.background.neutral } }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <StatusCard icon={<EmojiEvents fontSize="large" sx={{ color: yellow[400], display: { xs: 'none', sm: 'inline' } }} />} number="Luka Modric" text="Najbolji igrac" />
          <StatusCard icon={<SportsSoccer fontSize="large" sx={{ color: green[500], display: { xs: 'none', sm: 'inline' } }} />} number="Qatar 2022." text="Najpopularnije prvenstvo" />
        </Box>
      </Box>

      <SectionWrapper title="Najnovije">
        <ScrollableContainer>
          {dummyData.map((data, index) => (
            <Box key={index} sx={{ flex: '0 0 auto', width: '60%', maxWidth: '300px' }}>
              <CustomCardSmall imgUrl={data.imgUrl} cardText={data.cardText} linkTo={data.linkTo} />
            </Box>
          ))}
        </ScrollableContainer>
      </SectionWrapper>

      {isDesktop && (
        <VotingOverview title="Najbolji od najboljih" subheader="Rezultat Glasanja" data={hardcodedData} />
      )}

      <SectionWrapper title="Sva glasanja">
        <Grid container spacing={2}>
          {dummyData.map((data, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
              <CustomCardSmall imgUrl={data.imgUrl} cardText={data.cardText} linkTo={data.linkTo} />
            </Grid>
          ))}
        </Grid>
      </SectionWrapper>
    </Container>
  );
}
