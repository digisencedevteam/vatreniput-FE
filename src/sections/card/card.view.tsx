import { useEffect, useState } from 'react';
import axios, { endpoints } from 'src/utils/axios';
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
      const response = await axios.get(
        endpoints.card.details + cardId
      );
      setCardData(response.data);
    } catch (error) {
      setIsError(true);
      setCardData([]);
    }
  };
  useEffect(() => {
    fetchCardData();
  }, [cardId]);

  const handleAddCardToAlbum = async () => {
    try {
      const res = await axios.patch(endpoints.card.add, {
        cardId,
      });
      res.data === 'ok'
        ? navigate('/dashboard/two')
        : setErrorMessage(res.data);
    } catch (error) {
      setIsError(true);
      setCardData([]);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={isMobile ? { marginTop: '20px' } : null}
    >
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Grid container spacing={5}>
          {/* Image */}
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              height="auto"
              image={
                cardData
                  ? Array.isArray(cardData.imageURLs) &&
                    cardData.imageURLs.length > 0
                    ? cardData.imageURLs[0]
                    : ''
                  : ''
              }
              alt="Sličica"
              sx={{ borderRadius: 2 }}
            />
          </Grid>

          {/* Card Content */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: '100%',
                bgcolor: theme.palette.background.neutral,
              }}
            >
              <CardContent>
                <Typography
                  variant="caption"
                  sx={{ my: 2, color: theme.palette.primary.main }}
                >
                  218
                </Typography>
                <Typography gutterBottom variant="h4" component="div">
                  {cardData?.number ? cardData.number + ' ' : ''}{' '}
                  {cardData?.title}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {cardData?.event?.name}
                </Typography>
              </CardContent>
              <Divider />
              {isError ? (
                <Box p={2}>
                  <Typography variant="h4" component="div">
                    Sličica sa ovog QR koda nije pronađena ili je već
                    iskorištena.
                  </Typography>
                </Box>
              ) : (
                <Box p={3}>
                  {errorMessage === '' ? (
                    <>
                      <Typography variant="subtitle2" component="div">
                        Kapetan Hrvatske, Luka Modrić, nedvojbeno je
                        postigao vrhunac svoje karijere osvojivši
                        prestižnu titulu najboljeg igrača Svjetskog
                        prvenstva, gdje je Hrvatska ostvarila zapaženi
                        uspjeh osvajanjem srebrne medalje. <br />
                        <br />
                        Luka je predvodio svoju reprezentaciju do
                        finala Mundijala. <br />
                        <br />
                        Nakon Svjetskog prvenstva u Rusiji, postalo je
                        očigledno da je Luka Modrić postao najveći
                        hrvatski nogometaš u povijesti.
                      </Typography>
                      <Button
                        variant="contained"
                        color="success"
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
                    <Typography
                      variant="h4"
                      component="div"
                      color="error"
                    >
                      {errorMessage}
                    </Typography>
                  )}
                  <Button
                    variant="contained"
                    color="inherit"
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
    </Box>
  );
};
