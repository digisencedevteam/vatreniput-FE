import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Card, { CardProps } from '@mui/material/Card';

interface Props extends CardProps {
  title: string;
  total: number;
  icon: React.ReactElement;
}

const SelectionStatistic = ({ title, total, icon, sx, ...other }: Props) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: theme.palette.background.default,

        ...sx,
      }}
      {...other}
    >
      <Box>
        <Box sx={{ mb: 1, px: 5, typography: 'h3' }}>{total}</Box>
        <Box sx={{ color: 'text.secondary', px: 5, typography: 'subtitle2' }}>
          {title}
        </Box>
      </Box>
      <Box
        sx={{
          width: 150,
          height: 120,
          lineHeight: 0,
          borderRadius: '50%',
          bgcolor: 'background.neutral',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          m: 2,
        }}
      >
        {icon}
      </Box>
    </Card>
  );
};
export default SelectionStatistic;
