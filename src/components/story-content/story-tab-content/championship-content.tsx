import { Button, Typography } from '@mui/material';
import { StorySectionWrapper } from 'src/components/section-wrapper/story-wrapper';
import { StoryContentProps } from 'src/types/story';
import QualificationMatchDetails from '../../story-components/match-details/qualification-match-details';
import MatchTable from '../../story-components/match-table/match-table';
import MatchDetails from '../../story-components/match-details/match-details';
import ChampionCard from '../../story-components/champ-card/champion-card';
import { useTruncatedText } from 'src/hooks/use-text-utils';

export const ChampionshipContent = ({ story }: StoryContentProps) => {
  const { expanded, toggleLines, truncatedText, isTruncated, less, more } =
    useTruncatedText(story?.Championship?.Summary || '');
  return (
    <>
      {story?.Championship?.Summary && (
        <StorySectionWrapper title='O prvenstvu'>
          <Typography
            variant='body1'
            mt={2}
          >
            {truncatedText}
            {isTruncated && (
              <Button onClick={toggleLines}>
                <Typography color='primary'>
                  {expanded ? less : more}
                </Typography>
              </Button>
            )}
          </Typography>
        </StorySectionWrapper>
      )}
      {story?.Championship && (
        <StorySectionWrapper
          title='Grupna faza'
          isCollapsable={true}
        >
          <MatchTable data={story?.Championship.Group} />
          {story?.Championship?.Matches.GroupStage && (
            <QualificationMatchDetails
              matches={story?.Championship?.Matches.GroupStage.matches || []}
            />
          )}
        </StorySectionWrapper>
      )}
      {story?.Championship?.Matches?.Finals?.RoundOf16 && (
        <StorySectionWrapper
          title='Osmina Finala'
          isCollapsable={true}
        >
          <MatchDetails
            matchData={story?.Championship.Matches.Finals.RoundOf16}
          />
        </StorySectionWrapper>
      )}
      {story?.Championship?.Matches?.Finals?.QuarterFinal && (
        <StorySectionWrapper
          title='Četvrtfinale'
          isCollapsable={true}
        >
          <MatchDetails
            matchData={story?.Championship.Matches.Finals.QuarterFinal}
          />
        </StorySectionWrapper>
      )}
      {story?.Championship?.Matches.Finals?.SemiFinal && (
        <StorySectionWrapper title='Polufinale'>
          <MatchDetails
            matchData={story?.Championship.Matches.Finals.SemiFinal}
          />
        </StorySectionWrapper>
      )}
      {story?.Championship?.Matches.Finals?.Final && (
        <StorySectionWrapper title='Finale'>
          <MatchDetails matchData={story?.Championship.Matches.Finals.Final} />
        </StorySectionWrapper>
      )}
      {story?.Championship?.Champ &&
        story?.Championship?.Champ.Winner &&
        story?.Championship?.Champ.TopScorer && (
          <ChampionCard data={story.Championship.Champ} />
        )}
    </>
  );
};
