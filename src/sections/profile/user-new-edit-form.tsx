import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import AvatarModal from 'src/components/avatar-modal/AvatarModal';
import Box from '@mui/material/Box';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
} from 'src/components/hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteAccountModal from 'src/components/delete-account-modal/deleteAccountModal';
import axios, { endpoints } from 'src/utils/axios';
import { Alert } from '@mui/material';
import { FormValues } from 'src/types';

type Props = {
  currentUser?: any;
  avatarOptions: string[];
};

export default function UserNewEditForm({
  currentUser,
  avatarOptions,
}: Props) {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<
    string | undefined
  >(currentUser?.photoURL || undefined);
  const [originalValues, setOriginalValues] = useState<FormValues>({
    firstName: '',
    lastName: '',
    email: '',
    avatarUrl: '',
  });
  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    setOriginalValues({
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      email: currentUser?.email || '',
      avatarUrl: currentUser?.photoURL || '',
    });
  }, [currentUser]);

  const NewUserSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('First name is required')
      .matches(/^[^0-9]*$/, 'First name cannot contain numbers'),
    lastName: Yup.string()
      .required('Last name is required')
      .matches(/^[^0-9]*$/, 'Last name cannot contain numbers'),
    email: Yup.string()
      .required('Email is required')
      .email('Email must be a valid address'),
    avatarUrl: Yup.string().required('Avatar is required'),
    status: Yup.string(),
    isVerified: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      email: currentUser?.email || '',
      avatarUrl: currentUser?.photoURL || '',
      status: currentUser?.status || '',
      isVerified: currentUser?.isVerified || true,
    }),
    [currentUser]
  );

  const methods = useForm({
    //@ts-ignore
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        photoURL: data.avatarUrl,
      };
      await axios.put(endpoints.user.user + currentUser._id, payload);
      setSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  });

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSelectAvatar = (url: string) => {
    setSelectedAvatar(url);
    setValue('avatarUrl', url, { shouldValidate: true });
    handleCloseModal();
    setIsFormChanged(true);
  };

  type FormValuesKey = keyof FormValues;

  const handleInputChange = (name: FormValuesKey, value: string) => {
    const updatedValues: FormValues = {
      ...values,
      [name]: value,
    };

    let formChanged = false;
    for (const key in originalValues) {
      if (
        originalValues[key] !== updatedValues[key as keyof FormValues]
      ) {
        formChanged = true;
        break;
      }
    }

    setIsFormChanged(formChanged);
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(endpoints.user.user + currentUser._id);
      setDeleteModalOpen(false);
      router.push(paths.auth.jwt.login);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ pt: 5, pb: 5, px: 3 }}>
              <Box sx={{ mb: 5 }}>
                <Button
                  onClick={handleOpenModal}
                  sx={{
                    position: 'relative',
                    borderRadius: '8px',
                    padding: 0,
                    width: '160px',
                    height: '160px',
                    border: '2px solid #1976d2',
                    '&:hover': {
                      '&::after': {
                        content: `"Promjeni avatara"`,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(0, 0, 0, 0.5)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '14px',
                        cursor: 'pointer',
                      },
                    },
                  }}
                >
                  <Avatar
                    alt="Avatar"
                    src={selectedAvatar || 'Moj Avatar'}
                    sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '6px',
                      objectFit: 'cover',
                    }}
                  />
                </Button>
              </Box>

              <RHFSwitch
                name="isVerified"
                labelPlacement="start"
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Email Potvrđen...
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      Email će biti automatski poslan ako se
                      deaktivira ova značajka!
                    </Typography>
                  </>
                }
                sx={{
                  mx: 0,
                  width: 1,
                  justifyContent: 'space-between',
                }}
              />

              {currentUser && (
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  sx={{ mt: 3 }}
                >
                  <Button
                    variant="soft"
                    color="error"
                    onClick={handleOpenDeleteModal}
                  >
                    Obriši korisnički račun
                  </Button>
                </Stack>
              )}

              <DeleteAccountModal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                onConfirmDelete={handleDeleteAccount}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >
                <RHFTextField
                  name="firstName"
                  label="First Name"
                  value={values.firstName}
                  onChange={(e) => {
                    handleInputChange('firstName', e.target.value);
                    setValue('firstName', e.target.value, {
                      shouldValidate: true,
                    });
                  }}
                />
                <RHFTextField
                  name="lastName"
                  label="Last Name"
                  value={values.lastName}
                  onChange={(e) => {
                    handleInputChange('lastName', e.target.value);
                    setValue('lastName', e.target.value, {
                      shouldValidate: true,
                    });
                  }}
                />
                <RHFTextField
                  name="email"
                  label="Email Address"
                  value={values.email}
                  onChange={(e) => {
                    handleInputChange('email', e.target.value);
                    setValue('email', e.target.value, {
                      shouldValidate: true,
                    });
                  }}
                />
              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  disabled={!isFormChanged}
                >
                  {'Spremi promjene'}
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>

      <AvatarModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        avatarOptions={avatarOptions}
        selectedAvatar={selectedAvatar || ''}
        onSelectAvatar={handleSelectAvatar}
      />
      <Snackbar
        open={submitted}
        autoHideDuration={6000}
        onClose={() => setSubmitted(false)}
      >
        <Alert onClose={() => setSubmitted(false)} severity="success">
          Korisnički podatci su uspješno promjenjeni!
        </Alert>
      </Snackbar>
    </>
  );
}
