import { useState } from 'react';
import { Box, Divider, Typography, IconButton, Collapse } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { StoryWrapperProps } from 'src/types/story';

export const StorySectionWrapper = ({
  title,
  children,
  isCollapsable,
}: StoryWrapperProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Box
      borderRadius={2}
      p={2}
      pl={0}
      mt={2}
      mb={1}
    >
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
      >
        <Typography
          variant='h3'
          color={'primary'}
          py={3}
        >
          {title}
        </Typography>
        {isCollapsable && (
          <IconButton
            onClick={handleToggle}
            sx={{
              transform: isOpen ? 'rotate(0deg)' : 'rotate(-180deg)',
              transition: 'transform 0.3s',
              color: 'white',
            }}
          >
            <ArrowDropDownIcon />
          </IconButton>
        )}
      </Box>
      <Divider sx={{ margin: '8px 0' }} />
      <Collapse in={isOpen}>{children}</Collapse>
    </Box>
  );
};
