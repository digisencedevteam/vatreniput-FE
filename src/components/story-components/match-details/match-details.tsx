import { Box, Typography, Divider } from '@mui/material';
import SportsIcon from '@mui/icons-material/Sports';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { MatchDetailsProps } from 'src/types/story';
import PenaltyShootoutTable from '../penalty-table/penatly-table';

const MatchDetails = ({ matchData }: MatchDetailsProps) => {
  return (
    <Box>
      <Typography
        variant='body1'
        m={1}
      >
        {matchData.Description}
      </Typography>
      <Box
        bgcolor={'background.paper'}
        p={1}
        borderRadius={1}
        sx={{ boxShadow: (theme) => theme.customShadows.z8 }}
        py={5}
      >
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
          mb={2}
        >
          <Typography variant='h5'>
            {matchData.Match} {matchData.Score}
          </Typography>
        </Box>
        <Box
          display='flex'
          justifyContent={'center'}
          alignItems='center'
          mb={2}
        >
          <SportsSoccerIcon color='primary' />
          <Typography
            variant='body1'
            ml={1}
          >
            Golovi: {matchData.GoalScorers && matchData.GoalScorers.join(', ')}
          </Typography>
        </Box>
        {matchData.Penalties && (
          <>
            <Box
              display='flex'
              alignItems='center'
              justifyContent={'center'}
              mb={2}
            >
              <SportsIcon color='error' />
              <Typography
                variant='body1'
                ml={1}
              >
                Penali: Hrvatska {matchData.Penalties}
              </Typography>
            </Box>
          </>
        )}
      </Box>
      {matchData.Penalties && (
        <>
          <Divider sx={{ margin: '16px 0' }} />
          <PenaltyShootoutTable data={matchData.PenaltyShootout} />
        </>
      )}
    </Box>
  );
};

export default MatchDetails;
