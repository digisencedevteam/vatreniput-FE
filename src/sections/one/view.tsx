import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useSettingsContext } from 'src/components/settings';
import { Box, Grid, useTheme } from '@mui/material';
import { DashboardButton } from 'src/components/dashboard-button/dashboard-button';
import DashboardSectionWrapper from 'src/components/section-wrapper/dashboard-section-wrapper';
import DashboardCollectionCategory from 'src/components/dashboard-collection-category/dashboard-collection-category';
import ScrollableContainer from 'src/components/scrollable-container/scrollable-container';
import { useContext, useEffect, useState } from 'react';
import CustomCardSmall from 'src/components/custom-card/custom-card-small';
import QRScanner from 'src/components/qr-scanner/QRScanner';
import useDashboardData from 'src/hooks/use-dashboard-data';
import { SkeletonDashboardLoader } from 'src/components/skeleton-loader/skeleton-loader-dashboard';
import { AuthContext } from 'src/auth/context/jwt';
import StatisticCards from 'src/components/stats-box/statistic-box';
import { MotionContainer, varFade } from 'src/components/animate';
import { paths } from 'src/routes/paths';

export default function OneView() {
  const settings = useSettingsContext();
  const theme = useTheme();
  const [isScanning, setIsScanning] = useState(false);
  const auth = useContext(AuthContext);
  const userName = auth.user && auth.user.firstName;
  const {
    fetchDashboardData,
    quizzes,
    votings,
    isDashboardLoading,
    collectedStatistic,
  } = useDashboardData();
  const slideVariants = varFade();

  const imageSrc =
    theme.palette.mode === 'dark'
      ? 'https://res.cloudinary.com/dzg5kxbau/image/upload/v1694513740/qr-code-white_kdalqi.png'
      : 'https://res.cloudinary.com/dzg5kxbau/image/upload/v1694436034/qr-code_lkopl7.png';

  const mojaKolekcijaImageSrc =
    theme.palette.mode === 'dark'
      ? 'https://res.cloudinary.com/dzg5kxbau/image/upload/v1694513743/collection_white_sjtvox.png'
      : 'https://res.cloudinary.com/dzg5kxbau/image/upload/v1694444294/library_vqp6pn.png';

  const toggleScanning = () => {
    setIsScanning(!isScanning);
  };

  const notVotedVotings = votings
    ? votings.filter((voting) => voting.isVoted === false)
    : [];

  useEffect(() => {
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography
        variant='h3'
        sx={{ marginY: 1, paddingTop: 2 }}
      >
        {' '}
        Bok, {userName} 👋{' '}
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ marginTop: 5 }}
      >
        <Grid
          item
          xs={6}
        >
          <DashboardButton
            imageSrc={imageSrc}
            title={isScanning ? 'Stop Scanning' : 'Skeniraj novu'}
            onClick={toggleScanning}
          />
        </Grid>
        <Grid
          item
          xs={6}
        >
          <DashboardButton
            imageSrc={mojaKolekcijaImageSrc}
            title='Moja Kolekcija'
            link={paths.dashboard.collection}
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          {isScanning && <QRScanner />}
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Box width={'93%'}>
            <StatisticCards collectedStatistic={collectedStatistic} />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <MotionContainer variants={slideVariants.inUp}>
            <DashboardSectionWrapper
              title='Najviše skupljenih'
              link={paths.dashboard.collection}
            >
              {isDashboardLoading ? (
                <SkeletonDashboardLoader
                  count={1}
                  maxWidth='375px'
                />
              ) : !collectedStatistic?.topEvents?.length ? (
                <SkeletonDashboardLoader
                  count={1}
                  maxWidth='375px'
                  message='Tvoj digitalni album još je prazan. Započnite svoju avanturu skeniranjem QR koda s bilo koje sličice i spremite u digitalni album kako bi se prikazala statistika!'
                />
              ) : (
                <>
                  <DashboardCollectionCategory
                    imageSrc='https://res.cloudinary.com/dzg5kxbau/image/upload/v1694443453/hrvatska_momc%CC%8Cadska_2_ruhebv.jpg'
                    name={collectedStatistic.topEvents[0]?.name}
                    percentageCollected={Math.round(
                      collectedStatistic.topEvents[0]?.percentageCollected || 0
                    )}
                  />
                  <DashboardCollectionCategory
                    imageSrc='https://res.cloudinary.com/dzg5kxbau/image/upload/v1694443581/zajednic%CC%8Cka_2018_a_svqtdz.jpg'
                    name={collectedStatistic.topEvents[1]?.name}
                    percentageCollected={Math.round(
                      collectedStatistic.topEvents[1]?.percentageCollected || 0
                    )}
                  />
                </>
              )}
            </DashboardSectionWrapper>
          </MotionContainer>
          <DashboardSectionWrapper
            title='Kvizovi'
            link={paths.dashboard.quizzes}
          >
            {isDashboardLoading ? (
              <SkeletonDashboardLoader
                count={1}
                maxWidth='375px'
              />
            ) : quizzes?.length ? (
              <ScrollableContainer childrenCount={quizzes?.length}>
                {quizzes.map((quiz, index) => (
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
            ) : (
              <SkeletonDashboardLoader
                count={1}
                maxWidth='375px'
                message='Trenutno nema dostupnih kvizova, ali ne brini - uskoro dolaze novi. Pripremi se za nadmetanje uma!'
              />
            )}
          </DashboardSectionWrapper>
          <DashboardSectionWrapper
            title='Glasanja'
            link={paths.dashboard.votings}
          >
            {isDashboardLoading ? (
              <SkeletonDashboardLoader
                count={1}
                maxWidth='375px'
              />
            ) : notVotedVotings?.length ? (
              <ScrollableContainer childrenCount={notVotedVotings?.length}>
                {notVotedVotings.map((voting, index) => (
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
            ) : (
              <SkeletonDashboardLoader
                count={1}
                maxWidth='375px'
                message='Trenutno nema dostupnih glasanja, ali bez brige! Uskoro ćemo ponovno trebati tvoje mišljenje!'
              />
            )}
          </DashboardSectionWrapper>
        </Grid>
      </Grid>
    </Container>
  );
}
