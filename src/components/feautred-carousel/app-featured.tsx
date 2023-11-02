import React, { useState, useEffect } from 'react';
import {
  Card,
  Typography,
  Link,
  Stack,
  CardMedia,
  Button,
  IconButton,
  useTheme,
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { AnimatePresence, m } from 'framer-motion';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

export type ItemProps = {
  id: string;
  title: string;
  coverUrl: string;
  description: string;
};

interface Props {
  list: ItemProps[];
}

export default function AppFeatured({ list }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const item = list[currentIndex];
  const theme = useTheme();

  const handleExploreClick = () => {
    if (currentIndex === 0) {
      router.push(`${paths.dashboard.quizGroup.quiz}/${list[0].id}`);
    } else if (currentIndex === 1) {
      router.push(`${paths.dashboard.voting.vote}/${list[1].id}`);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 === list.length ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [list]);

  return (
    <Card sx={{ position: 'relative', overflow: 'hidden' }}>
      <m.div
        key={currentIndex}
        initial={{ x: '100%' }} // starts from the right
        animate={{ x: '0%' }} // animates to the center
        exit={{ x: '-100%' }} // exits to the left
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <AnimatePresence mode='wait'>
          <CardMedia
            component='img'
            alt={item.title}
            height='300'
            image={item.coverUrl}
          />
        </AnimatePresence>
      </m.div>

      <Stack
        spacing={1}
        sx={{
          p: 3,
          position: 'absolute',
          color: 'common.white',
          zIndex: 1,
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
        }}
      >
        <Typography variant='overline' sx={{ color: 'primary.dark' }}>
          NOVO
        </Typography>
        <Link color='inherit' underline='none'>
          <Typography variant='h5' noWrap>
            {item.title}
          </Typography>
        </Link>
        <Typography variant='body2' noWrap>
          {item.description}
        </Typography>
        <Stack
          direction='row'
          spacing={2}
          alignItems='center'
          justifyContent='space-between'
        >
          <Button
            variant='contained'
            color='primary'
            sx={{ mt: 2 }}
            onClick={handleExploreClick}
          >
            Otvori
          </Button>
          <Stack
            spacing={1}
            direction='row'
            alignItems='center'
            justifyContent='flex-end'
            mt={1}
          >
            {list.map((_, index) => (
              <IconButton
                key={index}
                size='small'
                onClick={() => setCurrentIndex(index)}
                sx={{
                  width: 24,
                  height: 24,
                  backgroundColor:
                    currentIndex === index ? 'primary.main' : 'transparent',
                  '&:hover': {
                    backgroundColor:
                      currentIndex === index ? 'primary.main' : 'transparent',
                  },
                }}
              >
                <FiberManualRecordIcon
                  fontSize='small'
                  sx={{
                    color:
                      currentIndex === index
                        ? theme.palette.primary.contrastText
                        : 'inherit',
                  }}
                />
              </IconButton>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
