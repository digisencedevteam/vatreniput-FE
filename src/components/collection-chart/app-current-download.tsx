import { ApexOptions } from 'apexcharts';
import { useTheme, styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Card, { CardProps } from '@mui/material/Card';
import Chart, { useChart } from 'src/components/chart';
import { Box, Skeleton, Typography } from '@mui/material';
import { CHART_HEIGHT, LEGEND_HEIGHT } from 'src/lib/constants';

const StyledChart = styled(Chart)(({ theme }) => ({
  height: CHART_HEIGHT,
  '& .apexcharts-canvas, .apexcharts-inner, svg, foreignObject': {
    height: `100% !important`,
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    borderTop: `dashed 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  cardCount: number;
  chart: {
    colors?: string[];
    series: {
      label: string;
      value: number;
    }[];
    options?: ApexOptions;
  };
}

const AppCurrentDownload = ({
  title,
  subheader,
  chart,
  cardCount,
  ...other
}: Props) => {
  const theme = useTheme();
  const {
    colors = [theme.palette.secondary.main, theme.palette.warning.main],
    series = [{ label: '', value: 0 }],
    options = {},
  } = chart || {};
  const chartSeries = series.map((i) => i.value);
  const chartOptions = useChart({
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    colors,
    labels: series.map((i) => i.label),
    stroke: { colors: [theme.palette.background.paper] },
    legend: {
      offsetY: 0,
      floating: true,
      position: 'bottom',
      horizontalAlign: 'center',
    },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (value: number) => value.toLocaleString(),
        title: {
          formatter: (seriesName: string) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '90%',
          labels: {
            value: {
              formatter: (value: number | string) => {
                let numValue =
                  typeof value === 'string' ? parseFloat(value) : value;
                return numValue.toFixed();
              },
            },
            total: {
              formatter: (w: { globals: { seriesTotals: number[] } }) => {
                return cardCount.toLocaleString();
              },
            },
          },
        },
      },
    },
    ...options,
  });

  if (!chartSeries.length) {
    return (
      <Card {...other}>
        <CardHeader title={title} subheader={subheader} sx={{ mb: 5 }} />
        <Box
          position='relative'
          display='flex'
          justifyContent='center'
          alignItems='center'
          height={CHART_HEIGHT}
        >
          <Skeleton
            variant='circular'
            animation='wave'
            width={300}
            height={300}
          />
          <Box
            position='absolute'
            top='50%'
            left='50%'
            style={{ transform: 'translate(-50%, -50%)' }}
            textAlign={'center'}
          >
            <Typography variant='caption' textAlign='center'>
              Vaš digitalni album još je prazan. Započnite svoju avanturu
              skeniranjem QR koda s bilo koje sličice i spremite u digitalni
              album kako bi se prikazala statistika!
            </Typography>
          </Box>
        </Box>
      </Card>
    );
  }
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 5 }} />
      <StyledChart
        dir='ltr'
        type='donut'
        series={chartSeries}
        options={chartOptions}
        height={300}
      />
    </Card>
  );
};

export default AppCurrentDownload;
