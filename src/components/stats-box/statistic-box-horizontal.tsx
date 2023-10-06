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

const HorizontalScrollStatisticCards = ({ collectedStatistic }: StatisticCardsProps) => {
    const theme = useTheme();

    return (
        <Grid container
            direction="row"
            spacing={3}
            bgcolor={theme.palette.background.neutral}
            borderRadius={'16px'}
            wrap="nowrap"
            sx={{
                marginTop: 0,
                marginLeft: 0,
                marginRight: 0,
                width: '99.5%',
                overflowX: { xs: "auto", md: "hidden" },
                '&::-webkit-scrollbar': { display: 'none' },
                '-ms-overflow-style': 'none',
                scrollbarWidth: 'none',
            }}
        >
            <Grid item xs={12} md="auto" m={1} mb={3} ml={0} >
                <CollectedStatisticWidget
                    chart={{
                        series: [{
                            label: 'Ukupno Skupljenih',
                            percent: collectedStatistic?.percentageOfCollectedCards || 0,
                            total: collectedStatistic?.numberOfCollectedCards || 0,
                        }],
                    }}
                    sx={{ height: '100%', width: '80vw', bgcolor: theme.palette.background.default }}
                />
            </Grid>

            <Grid item xs={12} md="auto" m={1} mb={3} mr={3} >
                <SelectionStatistic
                    title='još do otključavanja neke od priča'
                    total={78}
                    icon={<CollectionStatisticIllustration />}
                    sx={{ height: '100%', width: '80vw' }}
                />
            </Grid>
        </Grid>
    );
}

export default HorizontalScrollStatisticCards;
