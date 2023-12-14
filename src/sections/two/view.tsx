import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useSettingsContext } from 'src/components/settings';
import { Box, Divider, Grid, IconButton } from '@mui/material';
import { CollectionStickerItem } from 'src/components/collection-sticker/collection-sticker-item';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState, useRef } from 'react';
import PagingComponent from 'src/components/paging/paging-component';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SkeletonDashboardLoader } from 'src/components/skeleton-loader/skeleton-loader-dashboard';
import AppWelcome from 'src/components/overview/app-welcome';
import SeoIllustration from 'src/assets/illustrations/seo-illustration';
import useCardData from 'src/hooks/use-card-data';
import ArrowCircleLeftSharpIcon from '@mui/icons-material/ArrowCircleLeftSharp';
import ArrowCircleRightSharpIcon from '@mui/icons-material/ArrowCircleRightSharp';

export const CollectionView = () => {
  const settings = useSettingsContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const {
    collectedCards,
    categories,
    isLoading,
    totalPages,
    fetchCollectedCards,
  } = useCardData();
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const currentCategory = categories[categoryIndex];
  const showSkeletonLoader = isLoading;
  const showNoDataMessage = !isLoading && collectedCards.length === 0;
  const titleRef = useRef<HTMLDivElement | null>(null);
  const itemsToShow = isMobile ? 9 : collectedCards.length;

  useEffect(() => {
    if (categories.length > 0) {
      fetchCollectedCards(categoryIndex, currentPage);
    }
  }, [categoryIndex, currentPage, categories.length]);

  const handleArrowClick = (direction: string) => {
    const newIndex =
      direction === 'left'
        ? (categoryIndex - 1 + categories.length) % categories.length
        : (categoryIndex + 1) % categories.length;
    setCategoryIndex(newIndex);
    setCurrentPage(1);

    const titleElement = titleRef.current;
    if (titleElement) {
      if (!isMobile) {
        titleElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      {isMobile && (
        <Typography
          color={theme.palette.primary.main}
          variant='h2'
          sx={{ paddingY: 1 }}
        >
          Kolekcija
        </Typography>
      )}
      <Grid container>
        {!isMobile && (
          <Grid item md={12} lg={12}>
            <AppWelcome
              title={`Digitalna kolekcija legendarnih Vatrenih trenutaka!`}
              description='Otključaj vremensku kapsulu i skupi digitalne sličice koje oživljavaju nezaboravne trenutke Vatrenih. Svaka sličica je prozor u povijest, priča o slavi i strasti. Stvori svoju jedinstvenu kolekciju i podijeli je s prijateljima!'
              img={
                <SeoIllustration
                  imageUrl={
                    'https://res.cloudinary.com/dzg5kxbau/image/upload/v1695908111/vesela3_elqpvf.png'
                  }
                />
              }
            />
          </Grid>
        )}
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} mt={3}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: isMobile ? 3 : 5,
            }}
          >
            <IconButton
              color='inherit'
              onClick={() => handleArrowClick('left')}
            >
              <ArrowCircleLeftSharpIcon sx={{ width: 40, height: 40 }} />
            </IconButton>
            <div ref={titleRef}>
              <Typography variant='h6' sx={{ mx: 4, textAlign: 'center' }}>
                {currentCategory?.name}
              </Typography>
            </div>
            <IconButton
              color='inherit'
              onClick={() => handleArrowClick('right')}
            >
              <ArrowCircleRightSharpIcon sx={{ width: 40, height: 40 }} />
            </IconButton>
          </Box>
          <Divider />
        </Grid>
        {showSkeletonLoader && (
          <SkeletonDashboardLoader
            isMobileCount={9}
            maxWidth={isMobile ? '90px' : '200px'}
            isTabletCount={4}
            count={12}
          />
        )}
        {!showSkeletonLoader &&
          collectedCards.slice(0, itemsToShow).map((item, index) => (
            <Grid key={index} item xs={4} sm={3} md={3} lg={2}>
              <CollectionStickerItem item={item} />
            </Grid>
          ))}
        {showNoDataMessage && (
          <SkeletonDashboardLoader
            message='Čini se da tvoja digitalna kolekcija tek treba nastati. Oživi je skeniranjem QR koda s tvoje prve sličice i uživaj u ispunjavanju digitalnog albuma!'
            count={6}
            isMobileCount={3}
            isTabletCount={4}
            maxWidth={isMobile ? '90px' : '200px'}
          />
        )}
      </Grid>
      {!showSkeletonLoader &&
        !showNoDataMessage &&
        collectedCards.length > 0 && (
          <PagingComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
    </Container>
  );
};
