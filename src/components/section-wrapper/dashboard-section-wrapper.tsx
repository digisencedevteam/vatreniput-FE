import { Box, Divider, Typography, Button, useTheme } from '@mui/material';
import React from 'react';

interface SectionWrapperProps {
    title: string;
    children?: React.ReactNode;
    link?: string;
    bgcolor?: string;
}

export const DashboardSectionWrapper = ({ title, children, link, bgcolor }: SectionWrapperProps) => {
    const theme = useTheme();

    return (
        <Box borderRadius={2} p={2} pl={0} my={2} bgcolor={bgcolor}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h5" p={1}>{title}</Typography>
                <Button href={link} variant="contained" sx={{ borderRadius: '8px', bgcolor: theme.palette.error.darker }} >
                    <Typography sx={{ fontSize: '90%', color: theme.palette.primary.light, fontWeight: 800 }}>
                        Pogledaj Sve
                    </Typography>
                </Button>
            </Box>
            <Divider sx={{ margin: "16px 0" }} />
            {children}
        </Box>
    );
}
