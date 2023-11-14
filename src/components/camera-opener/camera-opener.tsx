import React, { useRef, useState } from 'react';
import { Button, Dialog, DialogContent } from '@mui/material';

const CameraOpener: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleCapture = async () => {
    setOpen(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error(err);
        // Handle the error of not being able to access the camera
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  return (
    <div>
      <Button
        fullWidth
        color='inherit'
        size='large'
        onClick={handleCapture}
      >
        Open Camera
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            minHeight: '90vh', // 90% of viewport height
            maxHeight: '90vh',
            width: '90%', // adjust the width as needed
            overflow: 'hidden', // to ensure no scrollbars appear
          },
        }}
      >
        <DialogContent
          style={{
            height: '100%', // fill the height of the dialog
            width: '100%', // fill the width of the dialog
            padding: 0, // remove padding if necessary
            overflow: 'hidden', // to ensure no scrollbars appear
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            style={{ width: '100%', height: '100%' }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CameraOpener;
