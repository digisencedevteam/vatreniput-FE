import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from '@mui/material'
import { MatchTableProps, Team } from 'src/types';


function MatchTable({ data }: MatchTableProps) {

    const theme = useTheme();
    return (
        <TableContainer component={Paper} sx={{ mt: 1.5, bgcolor: 'background.paper', boxShadow: theme => theme.customShadows.z8, }} >
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
                    {data?.map((team: Team, index: number) => (
                        <TableRow
                            key={team.TeamName}
                            sx={team.TeamName === 'Hrvatska' ? { bgcolor: 'error.darker' } : {}}
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