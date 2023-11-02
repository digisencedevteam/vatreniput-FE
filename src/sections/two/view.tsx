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
import WelcomeComponent from 'src/components/welcome-component/welcome-component';
import Vesela from 'src/assets/illustrations/vesela3.png';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios, { endpoints } from 'src/utils/axios';
import { CollectedStatistic, CollectionCard, CollectionEvent } from 'src/types';
import HorizontalScrollStatisticCards from 'src/components/stats-box/statistic-box-horizontal';
import StatisticCards from 'src/components/stats-box/statistic-box';
import { LoadingScreen } from 'src/components/loading-screen';

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
  const itemsPerPage = 9;
  const [collectedStatistic, setCollectedStatistic] =
    useState<CollectedStatistic | null>(null);
  const myRef = React.useRef<HTMLDivElement>(null);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);

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
      <Typography
        color={theme.palette.primary.main}
        variant='h2'
        sx={{ paddingY: 5 }}
      >
        Kolekcija
      </Typography>

      <Grid container spacing={1}>
        {!isMobile && (
          <Grid item xs={12} md={7}>
            <WelcomeComponent
              title={`Tvoja digitalna kolekcija nezaboravnih trenutaka!`}
              description='Skupi neprocjenjive trenutke iz povijesti Vatrenih u digitalnom izdanju!'
              img={<img src={Vesela} alt='Vesela' />}
            />
          </Grid>
        )}

        <Grid item xs={12} md={5}>
          {isMobile ? (
            <HorizontalScrollStatisticCards
              collectedStatistic={collectedStatistic}
            />
          ) : (
            <StatisticCards collectedStatistic={collectedStatistic} />
          )}
        </Grid>
      </Grid>
      <div ref={myRef}>
        <Grid container spacing={1}>
          <Grid item xs={12} mt={3}>
            {currentCategory ? (
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
                <Typography variant='h6' sx={{ mx: 4, textAlign: 'center' }}>
                  {currentCategory.name}
                </Typography>
                <IconButton
                  color='primary'
                  onClick={() => handleArrowClick('right')}
                >
                  <ArrowRightIcon />
                </IconButton>
              </Box>
            ) : (
              <LoadingScreen />
            )}
          </Grid>
          {isCategoryLoading ? (
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <LoadingScreen />
            </Grid>
          ) : (
            collectedCards.map((item, index) => (
              <Grid key={index} item xs={4} sm={3} md={3} lg={2}>
                <CollectionStickerItem item={item} />
              </Grid>
            ))
          )}
        </Grid>
        {collectedCards.length > 0 && (
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
