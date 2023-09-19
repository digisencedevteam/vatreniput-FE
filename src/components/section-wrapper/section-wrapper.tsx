import { Box, Divider, Typography } from '@mui/material';
import React from 'react';

interface SectionWrapperProps {
    title: string;
    children: React.ReactNode;
}

const SectionWrapper = ({ title, children }: SectionWrapperProps) => {
    return (
        <Box borderRadius={2} p={2} my={2}>
            <Typography variant="h3" p={1}>{title}</Typography>
            <Divider sx={{ margin: "16px 0" }} />
            {children}
        </Box>
    );
}

export default SectionWrapper;
