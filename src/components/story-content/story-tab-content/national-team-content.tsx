import { Box, Card, CardMedia, Divider, Typography, Grid } from '@mui/material';
import { StorySectionWrapper } from 'src/components/section-wrapper/story-wrapper';
import { StoryContentProps } from 'src/types/story';

export const NationalTeamContent = ({ story }: StoryContentProps) => {
  return (
    <StorySectionWrapper title='Reprezentacija'>
      {['Vratari', 'Braniči', 'Vezni', 'Napadači'].map((category) => (
        <Box key={category}>
          <Typography
            variant='h4'
            my={2}
          >
            {category}
          </Typography>
          <Divider sx={{ my: 2 }} />
          {/* Replace ScrollableContainer with Grid */}
          <Grid
            container
            spacing={2}
          >
            {story?.NationalTeam &&
              story?.NationalTeam[category]?.map((player, index) => (
                <Grid
                  item
                  key={index}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                >
                  <Card
                    sx={{
                      boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
                      borderRadius: 1,
                    }}
                  >
                    <CardMedia
                      component='img'
                      height='250'
                      image={player.imgurl}
                      alt={player.name}
                      sx={{ bgcolor: 'warning.main' }}
                    />
                    <Typography
                      variant='subtitle1'
                      align='center'
                      sx={{ p: 2 }}
                    >
                      {player.name}
                    </Typography>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      ))}
    </StorySectionWrapper>
  );
};
