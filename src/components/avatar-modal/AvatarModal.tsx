import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Cancel';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  avatarOptions: string[];
  selectedAvatar: string;
  onSelectAvatar: (url: string) => void;
}

export default function AvatarModal({
  isOpen,
  onClose,
  avatarOptions,
  selectedAvatar,
  onSelectAvatar,
}: Props) {
  const handleAvatarSelect = (url: string) => {
    onSelectAvatar(url);
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          outline: 'none',
        }}
      >
        <Typography variant='h6' gutterBottom>
          Odaberi avatara
        </Typography>
        <Grid container spacing={2}>
          {avatarOptions.map((avatar) => (
            <Grid item key={avatar}>
              <IconButton
                sx={{
                  position: 'relative',
                  borderRadius: '8px',
                  padding: 0,
                  width: '100px',
                  height: '100px',
                  border: '2px solid #1976d2',
                  '&:hover': {
                    '&::after': {
                      content: `"Odaberi"`,
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(0, 0, 0, 0.5)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '14px',
                      cursor: 'pointer',
                    },
                  },
                }}
                onClick={() => handleAvatarSelect(avatar)}
              >
                <Avatar
                  alt='Avatar'
                  src={avatar}
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '6px',
                    objectFit: 'cover',
                  }}
                />
              </IconButton>
            </Grid>
          ))}
        </Grid>
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Modal>
  );
}
