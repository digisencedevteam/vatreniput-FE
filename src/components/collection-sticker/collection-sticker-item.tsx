import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Image from 'src/components/image';
import { CollectionCard } from 'src/types/';
import { useRouter } from 'src/routes/hooks';
import { useResponsive } from 'src/hooks/use-responsive';

type CollectionStickerItemProps = {
  item: CollectionCard;
};

export const CollectionStickerItem = ({ item }: CollectionStickerItemProps) => {
  const theme = useTheme();
  const navigate = useRouter();
  const isMobile = useResponsive('down', 'md');

  const handleClick = () => {
    if (!!item.printedCardId) {
      navigate.push(`/card/${item.printedCardId}/1928?isPreview=true`);
    }
  };

  const renderImg = (
    <Image
      alt={item.title}
      src={
        item.isCollected === undefined
          ? item.imageURLs[1]
          : item.isCollected
          ? item.imageURLs[1]
          : 'https://res.cloudinary.com/dzg5kxbau/image/upload/v1702329314/LogoHNS_j974kk.png'
      }
      sx={{
        height: { xs: 160, sm: 200, md: 250, lg: 250, xl: 300 },
        width: '100%',
        maxWidth: '100%',
      }}
    />
  );

  return (
    <Box sx={{ maxWidth: 520, mx: 'auto' }}>
      <Card
        sx={{
          maxWidth: 520,
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.05)',
            cursor: 'pointer',
          },
          top: 20,
          position: 'relative',
          width: '100%',
        }}
        onClick={handleClick}
      >
        <Box sx={{ position: 'relative', maxWidth: 520 }}>
          {renderImg}

          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              zIndex: 10,
              borderTopLeftRadius: 10,
              width: isMobile ? '30%' : '20%',
              height: isMobile ? '30%' : '20%',
              backgroundColor: alpha(theme.palette.common.black, 0.5),
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant='h4'
              sx={{
                color: 'common.white',
              }}
            >
              {item.ordinalNumber}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};
