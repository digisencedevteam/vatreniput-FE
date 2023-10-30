import Box from '@mui/material/Box';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';

type CarouselProps = {
  children: React.ReactElement[];
  currentIndex: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
};

export const Carousel = ({
  children,
  currentIndex,
  isMobile,
  isTablet,
  isDesktop,
}: CarouselProps) => {
  const itemsPerSlide = isMobile ? 1 : isTablet ? 3 : isDesktop ? 4 : 1;
  return (
    <Box display='flex' overflow='hidden' width={'100vw'}>
      <Box
        display='flex'
        style={{
          transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)`,
          transition: '0.5s',
          width: `${100 * itemsPerSlide}%`,
        }}
      >
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            style: {
              flex: '0 0 auto',
              width: `${100 / itemsPerSlide}%`,
            },
          });
        })}
      </Box>
    </Box>
  );
};

export const CarouselArrows = ({ setCurrentIndex, totalSlides }: any) => {
  const onNext = () =>
    setCurrentIndex((prev: number) => (prev + 1) % totalSlides);
  const onPrev = () =>
    setCurrentIndex((prev: number) => (prev - 1 + totalSlides) % totalSlides);

  return (
    <Box sx={{ px: 2 }}>
      <IconButton onClick={onPrev}>
        <ArrowBackIos />
      </IconButton>
      <IconButton onClick={onNext}>
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
};
