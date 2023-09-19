import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Image from 'src/components/image';
import { CollectionCard } from 'src/types/'

type CollectionStickerItemProps = {
  item: CollectionCard
};

export default function CollectionStickerItem({
  item,
}: CollectionStickerItemProps) {
  const theme = useTheme();

  const renderImg = (
    <Image
      alt={item.title}
      src={item.isCollected === undefined ? item.imageURLs[0] : item.isCollected ? item.imageURLs[0] : 'https://res.cloudinary.com/dzg5kxbau/image/upload/v1692793265/WhatsApp_Image_2023-08-23_at_14.20.09_e3uz5n.jpg'    }
      overlay={`linear-gradient(to bottom, ${alpha(
        theme.palette.grey[900],
        0
      )} 0%, ${theme.palette.grey[900]} 95%)`}
      sx={{
        height: { xs: 160, sm: 200, md: 250, lg: 250, xl: 300 },
      }}
    />
  );

  return (
    <Card
      sx={{
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.05)',
        },
        border: 1,
        borderColor: theme.palette.primary.main,
        top: 20,
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardContent
          sx={{
            left: 0,
            width: 1,
            bottom: 0,
            zIndex: 9,
            position: 'absolute',
            color: 'common.white',
          }}
        >
          <Typography variant='subtitle2'>{item.title}</Typography>
        </CardContent>
        {renderImg}
      </Box>
    </Card>
  );
}
