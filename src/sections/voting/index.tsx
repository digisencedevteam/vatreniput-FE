import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  Grid,
  IconButton,
  useMediaQuery,
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
import { LoadingScreen } from 'src/components/loading-screen';

const VotingApp = () => {
  const settings = useSettingsContext();
  const { votingId } = useParams();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const theme = useTheme();
  const { submitVote, fetchVotingById } = useVoting();
  const router = useRouter();
  const [voting, setVoting] = useState<Partial<Voting> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (votingId && selectedOption) {
      await submitVote(votingId, selectedOption);
      setIsSubmitting(false);
      router.push(`${paths.dashboard.five}`);
    } else {
      setIsSubmitting(false);
    }
  };

  const fetchAndSetVoting = async () => {
    if (votingId) {
      const fetchedVoting = await fetchVotingById(votingId);
      setVoting(fetchedVoting);
    }
  };

  useEffect(() => {
    fetchAndSetVoting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [votingId]);

  useEffect(() => {
    if (voting && voting.isVoted) {
      router.push(paths.dashboard.five);
    }
  }, [voting, router]);

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
      {isSubmitting ? (
        <LoadingScreen />
      ) : (
        <>
          <Grid container alignItems='center'>
            <Grid item sx={{ m: 5 }}>
              <IconButton
                edge='start'
                color='primary'
                aria-label='back to previous page'
                onClick={() => {
                  router.push(paths.dashboard.five);
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
              bgcolor: theme.palette.background.neutral,
              mx: isMobile ? 0 : 20,
              textAlign: 'center',
            }}
          >
            <Typography sx={{ marginTop: 2 }} variant='h3' gutterBottom>
              {voting && voting.title}
            </Typography>
            <Typography variant='body1' gutterBottom>
              {voting && voting.description}
            </Typography>
            <Grid container spacing={2} sx={{ my: 5, p: isMobile ? 0 : 3 }}>
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
              <Button
                variant='contained'
                color='primary'
                onClick={handleSubmit}
                sx={{ px: 5, py: 1 }}
              >
                Glasaj
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
};
export default VotingApp;
