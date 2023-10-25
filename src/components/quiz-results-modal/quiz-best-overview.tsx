import React, { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Card, { CardProps } from '@mui/material/Card';
import LinearProgress from '@mui/material/LinearProgress';
import { useTheme } from '@mui/material/styles';
import { ItemProps } from 'src/types';

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  data: ItemProps[] | any;
}
type ProgressItemProps = {
  progress: any;
};

export default function QuizBestOverview({
  title,
  subheader,
  data = [],
  ...other
}: Props) {
  const theme = useTheme();
  useEffect(() => {});
  return (
    <Card {...other} sx={{ bgcolor: theme.palette.background.neutral }}>
      <CardHeader title={title} subheader={subheader} />
      <Stack spacing={4} sx={{ px: 3, pt: 3, pb: 5 }}>
        {data.map((progress: ItemProps) => (
          <ProgressItem key={progress.label.quiz.title} progress={progress} />
        ))}
      </Stack>
    </Card>
  );
}

function ProgressItem({ progress }: ProgressItemProps) {
  return (
    <Stack spacing={1}>
      <Stack direction='row' alignItems='center'>
        <Typography variant='subtitle2' sx={{ flexGrow: 1 }}>
          {progress?.label?.quiz?.title ?? 'N/A'}
        </Typography>
        <Typography sx={{ paddingRight: 5 }} variant='subtitle2'>
          {progress?.label?.duration ?? 'N/A'} sec
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
}
