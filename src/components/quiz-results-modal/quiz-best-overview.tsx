import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Card, { CardProps } from '@mui/material/Card';
import LinearProgress from '@mui/material/LinearProgress';
import { useTheme } from '@mui/material/styles';
import { ItemProps } from 'src/types';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  data: ItemProps[] | any;
}
type ProgressItemProps = {
  progress: ItemProps;
};

const QuizBestOverview = ({ title, subheader, data = [] }: Props) => {
  const theme = useTheme();
  const sortedData = [...data].sort((a, b) => b.label.score - a.label.score);

  return (
    <Card sx={{ bgcolor: theme.palette.background.neutral }}>
      <CardHeader title={title} subheader={subheader} />
      <Stack spacing={4} sx={{ px: 3, pt: 3, pb: 5 }}>
        {sortedData.map((progress: ItemProps) => (
          <ProgressItem key={progress.label.quiz.title} progress={progress} />
        ))}
      </Stack>
    </Card>
  );
};

const ProgressItem = ({ progress }: ProgressItemProps) => {
  const formattedDuration = progress?.label?.duration
    ? dayjs.duration(progress.label.duration * 1000).format('mm:ss')
    : 'N/A';
  return (
    <Stack spacing={1}>
      <Stack direction='row' alignItems='center'>
        <Typography variant='subtitle2' sx={{ flexGrow: 1 }}>
          {progress?.label?.quiz?.title ?? 'N/A'}
        </Typography>
        <Typography sx={{ paddingRight: 3 }} variant='subtitle2'>
          {formattedDuration}m
        </Typography>
        <Typography variant='subtitle2'>
          {Math.round(progress?.label?.score) ?? 'N/A'}%
        </Typography>
      </Stack>
      {typeof progress?.label?.score === 'number' && (
        <LinearProgress
          variant='determinate'
          value={progress.label.score}
          color={'primary'}
        />
      )}
    </Stack>
  );
};
export default QuizBestOverview;
