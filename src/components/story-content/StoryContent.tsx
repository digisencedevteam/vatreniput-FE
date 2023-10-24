import React, { useState } from 'react';
import { Box, Container, List, ListItem, ListItemText, Tab, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material';
import MatchTable from './match-table/MatchTable';
import { StorySectionWrapper } from '../section-wrapper/story-wrapper';
import MatchDetails from './match-details/match-details';
import ChampionCard from './champ-card/champion-card';
import Highlight from './highlight/highlight';

interface StoryContentProps {
    story?: any,
    storyPrvenstvo?: any
}

const StoryContent: React.FC<StoryContentProps> = ({ story }) => {
    const [currentTab, setCurrentTab] = useState(0);
    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setCurrentTab(newValue);
    };
    const storyPrvenstvo = story.Prvenstvo.Matches.Finals;

    function TabOneContent({ story, storyPrvenstvo }: StoryContentProps) {
        return (
            <>
                <StorySectionWrapper title='O prvenstvu'>
                    <Typography variant="body1" mt={2}>{story.Prvenstvo.Summary}</Typography>
                </StorySectionWrapper>

                <StorySectionWrapper title='Skupina'>
                    <MatchTable data={story.Prvenstvo.Skupina} />
                </StorySectionWrapper>

                {storyPrvenstvo.RoundOf16 &&
                    <StorySectionWrapper title='Osmina Finala' isCollapsable={true}>
                        <MatchDetails matchData={storyPrvenstvo.RoundOf16} />
                    </StorySectionWrapper>
                }

                {storyPrvenstvo.QuarterFinal &&
                    <StorySectionWrapper title='Cetvrt Finala' isCollapsable={true}>
                        <MatchDetails matchData={storyPrvenstvo.QuarterFinal} />
                    </StorySectionWrapper>
                }

                {storyPrvenstvo.SemiFinal &&
                    <StorySectionWrapper title='Polu Finale' >
                        <MatchDetails matchData={storyPrvenstvo.SemiFinal} />
                    </StorySectionWrapper>
                }

                {storyPrvenstvo.Final &&
                    <StorySectionWrapper title='Finale'>
                        <MatchDetails matchData={storyPrvenstvo.Final} />
                    </StorySectionWrapper>
                }

                <ChampionCard data={story.Prvenstvo.Champ} />
            </>
        );
    }


    return (
        <Container>
            <Typography variant="h2" color={'primary'} mt={2} mb={1}>{story.storyTitle}</Typography>
            <Typography variant="body1">{story.Qualifications.Description}</Typography>
            <Tabs
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

            {currentTab === 0 &&
                (<StorySectionWrapper title='Kvalifikacije'>
                    <MatchTable data={story.Qualifications.Teams} /> </StorySectionWrapper>)}

            {currentTab === 1 && <TabOneContent story={story} storyPrvenstvo={storyPrvenstvo} />}

            {currentTab === 2 && (
                <StorySectionWrapper title='Highlights'>
                    {story.Highlights.map((highlight: { Title: string; imgUrl: string; Description: string; }, index: React.Key | null | undefined) => (
                        <Highlight key={index} data={highlight} />
                    ))}
                </StorySectionWrapper>
            )}

            {currentTab === 3 && (
                <StorySectionWrapper title='Izbornik'>
                    <Typography variant="h5" component="div" mb={2}>
                        {story.Izbornik.Name}
                    </Typography>
                    <Typography variant="body1" mb={1}>
                        <strong>Datum rođenja:</strong> {story.Izbornik.DOB}
                    </Typography>
                    <Typography variant="body1" mb={1}>
                        <strong>Trenerska karijera:</strong> {story.Izbornik.CoachingCareer}
                    </Typography>
                    <Typography variant="body1" mb={2}>
                        <strong>Glavna postignuća:</strong> {story.Izbornik.MajorAchievements.join(', ')}
                    </Typography>
                    <Box sx={{ borderRadius: 20, my: 2, border: '2px solid #000' }}>
                        <img src={story.Izbornik.imgUrl} alt={story.Izbornik.Name} style={{ width: '100%', }} />
                    </Box>
                    <Typography variant="body1" mt={2}>
                        {story.Izbornik.StoryText}
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
                        {story.Zanimljivosti.map((fact: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
                            <ListItem key={index}>
                                <ListItemText primary={fact} />
                            </ListItem>
                        ))}
                    </List>
                </StorySectionWrapper>
            )}


        </Container>
    );
};

export default StoryContent;
