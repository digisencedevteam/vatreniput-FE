import { Box, Divider, Typography } from '@mui/material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsIcon from '@mui/icons-material/Sports';
import { QualificationMatchDetailsProps } from 'src/types';

const QualificationMatchDetails = ({ matches }: QualificationMatchDetailsProps) => {
    return (
        <Box>
            {matches?.map((matchData, index) => {
                const regularScorers = matchData.Scorers?.filter(scorer => !scorer.includes('pen')) || [];
                const penaltyScorers = matchData.Scorers?.filter(scorer => scorer.includes('pen')).map(scorer => scorer.replace('(pen.)', 'Panal')) || [];

                return (
                    <Box key={index}>
                        <Box bgcolor={'background.paper'} p={1} borderRadius={1} my={2} sx={{ boxShadow: theme => theme.customShadows.z8 }}>
                            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mb={2}>
                                <Typography variant="h5">{matchData.Teams} {matchData.Score}</Typography>
                            </Box>
                            {regularScorers.length > 0 && (
                                <Box display="flex" justifyContent={'center'} alignItems="center" my={2}>
                                    <SportsSoccerIcon color="primary" />
                                    <Typography variant="body1" ml={1}>
                                        Golovi: {regularScorers.join(', ')}
                                    </Typography>
                                </Box>
                            )}
                            {penaltyScorers.length > 0 && (
                                <Box display="flex" justifyContent={'center'} alignItems="center" my={2}>
                                    <SportsIcon color="error" fontSize="small" style={{ marginRight: '8px' }} />
                                    <Typography variant="body1">
                                        {penaltyScorers.join(', ')}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                        <Divider sx={{ margin: "8px 0" }} />
                    </Box>
                )
            })}
        </Box>
    );
};

export default QualificationMatchDetails;

