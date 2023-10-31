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
import { ZanimljivostiContent } from './story-tab-content/zanimljivosti-content';
import { KvalifikacijeContent } from './story-tab-content/kvalifikacije-content';
import { PrvenstvoContent } from './story-tab-content/prvenstvo-content';
import { HighlightContent } from './story-tab-content/highlight-content';
import { IzbornikContent } from './story-tab-content/izbornik-content';
import { RepkaContent } from './story-tab-content/repka-content';

const StoryContent = ({ story }: StoryContentProps) => {
    const [currentTab, setCurrentTab] = useState(0);
    const slideVariants = varFade();

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number,) => {
        setCurrentTab(newValue);
    };

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
