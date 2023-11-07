import { Box, Card, Skeleton, Typography } from '@mui/material';

type SkeletonProps = {
  message?: string;
};

const SkeletonOverviewResults = ({ message }: SkeletonProps) => {
  return (
    <Card
      sx={{
        padding: 2,
        margin: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Skeleton variant='rectangular' width='100%' height={118} />
      {message && (
        <Box
          sx={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            width: '100%',
          }}
        >
          <Typography variant='caption' color='text.secondary'>
            {message}
          </Typography>
        </Box>
      )}
      <Box sx={{ width: '100%', marginTop: 2 }}>
        <Skeleton variant='text' width='60%' animation='wave' />
        <Skeleton variant='text' width='80%' animation='wave' />
        <Skeleton variant='text' width='40%' animation='wave' />
      </Box>
    </Card>
  );
};

SkeletonOverviewResults.defaultProps = {
  message: '',
};

export default SkeletonOverviewResults;
