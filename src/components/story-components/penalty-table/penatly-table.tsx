
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { PenaltyShootoutProps } from 'src/types/story';

const PenaltyShootoutTable = ({ data }: PenaltyShootoutProps) => {

    return (
        <TableContainer component={Paper} sx={{ mt: 1.5, bgcolor: 'background.paper', boxShadow: theme => theme.customShadows.z8, }} >
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
