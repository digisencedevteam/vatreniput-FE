import {
  Box,
  Card,
  Skeleton,
  Typography,
  CardMedia,
  useTheme,
} from '@mui/material';

type DesktopNewsSkeletonProps = {
  imageUrl?: string;
  message?: string;
};

const DesktopNewsSkeleton = ({
  imageUrl,
  message,
}: DesktopNewsSkeletonProps) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(6),
        borderRadius: 2,
        boxShadow: theme.shadows[1],
        backgroundColor: theme.palette.background.paper,
        height: '300px',
        transition: '0.3s',
        '&:hover': {
          boxShadow: theme.shadows[3],
        },
      }}
    >
      {imageUrl ? (
        <CardMedia
          component='img'
          image={imageUrl}
          alt='Loading content'
          sx={{
            height: '150px',
            width: 'auto',
            maxWidth: '100%',
            objectFit: 'contain',
            marginBottom: theme.spacing(2),
          }}
        />
      ) : (
        <Skeleton
          variant='rectangular'
          width='100%'
          height='150px'
          sx={{
            marginBottom: theme.spacing(2),
          }}
        />
      )}
      {message ? (
        <Typography
          variant='subtitle1'
          color='text.secondary'
          textAlign='center'
          sx={{ marginBottom: theme.spacing(2) }}
        >
          {message}
        </Typography>
      ) : (
        <Skeleton
          variant='text'
          width='80%'
          sx={{
            marginBottom: theme.spacing(1),
          }}
        />
      )}
      <Box
        sx={{
          width: '100%',
          marginBottom: theme.spacing(1),
        }}
      >
        <Skeleton variant='rectangular' height='10px' animation='wave' />
        <Skeleton
          variant='rectangular'
          height='10px'
          animation='wave'
          sx={{ marginTop: '8px' }}
        />
      </Box>
    </Card>
  );
};

export default DesktopNewsSkeleton;
