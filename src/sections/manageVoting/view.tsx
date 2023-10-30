import { useContext, useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Divider,
  Snackbar,
  Alert,
} from '@mui/material';
import { useSettingsContext } from 'src/components/settings';
import { AuthContext } from 'src/auth/context/jwt';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { useParams } from 'react-router-dom';
import useVoting from 'src/hooks/use-voting-data';
import dayjs from 'dayjs';
import { userRoles } from 'src/lib/constants';
import { useRouter } from 'src/routes/hooks';

interface Voting {
  title: string;
  description: string;
  availableUntil: string;
  thumbnail: string;
  votingOptions: Array<{ text: string; thumbnail?: string }>;
}

const ManageVoting = () => {
  const [voting, setVoting] = useState<Partial<Voting>>({ votingOptions: [] });
  const { createOrUpdateVoting, fetchVotingById } = useVoting();
  const { votingId } = useParams();
  const settings = useSettingsContext();
  const auth = useContext(AuthContext);
  const isAdmin = auth.user && auth.user.role === userRoles.admin;
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState<string | null>(null);

  if (!isAdmin) {
    router.push('/dashboard/one');
  }

  const fetchData = async () => {
    if (votingId) {
      const fetchedVoting = await fetchVotingById(votingId);
      if (fetchedVoting) {
        setVoting(fetchedVoting);
      }
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [votingId]);

  const handleSubmit = async () => {
    const result = await createOrUpdateVoting(voting, votingId);
    if (result.success) {
      setSubmitted(true);
    } else {
      setErrorSnackbar(result.error || 'Naišli smo na grešku...');
    }
  };

  const handleAddOption = () => {
    setVoting((prev) => ({
      ...prev,
      votingOptions: [
        ...(prev.votingOptions || []),
        { text: '', thumbnail: '' },
      ],
    }));
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = [...(voting.votingOptions || [])];
    newOptions.splice(index, 1);
    setVoting({ ...voting, votingOptions: newOptions });
  };

  const handleOptionChange = (
    index: number,
    key: 'text' | 'thumbnail',
    value: string
  ) => {
    const newOptions = [...(voting.votingOptions || [])];
    newOptions[index][key] = value;
    setVoting({ ...voting, votingOptions: newOptions });
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box>
        <Typography variant='h4' textAlign={'center'} m={1}>
          {votingId ? 'Ažuriraj' : 'Stvori novo'} glasanje
        </Typography>
        <Divider />
        <TextField
          sx={{ my: 1 }}
          value={voting.title || ''}
          label='Naslov'
          fullWidth
          onChange={(e) => setVoting({ ...voting, title: e.target.value })}
        />
        <TextField
          sx={{ my: 1 }}
          value={voting.description || ''}
          label='Opis'
          fullWidth
          onChange={(e) =>
            setVoting({ ...voting, description: e.target.value })
          }
        />
        <TextField
          sx={{ my: 1 }}
          value={voting.thumbnail || ''}
          label='Thumbnail URL'
          fullWidth
          onChange={(e) => setVoting({ ...voting, thumbnail: e.target.value })}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label='Available Until'
            value={dayjs(voting.availableUntil || undefined)}
            disablePast
            onChange={(newValue) => {
              setVoting({ ...voting, availableUntil: newValue?.toISOString() });
            }}
          />
        </LocalizationProvider>
        {voting.votingOptions?.map((option, index) => (
          <Box key={index} display='flex' flexDirection='column' mb={2}>
            <TextField
              label={`Opcija ${index + 1}`}
              fullWidth
              value={option.text}
              onChange={(e) =>
                handleOptionChange(index, 'text', e.target.value)
              }
            />
            <TextField
              sx={{ mt: 1 }}
              label={`Thumbnail Opcija ${index + 1}`}
              fullWidth
              value={option.thumbnail || ''}
              onChange={(e) =>
                handleOptionChange(index, 'thumbnail', e.target.value)
              }
            />
            <Button onClick={() => handleRemoveOption(index)}>
              - Remove Option
            </Button>
          </Box>
        ))}

        <Button sx={{ mx: 3, my: 1 }} onClick={handleAddOption}>
          Dodaj opciju
        </Button>
        <Button
          variant='contained'
          onClick={handleSubmit}
          disabled={
            !voting.title ||
            !voting.description ||
            !voting.votingOptions ||
            !voting.thumbnail
          }
        >
          {votingId ? 'Ažuriraj' : 'Kreiraj'}
        </Button>
      </Box>
      <Snackbar
        open={submitted}
        autoHideDuration={6000}
        onClose={() => {
          setSubmitted(false);
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => {
            setSubmitted(false);
            router.push('/dashboard/five');
          }}
          severity='success'
        >
          Kviz uspješno {votingId ? ' azuriran' : ' kreiran'}!🎉🎉🥳 <br />{' '}
          Zatvori me za povratak na glasanja
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!errorSnackbar}
        autoHideDuration={6000}
        onClose={() => setErrorSnackbar(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setErrorSnackbar(null)} severity='error'>
          {errorSnackbar}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ManageVoting;
