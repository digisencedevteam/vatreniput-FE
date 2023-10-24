
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

interface PenaltyShootoutProps {
    data?: {
        Player: string;
        Result: string;
    }[];
}

const PenaltyShootoutTable: React.FC<PenaltyShootoutProps> = ({ data }) => {
    const theme = useTheme();

    return (
        <TableContainer component={Paper} sx={{ mt: 1.5, bgcolor: theme.palette.background.paper, boxShadow: theme => theme.customShadows.z8, }} >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Player</TableCell>
                        <TableCell align="center">Result</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map(penalty => (
                        <TableRow key={penalty.Player}>
                            <TableCell>{penalty.Player}</TableCell>
                            <TableCell align="center">
                                {penalty.Result === '+' ?
                                    <CheckCircleIcon color="success" /> :
                                    <CancelIcon color="error" />
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default PenaltyShootoutTable;
