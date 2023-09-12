import React from 'react';
import Container from '@mui/material/Container';
import { CardSkeleton } from './card-skeleton';
import CardHero from './card-hero';
import axios, { endpoints } from 'src/utils/axios';
import { useParams } from 'react-router-dom';
import NotFoundPage from 'src/pages/404';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export const CardView = () => {
  const { cardId } = useParams();
  const [cardData, setCardData] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const renderSkeleton = <CardSkeleton />;

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
      const response = await axios.patch(endpoints.card.add, {
        cardId,
      });
      console.log(response);
      //setCardData(response.data);
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
    return renderSkeleton;
  }
  if (isError) {
    return <NotFoundPage />;
  }

  return (
    <Container maxWidth={false}>
      <CardHero coverUrl={cardData ? cardData?.imageURLs[0] : ''} />
      <Stack
        sx={{
          maxWidth: 720,
          mx: 'auto',
          mt: { xs: 5, md: 10 },
        }}
      >
        <Chip
          label={cardData?.event?.name}
          color="warning"
          variant="outlined"
        />
        <Typography variant="h3" sx={{ mb: 1, mt: 5 }}>
          {cardData?.title}
        </Typography>
        <Divider sx={{ mt: 5, mb: 2 }} />
        <Typography variant="subtitle1" sx={{ mb: 5 }}>
          {cardData?.description}
        </Typography>
        <Divider sx={{ mt: 5, mb: 2 }} />
        <IconButton
          color="primary"
          aria-label="add to album"
          onClick={handleAddCardToAlbum}
        >
          Dodaj u album
          <AddCircleIcon />
        </IconButton>
      </Stack>
    </Container>
  );
};
