import React from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify';

interface FilterOption {
  value: string;
  label: string;
}

export default function FilterCollection() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const filterOptions: FilterOption[] = [
    { value: 'filter1', label: 'Filter 1' },
    { value: 'filter2', label: 'Filter 2' },
    { value: 'filter3', label: 'Filter 3' },
  ];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const id = open ? 'filter-popover' : undefined;

  return (
    <>
      <Button
        disableRipple
        color='inherit'
        onClick={handleClick}
        endIcon={
          <Iconify
            icon={
              open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'
            }
          />
        }
        sx={{
          height: 55,
          marginX: 2,
          marginY: 2,
          xs: { fontSize: 10 },
          fontWeight: 'fontWeightSemiBold',
          textTransform: 'capitalize',
        }}
      >
        Filtriraj
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{ marginTop: 1 }}
      >
        {filterOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => {
            handleClose();
            }}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingY: 2,
              paddingX: 5,
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
            }}
          >
            <Typography>{option.label}</Typography>
          </MenuItem>
        ))}
      </Popover>
    </>
  );
}
