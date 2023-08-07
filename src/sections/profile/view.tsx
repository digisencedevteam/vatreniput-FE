import Container from '@mui/material/Container';
import UserNewEditForm from './user-new-edit-form';
import { useSettingsContext } from 'src/components/settings';
import { _userList } from 'src/_mock';
import { useAuthContext } from 'src/auth/hooks';

export default function ProfileView() {
  const settings = useSettingsContext();
  const currentUser = useAuthContext();
  const avatarOptions = [
    'https://res.cloudinary.com/dzg5kxbau/image/upload/v1690543607/srna_pozdrav_navija%C4%8Di_tcpljm.jpg',
    'https://res.cloudinary.com/dzg5kxbau/image/upload/v1690543542/modri%C4%87_6_kopija_zl9wvt.jpg',
    'https://res.cloudinary.com/dzg5kxbau/image/upload/v1690543498/gvardiol_4_dbreiv.jpg',
    'https://res.cloudinary.com/dzg5kxbau/image/upload/v1690543486/vla%C5%A1i%C4%87_kopija_2_qsrvq4.jpg',
    'https://res.cloudinary.com/dzg5kxbau/image/upload/v1690543462/or%C5%A1i%C4%87_slavi_aq76d4.jpg',
    'https://res.cloudinary.com/dzg5kxbau/image/upload/v1690543433/rakiti%C4%87_yn3kwa.jpg',
    'https://res.cloudinary.com/dzg5kxbau/image/upload/v1690543420/dali%C4%87_slavlje_1_mwyhvm.jpg',
    'https://res.cloudinary.com/dzg5kxbau/image/upload/v1691140108/peri%C5%A1i%C4%87_slavlje_1_2_bczyud.jpg',
    'https://res.cloudinary.com/dzg5kxbau/image/upload/v1691140208/jo%C5%A1ko_gvardiol_3_tcgdcz.jpg',
  ];

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <UserNewEditForm
        currentUser={currentUser.user}
        avatarOptions={avatarOptions}
      />
    </Container>
  );
}
