
import { Button, Typography, LinearProgress, Box, useTheme, useMediaQuery } from '@mui/material';
import { Story } from 'src/sections/six/view';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface TimelineProps {
    stories: Story[];
    currentStoryIndex: number;
    handleNextStory: () => void;
    handlePreviousStory: () => void;
}

const Timeline = ({
    stories,
    currentStoryIndex,
    handleNextStory,
    handlePreviousStory
}: TimelineProps) => {
    const generateFillPositions = (length: number): number[] => {
        const sequence = [20, 50, 80];
        const numSequences = Math.ceil(length / sequence.length);
        return Array.from({ length: numSequences * sequence.length }, (_, i) => sequence[i % sequence.length]);
    };

    const fillPositions = generateFillPositions(stories.length);
    const startDisplayIndex = Math.floor(currentStoryIndex / 3) * 3;
    const currentStory = stories[currentStoryIndex];
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box mt={3} position="relative" width="100%">
            <Button
                variant="contained"
                color="primary"
                onClick={handlePreviousStory}
                disabled={currentStoryIndex === 0}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    transform: 'translateY(-50%)',
                    borderRadius: '50%',
                    width: isMobile ? '25px' : '40px',
                    height: isMobile ? '25px' : '40px',
                    minWidth: 'auto',
                    padding: 0,
                }}
            >
                <ArrowBackIosIcon sx={{ fontSize: isMobile ? '16px' : '24px' }} />
            </Button>
            <Box position="relative" width="85%" marginLeft="7.5%">
                <LinearProgress
                    variant="determinate"
                    value={fillPositions[currentStoryIndex]}
                    sx={{
                        height: '8px',
                        borderRadius: '4px',
                        position: 'relative',
                    }}
                />
            </Box>
            {stories.slice(startDisplayIndex, startDisplayIndex + 3).map((story, index) => (
                <Typography
                    key={index}
                    variant="subtitle1"
                    color="error"
                    style={{
                        position: 'absolute',
                        bottom: '24px',
                        left: `${25 * (index + 1)}%`,
                        transform: 'translateX(-50%)',
                    }}
                >
                    {story.sections[0].storyTitle}
                </Typography>
            ))}
            {stories.slice(startDisplayIndex, startDisplayIndex + 3).map((_, index) => (
                <Box
                    key={index}
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: `${25 * (index + 1)}%`,
                        transform: "translate(-50%, -50%)",
                    }}
                    bgcolor={index === currentStoryIndex ? "text.secondary" : "primary.main"}
                    borderRadius="50%"
                    width={24}
                    height={24}
                >
                    {stories[startDisplayIndex + index] === currentStory && (
                        <Box
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                            }}
                            bgcolor="white"
                            borderRadius="50%"
                            width={12}
                            height={12}
                        ></Box>
                    )}
                </Box>
            ))}
            <Button
                variant="contained"
                color="primary"
                onClick={handleNextStory}
                disabled={currentStoryIndex === stories.length - 1}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    right: 0,
                    transform: 'translateY(-50%)',
                    borderRadius: '50%',
                    width: isMobile ? '25px' : '40px',
                    height: isMobile ? '25px' : '40px',
                    minWidth: 'auto',
                    padding: 0,
                }}
            >
                <ArrowForwardIosIcon sx={{ fontSize: isMobile ? '16px' : '24px' }} />
            </Button>
        </Box>
    );
};

export default Timeline;
