import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useSettingsContext } from 'src/components/settings';
import { Button, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SectionWrapper from 'src/components/section-wrapper/section-wrapper';
import ScrollableContainer from 'src/components/scrollable-container/scrollable-container';
import CustomCardSmall from 'src/components/custom-card/custom-card-small';
import useVoting from 'src/hooks/use-voting-data';
import { useResponsive } from 'src/hooks/use-responsive';
import { useContext, useEffect } from 'react';
import { AuthContext } from 'src/auth/context/jwt';
import { Link } from 'react-router-dom';
import { useRouter } from 'src/routes/hooks';
import { userRoles } from 'src/lib/constants';
import CustomCard from 'src/components/custom-card/custom-card';
import { LoadingScreen } from 'src/components/loading-screen';
import { paths } from 'src/routes/paths';
import { SkeletonDashboardLoader } from 'src/components/skeleton-loader/skeleton-loader-dashboard';
import AppWelcome from 'src/components/overview/app-welcome';
import SeoIllustration from 'src/assets/illustrations/seo-illustration';
import { VotingOverview } from 'src/components/voting-overview/voting-overview';
import { StorySectionWrapper } from 'src/components/section-wrapper/story-wrapper';

const FiveView = () => {
  const settings = useSettingsContext();
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useResponsive('down', 'md');

  const {
    votings,
    fetchAllVotings,
    deleteVoting,
    isLoading,
    fetchUserVotedVotingsWithTopOption,
    userVotedVotings,
  } = useVoting();
  const auth = useContext(AuthContext);
  const isAdmin = auth.user && auth.user.role === userRoles.admin;
  const welcomeButtonProps = isAdmin
    ? {
        buttonLabel: 'Novo glasanje',
        buttonLink: `${paths.dashboard.voting.createVoting}`,
      }
    : {
        buttonLabel: 'Pregled glasanja',
        buttonLink: `${paths.dashboard.voting.votingResults}`,
      };

  const votedVotings = votings
    ? votings.filter((voting) => voting.isVoted === true)
    : [];
  const notVotedVotings = votings
    ? votings.filter((voting) => voting.isVoted === false)
    : [];

  const fetchData = async () => {
    await fetchAllVotings();
  };

  const transformVotingResults = () => {
    if (
      !userVotedVotings ||
      userVotedVotings.length === 0 ||
      !votings ||
      votings.length === 0
    ) {
      return [];
    }

    return userVotedVotings.map((voting) => {
      const votingDetail = votings.find((v) => v._id === voting.votingId);
      return {
        votingName: votingDetail?.title || 'Unknown Voting',
        optionName: voting.topOption || 'Unknown Option',
        votes: voting.votes,
      };
    });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (auth.user) {
      fetchUserVotedVotingsWithTopOption(auth.user._id);
    }
  }, [auth.user]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      {isLoading ? (
        <LoadingScreen sx={{ mt: '50%' }} />
      ) : (
        <>
          {!isMobile ? (
            <Grid
              item
              xs={12}
              md={7}
            >
              <AppWelcome
                title={`Glasaj za Vatrenu Elitu!`}
                description='Zaviri u srce nogometne strasti i daj svoj glas za najbolje od najboljih Vatrenih. Tko su tvoji nogometni junaci? Svaki glas se računa, svako mišljenje odzvanja - zajedno kreiramo nogometnu povijest!'
                img={
                  <SeoIllustration imageUrl='https://res.cloudinary.com/dzg5kxbau/image/upload/v1696250575/WhatsApp_Image_2023-09-26_at_20.25.25_rqlsao-modified_le1wt5.png' />
                }
                buttonLabel={welcomeButtonProps.buttonLabel}
                buttonLink={welcomeButtonProps.buttonLink}
              />
            </Grid>
          ) : (
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              sx={{ m: 1 }}
            >
              <Typography
                variant='h2'
                color={theme.palette.primary.main}
              >
                Glasanja
              </Typography>

              {isAdmin && (
                <Button
                  variant='contained'
                  color='primary'
                  component={Link}
                  to={`${paths.dashboard.voting.createVoting}`}
                >
                  Novo glasanje
                </Button>
              )}
            </Box>
          )}

          <SectionWrapper title='Dostupna'>
            <Grid container>
              {isLoading ? (
                <SkeletonDashboardLoader
                  count={4}
                  isMobileCount={3}
                  isTabletCount={4}
                  maxWidth={isMobile ? '90px' : '200px'}
                />
              ) : !notVotedVotings?.length ? (
                <SkeletonDashboardLoader
                  message='Čestitam! Sva glasanja su ispunjena! Obavjestiti ćemo te čim izađe novo glasanje.'
                  count={4}
                  isMobileCount={3}
                  isTabletCount={4}
                  maxWidth={isMobile ? '90px' : '200px'}
                />
              ) : (
                <Grid
                  container
                  spacing={2}
                >
                  {notVotedVotings.map((voting, index) => (
                    <Grid
                      key={index}
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={4}
                    >
                      <CustomCard
                        cardId={voting._id}
                        votingId={voting._id}
                        imgUrl={voting.thumbnail}
                        cardText={voting.title}
                        onDelete={deleteVoting}
                        linkTo={`${paths.dashboard.voting.vote}/${voting._id}`}
                        linkToEdit={`${paths.dashboard.voting.editVoting}/${voting._id}`}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
          </SectionWrapper>

          <StorySectionWrapper
            title='Najboljih 11'
            isCollapsable={true}
          >
            {isLoading ? (
              <SkeletonDashboardLoader
                count={6}
                isMobileCount={3}
                isTabletCount={4}
                maxWidth={isMobile ? '90px' : '200px'}
              />
            ) : !userVotedVotings.length ? (
              <Typography>Glasajte za svoje najdraže igrače!</Typography>
            ) : (
              <VotingOverview data={transformVotingResults()} />
            )}
          </StorySectionWrapper>

          <SectionWrapper title='Ispunjena'>
            {isLoading ? (
              <SkeletonDashboardLoader
                count={6}
                isMobileCount={3}
                isTabletCount={4}
                maxWidth={isMobile ? '90px' : '200px'}
              />
            ) : !votedVotings?.length ? (
              <SkeletonDashboardLoader
                message='Za sada nema ispunjenih glasanja! Tvoje mišljenje nam je važno, stoga ne propusti priliku izjasniti se o najboljih 11 svih vremena!'
                count={6}
                isMobileCount={3}
                isTabletCount={4}
                maxWidth={isMobile ? '90px' : '200px'}
              />
            ) : (
              <ScrollableContainer childrenCount={votedVotings.length}>
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
                          `${paths.dashboard.voting.votingResults}/${data._id}/${data.title}`
                        )
                      }
                    />
                  </Box>
                ))}
              </ScrollableContainer>
            )}
          </SectionWrapper>
        </>
      )}
    </Container>
  );
};
export default FiveView;
