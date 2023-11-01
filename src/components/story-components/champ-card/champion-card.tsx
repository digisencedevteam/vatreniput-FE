import { Box, Typography, Divider, Avatar } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { MilitaryTech } from '@mui/icons-material';
import { ChampionCardProps } from 'src/types';
import { useResponsive } from 'src/hooks/use-responsive';

const ChampionCard = ({ data }: ChampionCardProps) => {
    const { Winner = '', TopScorer = { Player: '', Team: '', Goals: 0 } } = data || {};
    const isMobile = useResponsive('down', 'sm');
    return (

        <Box
            sx={{
                backgroundColor: 'background.paper',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: theme => theme.customShadows.z8,
                width: isMobile ? 310 : '98.5%'
            }}
        >
            <Box display="flex" alignItems="center" justifyContent={'center'} mb={2}>
                <Avatar
                    variant="circular"
                    sx={{
                        backgroundColor: theme => theme.palette.background.default,
                        marginRight: '10px',
                        width: '40px',
                        height: '40px',
                    }}
                >
                    <EmojiEventsIcon color='warning' />
                </Avatar>
                <Typography variant="h6">PRVAK: {Winner}</Typography>
            </Box>
            <Divider light sx={{ my: 2 }} />
            <Box display="flex" justifyContent={'center'} alignItems="center">
                <Avatar
                    variant='circular'
                    sx={{
                        backgroundColor: theme => theme.palette.background.default,
                        marginRight: '10px',
                        width: '40px',
                        height: '40px',
                    }}
                >
                    <MilitaryTech color='warning' />
                </Avatar>
                <Typography variant="body1">
                    Najbolji napadač: <br />
                    {TopScorer.Player} ({TopScorer.Team}) - {TopScorer.Goals} pogotka
                </Typography>
            </Box>
        </Box>
    );
};

export default ChampionCard;
