import { Box, Card, CardMedia, Divider, Typography } from '@mui/material';
import ScrollableContainer from 'src/components/scrollable-container/scrollable-container';
import { StorySectionWrapper } from 'src/components/section-wrapper/story-wrapper';
import { StoryContentProps } from 'src/types';

export const NationalTeamContent = ({ story }: StoryContentProps) => {
  return (
    <StorySectionWrapper title='Reprezentacija'>
      {['Vratari', 'Braniči', 'Vezni', 'Napadači'].map((category) => (
        <Box key={category}>
          <Typography variant='h4' my={2}>
            {category}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <ScrollableContainer>
            {story?.NationalTeam &&
              story?.NationalTeam[category]?.map((player, index) => (
                <Card
                  key={index}
                  sx={{
                    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
                    m: 2,
                    minWidth: 250,
                    borderRadius: 1,
                  }}
                >
                  <CardMedia
                    component='img'
                    height='250'
                    width={250}
                    image={player.imgurl}
                    alt={player.name}
                    sx={{ bgcolor: 'warning.main' }}
                  />
                  <Typography variant='subtitle1' align='center' sx={{ p: 2 }}>
                    {player.name}
                  </Typography>
                </Card>
              ))}
          </ScrollableContainer>
        </Box>
      ))}
    </StorySectionWrapper>
  );
};
