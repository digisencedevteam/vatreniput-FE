import { CircleNotifications } from "@mui/icons-material";
import { List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { StorySectionWrapper } from "src/components/section-wrapper/story-wrapper";
import { FactType, StoryContentProps } from "src/types";

export const ZanimljivostiContent = ({ story }: StoryContentProps) => {
    if (!story?.Zanimljivosti) {
        return null;
    }
    return (
        <>
            {story?.Zanimljivosti &&
                <StorySectionWrapper title='Zanimljivosti'>
                    <List>
                        {story?.Zanimljivosti.map((fact: FactType, index: React.Key | null | undefined) => (
                            <ListItem key={index} >
                                <ListItemAvatar>
                                    <CircleNotifications color='error' />
                                </ListItemAvatar>
                                <ListItemText  >
                                    <Typography variant="h6" align="left">
                                        {fact}
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </StorySectionWrapper>
            }
        </>


    );
}