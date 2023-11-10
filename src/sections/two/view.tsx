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
import axios, { endpoints } from 'src/utils/axios';
import { CollectedStatistic, CollectionCard, CollectionEvent } from 'src/types';
import StatisticCards from 'src/components/stats-box/statistic-box';
import { LoadingScreen } from 'src/components/loading-screen';
import { SkeletonDashboardLoader } from 'src/components/skeleton-loader/skeleton-loader-dashboard';
import AppWelcome from 'src/components/overview/app-welcome';
import SeoIllustration from 'src/assets/illustrations/seo-illustration';

export const CollectionView = () => {
  const settings = useSettingsContext();
  const theme = useTheme();
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [collectedCards, setCollectedCards] = useState<CollectionCard[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [categories, setCategories] = useState<CollectionEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
  const currentCategory = categories[categoryIndex];
  const itemsPerPage = 12;
  const [collectedStatistic, setCollectedStatistic] =
    useState<CollectedStatistic | null>(null);
  const myRef = React.useRef<HTMLDivElement>(null);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const showSkeletonLoader = isCategoryLoading || isLoading;
  const showNoDataMessage =
    !isCategoryLoading && !isLoading && collectedCards.length === 0;

  const fetchCategories = async () => {
    try {
      const response = await axios.get(endpoints.event.all);
      const myCards = { _id: 9, name: 'Moje Skupljene sličice' };
      setCategories([myCards, ...response.data]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching categories' + error);
      setCategories([]);
      setIsLoading(false);
    }
  };

  const fetchCollectedCards = async () => {
    setIsCategoryLoading(true);
    try {
      let response;
      if (categoryIndex === 0) {
        response = await axios.get(
          `${endpoints.card.collected}?page=${currentPage}&limit=${itemsPerPage}`
        );
      } else {
        const categoryId = categories[categoryIndex]?._id;
        if (categoryId) {
          response = await axios.get(
            `${endpoints.card.event}/${categoryId}?page=${currentPage}&limit=${itemsPerPage}`
          );
        }
      }
      if (response) {
        const totalPages = Math.ceil(response.data.totalCount / itemsPerPage);
        setTotalPages(totalPages);
        setCollectedCards(response.data.cards);
        setIsDataLoaded(true);
      }
    } catch (error) {
      console.error(error);
      setCollectedCards([]);
    }
    setIsCategoryLoading(false);
  };

  const fetchCollectedStatistic = async () => {
    try {
      const response = await axios.get(endpoints.card.stats);
      setCollectedStatistic(response.data);
    } catch (error) {
      console.error('Error fetching collected statistic: ' + error);
      setCollectedStatistic(null);
    }
  };

  useEffect(() => {
    fetchCategories()
      .then(() => {
        fetchCollectedStatistic();
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      fetchCollectedCards();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, categoryIndex, categories]);

  useEffect(() => {
    if (myRef.current && isDataLoaded) {
      if (!isFirstVisit) {
        myRef.current.scrollIntoView();
      } else {
        setIsFirstVisit(false);
      }
      setIsDataLoaded(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryIndex, isDataLoaded]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const handleArrowClick = (direction: string) => {
    setIsCategoryLoading(true);
    setCollectedCards([]);
    if (categories.length > 0) {
      setCurrentPage(1);
      if (direction === 'left') {
        setCategoryIndex(
          (prevIndex) => (prevIndex - 1 + categories.length) % categories.length
        );
      } else if (direction === 'right') {
        setCategoryIndex((prevIndex) => (prevIndex + 1) % categories.length);
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
          sx={{ paddingY: 5 }}
        >
          Kolekcija
        </Typography>
      )}
      <Grid container>
        {!isMobile ? (
          <Grid item>
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
          <Grid item>
            <StatisticCards collectedStatistic={collectedStatistic} />
          </Grid>
        )}

        {/* <Grid
          item
          xs={12}
          md={5}
        >
          <StatisticCards collectedStatistic={collectedStatistic} />
        </Grid> */}
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
