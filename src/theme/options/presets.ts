// @mui
import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function presets(presetsColor: string) {
  const primary = primaryPresets.find((i) => i.name === presetsColor);

  const theme = {
    palette: {
      primary,
    },
    customShadows: {
      primary: `0 8px 16px 0 ${alpha(`${primary?.main}`, 0.24)}`,
    },
  };

  return theme;
}

// ----------------------------------------------------------------------

export const primaryPresets = [
  // DEFAULT
  {
    name: 'default',
    lighter: '#FFE3D5',
    light: '#FFC1AC',
    main: '#B71833',
    dark: '#FF3037',
    darker: '#7A0930',
    contrastText: '#FFFFFF',
  },
  // CYAN
  {
    name: 'cyan',
    lighter: '#CCF4FE',
    light: '#68CDF9',
    main: '#078DEE',
    dark: '#0351AB',
    darker: '#012972',
    contrastText: '#FFFFFF',
  },
  // BLUE
  {
    name: 'blue',
    lighter: '#D1E9FC',
    light: '#76B0F1',
    main: '#2065D1',
    dark: '#103996',
    darker: '#061B64',
    contrastText: '#FFFFFF',
  },
];
