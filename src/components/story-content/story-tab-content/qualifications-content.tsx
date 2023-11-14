import { Button, Typography } from '@mui/material';
import { StorySectionWrapper } from 'src/components/section-wrapper/story-wrapper';
import { StoryContentProps } from 'src/types/story';
import MatchTable from '../../story-components/match-table/match-table';
import QualificationMatchDetails from '../../story-components/match-details/qualification-match-details';
import { useTruncatedText } from 'src/hooks/use-text-utils';
import { useEffect } from 'react';

export const QualificationsContent = ({ story }: StoryContentProps) => {
  const {
    expanded,
    toggleLines,
    truncatedText,
    isTruncated,
    less,
    more,
    setText,
  } = useTruncatedText(story?.Qualifications?.Description || '');

  useEffect(() => {
    setText(story?.Qualifications?.Description || '');
  }, [story, setText]);
  return (
    <>
      {story?.Qualifications?.Description && (
        <StorySectionWrapper title='Kvalifikacije'>
          <Typography variant='body1'>
            {truncatedText}
            {isTruncated && (
              <Button onClick={toggleLines}>
                <Typography color='primary'>
                  {expanded ? less : more}
                </Typography>
              </Button>
            )}
          </Typography>
          {story?.Qualifications?.Teams && (
            <MatchTable data={story.Qualifications.Teams} />
          )}
        </StorySectionWrapper>
      )}
      {story?.AdditionalQualifications && (
        <StorySectionWrapper
          title='Dodatne Kvalifikacije'
          isCollapsable={true}
        >
          <QualificationMatchDetails matches={story.AdditionalQualifications} />
        </StorySectionWrapper>
      )}
    </>
  );
};
