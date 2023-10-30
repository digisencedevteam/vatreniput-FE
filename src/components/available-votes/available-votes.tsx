import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import { fDateTime } from 'src/utils/format-time';
import Image from 'src/components/image';
import { Voting } from 'src/types';
import { Button, Fade } from '@mui/material';
import Label from '../label';
import { useRouter } from 'src/routes/hooks';
import { AuthContext } from 'src/auth/context/jwt';
import { useContext, useState } from 'react';
import DeleteModal from '../delete-modal/deleteModal';
import useVoting from 'src/hooks/use-voting-data';
import { userRoles } from 'src/lib/constants';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

type ItemProps = {
  item: Voting;
  onDeleteVoting?: (voteId: string) => void;
  linkToEdit: string;
};

export const VoteItem = ({ item, onDeleteVoting, linkToEdit }: ItemProps) => {
  const { title, description, availableUntil, thumbnail } = item;
  const { deleteVoting } = useVoting();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const auth = useContext(AuthContext);

  const isAdmin = auth.user && auth.user.role === userRoles.admin;
  const handleToggleMenu = () => setMenuOpen((prev) => !prev);

  const handleConfirmDelete = async () => {
    if (item._id) {
      try {
        await deleteVoting(item._id);
        if (onDeleteVoting) {
          onDeleteVoting(item._id);
        }
      } catch (error) {
        console.error('Error deleting voting:', error);
      }
    }
    setDeleteModalOpen(false);
  };

  return (
    <Paper
      sx={{
        borderRadius: 2,
        position: 'relative',
        bgcolor: 'background.neutral',
        mx: 2,
      }}
    >
      {isAdmin && (
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            zIndex: 2,
          }}
        >
          <Fade in={menuOpen}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '8px',
              }}
            >
              <Button
                variant='contained'
                color='error'
                onClick={() => setDeleteModalOpen(true)}
                sx={{
                  borderRadius: '50%',
                  padding: '0.8em',
                  border: '2px solid white',
                  minWidth: 0,
                }}
              >
                <DeleteIcon fontSize='inherit' />
              </Button>
              <Button
                href={linkToEdit}
                variant='contained'
                color='secondary'
                sx={{
                  borderRadius: '50%',
                  padding: '0.8em',
                  border: '2px solid white',
                  minWidth: 0,
                }}
              >
                <ModeEditIcon fontSize='inherit' />
              </Button>
            </Box>
          </Fade>
          <Button
            onClick={handleToggleMenu}
            variant='contained'
            color='primary'
            sx={{
              borderRadius: '50%',
              padding: '0.8em',
              border: '2px solid white',
              minWidth: 0,
              ml: 1,
            }}
          >
            {menuOpen ? (
              <CloseIcon fontSize='inherit' />
            ) : (
              <MoreHorizIcon fontSize='inherit' />
            )}
          </Button>
        </Box>
      )}
      <Stack
        spacing={4}
        sx={{
          px: 1,
          pb: 1,
          pt: 2.5,
        }}
      >
        <Stack direction='row' alignItems='center' spacing={2}>
          <ListItemText
            primary={title}
            secondary={fDateTime(availableUntil)}
            secondaryTypographyProps={{
              mt: 0.5,
              typography: 'subtitle2',
              color: 'text.disabled',
            }}
          />
        </Stack>
        <Stack
          spacing={3}
          direction='row'
          alignItems='center'
          sx={{ color: 'text.secondary', typography: 'caption' }}
        >
          <Stack direction='row' alignItems='center'>
            {description}
          </Stack>
        </Stack>
      </Stack>
      <Label
        variant='filled'
        onClick={() => router.push('/dashboard/voting/' + item._id)}
        sx={{
          width: 125,
          height: 30,
          right: 20,
          zIndex: 9,
          bottom: 16,
          position: 'absolute',
        }}
      >
        🔥 Glasaj sada
      </Label>
      <Box sx={{ p: 1, position: 'relative' }}>
        <Image
          alt={thumbnail}
          src={thumbnail}
          ratio='1/1'
          sx={{ borderRadius: 1.5 }}
        />
      </Box>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirmDelete={handleConfirmDelete}
        modalText='Jeste li sigurni da želite izbrisati kviz?'
        confirmButtonText='Izbriši'
      />
    </Paper>
  );
};
