import { useRef, useState } from 'react';
import { Button, Dialog, DialogContent } from '@mui/material';

const CameraOpener = () => {
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
        color='error'
        size='large'
        onClick={handleCapture}
      >
        Open Camera
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <video
            ref={videoRef}
            autoPlay
            style={{ width: '100%' }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CameraOpener;
