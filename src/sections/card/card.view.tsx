import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {
  Alert,
  AlertColor,
  IconButton,
  Snackbar,
  alpha,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import axiosInstance from 'src/utils/axios';
import { endpoints } from 'src/utils/axios';
import { paths } from 'src/routes/paths';
import { useAuthContext } from 'src/auth/hooks';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'src/routes/hooks';

export const CardView = () => {
  const { cardId } = useParams();
  const [searchParams] = useSearchParams();
  const [cardData, setCardData] = useState<any>(null);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('info');
  const currentUser = useAuthContext();
  const isCardDataArray = Array.isArray(cardData);
  const [isSingle, setIsSingle] = useState(true);
  const router = useRouter();

  const fetchCardData = async (isMultiple: boolean) => {
    const targetApiSingle = `${endpoints.card.details}${cardId}`;
    const targetApiMultiple = `${endpoints.card.details}${cardId}?userId=${
      currentUser.user && currentUser.user._id
    }`;

    try {
      const response = await axiosInstance.get(
        isMultiple ? targetApiMultiple : targetApiSingle
      );
      setCardData(response.data);
      setIsError(false);
      setSnackbarOpen(false);
    } catch (error) {
      setIsError(true);
      setErrorMessage(
        error?.message ||
          'Dogodila se greška prilikom dobivanja podataka o sličici!'
      );
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    const isPreview = searchParams.get('isPreview');
    const isLoggedIn = !!currentUser?.user;
    if (isPreview === 'true' && isLoggedIn) {
      setIsSingle(false);
      fetchCardData(true);
      return;
    }
    fetchCardData(false);
  }, []);

  const handleAddCardToAlbum = async () => {
    if (!currentUser.user) {
      navigate(`${paths.auth.jwt.login}?returnTo=${window.location.pathname}`);
      return;
    }

    try {
      const res = await axiosInstance.patch(`${endpoints.card.add}`, {
        cardId,
      });

      if (res.data.message !== 'ok') {
        setSnackbarMessage(res.data.message);
        setSnackbarSeverity('error');
      } else {
        setSnackbarMessage('Sličica uspješno dodana u album!');
        setSnackbarSeverity('success');
        navigate(paths.dashboard.collection);
      }
      setSnackbarOpen(true);
    } catch (error) {
      setErrorMessage(
        error?.message ||
          'Dogodila se greška prilikom dobivanja podataka o sličici!'
      );
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      sx={{ padding: isMobile ? theme.spacing(1) : theme.spacing(5) }}
    >
      <Container maxWidth='lg'>
        <Grid container alignItems='center'>
          <Grid item sx={{ my: 3 }}>
            <IconButton
              edge='start'
              color='primary'
              aria-label='back to dashboard'
              onClick={() => router.push(paths.dashboard.root)}
            >
              <ArrowBackIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container spacing={5}>
          {isCardDataArray && !isSingle ? (
            <>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  {cardData.map((card, index) => (
                    <Box
                      key={index}
                      sx={{
                        width:
                          cardData.length === 4
                            ? '50%'
                            : `${100 / cardData.length}%`,
                        position: 'relative',
                      }}
                    >
                      <CardMedia
                        component='img'
                        image={
                          card?.isCollected
                            ? card?.imageURLs[0]
                            : 'https://res.cloudinary.com/dzg5kxbau/image/upload/v1694697860/logoHNS_ukf2xs.jpg'
                        }
                        alt={`Sličica ${card.ordinalNumber}`}
                        sx={{
                          borderRadius: isMobile ? 1 : 3,
                          width: '100%',
                          height: '100%',
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          zIndex: 10,
                          borderTopLeftRadius: 5,
                          borderBottomRightRadius: 10,
                          width: isMobile ? '20%' : '10%',
                          height: isMobile ? '20%' : '10%',
                          backgroundColor: alpha(
                            theme.palette.common.black,
                            0.5
                          ),
                          backdropFilter: 'blur(4px)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography
                          variant='h4'
                          sx={{
                            color: 'common.white',
                          }}
                        >
                          {card.ordinalNumber}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12} md={12}>
                <Card
                  sx={{
                    height: 'auto',
                    bgcolor: theme.palette.background.neutral,
                    boxShadow: 3,
                    padding: theme.spacing(2),
                  }}
                >
                  <Typography
                    variant='caption'
                    sx={{ color: theme.palette.primary.main }}
                  >
                    {cardData[0]?.author}
                  </Typography>
                  <Divider sx={{ marginY: 1 }} />

                  <CardContent>
                    {!!cardData[0]?.title && (
                      <>
                        <Typography variant='caption' component='div'>
                          {cardData[0]?.title}
                        </Typography>
                        <Divider />
                      </>
                    )}
                    <Typography gutterBottom variant='h6' component='div'>
                      {cardData[0]?.event?.name}
                    </Typography>
                  </CardContent>
                  <Divider />
                </Card>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} md={6}>
                <Box sx={{ position: 'relative' }}>
                  {cardData?.videoLink ? (
                    <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                      <iframe
                        src={`${cardData.videoLink}?dnt=1`}
                        style={{
                          position: 'absolute',
                          top: '0',
                          left: '0',
                          width: '100%',
                          height: '100%',
                          border: '0',
                        }}
                        allow='fullscreen; picture-in-picture'
                        title={cardData?.title}
                      />
                    </div>
                  ) : (
                    <>
                      <CardMedia
                        component='img'
                        height='auto'
                        image={cardData?.imageURLs[0]}
                        alt='Sličica'
                        sx={{ borderRadius: 2, width: '100%' }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          zIndex: 10,
                          width: isMobile ? '20%' : '15%',
                          height: isMobile ? '20%' : '15%',
                          borderTopLeftRadius: 10,
                          backgroundColor: alpha(
                            theme.palette.common.black,
                            0.5
                          ),
                          backdropFilter: 'blur(4px)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography
                          variant={isMobile ? 'h3' : 'h2'}
                          sx={{
                            color: 'common.white',
                          }}
                        >
                          {cardData?.ordinalNumber}
                        </Typography>
                      </Box>
                    </>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    height: 'auto',
                    bgcolor: theme.palette.background.neutral,
                    boxShadow: 3,
                    padding: theme.spacing(2),
                  }}
                >
                  <Divider />
                  <CardContent>
                    <Typography
                      variant='caption'
                      sx={{ my: 2, color: theme.palette.primary.main }}
                    >
                      {cardData?.author}
                    </Typography>
                    {!!cardData?.title && (
                      <Typography variant='subtitle2' component='div'>
                        {cardData?.title}
                      </Typography>
                    )}
                    <Typography gutterBottom variant='h6' component='div'>
                      {cardData?.event?.name}
                    </Typography>
                  </CardContent>
                  <Divider />
                </Card>
              </Grid>
              {!isError && (
                <Box p={3}>
                  {errorMessage === '' && (
                    <>
                      {cardData && cardData.isScanned ? (
                        <Typography variant='subtitle1' color='error'>
                          {errorMessage}
                        </Typography>
                      ) : (
                        <Button
                          variant='contained'
                          color='success'
                          onClick={handleAddCardToAlbum}
                          sx={{ p: 2, mx: isMobile ? 1 : 5, ml: 0, mt: 3 }}
                        >
                          Dodaj U Album
                        </Button>
                      )}
                    </>
                  )}
                  {!currentUser && (
                    <Button
                      variant='contained'
                      color='inherit'
                      sx={{ p: 2, mx: isMobile ? 1 : 5, ml: 0, mt: 3 }}
                    >
                      Prijavi se
                    </Button>
                  )}
                </Box>
              )}
            </>
          )}
        </Grid>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarSeverity === 'error' ? errorMessage : snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
