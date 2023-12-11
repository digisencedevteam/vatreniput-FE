import React from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useResponsive } from 'src/hooks/use-responsive';
import { bgGradient } from 'src/theme/css';
import Logo from 'src/components/logo';

type Props = {
  title?: string;
  image?: string;
  children: React.ReactNode;
};

const AuthClassicLayout = ({ children, image, title }: Props) => {
  const theme = useTheme();
  const upLg = useResponsive('up', 'lg');

  const renderLogo = (
    <Logo
      sx={{
        zIndex: 9,
        position: 'absolute',
        m: { xs: 2, md: 5 },
      }}
    />
  );

  const renderContent = (
    <Stack
      sx={{
        width: 1,
        mx: 'auto',
        maxWidth: 700,
        px: { xs: 2, md: 8 },
        py: { xs: 15, md: 30 },
      }}
    >
      {children}
    </Stack>
  );

  const renderSection = (
    <Stack
      flexGrow={1}
      alignItems='center'
      justifyContent='center'
      spacing={10}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 0, 0, 1.0)',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: `url(${
            image || '/assets/background/overlay_2.jpg'
          })`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          opacity: 0.3,
        },
        ...bgGradient({
          color: alpha(
            theme.palette.background.default,
            theme.palette.mode === 'light' ? 0.88 : 0.94
          ),
        }),
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '5%',
          transform: 'translateY(-180%)',
          textAlign: 'left',
          color: '#fff',
        }}
      >
        <Typography variant='h3' sx={{ maxWidth: 600 }}>
          {title || 'Dobrodošli na Platformu Vatrenog Puta!'}
        </Typography>
      </Box>
    </Stack>
  );

  return (
    <Stack
      component='main'
      direction='row'
      sx={{
        minHeight: '100vh',
      }}
    >
      {renderLogo}
      {upLg && renderSection}
      {renderContent}
    </Stack>
  );
};
export default AuthClassicLayout;
