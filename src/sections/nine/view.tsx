import React, { useState } from 'react';
import {
  alpha,
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
} from '@mui/material';
import CameraOpener from 'src/components/camera-opener/camera-opener';

export default function NineView() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const svetiDresovi = [
    'https://res.cloudinary.com/dzg5kxbau/image/upload/v1699966512/2000_Croatia_Away_FINAL_lqqqyu.png',
    'https://res.cloudinary.com/dzg5kxbau/image/upload/v1699966510/2004_Croatia_Home_FINAL_n57ypc.png',
    'https://res.cloudinary.com/dzg5kxbau/image/upload/v1699966509/2002_Croatia_Home_FINAL_zak3nk.png',
    'https://res.cloudinary.com/dzg5kxbau/image/upload/v1699966509/2004_Croatia_Away_FINAL_qttoep.png',
    'https://res.cloudinary.com/dzg5kxbau/image/upload/v1699966506/2000_Croatia_Home_FINAL_rxrify.png',
  ];

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };
  return (
    <Container maxWidth='xl'>
      <Typography
        variant='h4'
        sx={{ mb: 4 }}
      >
        Sveti Dress
      </Typography>
      <Typography
        variant='h6'
        sx={{ mb: 4 }}
      >
        Izaberi dres da ga isprobaš
      </Typography>

      <Grid
        container
        spacing={2}
      >
        {svetiDresovi.map((image, index) => (
          <Grid
            item
            xs={12}
            sm={4}
            key={index}
          >
            <Card
              sx={{
                border: selectedImage === image ? 'solid 2px red' : '',
                borderRadius: selectedImage === image ? '4px' : '',
                cursor: 'pointer',
              }}
              onClick={() => handleImageClick(image)}
            >
              <CardMedia
                component='img'
                height='250'
                image={image}
                alt={`Dress ${index + 1}`}
              />
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedImage && <CameraOpener />}
    </Container>
  );
}
