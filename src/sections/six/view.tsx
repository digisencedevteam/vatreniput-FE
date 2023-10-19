import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { LinearProgress } from '@mui/material';
import Timeline from 'src/components/timeline-horizontal/Timeline';
import StoryContent from 'src/components/story-content/StoryContent';

export interface StorySection {
  storyTitle?: string;
  imageUrl: string;
  title: string;
  content: string;
}

export interface Story {
  sections: StorySection[];
}
const stories: Story[] = [
  {
    sections: [
      {
        storyTitle: '1998',
        title: 'Prica 15',
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        imageUrl: 'https://res.cloudinary.com/dzg5kxbau/image/upload/v1692357089/SLAVLJE4_copy_g1wd89.jpg',
      },
      {
        title: 'Prica 1 - Slicica 2',
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        imageUrl: 'https://res.cloudinary.com/dzg5kxbau/image/upload/v1693924116/vlaovic2_copy_l1j3rf.jpg',
      }
      // ... more sections for the same story
    ]
  },
  {
    sections: [
      {
        storyTitle: '2012',
        title: 'Prica 2',
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        imageUrl: 'https://res.cloudinary.com/dzg5kxbau/image/upload/v1694443581/zajednic%CC%8Cka_2018_a_svqtdz.jpg',
      },
      {
        title: 'Prica 2 - Slicia 2',
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        imageUrl: 'https://res.cloudinary.com/dzg5kxbau/image/upload/v1693928395/pas%CC%8Calic%CC%81_neymar_bltmeb.jpg',
      }
      // ... more sections for the second story
    ]
  },
  {
    sections: [
      {
        storyTitle: '3',
        title: 'Prica 3',
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        imageUrl: 'https://res.cloudinary.com/dzg5kxbau/image/upload/v1693926246/sosa_1_3_tfsxnb.jpg',
      },
      {
        title: 'Prica 3 - Slicica 2',
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        imageUrl: 'https://res.cloudinary.com/dzg5kxbau/image/upload/v1693926246/sosa_1_3_tfsxnb.jpg',
      }
      // ... more sections for the third story
    ]
  },
  {
    sections: [
      {
        storyTitle: '4',
        title: 'Prica 4',
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        imageUrl: 'https://res.cloudinary.com/dzg5kxbau/image/upload/v1693928395/pas%CC%8Calic%CC%81_neymar_bltmeb.jpg',
      },
      {
        title: 'Prica 4 - Slicica 2',
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        imageUrl: 'https://res.cloudinary.com/dzg5kxbau/image/upload/v1693926246/sosa_1_3_tfsxnb.jpg',
      }
      // ... more sections for the third story
    ]
  }
  // ... more stories
];

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
