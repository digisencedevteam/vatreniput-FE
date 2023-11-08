import { Box, Typography, Grid } from '@mui/material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsIcon from '@mui/icons-material/Sports';
import { QualificationMatchDetailsProps } from 'src/types/story';

const QualificationMatchDetails = ({
  matches,
}: QualificationMatchDetailsProps) => {
  const getColumnSize = (matchCount: number) => {
    return matchCount === 2 ? 6 : 4;
  };

  return (
    <Grid
      container
      spacing={2}
      mt={2}
    >
      {matches?.map((matchData, index) => {
        const regularScorers =
          matchData.Scorers?.filter((scorer) => !scorer.includes('pen')) || [];
        const penaltyScorers =
          matchData.Scorers?.filter((scorer) => scorer.includes('pen')).map(
            (scorer) => scorer.replace('(pen.)', 'Penal')
          ) || [];

        const mdColumnSize = getColumnSize(matches.length);

        return (
          <Grid
            item
            xs={12}
            md={mdColumnSize}
            key={index}
          >
            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
              flexDirection='column'
              bgcolor={'background.paper'}
              p={3}
              borderRadius={1}
              sx={{
                boxShadow: (theme) => theme.customShadows.z8,
                height: '100%',
              }}
            >
              {matchData.Round && (
                <Typography
                  variant='h5'
                  color={'primary'}
                  textAlign={'center'}
                >
                  {matchData.Round}
                </Typography>
              )}
              <Typography
                variant='h6'
                mb={2}
              >
                {matchData.Teams} {matchData.Score}
              </Typography>
              {regularScorers.map((scorer, i) => (
                <Box
                  key={i}
                  display='flex'
                  alignItems='center'
                  my={1}
                >
                  <SportsSoccerIcon color='primary' />
                  <Typography
                    variant='body2'
                    ml={1}
                  >
                    {scorer}
                  </Typography>
                </Box>
              ))}
              {penaltyScorers.map((scorer, i) => (
                <Box
                  key={i}
                  display='flex'
                  alignItems='center'
                  my={1}
                >
                  <SportsIcon
                    color='error'
                    fontSize='small'
                    style={{ marginRight: '8px' }}
                  />
                  <Typography variant='body2'>{scorer}</Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default QualificationMatchDetails;
