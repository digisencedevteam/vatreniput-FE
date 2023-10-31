import { memo } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
//
import BackgroundShape from './background-shape';

// ----------------------------------------------------------------------

function SeoIllustration({ ...other }: BoxProps) {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_DARK = theme.palette.primary.dark;

  return (
    <Box
      component="svg"
      width="100%"
      height="100%"
      viewBox="0 0 480 360"
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    >
      <BackgroundShape />

      <defs>
        <filter
          id="filter0_f_1_51"
          width="101.56"
          height="100.65"
          x="232.807"
          y="109.722"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur result="effect1_foregroundBlur_1_51" stdDeviation="10" />
        </filter>

        <linearGradient
          id="paint0_linear_1_51"
          x1="47.397"
          x2="47.397"
          y1="107.95"
          y2="281.395"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={PRIMARY_LIGHT} />
          <stop offset="1" stopColor={PRIMARY_DARK} />
        </linearGradient>

        <linearGradient
          id="paint1_linear_1_51"
          x1="248.43"
          x2="248.43"
          y1="128.061"
          y2="169.533"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={PRIMARY_LIGHT} />
          <stop offset="1" stopColor={PRIMARY_DARK} />
        </linearGradient>

        <linearGradient
          id="paint2_linear_1_51"
          x1="248.43"
          x2="248.43"
          y1="128.061"
          y2="169.533"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={PRIMARY_LIGHT} />
          <stop offset="1" stopColor={PRIMARY_DARK} />
        </linearGradient>

        <linearGradient
          id="paint3_linear_1_51"
          x1="248.43"
          x2="248.43"
          y1="128.061"
          y2="169.533"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={PRIMARY_LIGHT} />
          <stop offset="1" stopColor={PRIMARY_DARK} />
        </linearGradient>

        <linearGradient
          id="paint4_linear_1_51"
          x1="248.43"
          x2="248.43"
          y1="128.061"
          y2="169.533"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={PRIMARY_LIGHT} />
          <stop offset="1" stopColor={PRIMARY_DARK} />
        </linearGradient>

        <linearGradient
          id="paint5_linear_1_51"
          x1="109.604"
          x2="109.604"
          y1="76"
          y2="104.047"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={PRIMARY_LIGHT} />
          <stop offset="1" stopColor={PRIMARY_DARK} />
        </linearGradient>

        <linearGradient
          id="paint6_linear_1_51"
          x1="109.604"
          x2="109.604"
          y1="76"
          y2="104.047"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={PRIMARY_LIGHT} />
          <stop offset="1" stopColor={PRIMARY_DARK} />
        </linearGradient>

        <linearGradient
          id="paint7_linear_1_51"
          x1="109.604"
          x2="109.604"
          y1="76"
          y2="104.047"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={PRIMARY_LIGHT} />
          <stop offset="1" stopColor={PRIMARY_DARK} />
        </linearGradient>
      </defs>

      <image href="https://res.cloudinary.com/dzg5kxbau/image/upload/v1698661449/VATROSLAV-vatrene_price-removebg-preview_pa5j2e.png" height="320" x="130" y="10" />
    </Box>
  );
}

export default memo(SeoIllustration);
