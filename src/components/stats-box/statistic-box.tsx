import React from 'react';
import { Grid, useTheme } from '@mui/material';

import SelectionStatistic from 'src/components/selection-statistic/selection-statistic';
import CollectionStatisticIllustration from 'src/assets/illustrations/collection-statistic-illustration';
import CollectedStatisticWidget from 'src/sections/two/collected-statistic-widget';

interface StatisticCardsProps {
    collectedStatistic?: {
        percentageOfCollectedCards: number;
        numberOfCollectedCards: number;
    } | null;
}

const StatisticCards = ({ collectedStatistic }: StatisticCardsProps) => {
    const theme = useTheme();

    return (
        <Grid container
            direction="column"
            bgcolor={theme.palette.background.neutral}
            spacing={3}
            borderRadius={'16px'}
            overflow="hidden"
            paddingRight={'24px'}
            margin={0}
        >
            <Grid item>
                <CollectedStatisticWidget
                    chart={{
                        series: [{
                            label: 'Ukupno Skupljenih',
                            percent: collectedStatistic?.percentageOfCollectedCards || 0,
                            total: collectedStatistic?.numberOfCollectedCards || 0,
                        }],
                    }}
                    sx={{ flex: '0 0 auto', height: '100%', bgcolor: theme.palette.background.default }}
                />
            </Grid>
            <Grid item>
                <SelectionStatistic
                    title='Još do otključavanja neke od priča'
                    total={78}
                    icon={<CollectionStatisticIllustration />}
                    sx={{
                        flex: '0 0 auto',
                        margin: 2,
                        marginRight: { xs: theme.spacing(2), md: theme.spacing(2) },
                    }}
                />
            </Grid>
        </Grid>
    );
}

export default StatisticCards;