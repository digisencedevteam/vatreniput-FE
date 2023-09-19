import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useSettingsContext } from 'src/components/settings';
import { Grid, useMediaQuery } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { green, red } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import VotingOverview from 'src/components/voting-overview/voting-overview';
import StatusCard from 'src/components/status-card/status-card';
import SectionWrapper from 'src/components/section-wrapper/section-wrapper';
import ScrollableContainer from 'src/components/scrollable-container/scrollable-container';
import CustomCardSmall from 'src/components/custom-card/custom-card-small';

export default function FiveView() {
  const settings = useSettingsContext();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const dummyData = [
    { imgUrl: "/assets/images/mandzukicPerisic.jpg", cardText: "Card 1", linkTo: "/link-1" },
    { imgUrl: "/assets/images/mandzukicPerisic.jpg", cardText: "Card 2", linkTo: "/link-2" },
    { imgUrl: "/assets/images/mandzukicPerisic.jpg", cardText: "Card 2", linkTo: "/link-2" },
    { imgUrl: "/assets/images/mandzukicPerisic.jpg", cardText: "Card 2", linkTo: "/link-2" },
    { imgUrl: "/assets/images/mandzukicPerisic.jpg", cardText: "Card 2", linkTo: "/link-2" },
  ];

  const hardcodedData = [
    { label: 'Luka Modric', value: 60, totalAmount: 6000 },
    { label: 'Mateo Kovacic', value: 40, totalAmount: 4000 },
    { label: 'Davor Suker', value: 20, totalAmount: 2000 }
  ];

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h2" color="error"> Glasanja </Typography>

      <Box borderRadius={2} p={2} my={2} sx={{ bgcolor: theme.palette.background.default, [theme.breakpoints.up('md')]: { bgcolor: theme.palette.background.neutral } }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <StatusCard icon={<CheckIcon fontSize="large" sx={{ color: green[500] }} />} number="Luka Modric" text="Najbolji igrac" />
          <StatusCard icon={<CloseIcon fontSize="large" sx={{ color: red[500] }} />} number="Qatar 2022." text="Najpopularnije prvenstvo" />
        </Box>
      </Box>

      <SectionWrapper title="Najnoviji">
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
