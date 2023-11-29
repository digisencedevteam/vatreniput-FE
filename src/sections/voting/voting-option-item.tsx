import { Box, Paper, Typography, useTheme } from '@mui/material';

type VotingOptionProps = {
  option: {
    _id: string | undefined;
    text: string;
    thumbnail?: string;
  };
  selected: boolean;
  onSelect: (id: string) => void;
};

const VotingOptionItem = ({
  option,
  selected,
  onSelect,
}: VotingOptionProps) => {
  const theme = useTheme();
  const imageSize = { width: '100%', height: '200px' };

  return (
    <Box
      component={Paper}
      onClick={() => onSelect(option._id!)}
      sx={{
        borderColor: selected ? 'primary.main' : 'transparent',
        borderWidth: 2,
        borderStyle: 'solid',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: theme.palette.background.neutral,
        cursor: 'pointer',
        boxShadow: selected ? 3 : 1,
        '&:hover': {
          boxShadow: 3,
        },
        width: 250,
        height: 250,
      }}
    >
      <img
        alt={option.text}
        src={option.thumbnail}
        style={{
          ...imageSize,
          objectFit: 'cover',
        }}
      />
      <Typography variant='body1' sx={{ py: 1 }}>
        {option.text}
      </Typography>
    </Box>
  );
};

export default VotingOptionItem;
