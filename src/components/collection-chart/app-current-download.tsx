
import { ApexOptions } from 'apexcharts';
import { useTheme, styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Card, { CardProps } from '@mui/material/Card';
import Chart, { useChart } from 'src/components/chart';

import { Skeleton } from '@mui/material';
type InputValue = string | number | null;

const CHART_HEIGHT = 400;

const LEGEND_HEIGHT = 72;

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

export default function AppCurrentDownload({ title, subheader, chart, cardCount, ...other }: Props) {

    const theme = useTheme();

    const { colors = ["#ef0de0", "#d99e3a"], series = [{ label: '', value: 0 }], options = {} } = chart || {};

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
                                let numValue = typeof value === "string" ? parseFloat(value) : value;
                                return numValue.toFixed() + '%';
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
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: CHART_HEIGHT }}>
                    <Skeleton variant='circular' width={300} height={300} />
                </div>
            </Card>
        );
    }

    return (

        <Card {...other}>
            <CardHeader title={title} subheader={subheader} sx={{ mb: 5 }} />

            <StyledChart
                dir="ltr"
                type="donut"
                series={chartSeries}
                options={chartOptions}
                height={300}
            />
        </Card>
    );
}
function numeral(number: InputValue) {
    throw new Error('Function not implemented.');
}

