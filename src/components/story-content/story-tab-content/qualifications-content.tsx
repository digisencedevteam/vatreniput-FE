import { Typography } from "@mui/material";
import { StorySectionWrapper } from "src/components/section-wrapper/story-wrapper";
import { StoryContentProps } from "src/types/story";
import MatchTable from "../../story-components/match-table/match-table";
import QualificationMatchDetails from "../../story-components/match-details/qualification-match-details";

export const QualificationsContent = ({ story }: StoryContentProps) => {
    return (
        <>
            {story?.Qualifications?.Description && (
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
