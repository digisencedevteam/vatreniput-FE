import { Grid, useTheme } from '@mui/material';
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
    <Grid
      container
      bgcolor={theme.palette.background.neutral}
      spacing={3}
      borderRadius={'16px'}
      justifyContent={'center'}
      overflow='hidden'
      paddingRight={'24px'}
      margin={0}
      height={'100%'}
    >
      <Grid
        item
        mb={2}
        xs={12}
      >
        <CollectedStatisticWidget
          chart={{
            series: [
              {
                label: 'Ukupno Skupljenih',
                percent: collectedStatistic?.percentageOfCollectedCards || 0,
                total: collectedStatistic?.numberOfCollectedCards || 0,
              },
            ],
          }}
          sx={{
            height: '100%',
            mb: 2,
            bgcolor: theme.palette.background.default,
          }}
        />
      </Grid>
    </Grid>
  );
};
export default StatisticCards;
