import { Box, Divider, Typography, Button } from '@mui/material';
import React from 'react';

interface SectionWrapperProps {
    title: string;
    children?: React.ReactNode;
    link: string
}

export const DashboardSectionWrapper: React.FC<SectionWrapperProps> = ({ title, children, link }) => {
    return (
        <Box borderRadius={2} py={2} my={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h5" p={1}>{title}</Typography>
                <Button href={link} variant="contained" sx={{ borderRadius: '8px' }}>
                    <Typography sx={{fontSize: '90%'}}>
                        Pogledaj Sve
                    </Typography>
                </Button>
            </Box>
            <Divider sx={{ margin: "16px 0" }} />
            {children}
        </Box>
    );
}