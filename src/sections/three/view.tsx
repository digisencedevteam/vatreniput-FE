import { useSettingsContext } from 'src/components/settings';
import { Container, Typography, Box, Grid, Button, useMediaQuery, } from '@mui/material';
import CustomCard from 'src/components/custom-card/custom-card';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { green, red } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import ScrollableContainer from 'src/components/scrollable-container/scrollable-container';
import StatusCard from 'src/components/status-card/status-card';
import SectionWrapper from 'src/components/section-wrapper/section-wrapper';
import CustomCardSmall from 'src/components/custom-card/custom-card-small';
import WelcomeComponent from 'src/components/welcome-component/welcome-component';


const dummyData = [
  {
    imgUrl: "https://res.cloudinary.com/dzg5kxbau/image/upload/v1693923677/HRV52006_copy_p8edoc.jpg",
    cardText: "Put do Finala",
    linkTo: "/dashboard/quiz",
  },
  {
    imgUrl: "https://res.cloudinary.com/dzg5kxbau/image/upload/v1692357090/HRVATSK6_copy_lfy11a.jpg",
    cardText: "Vatreni Challenge",
    linkTo: "/dashboard/quiz",
  },
  {
    imgUrl: "https://res.cloudinary.com/dzg5kxbau/image/upload/v1691679864/prso_spycher1306_ycclpt.jpg",
    cardText: "Prva HNL Trivia",
    linkTo: "/dashboard/quiz",
  },
  {
    imgUrl: "https://res.cloudinary.com/dzg5kxbau/image/upload/v1691140208/jo%C5%A1ko_gvardiol_3_tcgdcz.jpg",
    cardText: "Klubovi",
    linkTo: "/dashboard/quiz",
  },
  {
    imgUrl: "https://res.cloudinary.com/dzg5kxbau/image/upload/v1690543420/dali%C4%87_slavlje_1_mwyhvm.jpg",
    cardText: "Stadioni",
    linkTo: "/dashboard/quiz",
  }
];

export default function ThreeView() {
  const settings = useSettingsContext();
  const theme = useTheme();
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'));

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h2" color={theme.palette.primary.main}>Kvizovi</Typography>

      {!isMobile && (
        <Grid item xs={12} md={7}>
          <WelcomeComponent
            title={`Pozdrav 👋`}
            description='Dobrodošli natrag na svoju kolekciju. Pogledaj koje imaš i koji ti još nedostaju kako bi ih skupio sve!'
            img={<img src={'https://res.cloudinary.com/dzg5kxbau/image/upload/v1695824037/vatroslav_upute_2_xjcpuj.png'} alt='Vesela' />}
            action={
              <Button variant='contained' color='primary'>
                Istraži
              </Button>
            }
          />
        </Grid>
      )}
      <SectionWrapper title="Najnoviji">

        <ScrollableContainer>
          {dummyData.map((data, index) => (
            <Box key={index} sx={{ flex: '0 0 auto', width: '60%', maxWidth: '300px', mx: 1 }}>
              <CustomCardSmall width='100%' height='90%' imgUrl={data.imgUrl} cardText={data.cardText} linkTo={data.linkTo} />
            </Box>
          ))}
        </ScrollableContainer>
      </SectionWrapper>
      <Box borderRadius={2} p={2} mt={2} sx={{
        bgcolor: theme.palette.background.default,
        [theme.breakpoints.up('md')]: {
          bgcolor: theme.palette.background.neutral
        },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <StatusCard icon={<CheckIcon fontSize="large" sx={{ color: green[500], display: { xs: 'none', sm: 'inline' } }} />} number={21} text="Rjesen!" />
        <StatusCard icon={<CloseIcon fontSize="large" sx={{ color: red[500], display: { xs: 'none', sm: 'inline' } }} />} number={25} text="Jos Cekaju!" />
      </Box>
      <SectionWrapper title="Svi kvizovi">
        <Grid container spacing={2}>
          {dummyData.map((data, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={4} >
              <CustomCard imgUrl={data.imgUrl} cardText={data.cardText} linkTo={data.linkTo} />
            </Grid>
          ))}
        </Grid>
      </SectionWrapper>
    </Container>
  );
}