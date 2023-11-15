import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useSettingsContext } from 'src/components/settings';
import { Box, Grid, IconButton } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { CollectionStickerItem } from 'src/components/collection-sticker/collection-sticker-item';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import PagingComponent from 'src/components/paging/paging-component';
import useMediaQuery from '@mui/material/useMediaQuery';
import StatisticCards from 'src/components/stats-box/statistic-box';
import { LoadingScreen } from 'src/components/loading-screen';
import { SkeletonDashboardLoader } from 'src/components/skeleton-loader/skeleton-loader-dashboard';
import AppWelcome from 'src/components/overview/app-welcome';
import SeoIllustration from 'src/assets/illustrations/seo-illustration';
import useCardData from 'src/hooks/use-card-data';

export const CollectionView = () => {
  const settings = useSettingsContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const {
    collectedStatistic,
    collectedCards,
    categories,
    isLoading,
    totalPages,
    fetchCollectedCards,
  } = useCardData();

  const [categoryIndex, setCategoryIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const currentCategory = categories[categoryIndex];
  const myRef = React.useRef<HTMLDivElement>(null);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const showSkeletonLoader = isLoading;
  const showNoDataMessage = !isLoading && collectedCards.length === 0;

  useEffect(() => {
    if (categories.length > 0) {
      fetchCollectedCards(categoryIndex, currentPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, categoryIndex, categories]);

  useEffect(() => {
    if (myRef.current && !isLoading) {
      if (!isFirstVisit) {
        myRef.current.scrollIntoView();
      } else {
        setIsFirstVisit(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryIndex, isLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const handleArrowClick = (direction: string) => {
    const newIndex =
      direction === 'left'
        ? (categoryIndex - 1 + categories.length) % categories.length
        : (categoryIndex + 1) % categories.length;
    setCategoryIndex(newIndex);
    fetchCollectedCards(newIndex, currentPage);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    fetchCollectedCards(categoryIndex, page);
  };
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      {isMobile && (
        <Typography
          color={theme.palette.primary.main}
          variant='h2'
          sx={{ paddingY: 5 }}
        >
          Kolekcija
        </Typography>
      )}
      <Grid container>
        {!isMobile ? (
          <Grid
            item
            md={12}
            lg={12}
          >
            <AppWelcome
              title={`Tvoja digitalna kolekcija nezaboravnih trenutaka!`}
              description='Skupi neprocjenjive trenutke iz povijesti Vatrenih u digitalnom izdanju!'
              img={
                <SeoIllustration
                  imageUrl={
                    'https://res.cloudinary.com/dzg5kxbau/image/upload/v1695908111/vesela3_elqpvf.png'
                  }
                />
              }
            />
          </Grid>
        ) : (
          <Grid
            item
            xs={12}
            mr={3}
          >
            <StatisticCards collectedStatistic={collectedStatistic} />
          </Grid>
        )}
      </Grid>

      <div ref={myRef}>
        <Grid
          container
          spacing={1}
        >
          <Grid
            item
            xs={12}
            mt={3}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconButton
                color='primary'
                onClick={() => handleArrowClick('left')}
              >
                <ArrowLeftIcon />
              </IconButton>
              <Typography
                variant='h6'
                sx={{ mx: 4, textAlign: 'center' }}
              >
                {currentCategory?.name}
              </Typography>
              <IconButton
                color='primary'
                onClick={() => handleArrowClick('right')}
              >
                <ArrowRightIcon />
              </IconButton>
            </Box>
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
            collectedCards.map((item, index) => (
              <Grid
                key={index}
                item
                xs={4}
                sm={3}
                md={3}
                lg={2}
              >
                <CollectionStickerItem item={item} />
              </Grid>
            ))}

          {showNoDataMessage && (
            <Typography
              variant='subtitle1'
              color='text.secondary'
              textAlign='center'
              sx={{ width: '100%', mt: 2 }}
            >
              Čini se da tvoja digitalna kolekcija tek treba nastati. Oživi je
              skeniranjem QR koda s tvoje prve sličice i uživaj u ispunjavanju
              digitalnog albuma!
            </Typography>
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
      </div>
    </Container>
  );
};
