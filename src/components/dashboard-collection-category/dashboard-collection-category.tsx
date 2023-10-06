import { Grid, LinearProgress, Typography } from "@mui/material";
import { TopEvent } from "src/types";

const DashboardCollectionCategory = ({
    imageSrc,
    name,
    percentageCollected,
}: TopEvent) => {
    if (!percentageCollected) {
        return null
    }
    const percentage = Math.round(percentageCollected)

    return (
        <Grid container spacing={1} sx={{ marginY: 3 }}>
            <Grid item xs={5}>
                <img src={imageSrc} alt={name} style={{ width: "100%", borderRadius: 10 }} />
            </Grid>

            <Grid item xs={7} >
                <Typography variant="caption" sx={{}}>{name}</Typography>
                <Typography sx={{ fontSize: 11, paddingTop: 1 }}>{percentageCollected}%</Typography>
                <LinearProgress variant="determinate" value={percentage} />
            </Grid>
        </Grid>
    );
};

export default DashboardCollectionCategory;
