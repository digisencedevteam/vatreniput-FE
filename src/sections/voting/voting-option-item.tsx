import { Box, Paper, Typography, useTheme } from '@mui/material';

type VotingOptionProps = {
  option: {
    _id: string;
    text: string;
    thumbnail?: string;
  };
  selected: boolean;
  onSelect: (id: string | null) => void;
};

const VotingOptionItem = ({
  option,
  selected,
  onSelect,
}: VotingOptionProps) => {
  const theme = useTheme();
  return (
    <Box
      component={Paper}
      onClick={() => onSelect(option._id)}
      sx={{
        borderColor: selected ? 'primary.main' : 'transparent',
        borderWidth: 5,
        borderStyle: 'solid',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: theme.palette.background.neutral,
      }}
    >
      <img alt={option.text} src={option.thumbnail} />
      <Typography variant='body1'>{option.text}</Typography>
    </Box>
  );
};

export default VotingOptionItem;
