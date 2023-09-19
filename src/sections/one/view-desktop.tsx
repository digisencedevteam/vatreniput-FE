import { Box, Button, Container, Grid, useTheme } from '@mui/material';
import WelcomeComponent from 'src/components/welcome-component/welcome-component';
import Vesela from 'src/assets/illustrations/vesela.png';
import CollectionStickerItem from 'src/components/collection-sticker/collection-sticker-item';
import ScrollableContainer from 'src/components/scrollable-container/scrollable-container';
import { DashboardSectionWrapper } from 'src/components/section-wrapper/dashboard-section-wrapper';
import VotingOverview from 'src/components/voting-overview/voting-overview';
import CustomCard from 'src/components/custom-card/custom-card';
import CustomCardSmall from 'src/components/custom-card/custom-card-small';
import StatisticCards from 'src/components/stats-box/statistic-box';
import useCardData from 'src/hooks/use-card-data';
import AppFeatured from 'src/components/feautred-carousel/app-featured';

type Props = {};

export const DesktopViewOne = (props: Props) => {
    const theme = useTheme();
    const { collectedStatistic, collectedCards } = useCardData();

    const hardcodedData = [
        { label: 'Prica', value: 60, totalAmount: 6000 },
        { label: 'Prica5', value: 40, totalAmount: 4000 },
        { label: 'Prica 2', value: 20, totalAmount: 2000 },
        { label: 'Prica 3', value: 40, totalAmount: 4000 },
    ];

    const featuredAppsList = [
        {
            id: '1',
            title: 'App 1',
            coverUrl: 'assets/images/mandzukicPerisic.jpg',
            description: 'Novi Kviz je dostupan',
        },
        {
            id: '2',
            title: 'App 2',
            coverUrl: 'assets/images/doha_medalje.png',
            description: 'Description for App 2',
        },
    ];


    return (
        <Container>
            <Grid container spacing={3} >
                <Grid item xs={8}>
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
                <Grid item xs={4} md={4}>
                    <AppFeatured list={featuredAppsList} />

                </Grid>
            </Grid>

            <Grid container spacing={3} >
                <Grid item xs={8} md={7} >
                    <DashboardSectionWrapper title={'Kolekcija'} link='dashboard/two'>
                        <ScrollableContainer>
                            {collectedCards.map((item, index) => (
                                <Box key={index} sx={{ flex: '0 0 auto', width: '60%', maxWidth: '175px', height: '300px', m: 1 }}>
                                    <CollectionStickerItem item={item} />
                                </Box>
                            ))}
                        </ScrollableContainer>
                    </DashboardSectionWrapper>
                </Grid>
                <Grid item xs={4} md={5} mt={2}>
                    <StatisticCards collectedStatistic={collectedStatistic} />

                </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ justifyContent: 'center', alignContent: 'center' }}>
                <Grid
                    item
                    md={4.9}
                    sx={{
                        borderRadius: 2,
                        bgcolor: theme.palette.background.neutral,
                        m: '4px'

                    }}
                >
                    <DashboardSectionWrapper title='Zadnje otkljucana prica' link='dashboard/five'>
                        <CustomCard imgUrl='assets/images/vrsaljkoZastava.jpg' cardText='text' linkTo='dashboard/six' />
                    </DashboardSectionWrapper>
                </Grid>

                <Grid
                    item
                    xs={6.9}
                    sx={{
                        borderRadius: 2,
                        bgcolor: theme.palette.background.default,
                        w: '100%',
                        m: '4px',

                    }}
                >
                    <DashboardSectionWrapper title='Ispunjenost prica' link='dashboard/five' >
                        <VotingOverview data={hardcodedData} />
                    </DashboardSectionWrapper>
                </Grid>
            </Grid>

            <Grid container spacing={3} mt={3} sx={{ justifyContent: 'center' }}>
                <Grid
                    item
                    xs={5.9}
                    sx={{
                        borderRadius: 2,
                        bgcolor: theme.palette.background.neutral,
                        m: '4px'

                    }}
                >
                    <DashboardSectionWrapper title='Kvizovi' link='dashboard/three'>
                        <Grid container spacing={2}>
                            {
                                Array.from({ length: 4 }).map((_, index) => (
                                    <Grid item md={6} key={index}>
                                        <CustomCardSmall
                                            imgUrl={'assets/images/navijaci.jpg'}
                                            cardText={`Dummy text ${index + 1}`}
                                            linkTo={`dashboard/dummyLink${index + 1}`}
                                        />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </DashboardSectionWrapper>
                </Grid>

                <Grid
                    item
                    md={5.9}
                    sx={{
                        borderRadius: 2,
                        bgcolor: theme.palette.background.neutral,
                        w: '100%',
                        m: '4px'
                    }}
                >
                    <DashboardSectionWrapper title='Glasanja' link='dashboard/five'>
                        <CustomCard imgUrl='assets/images/lovrenModric.jpg' cardText='text' linkTo='dashboard/six' />
                    </DashboardSectionWrapper>
                </Grid>
            </Grid>

        </Container>
    );
}
