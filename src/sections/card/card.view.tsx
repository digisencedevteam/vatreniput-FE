import { useEffect, useState } from 'react';
import { endpoints } from 'src/utils/axios';
import { useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useSettingsContext } from 'src/components/settings';
import { Alert, Snackbar, useMediaQuery, useTheme } from '@mui/material';
import axiosInstance from 'src/utils/axios';
import { paths } from 'src/routes/paths';

export const CardView = () => {
  const { cardId } = useParams();
  const [cardData, setCardData] = useState<any>(null);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const settings = useSettingsContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const fetchCardData = async () => {
    try {
      const response = await axiosInstance.get(
        `${endpoints.card.details}${cardId}`
      );
      setCardData(response.data);
      setIsError(false);
    } catch (error) {
      console.error('Fetch card data error:', error);
      setIsError(true);
      setErrorMessage(
        error.response?.data?.message ||
          'Dogodila se greška prilikom dobivanja podataka o sličici!'
      );
    }
  };

  useEffect(() => {
    fetchCardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardId]);

  const handleAddCardToAlbum = async () => {
    try {
      const res = await axiosInstance.patch(`${endpoints.card.add}`, {
        cardId,
      });
      if (res.data.message !== 'ok') {
        setErrorMessage(res.data.message);
      } else {
        setSnackbarMessage('Sličica uspješno dodana u album!');
        setSnackbarOpen(true);
        navigate(paths.dashboard.collection);
      }
    } catch (error) {
      console.error('Add card to album error:', error);
      setIsError(true);
      setErrorMessage(
        error.response?.data?.message ||
          'Dogodila se greška prilikom dodavanja sličice u album!'
      );
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
      minHeight='100vh'
      sx={isMobile ? { marginTop: '20px' } : null}
    >
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Grid container spacing={5}>
          {cardData && (
            <Grid item xs={12} md={6}>
              <CardMedia
                component='img'
                height='auto'
                image={cardData.imageURLs[0]}
                alt='Sličica'
                sx={{ borderRadius: 2 }}
              />
            </Grid>
          )}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: '100%',
                bgcolor: theme.palette.background.neutral,
              }}
            >
              <CardContent>
                <Typography
                  variant='caption'
                  sx={{ my: 2, color: theme.palette.primary.main }}
                >
                  218
                </Typography>
                <Typography gutterBottom variant='h4' component='div'>
                  {cardData?.number ? cardData.number + ' ' : ''}{' '}
                  {cardData?.title}
                </Typography>
                <Typography gutterBottom variant='h6' component='div'>
                  {cardData?.event?.name}
                </Typography>
              </CardContent>
              <Divider />
              {isError ? (
                <Box p={2}>
                  <Typography variant='subtitle1' component='div'>
                    {errorMessage}
                  </Typography>
                </Box>
              ) : (
                <Box p={3}>
                  {errorMessage === '' ? (
                    <>
                      <Typography variant='subtitle2' component='div'>
                        Kapetan Hrvatske, Luka Modrić, nedvojbeno je postigao
                        vrhunac svoje karijere osvojivši prestižnu titulu
                        najboljeg igrača Svjetskog prvenstva, gdje je Hrvatska
                        ostvarila zapaženi uspjeh osvajanjem srebrne medalje.{' '}
                        <br />
                        <br />
                        Luka je predvodio svoju reprezentaciju do finala
                        Mundijala. <br />
                        <br />
                        Nakon Svjetskog prvenstva u Rusiji, postalo je očigledno
                        da je Luka Modrić postao najveći hrvatski nogometaš u
                        povijesti.
                      </Typography>
                      <Button
                        variant='contained'
                        color='success'
                        onClick={handleAddCardToAlbum}
                        sx={{
                          p: 2,
                          mx: isMobile ? 1 : 5,
                          ml: 0,
                          mt: 3,
                        }}
                      >
                        Dodaj U Album
                      </Button>
                    </>
                  ) : (
                    <Typography variant='h4' component='div' color='error'>
                      {errorMessage}
                    </Typography>
                  )}
                  <Button
                    variant='contained'
                    color='inherit'
                    sx={{ p: 2, mx: isMobile ? 1 : 5, ml: 0, mt: 3 }}
                  >
                    Prijavi se
                  </Button>
                </Box>
              )}
            </Card>
          </Grid>
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
          severity='success'
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
