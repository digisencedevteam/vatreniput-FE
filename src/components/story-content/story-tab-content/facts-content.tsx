import { CircleNotifications } from '@mui/icons-material';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { StorySectionWrapper } from 'src/components/section-wrapper/story-wrapper';
import { FactType, StoryContentProps } from 'src/types/story';

export const FactContent = ({ story }: StoryContentProps) => {
  if (!story?.Facts) {
    return null;
  }
  return (
    <>
      {story?.Facts && (
        <StorySectionWrapper title='Zanimljivosti'>
          <List>
            {story?.Facts.map(
              (fact: FactType, index: React.Key | null | undefined) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <CircleNotifications color='error' />
                  </ListItemAvatar>
                  <ListItemText>
                    <Typography
                      variant='subtitle1'
                      align='left'
                    >
                      {fact}
                    </Typography>
                  </ListItemText>
                </ListItem>
              )
            )}
          </List>
        </StorySectionWrapper>
      )}
    </>
  );
};
