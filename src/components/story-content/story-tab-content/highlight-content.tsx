
import { Grid } from "@mui/material";
import { StorySectionWrapper } from "src/components/section-wrapper/story-wrapper";
import { StoryContentProps } from "src/types";
import Highlight from "../../story-components/highlight/highlight";

export const HighlightContent = ({ story }: StoryContentProps) => {
    return (
        <StorySectionWrapper title='Highlights'>
            {story?.Highlights &&
                <Grid container spacing={2}>
                    {story?.Highlights.map((highlight: { Title: string; imgUrl: string; Description: string; }, index: React.Key | null | undefined) => (
                        <Grid item xs={12} lg={6} key={index} >
                            <Highlight data={highlight} />
                        </Grid>
                    ))}
                </Grid>
            }
        </StorySectionWrapper>

    );
}