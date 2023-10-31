import { Typography } from "@mui/material";
import { StorySectionWrapper } from "src/components/section-wrapper/story-wrapper";
import { StoryContentProps } from "src/types";
import QualificationMatchDetails from "../../story-components/match-details/qualification-match-details";
import MatchTable from "../../story-components/match-table/match-table";
import MatchDetails from "../../story-components/match-details/match-details";
import ChampionCard from "../../story-components/champ-card/champion-card";

export const PrvenstvoContent = ({ story }: StoryContentProps) => {
    return (
        <>
            {story?.Prvenstvo?.Summary && (
                <StorySectionWrapper title='O prvenstvu'>
                    <Typography variant="body1" mt={2}>{story?.Prvenstvo.Summary}</Typography>
                </StorySectionWrapper>
            )}
            {story?.Prvenstvo?.Summary && (
                <StorySectionWrapper title='Skupina' isCollapsable={true}>
                    <MatchTable data={story?.Prvenstvo.Skupina} />
                    {story?.Prvenstvo?.Matches.GroupStage && (
                        <QualificationMatchDetails matches={story?.Prvenstvo?.Matches.GroupStage.matches || []} />
                    )}
                </StorySectionWrapper>
            )}

            {story?.Prvenstvo?.Matches?.Finals?.RoundOf16 &&
                <StorySectionWrapper title='Osmina Finala' isCollapsable={true}>
                    <MatchDetails matchData={story?.Prvenstvo.Matches.Finals.RoundOf16} />
                </StorySectionWrapper>
            }
            {story?.Prvenstvo?.Matches?.Finals?.QuarterFinal &&
                <StorySectionWrapper title='Četvrt Finala' isCollapsable={true}>
                    <MatchDetails matchData={story?.Prvenstvo.Matches.Finals.QuarterFinal} />
                </StorySectionWrapper>
            }
            {story?.Prvenstvo?.Matches.Finals?.SemiFinal &&
                <StorySectionWrapper title='Polufinale' >
                    <MatchDetails matchData={story?.Prvenstvo.Matches.Finals.SemiFinal} />
                </StorySectionWrapper>
            }
            {story?.Prvenstvo?.Matches.Finals?.Final &&
                <StorySectionWrapper title='Finale'>
                    <MatchDetails matchData={story?.Prvenstvo.Matches.Finals.Final} />
                </StorySectionWrapper>
            }
            {
                story?.Prvenstvo?.Champ && story?.Prvenstvo?.Champ.Winner && story?.Prvenstvo?.Champ.TopScorer &&
                <ChampionCard data={story.Prvenstvo.Champ} />
            }
        </>
    );
}
