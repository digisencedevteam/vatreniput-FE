import { Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useVoting from 'src/hooks/use-voting-data';
import { useSettingsContext } from 'src/components/settings';
import { useParams } from 'react-router';
import VotingOverview from 'src/components/voting-overview/voting-overview';
import { VotingResultStat } from 'src/types';

const VotingResultsScreen = () => {
  const { fetchVotingResult } = useVoting();
  const settings = useSettingsContext();
  const [result, setResult] = useState<Partial<VotingResultStat> | null>(null);
  const { votingId, votingTitle } = useParams();

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

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant='h4' sx={{ my: 5 }}>
        Rezultat kviza: {votingTitle}
      </Typography>
      {result && <VotingOverview data={result.results} />}
    </Container>
  );
};

export default VotingResultsScreen;
