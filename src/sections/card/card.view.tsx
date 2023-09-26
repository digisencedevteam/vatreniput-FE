import React from 'react';
import axios, { endpoints } from 'src/utils/axios';
import { useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import CircularProgress from '@mui/material/CircularProgress';

export const CardView = () => {
  const { cardId } = useParams();
  const [cardData, setCardData] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const navigate = useNavigate();

  const fetchCardData = async () => {
    try {
      const response = await axios.get(
        endpoints.card.details + cardId
      );
      console.log(response);
      setCardData(response.data);
    } catch (error) {
      console.error('Error fetching categories' + error);
      setIsError(true);
      setCardData([]);
    }
  };

  const handleAddCardToAlbum = async () => {
    try {
      const res = await axios.patch(endpoints.card.add, {
        cardId,
      });
      console.log(res.data, 'BEKEND ODGOVOARA');
      res.data === 'ok'
        ? navigate('/dashboard/two')
        : setErrorMessage(res.data);
    } catch (error) {
      console.error('Error fetching categories' + error);
      setIsError(true);
      setCardData([]);
    }
  };

  React.useEffect(() => {
    setIsLoading(true);
    fetchCardData().then(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Card sx={{ maxWidth: 450, margin: 'auto', marginTop: '5%' }}>
      <CardActionArea>
        {isError ? (
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
            style={{ margin: 'auto' }}
          />
        ) : (
          <CardMedia
            component="img"
            height="auto"
            image={cardData ? cardData?.imageURLs[0] : ''}
            alt="Sličica"
          />
        )}
        {isError ? (
          <Skeleton
            sx={{ height: 190 }}
            animation="wave"
            variant="rectangular"
          />
        ) : (
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              {cardData?.number ? cardData.number + '' : ''}{' '}
              {cardData?.title}
            </Typography>
            <Chip
              label={cardData?.event?.name}
              color="primary"
              variant="outlined"
              style={{ width: '100%', marginTop: 10 }}
            />
          </CardContent>
        )}
      </CardActionArea>

      <CardActions>
        {isError ? (
          <div>
            <Typography variant="h4" component="div">
              Sličica sa ovog QR koda nije pronađena ili je već
              iskorištena.
            </Typography>
          </div>
        ) : (
          <React.Fragment>
            <Divider sx={{ mt: 0, mb: 0 }} />
            {errorMessage === '' ? (
              <Button
                size="medium"
                style={{
                  color: '#2065D1',
                }}
                onClick={handleAddCardToAlbum}
              >
                Dodaj U Album
              </Button>
            ) : (
              <Typography variant="h4" component="div">
                {errorMessage}
              </Typography>
            )}

            <Button
              size="medium"
              style={{
                color: '#2065D1',
              }}
            >
              Prijavi se
            </Button>
          </React.Fragment>
        )}
      </CardActions>
    </Card>
  );
};
