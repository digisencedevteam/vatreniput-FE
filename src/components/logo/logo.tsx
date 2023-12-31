import { forwardRef } from 'react';
// @mui
import Link from '@mui/material/Link';
import Box, { BoxProps } from '@mui/material/Box';
// routes
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = true, sx, ...other }, ref) => {
    // using local png image for the logo
    const logo = (
      <Box
        component='img'
        src='/logo/logoHNS.png'
        sx={{ width: 40, height: 50, cursor: 'pointer', ...sx }}
      />
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link
        component={RouterLink}
        href='/'
        sx={{ display: 'contents' }}
      >
        {logo}
      </Link>
    );
  }
);

export default Logo;
