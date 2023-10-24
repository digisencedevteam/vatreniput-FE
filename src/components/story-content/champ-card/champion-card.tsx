import React from 'react';
import { Box, Typography, Divider, Avatar } from '@mui/material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

interface DataProp {
    Winner: string;
    TopScorer: {
        Player: string;
        Team: string;
        Goals: number;
    };
}

interface ChampionCardProps {
    data: DataProp;
}

const ChampionCard = ({ data }: ChampionCardProps) => {
    const { Winner, TopScorer } = data;
    return (
        <Box
            sx={{
                backgroundColor: 'background.paper',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: theme => theme.customShadows.z8,
            }}
        >
            <Box display="flex" alignItems="center" mb={2}>
                <Avatar
                    variant="rounded"
                    sx={{
                        backgroundColor: theme => theme.palette.primary.main,
                        marginRight: '10px',
                        width: '40px',
                        height: '40px',
                    }}
                >
                    <EmojiEventsIcon color="action" />
                </Avatar>
                <Typography variant="h6">PRVAK: {Winner}</Typography>
            </Box>

            <Divider light sx={{ my: 2 }} />
            <Box display="flex" alignItems="center">
                <Avatar
                    variant="rounded"
                    sx={{
                        backgroundColor: theme => theme.palette.error.main,
                        marginRight: '10px',
                        width: '40px',
                        height: '40px',
                    }}
                >
                    <SportsSoccerIcon color='info' />
                </Avatar>
                <Typography variant="body1">
                    Najbolji striker: <br />
                    {TopScorer.Player} ({TopScorer.Team}) - {TopScorer.Goals} pogotka
                </Typography>
            </Box>
        </Box>
    );
};

export default ChampionCard;
