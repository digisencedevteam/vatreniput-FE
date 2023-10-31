import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useSettingsContext } from 'src/components/settings';
import { Button, Grid } from '@mui/material';
import { green, yellow } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import StatusCard from 'src/components/status-card/status-card';
import SectionWrapper from 'src/components/section-wrapper/section-wrapper';
import ScrollableContainer from 'src/components/scrollable-container/scrollable-container';
import CustomCardSmall from 'src/components/custom-card/custom-card-small';
import { EmojiEvents, SportsSoccer } from '@mui/icons-material';
import WelcomeComponent from 'src/components/welcome-component/welcome-component';
import useVoting from 'src/hooks/use-voting-data';
import { useResponsive } from 'src/hooks/use-responsive';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'src/auth/context/jwt';
import { Link } from 'react-router-dom';
import { useRouter } from 'src/routes/hooks';
import { userRoles } from 'src/lib/constants';
import CustomCard from 'src/components/custom-card/custom-card';
import { LoadingScreen } from 'src/components/loading-screen';

export const FiveView = () => {
  const [isLoading, setIsLoading] = useState(true);

  const settings = useSettingsContext();
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useResponsive('down', 'md');
  const { votings, fetchAllVotings, deleteVoting } = useVoting();
  const auth = useContext(AuthContext);

  const isAdmin = auth.user && auth.user.role === userRoles.admin;
  const votedVotings = votings
    ? votings.filter((voting) => voting.isVoted === true)
    : [];
  const notVotedVotings = votings
    ? votings.filter((voting) => voting.isVoted === false)
    : [];
  const fetchData = async () => {
    await fetchAllVotings();
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      {isLoading ? (
        <LoadingScreen sx={{ mt: '50%' }} />
      ) : (
        <>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            sx={{ m: 1 }}
          >
            <Typography variant='h2' color={theme.palette.primary.main}>
              Glasanja
            </Typography>

            {isAdmin && (
              <Button
                variant='contained'
                color='primary'
                component={Link}
                to={'/dashboard/createVoting '}
              >
                Novo glasanje
              </Button>
            )}
          </Box>
          {!isMobile && (
            <Grid item xs={12} md={7}>
              <WelcomeComponent
                title={`Pozdrav 👋`}
                description='Dobrodošli natrag na svoju kolekciju. Pogledaj koje imaš i koji ti još nedostaju kako bi ih skupio sve!'
                img={
                  <img
                    src={
                      'https://res.cloudinary.com/dzg5kxbau/image/upload/v1696250575/WhatsApp_Image_2023-09-26_at_20.25.25_rqlsao-modified_le1wt5.png'
                    }
                    alt='Vesela'
                  />
                }
                action={
                  <Button variant='contained' color='primary'>
                    Istraži
                  </Button>
                }
              />
            </Grid>
          )}
          <SectionWrapper title='Dostupna glasanja'>
            <Grid container>
              {!notVotedVotings?.length ? (
                <Typography
                  variant='caption'
                  align='center'
                  color='textSecondary'
                  m={1}
                >
                  Čestitam! Sva glasanja su ispunjena! Obavjestiti ćemo te čim
                  izađe novo glasanje.
                </Typography>
              ) : (
                <Grid container spacing={2}>
                  {votings &&
                    votings.map((voting, index) => (
                      <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
                        <CustomCard
                          cardId={voting._id}
                          votingId={voting._id}
                          imgUrl={voting.thumbnail}
                          cardText={voting.title}
                          onDelete={deleteVoting}
                          linkTo={`/dashboard/voting/${voting._id}`}
                          linkToEdit={`/dashboard/editVoting/${voting._id}`}
                        />
                      </Grid>
                    ))}
                </Grid>
              )}
            </Grid>
          </SectionWrapper>
          <SectionWrapper title='Već glasani'>
            {!votedVotings?.length ? (
              <Typography
                variant='caption'
                align='center'
                color='textSecondary'
                m={1}
              >
                Zasada nema riješenih kvizova!
              </Typography>
            ) : (
              <ScrollableContainer>
                {votedVotings.map((data, index) => (
                  <Box
                    key={index}
                    sx={{ flex: '0 0 auto', width: '60%', maxWidth: '300px' }}
                  >
                    <CustomCardSmall
                      imgUrl={data.thumbnail}
                      cardText={data.title}
                      onCardClick={() =>
                        router.push(
                          `/dashboard/votingResults/${data._id}/${data.title}`
                        )
                      }
                    />
                  </Box>
                ))}
              </ScrollableContainer>
            )}
          </SectionWrapper>
          <Box
            borderRadius={2}
            p={2}
            my={2}
            sx={{
              bgcolor: theme.palette.background.default,
              [theme.breakpoints.up('md')]: {
                bgcolor: theme.palette.background.neutral,
              },
            }}
          >
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <StatusCard
                icon={
                  <EmojiEvents
                    fontSize='medium'
                    sx={{
                      color: yellow[400],
                      display: { xs: 'none', sm: 'inline' },
                    }}
                  />
                }
                number='Luka Modrić'
                text='Najbolji igrač'
              />
              <StatusCard
                icon={
                  <SportsSoccer
                    fontSize='medium'
                    sx={{
                      color: green[500],
                      display: { xs: 'none', sm: 'inline' },
                    }}
                  />
                }
                number='Qatar 2022.'
                text='Najpopularnije prvenstvo'
              />
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
};
