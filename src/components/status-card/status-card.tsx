import { Card, CardContent, Typography, useTheme } from '@mui/material';
import React from 'react';

interface StatusCardProps {
  icon: React.ReactNode;
  number: string | number;
  text: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ icon, number, text }) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mx: 1,
        height: '150px',
        pt: 1,
        bgcolor: theme.palette.background.neutral,
      }}
    >
      {icon}
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant='h4' align='center' fontWeight='bold'>
          {number}
        </Typography>
        <Typography variant='caption' align='center'>
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatusCard;
