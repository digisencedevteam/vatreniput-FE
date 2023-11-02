import {
  Box,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

type SkeletonDashboardLoaderProps = {
  count?: number;
  width?: string;
  height?: string;
  maxWidth?: string;
  message?: string;
  isVoting?: boolean;
};

export const SkeletonDashboardLoader = ({
  count = 4,
  width = '100%',
  maxWidth = '220px',
  message,
  isVoting,
}: SkeletonDashboardLoaderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const adjustedMaxWidth = isMobile ? '100px' : maxWidth;
  let adjustedCount = isMobile ? 9 : count;

  if (!!isVoting && isMobile) adjustedCount = 3;

  return (
    <Box
      position='relative'
      display='flex'
      flexDirection='row'
      flexWrap='wrap'
      alignItems='center'
      justifyContent='center'
      width={width}
      height='100%'
      sx={{ borderRadius: 2 }}
    >
      {Array.from(new Array(adjustedCount)).map((_, index) => (
        <Box
          key={index}
          sx={{
            flex: '0 0 auto',
            width: width,
            maxWidth: adjustedMaxWidth,
            height: isMobile ? '160px' : '220px',
            m: 1,
            borderRadius: 2,
          }}
        >
          <Skeleton
            variant='rectangular'
            width='100%'
            height='100%'
            sx={{ borderRadius: 2 }}
          />
        </Box>
      ))}
      {message && (
        <Box
          position='absolute'
          display='flex'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
          sx={{
            backdropFilter: 'blur(3px)',
            borderRadius: 2,
            boxShadow: '0 4px 10px 0 rgba(0,0,0,0.1)',
          }}
        >
          <Typography
            variant={isMobile ? 'caption' : 'h6'}
            sx={{ fontWeight: 'bold', letterSpacing: 1 }}
          >
            {message}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
