import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  Grid,
  IconButton,
} from '@mui/material';
import { useSettingsContext } from 'src/components/settings';
import { useParams } from 'react-router-dom';
import VotingOptionItem from './voting-option-item';
import { useEffect, useState } from 'react';
import useVoting from 'src/hooks/use-voting-data';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'src/routes/hooks';
import { Voting } from 'src/types';
import { paths } from 'src/routes/paths';

const VotingApp = () => {
  const settings = useSettingsContext();
  const { votingId } = useParams();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const theme = useTheme();
  const { submitVote, fetchVotingById } = useVoting();
  const router = useRouter();
  const [voting, setVoting] = useState<Partial<Voting> | null>(null);

  const handleSubmit = async () => {
    if (votingId && selectedOption) {
      await submitVote(votingId, selectedOption);
      router.push(`${paths.dashboard.five}`);
    }
  };

  useEffect(() => {
    const fetchAndSetVoting = async () => {
      if (votingId) {
        const fetchedVoting = await fetchVotingById(votingId);
        setVoting(fetchedVoting);
      }
    };
    fetchAndSetVoting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [votingId]);

  return (
    <Container
      maxWidth={settings.themeStretch ? false : 'xl'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid container alignItems='center'>
        <Grid item sx={{ m: 5 }}>
          <IconButton
            edge='start'
            color='primary'
            aria-label='back to previous page'
            onClick={() => {
              router.push('/dashboard/five');
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 3,
          px: 1,
          bgcolor: theme.palette.background.neutral,
        }}
      >
        <Typography sx={{ marginTop: 2 }} variant='h3' gutterBottom>
          {voting && voting.title}
        </Typography>
        <Typography variant='body1' gutterBottom>
          {voting && voting.description}
        </Typography>
        <Grid container spacing={2} sx={{ my: 5 }}>
          {voting &&
            voting.votingOptions &&
            voting.votingOptions.map((option: any) => (
              <Grid
                item
                xs={6}
                key={option.text}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <VotingOptionItem
                  option={option}
                  selected={selectedOption === option._id}
                  onSelect={setSelectedOption}
                />
              </Grid>
            ))}
        </Grid>
        <Box
          sx={{
            alignSelf: 'flex-end',
            m: 5,
          }}
        >
          <Button variant='contained' color='primary' onClick={handleSubmit}>
            Glasaj
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default VotingApp;
