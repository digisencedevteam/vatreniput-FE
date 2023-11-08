import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
  Typography,
  Box,
} from '@mui/material';
import { useResponsive } from 'src/hooks/use-responsive';

type TableSkeletonProps = {
  imageURL?: string;
  message?: string;
};

const TableSkeleton = ({ imageURL, message }: TableSkeletonProps) => {
  const hasOverlay = Boolean(imageURL && message);
  const isMobile = useResponsive('down', 'md');
  const rows = 5;
  const columns = isMobile ? 3 : 5;

  return (
    <Box position='relative' borderRadius='borderRadius'>
      <TableContainer
        component={Paper}
        elevation={1}
        sx={{
          filter: hasOverlay ? 'blur(1px)' : 'none',
          borderRadius: '8px',
        }}
      >
        <Table aria-label='table skeleton'>
          <TableHead>
            <TableRow>
              {Array.from({ length: columns }, (_, index) => (
                <TableCell key={index}>
                  <Skeleton animation='wave' height={20} width='100%' />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: rows }, (_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: columns }, (_, colIndex) => (
                  <TableCell key={colIndex}>
                    {colIndex === 0 ? (
                      <Skeleton
                        animation='wave'
                        variant='circular'
                        width={40}
                        height={40}
                      />
                    ) : (
                      <Skeleton animation='wave' height={20} width='100%' />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {hasOverlay && (
        <Box
          position='absolute'
          top={0}
          left={0}
          right={0}
          bottom={0}
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          borderRadius='8px'
          sx={{
            background: 'rgba(255,255,255,0.0001)',
            zIndex: 1,
          }}
        >
          <img
            src={imageURL}
            alt='Instruction'
            style={{ maxWidth: '200px', height: 'auto', marginBottom: '16px' }}
          />
          <Typography variant='h3' color={'primary'} gutterBottom>
            {message}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default TableSkeleton;
