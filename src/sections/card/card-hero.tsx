// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import ListItemText from '@mui/material/ListItemText';
// _mock
// hooks
// utils
import { fDate } from 'src/utils/format-time';
// theme
import { bgGradient } from 'src/theme/css';
// components

export default function CardHero({
  author,
  coverUrl,
  createdAt,
}: any) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: 480,
        overflow: 'hidden',
        ...bgGradient({
          imgUrl: coverUrl,
          startColor: `${alpha(theme.palette.grey[900], 0.64)} 0%`,
          endColor: `${alpha(theme.palette.grey[900], 0.64)} 100%`,
          backgroundSize: 'contain',
        }),

        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container sx={{ height: 1, position: 'relative' }}>
        <Stack
          sx={{
            left: 0,
            width: 1,
            bottom: 0,
            position: 'absolute',
          }}
        >
          {author && createdAt && (
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                px: { xs: 2, md: 3 },
                pb: { xs: 3, md: 8 },
              }}
            >
              <Avatar
                alt={author.name}
                src={author.avatarUrl}
                sx={{ width: 64, height: 64, mr: 2 }}
              />

              <ListItemText
                sx={{ color: 'common.white' }}
                primary={author.name}
                secondary={fDate(createdAt)}
                primaryTypographyProps={{
                  typography: 'subtitle1',
                  mb: 0.5,
                }}
                secondaryTypographyProps={{
                  color: 'inherit',
                  sx: { opacity: 0.64 },
                }}
              />
            </Stack>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
