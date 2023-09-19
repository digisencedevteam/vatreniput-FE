import { Box, Button, Typography, useTheme } from "@mui/material";

type ImageandTitleProps = {
  imageSrc?: string;
  title: string;
  link?: string;
  sx?: any;
}

export const DashboardButton = ({ imageSrc, title, link }: ImageandTitleProps) => {
  const theme = useTheme();

  return (
    <Button
      variant="contained"
      color="primary"
      href={link}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        borderRadius: 2,
        fontSize: '1.5rem',
        fontWeight: 'bold',
        paddingY: 2,
        color: theme.palette.mode === 'dark' ? theme.palette.background.contrast : theme.palette.text.primary,
        backgroundColor: theme.palette.background.neutral,
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
        transition: 'background-color 0.3s',
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
      }}
    >
      {imageSrc && <img src={imageSrc} alt={title} style={{ width: '45px', height: '45px', marginBottom: '8px' }} />}
      <Typography>{title}</Typography>
    </Button>
  );
};