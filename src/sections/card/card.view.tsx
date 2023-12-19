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
  AlertColor,
  IconButton,
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
import ErrorSnackbar from 'src/components/error-snackbar/ErrorSnackbar';
import { SkeletonDashboardLoader } from 'src/components/skeleton-loader/skeleton-loader-dashboard';

export const CardView = () => {
  const { cardId } = useParams();
  const [searchParams] = useSearchParams();
  const [cardData, setCardData] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>('success');
  const currentUser = useAuthContext();
  const isCardDataArray = Array.isArray(cardData);
  const [isSingle, setIsSingle] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const fetchCardData = async (isMultiple: boolean) => {
    const targetApiSingle = `${endpoints.card.details}${cardId}`;
    const targetApiMultiple = `${endpoints.card.details}${cardId}?userId=${
      currentUser.user && currentUser.user._id
    }`;
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        isMultiple ? targetApiMultiple : targetApiSingle
      );
      setCardData(response.data);
      setIsOpen(true);
    } catch (error) {
      setIsOpen(false);
      const errorMessage =
        error.response?.data?.message || error.message || 'Dogodila se greška';
      console.error('Error fetching card data:', errorMessage);
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setSnackbarMessage('Sličica uspješno dodana u album!');
      setSnackbarSeverity('success');
      setIsOpen(false);
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage(
        error?.message ||
          'Dogodila se greška prilikom dodavanja sličice u album!'
      );
      setSnackbarSeverity('error');
      setIsOpen(false);
      setSnackbarOpen(true);
    }
  };

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      sx={{ padding: isMobile ? theme.spacing(1) : theme.spacing(5) }}
    >
      <Container maxWidth='lg'>
        {isLoading ? (
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignContent={'center'}
            height='100vh'
          >
            <SkeletonDashboardLoader
              count={6}
              message='Učitavanje podataka o sličici...'
            />
          </Box>
        ) : (
          <>
            {' '}
            <Grid
              container
              alignItems='center'
            >
              <Grid
                item
                sx={{ my: 3 }}
              >
                <IconButton
                  edge='start'
                  color='primary'
                  aria-label='back to dashboard'
                  onClick={() => router.push(paths.dashboard.collection)}
                >
                  <ArrowBackIcon
                    sx={{
                      width: isMobile ? 30 : 40,
                      height: isMobile ? 30 : 40,
                    }}
                  />
                </IconButton>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={5}
            >
              {isCardDataArray && !isSingle ? (
                <>
                  <Grid
                    item
                    xs={12}
                  >
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
                                : 'https://res.cloudinary.com/dzg5kxbau/image/upload/v1702329314/LogoHNS_j974kk.png'
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
                  <Grid
                    item
                    xs={12}
                    md={12}
                  >
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
                            <Typography
                              variant='caption'
                              component='div'
                            >
                              {cardData[0]?.title}
                            </Typography>
                          </>
                        )}
                        <Typography
                          gutterBottom
                          variant='h6'
                          component='div'
                        >
                          {cardData[0]?.event?.name}
                        </Typography>
                      </CardContent>
                      <Divider />
                    </Card>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Box sx={{ position: 'relative' }}>
                      {cardData?.videoLink ? (
                        <div
                          style={{ position: 'relative', paddingTop: '56.25%' }}
                        >
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
                              {cardData?.ordinalNumber}
                            </Typography>
                          </Box>
                        </>
                      )}
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
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
                          sx={{ color: theme.palette.primary.main }}
                        >
                          {cardData?.author}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant='h5'
                          component='div'
                          my={3}
                        >
                          {cardData?.event?.name}
                        </Typography>
                        {!!cardData?.title && (
                          <Typography
                            variant='subtitle1'
                            component='div'
                          >
                            {cardData?.title}
                          </Typography>
                        )}
                      </CardContent>
                      <Divider />
                    </Card>
                    {isOpen && !cardData?.isScanned && (
                      <Button
                        variant='contained'
                        color='success'
                        onClick={handleAddCardToAlbum}
                        sx={{ p: 2, mx: isMobile ? 1 : 5, ml: 0, mt: 3 }}
                      >
                        Dodaj U Album
                      </Button>
                    )}
                  </Grid>
                </>
              )}
            </Grid>
          </>
        )}
      </Container>
      <ErrorSnackbar
        trigger={snackbarOpen}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </Box>
  );
};
