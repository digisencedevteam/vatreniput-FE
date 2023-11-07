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
  Grid,
  IconButton,
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LoadingScreen } from 'src/components/loading-screen';
import { paths } from 'src/routes/paths';
import { FormikErrors, useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Naslov je obavezan'),
  description: Yup.string().required('Opis je obavezan'),
  thumbnail: Yup.string().required('Slika glasanja je obavezna'),
  availableUntil: Yup.string().required('Datum kraja dostupnosti je obavezan'),
  votingOptions: Yup.array()
    .of(
      Yup.object().shape({
        text: Yup.string().required('Tekst je obavezan za svaku opciju'),
        thumbnail: Yup.string().required(
          'Thumbnail je obavezan za svaku opciju'
        ),
      })
    )
    .min(2, 'Potrebno je unijeti barem dvije opcije sa tekstom i slikom'),
});

const ManageVoting = () => {
  const [submitted, setSubmitted] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState<string | null>(null);
  const { createOrUpdateVoting, fetchVotingById, isLoading } = useVoting();
  const { votingId } = useParams();
  const settings = useSettingsContext();
  const auth = useContext(AuthContext);
  const isAdmin = auth.user && auth.user.role === userRoles.admin;
  const router = useRouter();

  if (!isAdmin) {
    router.push(`${paths.dashboard.one}`);
  }

  const initialValues = {
    title: '',
    description: '',
    thumbnail: '',
    availableUntil: '',
    votingOptions: [
      { text: '', thumbnail: '' },
      { text: '', thumbnail: '' },
    ],
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const result = await createOrUpdateVoting(values, votingId);
      if (result.success) {
        setSubmitted(true);
      } else {
        setErrorSnackbar(result.error || 'Naišli smo na grešku...');
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      if (votingId) {
        const fetchedVoting = await fetchVotingById(votingId);
        if (fetchedVoting) {
          const transformedOptions = (fetchedVoting.votingOptions || []).map(
            (option) => ({
              text: option.text || '',
              thumbnail: option.thumbnail || '',
            })
          );
          formik.resetForm({
            values: {
              title: fetchedVoting.title || '',
              description: fetchedVoting.description || '',
              thumbnail: fetchedVoting.thumbnail || '',
              availableUntil: dayjs(fetchedVoting.availableUntil).format(
                'YYYY-MM-DDTHH:mm:ss'
              ),
              votingOptions: transformedOptions || [
                { text: '', thumbnail: '' },
              ],
            },
          });
        }
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [votingId]);

  useEffect(() => {
    formik.setTouched(
      {
        title: true,
        description: true,
        thumbnail: true,
        availableUntil: true,
        votingOptions: formik.values.votingOptions.map(() => ({
          text: true,
          thumbnail: true,
        })),
      },
      false
    );
  }, []);

  const formikErrors = formik.errors as FormikErrors<{
    title: string;
    description: string;
    thumbnail: string;
    availableUntil: undefined;
    votingOptions: { text: string; thumbnail: string }[];
  }>;

  const isButtonDisabled =
    formik.isSubmitting || !formik.dirty || !formik.isValid;

  const handleAddOption = () => {
    formik.setFieldValue('votingOptions', [
      ...formik.values.votingOptions,
      { text: '', thumbnail: '' },
    ]);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = [...formik.values.votingOptions];
    newOptions.splice(index, 1);
    formik.setFieldValue('votingOptions', newOptions);
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Grid item sx={{ m: 1, alignSelf: 'start' }}>
            <IconButton
              edge='start'
              color='primary'
              aria-label='back to dashboard'
              onClick={() => {
                router.push('/dashboard/five');
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Box>
            <Typography variant='h4' textAlign={'center'} m={3}>
              {votingId ? 'Ažuriraj' : 'Stvori novo'} glasanje
            </Typography>
            <Divider />
            <form onSubmit={formik.handleSubmit}>
              <TextField
                sx={{ my: 1 }}
                fullWidth
                id='title'
                name='title'
                label='Naslov'
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
              <TextField
                sx={{ my: 1 }}
                fullWidth
                id='description'
                name='description'
                label='Opis'
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
              <TextField
                sx={{ my: 1 }}
                fullWidth
                id='thumbnail'
                name='thumbnail'
                label='Thumbnail URL'
                value={formik.values.thumbnail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.thumbnail && Boolean(formik.errors.thumbnail)
                }
                helperText={formik.touched.thumbnail && formik.errors.thumbnail}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  sx={{ my: 2 }}
                  label='Available Until'
                  value={dayjs(formik.values.availableUntil)}
                  disablePast
                  onChange={(newValue) => {
                    if (newValue) {
                      formik.setFieldValue(
                        'availableUntil',
                        newValue.format('YYYY-MM-DDTHH:mm:ss')
                      );
                    }
                  }}
                />
              </LocalizationProvider>
              {formik.touched.availableUntil &&
                formik.errors.availableUntil && (
                  <Typography variant='caption' color='error'>
                    {formik.errors.availableUntil}
                  </Typography>
                )}
              {formik.values.votingOptions.map((option, index) => (
                <Box key={index} display='flex' flexDirection='column' mb={2}>
                  <TextField
                    label={`Opcija ${index + 1}`}
                    fullWidth
                    name={`votingOptions[${index}].text`}
                    value={formik.values.votingOptions[index].text}
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                    error={Boolean(
                      (
                        formikErrors?.votingOptions?.[index] as FormikErrors<{
                          text: string;
                          thumbnail: string;
                        }>
                      )?.text
                    )}
                    helperText={
                      (
                        formikErrors?.votingOptions?.[index] as FormikErrors<{
                          text: string;
                          thumbnail: string;
                        }>
                      )?.text
                    }
                  />
                  <TextField
                    sx={{ mt: 1 }}
                    label={`Thumbnail Opcija ${index + 1}`}
                    fullWidth
                    name={`votingOptions[${index}].thumbnail`}
                    value={formik.values.votingOptions[index].thumbnail}
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                    error={Boolean(
                      (
                        formikErrors?.votingOptions?.[index] as FormikErrors<{
                          text: string;
                          thumbnail: string;
                        }>
                      )?.thumbnail
                    )}
                    helperText={
                      (
                        formikErrors?.votingOptions?.[index] as FormikErrors<{
                          text: string;
                          thumbnail: string;
                        }>
                      )?.thumbnail
                    }
                  />
                  <Button
                    sx={{ my: 2 }}
                    variant='outlined'
                    onClick={() => handleRemoveOption(index)}
                  >
                    Ukloni Opciju
                  </Button>
                </Box>
              ))}

              <Button
                variant='outlined'
                sx={{ mx: 3, my: 2 }}
                onClick={handleAddOption}
              >
                Dodaj Novu Opciju
              </Button>
              <Button
                type='submit'
                variant='contained'
                disabled={isButtonDisabled}
              >
                {votingId ? 'Ažuriraj' : 'Kreiraj'}
              </Button>
            </form>
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
                router.push(paths.dashboard.five);
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
        </>
      )}
    </Container>
  );
};

export default ManageVoting;
