import React, { useState } from 'react';
import {
    Box,
    Container,
    Grid,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
import { MotionContainer, varFade } from '../animate';
import { StoryContentProps, TabComponents } from 'src/types';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import PeopleIcon from '@mui/icons-material/People';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import PersonIcon from '@mui/icons-material/Person';
import { FactContent } from './story-tab-content/facts-content';
import { QualificationsContent } from './story-tab-content/qualifications-content';
import { ChampionshipContent } from './story-tab-content/championship-content';
import { HighlightContent } from './story-tab-content/highlight-content';
import { CoachContent } from './story-tab-content/coach-content';
import { NationalTeamContent } from './story-tab-content/national-team-content';

const StoryContent = ({ story }: StoryContentProps) => {
    const [currentTab, setCurrentTab] = useState(0);
    const slideVariants = varFade();

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number,) => {
        setCurrentTab(newValue);
    };

    const getActiveTabs = (story: StoryContentProps['story']) => {
        return [
            { label: "Kvalifikacije", icon: <Box m={1}><ScheduleIcon color='error' /></Box>, active: !!story?.Qualifications || !!story?.AdditionalQualifications },
            { label: "Prvenstvo", icon: <Box m={1}><SportsSoccerIcon color='error' /> </Box>, active: !!story?.Championship },
            { label: "Highlights", icon: <Box m={1}> <VideoLibraryOutlinedIcon color='error' /> </Box>, active: !!story?.Highlights?.length },
            { label: "Izbornik", icon: <Box m={1}><PersonIcon color='error' /> </Box>, active: !!story?.Coach },
            { label: "Reprezentacija", icon: <Box m={1}><PeopleIcon color='error' /> </Box>, active: !!story?.NationalTeam },
            { label: "Zanimljivosti", icon: <Box m={1}> <StarBorderIcon color='error' /> </Box>, active: !!story?.Zanimljivosti?.length }
        ].filter(tab => tab.active);
    };
    const activeTabs = getActiveTabs(story);

    const tabContentComponents: TabComponents = {
        "Kvalifikacije": <QualificationsContent story={story} />,
        "Prvenstvo": <ChampionshipContent story={story} />,
        "Highlights": <HighlightContent story={story} />,
        "Izbornik": <CoachContent story={story} />,
        "Reprezentacija": <NationalTeamContent story={story} />,
        "Zanimljivosti": <FactContent story={story} />,
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
                sx={{
                    width: '105%',
                    marginLeft: '-2.5%',
                    marginRight: '-2.5%',
                }}
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
        </Container >
    );
};

export default StoryContent;
