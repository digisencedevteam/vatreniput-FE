import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import StoryContent from 'src/components/story-content/StoryContent';
import Timeline from 'src/components/timeline-horizontal/Timeline';
import { STORIES } from 'src/lib/constants';
import { useParams } from 'src/routes/hooks';

export default function SixView() {

  let { storyId } = useParams();

  const currentStory = STORIES.find(story => story.storyId === Number(storyId));
  return (
    <Container maxWidth="xl">
      <Box mt={5} display="flex" flexDirection="column" alignItems="center">

        <Typography variant="h4" gutterBottom pb={4}>
          🔥 Vatrene price 🔥
        </Typography>


        <Timeline
          stories={STORIES}
        />

        {currentStory && <StoryContent story={currentStory.story} />}




      </Box>
    </Container>
  );
}
