import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useSettingsContext } from 'src/components/settings';
import { Box, Button, Grid, IconButton } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CollectionStickerItem from 'src/components/collection-sticker/collection-sticker-item';
import { useTheme } from '@mui/material/styles';
import CollectedStatisticWidget from './collected-statistic-widget';
import SearchCollectionItemBar from 'src/components/search-collection-item-bar/search-collection-item-bar';
import FilterCollection from 'src/components/filter-collection/filter-collection';
import SelectionStatistic from 'src/components/selection-statistic/selection-statistic';
import CollectionStatisticIllustration from 'src/assets/illustrations/collection-statistic-illustration';
import React, { useEffect, useState } from 'react';
import PagingComponent from 'src/components/paging/paging-component';
import WelcomeComponent from 'src/components/welcome-component/welcome-component';
import Vesela from 'src/assets/illustrations/vesela.png';
import useMediaQuery from '@mui/material/useMediaQuery';
import CircularProgress from '@mui/material/CircularProgress';
import axios, { endpoints } from 'src/utils/axios';
import { CollectionCard, CollectionEvent } from 'src/types';

export default function CollectionView() {
  const settings = useSettingsContext();
  const theme = useTheme();
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [collectedCards, setCollectedCards] = useState<CollectionCard[]>([]);
  const [events, setEvents] = useState<CollectionEvent[]>([]);
  const [totalCardCount, setTotalCardCount] = useState<number>(0);
  const [categories, setCategories] = useState<CollectionEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
  const currentCategory = categories[categoryIndex];
  const itemsPerPage = 6;
  const totalPages = Math.ceil(totalCardCount / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(endpoints.event.all);
      const myCards = { _id: 9, name: 'Skupljene slicice', }
      setCategories([myCards, ...response.data]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching categories' + error);
      setCategories([]);
      setIsLoading(false);
    }
  };

  const fetchCollectedCategoryCards = async () => {
    try {
      const response = await axios.get(`${endpoints.card.collected}`);
      return response.data as CollectionEvent[];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const fetchCollectedCards = async () => {
    try {
      let response;
      console.log(categoryIndex)
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
        setCollectedCards(response.data.cards);
      }
    } catch (error) {
      console.error(error);
      setCollectedCards([]);
    }
  };

  useEffect(() => {
    fetchCategories()
      .then(() => {
        console.log('Categories fetched:', categories);
        return fetchCollectedCategoryCards();
      })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      fetchCollectedCards();
    }
  }, [currentPage, categoryIndex, categories]);

  if (isLoading) {
    return <CircularProgress />;
  }

  const handleArrowClick = (direction: string) => {
    if (categories.length > 0) {
      console.log(
        'Before handleArrowClick - currentCategory:',
        currentCategory
      );

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
        variant='h3'
        sx={{ paddingY: 5 }}
      >
        Kolekcija
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <React.Fragment>
          {!isMobile && (
            <Grid item md={7}>
              <WelcomeComponent
                title={`Pozdrav 👋`}
                description='Dobrodošli natrag na svoju kolekciju. Pogledaj koje imaš i koji ti još nedostaju kako bi ih skupio sve!'
                img={<img src={Vesela} alt='Vesela' />}
                action={
                  <Button variant='contained' color='primary'>
                    Istraži
                  </Button>
                }
              />
            </Grid>
          )}

          <Grid item xs={12} md={5}>
            <Box
              sx={{
                display: 'flex',
                height: { md: '100%' },
                overflowX: 'auto',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              }}
            >
              <CollectedStatisticWidget
                chart={{
                  series: [
                    { label: 'Ukupno Skupljenih', percent: 36, total: 86 },
                    // { label: 'Pending for payment', percent: 64, total: 400 },
                  ],
                }}
                sx={{
                  flex: '0 0 auto',
                  paddingRight: { xs: 1, md: theme.spacing(5) },
                  marginRight: { xs: 1, md: theme.spacing(1) },
                  height: '100%',
                }}
              />
              <SelectionStatistic
                title='još do otključavanja'
                total={78}
                icon={<CollectionStatisticIllustration />}
                sx={{
                  flex: '0 0 auto',
                  paddingRight: { xs: theme.spacing(2), md: theme.spacing(2) },
                  marginRight: { xs: theme.spacing(2), md: theme.spacing(2) },
                }}
              />
            </Box>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={8}>
              <SearchCollectionItemBar />
            </Grid>
            <Grid item xs={4}>
              <FilterCollection />
            </Grid>
            <Grid item xs={12}>
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
                  <Typography variant='subtitle1' sx={{ mx: 2 }}>
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
                <CircularProgress />
              )}
            </Grid>

            {collectedCards.slice(startIndex, endIndex).map((item) => (
              <Grid key={item._id} item xs={6} md={3} lg={2}>
                <CollectionStickerItem item={item} />
              </Grid>
            ))}
          </Grid>
          <PagingComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </React.Fragment>
      )}
    </Container>
  );
}
