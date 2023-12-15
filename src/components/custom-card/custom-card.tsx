import { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Fade,
  useTheme,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import { AuthContext } from 'src/auth/context/jwt';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import dayjs from 'dayjs';
import DeleteModal from '../delete-modal/deleteModal';
import { formatTime } from 'src/utils/format-time';
import { userRoles } from 'src/lib/constants';
import { useTruncatedText } from 'src/hooks/use-text-utils';

interface CustomCardProps {
  width?: string;
  height?: string;
  imgUrl: string;
  cardText: string;
  cardId: string;
  availableUntil?: string;
  linkTo?: string;
  quizId?: string;
  votingId?: string;
  onDelete?: (id: string) => void;
  startTime?: string;
  status?: string;
  createdAt?: string;
  isRewarded?: Record<string, boolean>;
  linkToEdit?: string;
}

const CustomCard = ({
  width,
  imgUrl,
  cardText,
  cardId,
  availableUntil,
  linkTo,
  quizId,
  votingId,
  onDelete,
  status,
  startTime,
  createdAt,
  isRewarded,
  linkToEdit,
}: CustomCardProps) => {
  const duration = 15;
  const auth = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();
  const handleToggleMenu = () => setMenuOpen((prev) => !prev);
  const isAdmin = auth.user && auth.user.role === userRoles.admin;
  const rewardedUntil = dayjs(createdAt).add(3, 'day');
  const formattedRewarded = dayjs(rewardedUntil).format('DD/MM/YYYY-hh:mm');
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number>(duration * 60);
  const { truncate } = useTruncatedText(cardText, 20);
  const truncatedOtherText = truncate(cardText, 17);

  useEffect(() => {
    const startTimestamp = startTime ? new Date(startTime).getTime() : 0;
    const currentTime = new Date().getTime();
    const elapsedTimeInSeconds = Math.floor(
      (currentTime - startTimestamp) / 1000
    );
    const newRemainingTime = Math.max(duration * 60 - elapsedTimeInSeconds, 0);
    setRemainingTime(newRemainingTime);

    const interval = setInterval(() => {
      setRemainingTime((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [startTime, duration]);

  const handleConfirmDelete = () => {
    if (onDelete) {
      if (quizId) {
        onDelete(quizId);
      }
      if (votingId) {
        onDelete(votingId);
      }
    }
    setDeleteModalOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          borderRadius: '16px',
          maxWidth: '500px',
          minWidth: '90%',
          overflow: 'hidden',
          width: width,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          margin: '5px',
          position: 'relative',
          bgcolor: theme.palette.background.neutral,
          transition: 'transform .2s',
          '&:hover': {
            transform: 'scale(1.05)',
          },
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
        <Box sx={{ paddingTop: '60%', position: 'relative' }}>
          <CardMedia
            component='img'
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              flexShrink: 0,
              '&:before': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                background:
                  'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                zIndex: 1,
              },
            }}
            image={imgUrl}
            alt='Card Image'
          />
        </Box>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: '22px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1,
            }}
          >
            {status === 'inProgress' && (
              <Box
                sx={{
                  width: 'auto',
                  marginBottom: 1,
                  backgroundColor: theme.palette.warning.main,
                  padding: 0.3,
                  borderRadius: 0.5,
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.35)',
                }}
              >
                <Typography variant='subtitle2'>Kviz u tijeku</Typography>
              </Box>
            )}
            {isRewarded && isRewarded[cardId] && (
              <Box
                sx={{
                  width: 'auto',
                  marginBottom: 1,
                  backgroundColor: theme.palette.success.dark,
                  padding: 0.3,
                  borderRadius: 0.5,
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.35)',
                }}
              >
                <Typography variant='subtitle2'>Nagradan</Typography>
              </Box>
            )}
          </Box>
          {status === 'inProgress' && (
            <Typography variant='subtitle1'>{`Vrijeme preostalo ${formatTime(
              remainingTime
            )}`}</Typography>
          )}
          {availableUntil && (
            <Typography
              variant='subtitle2'
              sx={{ color: '#999' }}
            >
              Nagradan do {formattedRewarded}
            </Typography>
          )}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
              <Typography
                variant='h6'
                noWrap
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  mt: 1,
                }}
              >
                {truncatedOtherText}
              </Typography>
            </Box>
            {linkTo && (
              <Button
                component={Link}
                to={linkTo}
                endIcon={<ArrowForwardIcon />}
                variant='contained'
                color='primary'
                sx={{ mt: 2, mx: 1 }}
              >
                Otvori
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirmDelete={handleConfirmDelete}
        modalText='Jeste li sigurni da želite izbrisati kviz?'
        confirmButtonText='Izbriši'
      />
    </>
  );
};

export default CustomCard;
