import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Card, { CardProps } from '@mui/material/Card';
import LinearProgress from '@mui/material/LinearProgress';
import { Button } from '@mui/material';

type ItemProps = {
    label: string;
    value: number;
    totalAmount: number;
};

interface Props extends CardProps {
    title?: string;
    subheader?: string;
    data: ItemProps[];
}

export default function VotingOverview({ title, subheader, data, ...other }: Props) {
    return (
        <Card {...other} sx={{ mt: 2 }}>
            <CardHeader title={title} subheader={subheader} />

            <Stack spacing={4} sx={{ px: 3, pt: 3, pb: 5 }}>
                {data.map((progress) => (
                    <ProgressItem key={progress.label} progress={progress} />
                ))}
            </Stack>
            <Stack direction="row" justifyContent="flex-end" paddingRight={2} paddingBottom={2}>
                <Button variant="contained" color="primary">Vidi sve</Button>
            </Stack>
        </Card>
    );
}

type ProgressItemProps = {
    progress: ItemProps;
};

function ProgressItem({ progress }: ProgressItemProps) {
    return (
        <Stack spacing={1}>
            <Stack direction="row" alignItems="center">
                <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
                    {progress.label}
                </Typography>

                <Typography variant="subtitle2">{progress.totalAmount}</Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    &nbsp;({progress.value}%)
                </Typography>
            </Stack>

            <LinearProgress
                variant="determinate"
                value={progress.value}
                color={
                    (progress.label === 'Total Income' && 'info') ||
                    (progress.label === 'Total Expenses' && 'warning') ||
                    'primary'
                }
            />
        </Stack>
    );
}