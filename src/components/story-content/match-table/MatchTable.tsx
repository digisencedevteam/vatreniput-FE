import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from '@mui/material'
import { useEffect, useState } from 'react';
import { MatchTableProps } from 'src/types';


function MatchTable({ data }: MatchTableProps) {

    const theme = useTheme();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const tableMaxWidth = windowWidth * 0.9;
    return (


        <TableContainer component={Paper} sx={{ maxWidth: tableMaxWidth, mt: 1.5, bgcolor: theme.palette.background.paper }} >
            <Table>
                <TableHead>
                    <TableRow sx={{ bgcolor: 'white' }}>
                        <TableCell align="center" >Mjesto</TableCell>
                        <TableCell align="center">Ime</TableCell>
                        <TableCell align="center">Pobjede</TableCell>
                        <TableCell align="center">Porazi</TableCell>
                        <TableCell align="center">Nerjeseni</TableCell>
                        <TableCell align="center">Bodovi</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.Teams.map((team: any, index: number) => (
                        <TableRow
                            key={team.TeamName}
                            sx={team.TeamName === 'Hrvatska' ? { bgcolor: theme.palette.error.darker } : {}}
                        >
                            <TableCell align="center"> {index + 1}</TableCell>
                            <TableCell align="center">{team.TeamName}</TableCell>
                            <TableCell align="center">{team.Wins}</TableCell>
                            <TableCell align="center">{team.Losses}</TableCell>
                            <TableCell align="center">{team.Draws}</TableCell>
                            <TableCell align="center">{team.Points}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    )
}

export default MatchTable