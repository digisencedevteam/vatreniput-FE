import Container from '@mui/material/Container';
import UserNewEditForm from './user-new-edit-form';
import { useSettingsContext } from 'src/components/settings';
import { useAuthContext } from 'src/auth/hooks';
import { Typography, useTheme } from '@mui/material';
import { avatarOptions } from 'src/lib/constants';

export default function ProfileView() {
  const settings = useSettingsContext();
  const currentUser = useAuthContext();
  const theme = useTheme();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Typography
        color={theme.palette.primary.main}
        variant='h3'
        sx={{ paddingY: 5 }}
      >
        Moj Profil
      </Typography>
      <UserNewEditForm
        currentUser={currentUser.user}
        avatarOptions={avatarOptions}
      />
    </Container>
  );
}
