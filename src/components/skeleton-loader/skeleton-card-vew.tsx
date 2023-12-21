import {
  Box,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

type SkeletonCardLoaderProps = {
  message?: string;
};

export const SkeletonCardLoader = ({ message }: SkeletonCardLoaderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const cardSkeletonWidth = isMobile ? '100%' : 'calc(50% - 16px)'; // Account for the gap
  const cardSkeletonHeight = isMobile ? '200px' : '400px';
  const detailSkeletonHeight = '20px';

  return (
    <Box
      position='relative'
      display='flex'
      flexDirection={isMobile ? 'column' : 'row'}
      alignItems='center'
      justifyContent='center'
      p={2}
      gap={2}
      minHeight={cardSkeletonHeight} // Ensure the container has a minimum height
      width='100%' // Ensure the container takes the full width
      sx={{
        '& > *': {
          flexBasis: cardSkeletonWidth, // Each child takes up the correct width
        },
      }}
    >
      {/* Skeleton for Card Image */}
      <Skeleton
        variant='rectangular'
        animation='wave'
        sx={{
          borderRadius: 2,
          width: '100%', // Skeleton takes the full width of its flex container
          height: cardSkeletonHeight,
        }}
      />

      {/* Skeleton for Card Details */}
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='flex-start' // Align to the start, not center
        sx={{
          width: '100%', // Skeleton detail box takes the full width of its flex container
          gap: 1,
        }}
      >
        <Skeleton
          variant='text'
          animation='wave'
          width='60%'
          height={detailSkeletonHeight}
        />
        <Skeleton
          variant='text'
          animation='wave'
          width='80%'
          height={detailSkeletonHeight}
        />
        <Skeleton
          variant='text'
          animation='wave'
          width='70%'
          height={detailSkeletonHeight}
        />
        <Skeleton
          variant='rectangular'
          animation='wave'
          height='60px'
        />
      </Box>

      {message && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            p: 2,
            borderRadius: 1,
            maxWidth: isMobile ? '80%' : 'unset',
            textAlign: 'center',
          }}
        >
          <Typography
            variant='caption'
            color='text.primary'
          >
            {message}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
