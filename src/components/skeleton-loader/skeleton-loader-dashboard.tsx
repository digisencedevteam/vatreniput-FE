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
  isMobileCount?: number;
  isTabletCount?: number;
};

export const SkeletonDashboardLoader = ({
  count = 4,
  width = '100%',
  maxWidth = '170px',
  message,
  height: propHeight,
  isMobileCount,
  isTabletCount,
}: SkeletonDashboardLoaderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const adjustedMaxWidth = isMobile ? maxWidth || '100px' : maxWidth;
  const height = isMobile ? propHeight || '160px' : propHeight || '220px';
  let adjustedCount = isMobile ? isMobileCount : count;

  if (isMobile) adjustedCount = isMobileCount;
  if (isTablet) adjustedCount = isTabletCount;

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
            height: { height },
            m: 1,
            borderRadius: 2,
          }}
        >
          <Skeleton
            variant='rectangular'
            animation='wave'
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
            variant={isMobile ? 'caption' : 'caption'}
            sx={{ mx: isMobile ? 3 : 10 }}
            color='text.secondary'
          >
            {message}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
