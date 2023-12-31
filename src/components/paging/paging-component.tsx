import React from 'react';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

interface PagingComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const PagingComponent = ({
  currentPage,
  totalPages,
  onPageChange,
}: PagingComponentProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 5,
      }}
    >
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        color='primary'
      />
    </Box>
  );
};
export default PagingComponent;
