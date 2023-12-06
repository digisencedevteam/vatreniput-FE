import { Grid } from '@mui/material';
import { StorySectionWrapper } from 'src/components/section-wrapper/story-wrapper';
import { HighlightData, StoryContentProps } from 'src/types/story';
import Highlight from '../../story-components/highlight/highlight';

export const HighlightContent = ({
  story,
  overFiftyPercent,
}: StoryContentProps & { overFiftyPercent: boolean }) => {
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
                md={6}
                lg={6}
                key={index}
              >
                <Highlight
                  data={highlight}
                  overFiftyPercent={overFiftyPercent}
                />
              </Grid>
            )
          )}
        </Grid>
      )}
    </StorySectionWrapper>
  );
};
