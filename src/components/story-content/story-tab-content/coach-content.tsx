import { Box, Typography } from "@mui/material";
import { StorySectionWrapper } from "src/components/section-wrapper/story-wrapper";
import { StoryContentProps } from "src/types/story";

export const CoachContent = ({ story }: StoryContentProps) => {
    if (!story?.Coach) {
        return null;
    }
    return (
        <StorySectionWrapper title='Izbornik'>
            <Box sx={{ display: 'flex', flexDirection: ['column', 'row'], gap: '1rem' }}>
                <Box sx={{ flex: 1, padding: '1rem', borderRadius: 2, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', bgcolor: 'background.paper' }}>
                    <Typography variant="h3" color={'primary'} component="div" mb={2}>
                        {story?.Coach.Name}
                    </Typography>
                    <Typography variant="body1" mb={1}>
                        <strong>Datum rođenja:</strong> {story?.Coach.DOB}
                    </Typography>
                    <Typography variant="body1" mb={1}>
                        <strong>Trenerska karijera:</strong> {story?.Coach.CoachingCareer}
                    </Typography>
                    <Typography variant="body1" mb={2}>
                        <strong>Glavna postignuća:</strong> {story?.Coach.MajorAchievements.join(', ')}
                    </Typography>
                </Box>
                <Box sx={{ flex: 1, borderRadius: 2, overflow: 'hidden', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
                    <img src={story?.Coach.imgUrl} alt={story?.Coach.Name} style={{ width: '100%' }} />
                </Box>
            </Box>
            <Typography variant="body1" mt={2}>
                {story?.Coach.StoryText}
            </Typography>
        </StorySectionWrapper>
    );
}