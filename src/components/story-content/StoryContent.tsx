import React, { useState } from 'react';
import { Box, Container, Grid, List, ListItem, ListItemText, Tab, Tabs, Typography, useTheme } from '@mui/material';
import MatchTable from './match-table/match-table';
import { StorySectionWrapper } from '../section-wrapper/story-wrapper';
import MatchDetails from './match-details/match-details';
import ChampionCard from './champ-card/champion-card';
import Highlight from './highlight/highlight';
import { StoryContentProps } from 'src/types';
import { MotionContainer, varFade, varSlide } from '../animate';



const StoryContent = ({ story }: StoryContentProps) => {
    const [currentTab, setCurrentTab] = useState(0);
    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setCurrentTab(newValue);
    };

    const theme = useTheme();

    function TabOneContent({ story }: StoryContentProps) {
        return (
            <>
                <StorySectionWrapper title='O prvenstvu'>
                    <Typography variant="body1" mt={2}>{story?.Prvenstvo.Summary}</Typography>
                </StorySectionWrapper>

                <StorySectionWrapper title='Skupina'>
                    <MatchTable data={story?.Prvenstvo.Skupina} />
                </StorySectionWrapper>

                {story?.Prvenstvo.Matches.Finals.RoundOf16 &&
                    <StorySectionWrapper title='Osmina Finala' isCollapsable={true}>
                        <MatchDetails matchData={story?.Prvenstvo.Matches.Finals.RoundOf16} />
                    </StorySectionWrapper>
                }

                {story?.Prvenstvo.Matches.Finals.QuarterFinal &&
                    <StorySectionWrapper title='Cetvrt Finala' isCollapsable={true}>
                        <MatchDetails matchData={story?.Prvenstvo.Matches.Finals.QuarterFinal} />
                    </StorySectionWrapper>
                }

                {story?.Prvenstvo.Matches.Finals.SemiFinal &&
                    <StorySectionWrapper title='Polu Finale' >
                        <MatchDetails matchData={story?.Prvenstvo.Matches.Finals.SemiFinal} />
                    </StorySectionWrapper>
                }

                {story?.Prvenstvo.Matches.Finals.Final &&
                    <StorySectionWrapper title='Finale'>
                        <MatchDetails matchData={story?.Prvenstvo.Matches.Finals.Final} />
                    </StorySectionWrapper>
                }

                <ChampionCard data={story?.Prvenstvo.Champ} />
            </>
        );
    }

    const slideVariants = varFade();
    return (
        <Container>
            <Typography variant="h2" color={'primary'} textAlign={'center'} mt={4} mb={2}>{story?.storyTitle}</Typography>
            <Tabs
                centered
                value={currentTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
            >
                <Tab label="Kvalifikacije" />
                <Tab label="Prvenstvo" />
                <Tab label="Highlights" />
                <Tab label="Izbornik" />
                <Tab label="Reprezentacija" />
                <Tab label="Zanimljvosti" />
            </Tabs>

            {/* TODO: MAKE COMPONONETS FOR IZBORNIK AND ZANIMLJIVOSTI, CHECK FOR HIGHLIGHT IF TEXT IS CONNECTED TO THE IMAGE, IMPLEMENT GALLERY TAB */}
            <MotionContainer key={currentTab} variants={slideVariants.inUp}>
                {currentTab === 0 &&
                    (
                        <StorySectionWrapper title='Kvalifikacije'>
                            <Typography variant="body1">{story?.Qualifications.Description}</Typography>
                            <MatchTable data={story?.Qualifications.Teams} /> </StorySectionWrapper>
                    )}

                {currentTab === 1 &&

                    <TabOneContent story={story} />
                }

                {currentTab === 2 && (

                    <StorySectionWrapper title='Highlights'>
                        <Grid container spacing={2}>
                            {story?.Highlights.map((highlight: { Title: string; imgUrl: string; Description: string; }, index: React.Key | null | undefined) => (
                                <Grid item xs={12} lg={6}>
                                    <Highlight key={index} data={highlight} />
                                </Grid>
                            ))}
                        </Grid>
                    </StorySectionWrapper>
                )}

                {currentTab === 3 && (
                    <StorySectionWrapper title='Izbornik'>

                        <Box sx={{ display: 'flex', flexDirection: ['column', 'row'], gap: '1rem' }}>
                            <Box sx={{ flex: 1, padding: '1rem', borderRadius: 2, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', bgcolor: theme.palette.background.paper }}>
                                <Typography variant="h5" color={'primary'} component="div" mb={2}>
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

                )}
                {currentTab === 4 && (
                    <StorySectionWrapper title='Reprezentacija'>

                    </StorySectionWrapper>
                )}
                {currentTab === 5 && (
                    <StorySectionWrapper title='Zanimljivosti'>
                        <List>
                            {story?.Zanimljivosti.map((fact: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
                                <ListItem key={index}>
                                    <ListItemText primary={fact} />
                                </ListItem>
                            ))}
                        </List>
                    </StorySectionWrapper>
                )}
            </MotionContainer>


        </Container>
    );
};

export default StoryContent;
