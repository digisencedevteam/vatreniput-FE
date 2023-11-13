import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}
declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

const InstallPWA: React.FC = () => {
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
        <DialogTitle>Instalirajte Web Aplikaciju</DialogTitle>
        <DialogContent>
          {supportsPWA ? (
            <DialogContentText>
              Kliknite ispod da instalirate aplikaciju na vaš uređaj.
            </DialogContentText>
          ) : (
            <DialogContentText>
              Vaš preglednik ne podržava automatiziranu instalaciju. Slijedite
              upute za ručnu instalaciju.
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          {supportsPWA && (
            <Button
              onClick={onClickInstall}
              color='primary'
            >
              Instaliraj
            </Button>
          )}
          <Button
            onClick={closeDialog}
            color='primary'
          >
            Zatvori
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InstallPWA;
