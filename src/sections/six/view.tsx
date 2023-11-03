import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import StoryContent from 'src/components/story-content/StoryContent';
import Timeline from 'src/components/timeline-horizontal/Timeline';
import { StoryProvider } from 'src/context/StoryContext';
import { STORIES } from 'src/lib/constants';
import { useParams } from 'src/routes/hooks';

export default function SixView() {
  let { storyId } = useParams();
  const currentStory = STORIES.find(story => story.storyId === Number(storyId));

  return (
    <StoryProvider>
      <Container maxWidth='xl'>
        <Box mt={3} display="flex" flexDirection="column" alignItems="center">
          <Timeline
            stories={STORIES}
          />
          {currentStory &&
            <StoryContent story={currentStory.story} />
          }
        </Box>
      </Container>
    </StoryProvider>
  );
}
