import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import CameraOpener from 'src/components/camera-opener/camera-opener';
import { svetiDresovi } from 'src/lib/constants';

export default function NineView() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [openTutorial, setOpenTutorial] = useState<boolean>(true);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleCloseTutorial = () => {
    setOpenTutorial(false);
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
              {selectedImage === image && <CameraOpener />}
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openTutorial}
        onClose={handleCloseTutorial}
        aria-labelledby='tutorial-dialog-title'
        aria-describedby='tutorial-dialog-description'
        sx={{ '& .MuiDialog-paper': { margin: 2, padding: 3 } }}
      >
        <DialogContent>
          <DialogContentText
            id='tutorial-dialog-description'
            sx={{ mb: 2, color: 'white' }}
          >
            {' '}
            Dobrodošli! Molimo odaberite dres i kliknite na gumb 'Otvori
            kameru'. Kada se kamera otvori, usmjerite je prema sebi kako biste
            vidjeli AR značajke i isprobali dresove naše reprezentacije.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseTutorial}
            variant='contained'
            color='primary'
          >
            Razumijem
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
