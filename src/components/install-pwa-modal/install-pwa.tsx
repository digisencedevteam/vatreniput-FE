import { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
} from '@mui/material';
import IosShareIcon from '@mui/icons-material/IosShare';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import addToHomeScreen from '/src/assets/images/addToHomeScreen.jpeg';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}
declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

const InstallPWA = () => {
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
    setIsAppInstalled(isInstalled);

    const beforeInstallPromptHandler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };

    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);

    return () =>
      window.removeEventListener(
        'beforeinstallprompt',
        beforeInstallPromptHandler
      );
  }, []);

  const onClickInstall = () => {
    if (promptInstall) {
      promptInstall.prompt();
      promptInstall.userChoice.then(
        (choiceResult: {
          outcome: 'accepted' | 'dismissed';
          platform: string;
        }) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
          }
          setDialogOpen(false);
        }
      );
    }
  };

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  if (isAppInstalled) {
    return null;
  }

  return (
    <>
      {!isAppInstalled && (
        <Button
          onClick={openDialog}
          color='primary'
          size='small'
        >
          Instaliraj
        </Button>
      )}

      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
      >
        <DialogTitle color={'primary'}>Instalirajte Web Aplikaciju</DialogTitle>
        <DialogContent>
          {supportsPWA ? (
            <DialogContentText>
              Kliknite ispod da instalirate aplikaciju na vaš uređaj.
            </DialogContentText>
          ) : (
            <>
              <DialogContentText style={{ marginBottom: '20px' }}>
                <strong style={{ color: 'primary' }}>
                  Vaš preglednik ne podržava automatsku instalaciju.
                </strong>
              </DialogContentText>
              <Box
                sx={{
                  padding: '20px',
                  border: '1px solid ',
                  borderRadius: '4px',
                  margin: '5px',
                }}
              >
                <DialogContentText>
                  {' '}
                  Slijedite ove upute za ručnu instalaciju:
                </DialogContentText>
                <ol style={{ paddingLeft: '20px' }}>
                  <li>
                    <DialogContentText my={1}>
                      Kliknite na{' '}
                      <IosShareIcon style={{ verticalAlign: 'middle' }} /> ili
                      <MoreVertIcon /> zatim nađite gumb
                    </DialogContentText>
                  </li>
                  <li>
                    <DialogContentText my={1}>
                      'Add to Home Screen' / 'Dodaj na početni zaslon'{' '}
                      <img
                        src={'/assets/images/addToHomeScreen.jpeg'}
                        alt='Add to Home Screen'
                        style={{ verticalAlign: 'middle' }}
                      />
                    </DialogContentText>
                  </li>
                </ol>
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {supportsPWA && (
            <Button
              onClick={onClickInstall}
              style={{ fontWeight: 'bold' }}
            >
              Instaliraj
            </Button>
          )}
          <Button
            onClick={closeDialog}
            color='primary'
            style={{ fontWeight: 'bold' }}
          >
            Zatvori
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InstallPWA;
