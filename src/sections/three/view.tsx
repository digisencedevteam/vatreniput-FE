import { useSettingsContext } from 'src/components/settings';
import { Container, Typography, Box, Grid, } from '@mui/material';
import CustomCard from 'src/components/custom-card/custom-card';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { green, red } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import ScrollableContainer from 'src/components/scrollable-container/scrollable-container';
import StatusCard from 'src/components/status-card/status-card';
import SectionWrapper from 'src/components/section-wrapper/section-wrapper';


const dummyData = [
  {
    imgUrl: "https://res.cloudinary.com/dzg5kxbau/image/upload/v1693923677/HRV52006_copy_p8edoc.jpg",
    cardText: "Card 1",
    linkTo: "/dashboard/quiz",
  },
  {
    imgUrl: "https://res.cloudinary.com/dzg5kxbau/image/upload/v1692357090/HRVATSK6_copy_lfy11a.jpg",
    cardText: "Card 2",
    linkTo: "/dashboard/quiz",
  },
  {
    imgUrl: "https://res.cloudinary.com/dzg5kxbau/image/upload/v1691679864/prso_spycher1306_ycclpt.jpg",
    cardText: "Card 2",
    linkTo: "/dashboard/quiz",
  },
  {
    imgUrl: "https://res.cloudinary.com/dzg5kxbau/image/upload/v1691140208/jo%C5%A1ko_gvardiol_3_tcgdcz.jpg",
    cardText: "Card 2",
    linkTo: "/dashboard/quiz",
  },
  {
    imgUrl: "https://res.cloudinary.com/dzg5kxbau/image/upload/v1690543420/dali%C4%87_slavlje_1_mwyhvm.jpg",
    cardText: "Card 2",
    linkTo: "/dashboard/quiz",
  }
];

export default function ThreeView() {
  const settings = useSettingsContext();
  const theme = useTheme();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h2" color="error">Kvizovi</Typography>
      <SectionWrapper title="Najnoviji">

        <ScrollableContainer>
          {dummyData.map((data, index) => (
            <Box key={index} sx={{ flex: '0 0 auto', width: '60%', maxWidth: '300px' }}>
              <CustomCard imgUrl={data.imgUrl} cardText={data.cardText} linkTo={data.linkTo} />
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