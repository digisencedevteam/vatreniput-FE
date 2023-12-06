import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card, { CardProps } from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import { VotingsResult } from 'src/types';
import { Divider } from '@mui/material';

interface Props extends CardProps {
  data: VotingsResult[] | undefined;
}

export const VotingOverview = ({ data }: Props) => {
  const theme = useTheme();
  return (
    <Card sx={{ mt: 2, bgcolor: theme.palette.background.neutral }}>
      <Stack
        spacing={4}
        sx={{ px: 3, pt: 3, pb: 5 }}
      >
        {data?.map((votingResult, index) => (
          <ProgressItem
            key={`${votingResult.votingName}-${index}`}
            progress={votingResult}
          />
        ))}
      </Stack>
    </Card>
  );
};

type ProgressItemProps = {
  progress: VotingsResult;
};

export const ProgressItem = ({ progress }: ProgressItemProps) => {
  return (
    <Stack spacing={1}>
      <Typography
        variant='h4'
        color={'primary'}
      >
        {progress.votingName}
      </Typography>
      <Stack
        direction='row'
        alignItems='center'
      >
        <Typography
          variant='body1'
          sx={{ flexGrow: 1 }}
        >
          {progress.optionName}
        </Typography>
        <Typography
          sx={{ mx: 1 }}
          variant='subtitle2'
        >
          Broj glasova:
        </Typography>
        <Typography
          variant='subtitle2'
          color='primary'
        >
          {progress.votes}
        </Typography>
      </Stack>
      <Divider />
    </Stack>
  );
};
