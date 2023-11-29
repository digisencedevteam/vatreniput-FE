import { Typography, Box, Grid, Paper, useTheme } from '@mui/material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import { StorySectionWrapper } from 'src/components/section-wrapper/story-wrapper';
import { StoryContentProps } from 'src/types/story';

interface DetailItemProps {
  icon: React.ReactElement;
  label: string;
  text: string;
}

export const GameContent = ({ story }: StoryContentProps) => {
  const game = story.Game;
  const theme = useTheme();

  if (!game || !game.GameDetails) {
    return null; // or some placeholder if no game data is provided
  }

  const { GameDetails, Summary } = game;

  const DetailItem: React.FC<DetailItemProps> = ({ icon, label, text }) => (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
    >
      <Box
        display='flex'
        alignItems='center'
        gap={2}
      >
        {icon}
        <Typography variant='body1'>
          <strong>{label}:</strong> {text}
        </Typography>
      </Box>
    </Grid>
  );

  return (
    <>
      <StorySectionWrapper title='Utakmica'>
        <Paper
          elevation={3}
          sx={{ padding: theme.spacing(3) }}
        >
          <Grid
            container
            spacing={2}
          >
            {GameDetails.Teams && (
              <DetailItem
                icon={<SportsSoccerIcon color='primary' />}
                label='Timovi'
                text={GameDetails.Teams}
              />
            )}
            {GameDetails.Score && (
              <DetailItem
                icon={<ScoreboardIcon color='primary' />} // Replace with appropriate icon
                label='Rezultat'
                text={GameDetails.Score}
              />
            )}
            {GameDetails.Scorers && (
              <DetailItem
                icon={<SportsSoccerIcon color='primary' />} // Replace with appropriate icon
                label='Golove zabili'
                text={GameDetails.Scorers.join(', ')}
              />
            )}
          </Grid>
        </Paper>
      </StorySectionWrapper>

      {Summary && (
        <StorySectionWrapper title='O utakmici'>
          <Paper
            elevation={3}
            sx={{ padding: theme.spacing(3), mt: 4 }}
          >
            <Typography variant='body1'>{Summary}</Typography>
          </Paper>
        </StorySectionWrapper>
      )}
    </>
  );
};
