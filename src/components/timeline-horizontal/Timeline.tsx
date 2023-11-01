import {
    Button,
    Typography,
    LinearProgress,
    Box,
    Tooltip
} from '@mui/material';
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import { useParams, useRouter } from 'src/routes/hooks';
import { Story, TimelineProps } from 'src/types';

const Timeline = ({
    stories,
}: TimelineProps) => {
    const { storyId } = useParams();
    const currentStoryIndex = stories.findIndex((stories: { storyId: number; }) => stories.storyId === Number(storyId));
    const router = useRouter();
    const startDisplayIndex = Math.floor(currentStoryIndex / 3) * 3;
    const currentStory = stories[currentStoryIndex];

    const generateFillPositions = (length: number): number[] => {
        const sequence = [20, 50, 80];
        const numSequences = Math.ceil(length / sequence.length);
        return Array.from({ length: numSequences * sequence.length }, (_, i) => sequence[i % sequence.length]);
    };

    const nextStory = () => {
        const nextIndex = currentStoryIndex + 1;
        if (nextIndex < stories.length) {
            router.push(`/dashboard/story/${stories[nextIndex].storyId}`);
        }
    };

    const prevStory = () => {
        const prevIndex = currentStoryIndex - 1;
        if (prevIndex >= 0) {
            router.push(`/dashboard/story/${stories[prevIndex].storyId}`);
        }
    };

    const fillPositions = generateFillPositions(stories.length);
    return (
        <Box mt={3} position="relative" width="100%">
            <Tooltip title="Prošla priča">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={prevStory}
                    disabled={currentStoryIndex === 0}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: 0,
                        transform: 'translateY(-50%)',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        minWidth: 'auto',
                        padding: 0,
                    }}
                >
                    <NavigateBeforeOutlinedIcon sx={{ fontSize: '25px' }} />
                </Button>
            </Tooltip>
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
            {stories.slice(startDisplayIndex, startDisplayIndex + 3).map((story: Story, index: number) => (
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
                    {story.storyTitle}
                </Typography>
            ))}
            {stories.slice(startDisplayIndex, startDisplayIndex + 3).map((_: any, index: number) => (
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
            <Tooltip title="Sljedeća priča">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={nextStory}
                    disabled={currentStoryIndex === stories.length - 1}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        right: 0,
                        transform: 'translateY(-50%)',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        minWidth: 'auto',
                        padding: 0,
                    }}
                >
                    <NavigateNextOutlinedIcon sx={{ fontSize: '25px' }} />
                </Button>
            </Tooltip>
        </Box>
    );
};

export default Timeline;
