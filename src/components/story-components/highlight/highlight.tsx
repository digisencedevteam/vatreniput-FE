import { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Dialog,
} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import HttpsIcon from '@mui/icons-material/Https';
import { useResponsive } from 'src/hooks/use-responsive';
import { HighlightProps } from 'src/types/story';

const Highlight = ({
  data,
  overFiftyPercent,
}: HighlightProps & { overFiftyPercent: boolean }) => {
  const isDesktop = useResponsive('up', 'md');
  const [open, setOpen] = useState(false);
  const imageHeight = isDesktop ? '375' : '250';
  const isVideoHighlight = !!data.videoLink;
  const videoHref = data.videoLink;

  const handleOpen = () => {
    if (overFiftyPercent) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card style={{ marginBottom: '20px', minHeight: 620 }}>
      <div style={{ position: 'relative' }}>
        <CardMedia
          component='img'
          height={imageHeight}
          image={data.imgUrl}
          alt={data.Title}
        />
        {isVideoHighlight && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            {!overFiftyPercent && (
              <>
                <HttpsIcon sx={{ fontSize: '250%', color: 'primary' }} />
                <Typography
                  variant='body2'
                  sx={{ color: 'white', mt: 2, width: '75%' }}
                >
                  Skupi 50% sličica ovog prvenstva da otključaš reportaže.
                </Typography>
              </>
            )}
            {overFiftyPercent && (
              <IconButton
                color='primary'
                onClick={handleOpen}
              >
                <PlayCircleOutlineIcon sx={{ fontSize: '250%' }} />
              </IconButton>
            )}
          </div>
        )}
      </div>
      <CardContent>
        <Typography
          variant='h6'
          component='div'
        >
          {data.Title}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
        >
          {data.Description}
        </Typography>
      </CardContent>
      {overFiftyPercent && (
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth='md'
          fullWidth
        >
          <IconButton
            onClick={handleClose}
            style={{ position: 'absolute', right: 0, top: 0 }}
          >
            <CloseIcon />
          </IconButton>
          {videoHref && (
            <div style={{ position: 'relative', paddingTop: '56.25%' }}>
              <iframe
                src={`${videoHref}?dnt=1`}
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%',
                  border: '0',
                }}
                allow='autoplay; fullscreen; picture-in-picture'
                title={data.Title}
              />
            </div>
          )}
        </Dialog>
      )}
    </Card>
  );
};

export default Highlight;
