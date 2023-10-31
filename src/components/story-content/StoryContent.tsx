import React, { useState } from 'react';
import {
    Box,
    Card,
    CardMedia,
    Container,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
import MatchTable from './match-table/match-table';
import { StorySectionWrapper } from '../section-wrapper/story-wrapper';
import MatchDetails from './match-details/match-details';
import ChampionCard from './champ-card/champion-card';
import Highlight from './highlight/highlight';
import { MotionContainer, varFade } from '../animate';
import QualificationMatchDetails from './match-details/qualification-match-details';
import CircleIcon from '@mui/icons-material/Circle';
import { StoryContentProps } from 'src/types';
import ScrollableContainer from '../scrollable-container/scrollable-container';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import PeopleIcon from '@mui/icons-material/People';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import PersonIcon from '@mui/icons-material/Person';

type TabComponents = {
    Kvalifikacije?: JSX.Element;
    Prvenstvo?: JSX.Element;
    Highlights?: JSX.Element;
    Izbornik?: JSX.Element;
    Reprezentacija?: JSX.Element;
    Zanimljivosti?: JSX.Element;
    [key: string]: JSX.Element | undefined;
};


const StoryContent = ({ story }: StoryContentProps) => {
    const [currentTab, setCurrentTab] = useState(0);
    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number,) => {
        setCurrentTab(newValue);
    };
    const slideVariants = varFade();


    const getActiveTabs = (story: StoryContentProps['story']) => {
        return [
            { label: "Kvalifikacije", icon: <Box m={1}><ScheduleIcon color='error' /></Box>, active: !!story?.Qualifications || !!story?.AdditionalQualifications },
            { label: "Prvenstvo", icon: <Box m={1}><SportsSoccerIcon color='error' /> </Box>, active: !!story?.Prvenstvo },
            { label: "Highlights", icon: <Box m={1}> <VideoLibraryOutlinedIcon color='error' /> </Box>, active: !!story?.Highlights?.length },
            { label: "Izbornik", icon: <Box m={1}><PersonIcon color='error' /> </Box>, active: !!story?.Izbornik },
            { label: "Reprezentacija", icon: <Box m={1}><PeopleIcon color='error' /> </Box>, active: !!story?.Reprezentacija },
            { label: "Zanimljivosti", icon: <Box m={1}> <StarBorderIcon color='error' /> </Box>, active: !!story?.Zanimljivosti?.length }
        ].filter(tab => tab.active);
    };


    const activeTabs = getActiveTabs(story);

    const KvalifikacijeContent = ({ story }: StoryContentProps) => {
        return (
            <>
                {story?.Qualifications?.Description && story?.Prvenstvo?.Matches.GroupStage && (
                    <StorySectionWrapper title='Kvalifikacije'>
                        <Typography variant="body1">{story.Qualifications.Description}</Typography>
                        {story?.Qualifications?.Teams && <MatchTable data={story.Qualifications.Teams} />}
                    </StorySectionWrapper>
                )}
                {story?.AdditionalQualifications && (
                    <StorySectionWrapper title='Dodatne Kvalifikacije' isCollapsable={true}>
                        <QualificationMatchDetails matches={story.AdditionalQualifications} />
                    </StorySectionWrapper>
                )}
            </>
        );
    }

    const PrvenstvoContent = ({ story }: StoryContentProps) => {
        return (
            <>
                {story?.Prvenstvo?.Summary && (
                    <StorySectionWrapper title='O prvenstvu'>
                        <Typography variant="body1" mt={2}>{story?.Prvenstvo.Summary}</Typography>
                    </StorySectionWrapper>
                )}
                {story?.Prvenstvo?.Summary && (
                    <StorySectionWrapper title='Skupina' isCollapsable={true}>
                        <MatchTable data={story?.Prvenstvo.Skupina} />
                        {story?.Prvenstvo?.Matches.GroupStage && (
                            <QualificationMatchDetails matches={story?.Prvenstvo?.Matches.GroupStage.matches || []} />
                        )}
                    </StorySectionWrapper>
                )}

                {story?.Prvenstvo?.Matches?.Finals?.RoundOf16 &&
                    <StorySectionWrapper title='Osmina Finala' isCollapsable={true}>
                        <MatchDetails matchData={story?.Prvenstvo.Matches.Finals.RoundOf16} />
                    </StorySectionWrapper>
                }
                {story?.Prvenstvo?.Matches?.Finals?.QuarterFinal &&
                    <StorySectionWrapper title='Četvrt Finala' isCollapsable={true}>
                        <MatchDetails matchData={story?.Prvenstvo.Matches.Finals.QuarterFinal} />
                    </StorySectionWrapper>
                }
                {story?.Prvenstvo?.Matches.Finals?.SemiFinal &&
                    <StorySectionWrapper title='Polufinale' >
                        <MatchDetails matchData={story?.Prvenstvo.Matches.Finals.SemiFinal} />
                    </StorySectionWrapper>
                }
                {story?.Prvenstvo?.Matches.Finals?.Final &&
                    <StorySectionWrapper title='Finale'>
                        <MatchDetails matchData={story?.Prvenstvo.Matches.Finals.Final} />
                    </StorySectionWrapper>
                }
                {
                    story?.Prvenstvo?.Champ && story?.Prvenstvo?.Champ.Winner && story?.Prvenstvo?.Champ.TopScorer &&
                    <ChampionCard data={story.Prvenstvo.Champ} />
                }
            </>
        );
    }

    const HighlightContent = ({ story }: StoryContentProps) => {
        return (
            <StorySectionWrapper title='Highlights'>
                {story?.Highlights &&
                    <Grid container spacing={2}>
                        {story?.Highlights.map((highlight: { Title: string; imgUrl: string; Description: string; }, index: React.Key | null | undefined) => (
                            <Grid item xs={12} lg={6} key={index} >
                                <Highlight data={highlight} />
                            </Grid>
                        ))}
                    </Grid>
                }
            </StorySectionWrapper>

        );
    }

    const IzbornikContent = ({ story }: StoryContentProps) => {
        if (!story?.Izbornik) {
            return null;
        }
        return (
            <StorySectionWrapper title='Izbornik'>
                <Box sx={{ display: 'flex', flexDirection: ['column', 'row'], gap: '1rem' }}>
                    <Box sx={{ flex: 1, padding: '1rem', borderRadius: 2, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', bgcolor: 'background.paper' }}>
                        <Typography variant="h3" color={'primary'} component="div" mb={2}>
                            {story?.Izbornik.Name}
                        </Typography>
                        <Typography variant="body1" mb={1}>
                            <strong>Datum rođenja:</strong> {story?.Izbornik.DOB}
                        </Typography>
                        <Typography variant="body1" mb={1}>
                            <strong>Trenerska karijera:</strong> {story?.Izbornik.CoachingCareer}
                        </Typography>
                        <Typography variant="body1" mb={2}>
                            <strong>Glavna postignuća:</strong> {story?.Izbornik.MajorAchievements.join(', ')}
                        </Typography>
                    </Box>
                    <Box sx={{ flex: 1, borderRadius: 2, overflow: 'hidden', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
                        <img src={story?.Izbornik.imgUrl} alt={story?.Izbornik.Name} style={{ width: '100%' }} />
                    </Box>
                </Box>
                <Typography variant="body1" mt={2}>
                    {story?.Izbornik.StoryText}
                </Typography>
            </StorySectionWrapper>

        );
    }
    const RepkaContent = ({ story }: StoryContentProps) => {
        return (
            <StorySectionWrapper title='Reprezentacija'>
                {['Vratari', 'Branici', 'Vezni', 'Napadaci'].map(category => (
                    <Box key={category}>
                        <Typography variant="h4" my={2}>{category}</Typography>
                        <Divider sx={{ my: 2 }} />
                        <ScrollableContainer>
                            {story?.Reprezentacija && story?.Reprezentacija[category]?.map((player, index) => (
                                <Card key={index} sx={{
                                    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
                                    m: 2,
                                    minWidth: 250,
                                    borderRadius: 1
                                }}>
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        width={250}
                                        image={player.imgurl}
                                        alt={player.name}
                                        sx={{ bgcolor: 'warning.main' }}
                                    />
                                    <Typography variant="subtitle1" align="center" sx={{ p: 2 }}>
                                        {player.name}
                                    </Typography>
                                </Card>
                            ))}
                        </ScrollableContainer>
                    </Box>
                ))}
            </StorySectionWrapper>

        );
    }
    const ZanimljivostiContent = ({ story }: StoryContentProps) => {
        if (!story?.Zanimljivosti) {
            return null;
        }
        return (
            <>
                {story?.Zanimljivosti &&
                    <StorySectionWrapper title='Zanimljivosti'>
                        <List>
                            {story?.Zanimljivosti.map((fact: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
                                <ListItem key={index} >
                                    <ListItemAvatar>
                                        <CircleIcon color='error' />
                                    </ListItemAvatar>
                                    <ListItemText  >
                                        <Typography variant="h6" align="left">
                                            {fact}
                                        </Typography>
                                    </ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    </StorySectionWrapper>
                }
            </>


        );
    }



    const tabContentComponents: TabComponents = {
        "Kvalifikacije": <KvalifikacijeContent story={story} />,
        "Prvenstvo": <PrvenstvoContent story={story} />,
        "Highlights": <HighlightContent story={story} />,
        "Izbornik": <IzbornikContent story={story} />,
        "Reprezentacija": <RepkaContent story={story} />,
        "Zanimljivosti": <ZanimljivostiContent story={story} />,
    };

    return (
        <Container>
            <Grid container alignItems="center" my={2} spacing={2} justifyContent="center">
                <Grid item>
                    <img src={story?.storyLogo} alt="Logo_Prvenstva" style={{ height: '60px' }} />
                </Grid>
                <Grid item>
                    <Typography variant="h4" color={'primary'}>{story?.storyTitle}</Typography>
                </Grid>
            </Grid>
            <Tabs
                value={currentTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
            >
                {activeTabs.map((tab, index) => (
                    <Tab
                        key={index}
                        label={
                            <>
                                {tab.icon}
                                {tab.label}
                            </>
                        }
                    />
                ))}
            </Tabs>

            <MotionContainer key={currentTab} variants={slideVariants.inUp}>
                {activeTabs[currentTab] && tabContentComponents[activeTabs[currentTab].label]}

            </MotionContainer>
        </Container>
    );
};

export default StoryContent;
