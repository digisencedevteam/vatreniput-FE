import Box from '@mui/material/Box';
import Card, { CardProps } from '@mui/material/Card';

interface Props extends CardProps {
  title: string;
  total: number;
  icon: React.ReactElement;
}

export default function SelectionStatistic({ title, total, icon, sx, ...other }: Props) {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        
        ...sx,        
      }}
      {...other}
    >
      <Box>
        <Box sx={{ mb: 1, px: 5, typography: 'h3' }}>{total}</Box>
        <Box sx={{ color: 'text.secondary', px: 5, typography: 'subtitle2' }}>{title}</Box>
      </Box>

      <Box
        sx={{
          width: 120,
          height: 120,
          lineHeight: 0,
          borderRadius: '50%',
          bgcolor: 'background.neutral',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </Box>
    </Card>
  );
}
