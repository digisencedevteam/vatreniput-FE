import React from 'react';
import { StorySection } from 'src/types';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme } from '@mui/material';
import { STORIES } from 'src/lib/constants';
import MatchTable from './match-table/MatchTable';

interface StoryContentProps {
    story?: any
}

const StoryContent: React.FC<StoryContentProps> = ({ story }) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
    console.log('stgory', story);


    return (
        <div>
            <Typography variant="h2" color={'primary'} my={1}>{story.storyTitle}</Typography>
            <Typography variant="body1">{story.Qualifications.Description}</Typography>
            <MatchTable data={story.Qualifications} />
        </div>
    );
};

export default StoryContent;
