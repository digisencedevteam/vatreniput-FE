import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card, { CardProps } from '@mui/material/Card';
import LinearProgress from '@mui/material/LinearProgress';
import { useTheme } from '@mui/material/styles';
import { VotingResult } from 'src/types';

interface Props extends CardProps {
  data: VotingResult[] | undefined;
}

const QuizOverview = ({ data }: Props) => {
  const theme = useTheme();
  return (
    <Card sx={{ mt: 2, bgcolor: theme.palette.background.neutral }}>
      <Stack
        spacing={4}
        sx={{ px: 3, pt: 3, pb: 5 }}
      >
        {data?.map((progress) => (
          <ProgressItem
            key={progress.votingOptionText}
            progress={progress}
          />
        ))}
      </Stack>
      <Stack
        direction='row'
        justifyContent='flex-end'
        paddingRight={2}
        paddingBottom={2}
      ></Stack>
    </Card>
  );
};

type ProgressItemProps = {
  progress: VotingResult;
};

export const ProgressItem = ({ progress }: ProgressItemProps) => {
  return (
    <Stack spacing={1}>
      <Stack
        direction='row'
        alignItems='center'
      >
        <Typography
          variant='subtitle2'
          sx={{ flexGrow: 1 }}
        >
          {progress.votingOptionText}
        </Typography>

        <Typography
          sx={{ mx: 3 }}
          variant='subtitle2'
        >
          {progress.count}
        </Typography>

        <Typography
          variant='body2'
          sx={{ color: 'text.secondary' }}
        >
          {progress.percentage}%
        </Typography>
      </Stack>

      <LinearProgress
        variant='determinate'
        value={parseInt(progress.percentage, 10)}
      />
    </Stack>
  );
};
export default QuizOverview;
