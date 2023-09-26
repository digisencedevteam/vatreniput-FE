import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

interface StatusCardProps {
    icon: React.ReactNode;
    number: string | number;
    text: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ icon, number, text }) => {
    return (
        <Card sx={{
            width: '48%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 1,
            height: '150px',
            pt: 2
        }}>
            {icon}
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h4" align="center" fontWeight="bold">{number}</Typography>
                <Typography variant="subtitle1" align="center">{text}</Typography>
            </CardContent>
        </Card>
    );
}

export default StatusCard;