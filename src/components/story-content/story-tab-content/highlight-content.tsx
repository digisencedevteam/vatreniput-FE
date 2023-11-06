import { Grid } from '@mui/material';
import { StorySectionWrapper } from 'src/components/section-wrapper/story-wrapper';
import { HighlightData, StoryContentProps } from 'src/types/story';
import Highlight from '../../story-components/highlight/highlight';

export const HighlightContent = ({ story }: StoryContentProps) => {
  return (
    <StorySectionWrapper title='Highlights'>
      {story?.Highlights && (
        <Grid
          container
          spacing={2}
        >
          {story?.Highlights.map(
            (highlight: HighlightData, index: React.Key) => (
              <Grid
                item
                xs={12}
                lg={6}
                key={index}
              >
                <Highlight data={highlight} />
              </Grid>
            )
          )}
        </Grid>
      )}
    </StorySectionWrapper>
  );
};
