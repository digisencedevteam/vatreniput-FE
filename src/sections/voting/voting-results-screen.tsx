import { Container, Grid, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useVoting from 'src/hooks/use-voting-data';
import { useSettingsContext } from 'src/components/settings';
import { useParams } from 'react-router';
import { VotingOverview } from 'src/components/voting-overview/voting-overview';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'src/routes/hooks';
import SkeletonOverviewResults from 'src/components/skeleton-loader/skeleton-overview-results';
import { VotingResultStat } from 'src/types';
import { paths } from 'src/routes/paths';

const VotingResultsScreen = () => {
  const [result, setResult] = useState<Partial<VotingResultStat> | null>(null);
  const { fetchVotingResult, isLoading } = useVoting();
  const settings = useSettingsContext();
  const { votingId, votingTitle } = useParams();
  const router = useRouter();

  const fetchData = async () => {
    if (votingId) {
      const fetchedResult = await fetchVotingResult(votingId);
      if (fetchedResult) {
        setResult(fetchedResult);
      }
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [votingId]);

  const renderContent = () => {
    if (isLoading) {
      return <SkeletonOverviewResults />;
    } else if (result) {
      return <VotingOverview data={result.results} />;
    } else {
      return (
        <SkeletonOverviewResults message='Podaci o rezultatima glasanja nisu dostupni.' />
      );
    }
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid
        container
        alignItems='center'
      >
        <Grid
          item
          sx={{ m: 1 }}
        >
          <IconButton
            edge='start'
            color='primary'
            aria-label='back to votings page'
            onClick={() => {
              router.push(paths.dashboard.votings);
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Typography
        variant='h4'
        sx={{ my: 3 }}
      >
        Rezultat kviza: {votingTitle}
      </Typography>
      {renderContent()}
    </Container>
  );
};
export default VotingResultsScreen;
