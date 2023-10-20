import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Timeline from 'src/components/timeline-horizontal/Timeline';
import StoryContent from 'src/components/story-content/StoryContent';
import { stories } from 'src/lib/constants';



export default function SixView() {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const handleNextStory = () => {
    setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
  };
  const handlePreviousStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prevIndex => prevIndex - 1);
    }
  };

  const currentStory = stories[currentStoryIndex];
  const generateFillPositions = (length: number): number[] => {
    const sequence = [20, 50, 80];
    const numSequences = Math.ceil(length / sequence.length);
    return Array.from({ length: numSequences * sequence.length }, (_, i) => sequence[i % sequence.length]);
  };


  const fillPositions = generateFillPositions(stories.length);

  const startDisplayIndex = Math.floor(currentStoryIndex / 3) * 3;

  return (
    <Container maxWidth="xl">
      <Box mt={5} display="flex" flexDirection="column" alignItems="center">

        <Typography variant="h4" gutterBottom pb={4}>
          🔥 Vatrene price 🔥
        </Typography>

        <Timeline
          stories={stories}
          currentStoryIndex={currentStoryIndex}
          handleNextStory={handleNextStory}
          handlePreviousStory={handlePreviousStory}
        />

        <StoryContent sections={currentStory.sections} />
      </Box>
    </Container>
  );
}
