import { useEffect, useState } from 'react';
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
import { useMediaQuery, useTheme } from '@mui/material';
import axiosInstance from 'src/utils/axios';
import { endpoints } from 'src/utils/axios';

export const CardView = () => {
  const { cardId } = useParams();
  const [cardData, setCardData] = useState<any>(null);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const settings = useSettingsContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchCardData = async () => {
    try {
      const response = await axiosInstance.get(endpoints.card.details + cardId);
      setCardData(response.data);
    } catch (error) {
      setIsError(true);
      setErrorMessage('Error fetching card data.');
    }
  };

  useEffect(() => {
    fetchCardData();
  }, [cardId]);

  const handleAddCardToAlbum = async () => {
    try {
      const res = await axiosInstance.patch(endpoints.card.add, { cardId });
      if (res.data === 'ok') {
        navigate('/dashboard/two');
      } else {
        setErrorMessage(res.data);
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage('Error adding card to album.' + error);
    }
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
        <Grid
          container
          spacing={5}
        >
          {/* Image or Video */}
          <Grid
            item
            xs={12}
            md={6}
          >
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
                  allow='autoplay; fullscreen; picture-in-picture'
                  title={cardData?.title}
                />
              </div>
            ) : (
              <CardMedia
                component='img'
                height='auto'
                image={
                  cardData
                    ? Array.isArray(cardData.imageURLs) &&
                      cardData.imageURLs.length > 0
                      ? cardData.imageURLs[0]
                      : ''
                    : ''
                }
                alt='Sličica'
                sx={{ borderRadius: 2 }}
              />
            )}
          </Grid>

          {/* Card Content */}
          <Grid
            item
            xs={12}
            md={6}
          >
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
                  {cardData?.number}
                </Typography>
                <Typography
                  gutterBottom
                  variant='h4'
                  component='div'
                >
                  {cardData?.title}
                </Typography>
                <Typography
                  gutterBottom
                  variant='h6'
                  component='div'
                >
                  {cardData?.event?.name}
                </Typography>
              </CardContent>
              <Divider />
              <Box p={3}>
                <Typography
                  variant='subtitle2'
                  component='div'
                >
                  {cardData?.description}
                </Typography>
                {cardData?.videoLink && (
                  <Button
                    variant='contained'
                    color='primary'
                    href='/dashboard'
                    sx={{ mt: 2 }}
                  >
                    Prijavi se
                  </Button>
                )}
              </Box>
              {isError ? (
                <Box p={2}>
                  <Typography
                    variant='h4'
                    component='div'
                  >
                    {errorMessage}
                  </Typography>
                </Box>
              ) : (
                !cardData?.videoLink && (
                  <Box p={3}>
                    <Button
                      variant='contained'
                      color='success'
                      onClick={handleAddCardToAlbum}
                      sx={{ p: 2, mx: isMobile ? 1 : 5, ml: 0, mt: 3 }}
                    >
                      Dodaj U Album
                    </Button>
                    <Button
                      variant='contained'
                      color='inherit'
                      href='/dashboard'
                      sx={{ p: 2, mx: isMobile ? 1 : 5, ml: 0, mt: 3 }}
                    >
                      Prijavi se
                    </Button>
                  </Box>
                )
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
