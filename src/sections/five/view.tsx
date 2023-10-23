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
import useVoting from 'src/hooks/use-voting-data';
import { LoadingScreen } from 'src/components/loading-screen';
import { useResponsive } from 'src/hooks/use-responsive';
import { useContext } from 'react';
import { AuthContext } from 'src/auth/context/jwt';
import { Link } from 'react-router-dom';
import CustomCard from 'src/components/custom-card/custom-card';

export default function FiveView() {
  const settings = useSettingsContext();
  const theme = useTheme();


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
  const isDesktop = useResponsive('up', 'md');
  const isMobile = useResponsive('down', 'md');
  const { votings, fetchAllVotings, isLoading } = useVoting();
  const auth = useContext(AuthContext);
  const isAdmin = auth.user && auth.user.email === "antonio@test.com";


  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h2" color={theme.palette.primary.main}>Glasanja</Typography>

        {isAdmin && (
          <Button variant="contained" color="primary" component={Link}
            to={'/dashboard/createVoting '}>
            Novo glasanje
          </Button>
        )}
      </Box>
      {!isMobile && (
        <Grid item xs={12} md={7}>
          <WelcomeComponent
            title={`Pozdrav 👋`}
            description='Dobrodošli natrag na svoju kolekciju. Pogledaj koje imaš i koji ti još nedostaju kako bi ih skupio sve!'
            img={<img src={'https://res.cloudinary.com/dzg5kxbau/image/upload/v1696250575/WhatsApp_Image_2023-09-26_at_20.25.25_rqlsao-modified_le1wt5.png'} alt='Vesela' />}
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
          {votings && votings.map((voting, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
              <CustomCard
                isQuiz={true}
                cardId={voting._id}
                imgUrl={voting.thumbnail}
                cardText={voting.title}
                linkTo={`/voting/${voting._id}`} />
            </Grid>
          ))}
        </Grid>
      </SectionWrapper>
    </Container>
  );
}
