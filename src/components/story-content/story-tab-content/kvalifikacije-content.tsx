import { Typography } from "@mui/material";
import { StorySectionWrapper } from "src/components/section-wrapper/story-wrapper";
import { StoryContentProps } from "src/types";
import MatchTable from "../../story-components/match-table/match-table";
import QualificationMatchDetails from "../../story-components/match-details/qualification-match-details";

export const KvalifikacijeContent = ({ story }: StoryContentProps) => {
    return (
        <>
            {story?.Qualifications?.Description && story?.Prvenstvo?.Matches.GroupStage && (
                <StorySectionWrapper title='Kvalifikacije'>
                    <Typography variant="body1">{story.Qualifications.Description}</Typography>
                    {story?.Qualifications?.Teams && <MatchTable data={story.Qualifications.Teams} />}
                </StorySectionWrapper>
            )}
            {story?.AdditionalQualifications && (
                <StorySectionWrapper title='Dodatne Kvalifikacije' isCollapsable={true}>
                    <QualificationMatchDetails matches={story.AdditionalQualifications} />
                </StorySectionWrapper>
            )}
        </>
    );
}