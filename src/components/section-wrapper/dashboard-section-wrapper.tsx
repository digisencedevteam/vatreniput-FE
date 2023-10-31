import { Box, Divider, Typography, Button } from '@mui/material';
import React from 'react';

interface SectionWrapperProps {
    title: string;
    children?: React.ReactNode;
    link?: string;
    bgcolor?: string;
}

export const DashboardSectionWrapper = ({ title, children, link, bgcolor }: SectionWrapperProps) => {

    return (
        <Box p={2} my={2} bgcolor={bgcolor} width={'100%'}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h5" p={1}>{title}</Typography>
                <Button href={link} variant="contained" color="primary" sx={{ borderRadius: '8px' }} >
                    <Typography sx={{ fontSize: '90%', fontWeight: 800 }}>
                        Pogledaj Sve
                    </Typography>
                </Button>
            </Box>
            <Divider sx={{ margin: "16px 0" }} />
            {children}
        </Box>
    );
}
