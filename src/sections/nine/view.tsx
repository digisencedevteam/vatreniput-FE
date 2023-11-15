import React, { useState } from 'react';
import { Container, Typography, Grid, Card, CardMedia } from '@mui/material';
import CameraOpener from 'src/components/camera-opener/camera-opener';
import { svetiDresovi } from 'src/lib/constants';

export default function NineView() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <Container maxWidth='xl'>
      <Typography
        variant='h2'
        my={2}
      >
        Sveti Dres
      </Typography>
      <Grid
        container
        spacing={2}
      >
        {svetiDresovi.map((image, index) => (
          <React.Fragment key={index}>
            <Grid
              item
              xs={12}
              sm={4}
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
            {selectedImage === image && (
              <Grid
                item
                xs={12}
              >
                <CameraOpener />
              </Grid>
            )}
          </React.Fragment>
        ))}
      </Grid>
    </Container>
  );
}
