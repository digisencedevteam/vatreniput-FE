import React, { useState } from 'react';
import { Avatar, Box, Card, CardMedia, Container, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Modal, Tab, Tabs, Typography, useTheme } from '@mui/material';
import MatchTable from './match-table/match-table';
import { StorySectionWrapper } from '../section-wrapper/story-wrapper';
import MatchDetails from './match-details/match-details';
import ChampionCard from './champ-card/champion-card';
import Highlight from './highlight/highlight';

import { MotionContainer, varFade } from '../animate';
import QualificationMatchDetails from './match-details/qualification-match-details';
import StarRateIcon from '@mui/icons-material/StarRate';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { StoryContentProps } from 'src/types';

const StoryContent = ({ story }: StoryContentProps) => {
    const [currentTab, setCurrentTab] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setCurrentTab(newValue);
    };

    const theme = useTheme();

    function TabOneContent({ story }: StoryContentProps) {
        return (
            <>
                {story?.Prvenstvo?.Summary && (
                    <StorySectionWrapper title='O prvenstvu'>
                        <Typography variant="body1" mt={2}>{story?.Prvenstvo.Summary}</Typography>
                    </StorySectionWrapper>
                )}
                {story?.Prvenstvo?.Summary && (
                    <StorySectionWrapper title='Skupina'>
                        <MatchTable data={story?.Prvenstvo.Skupina} />
                    </StorySectionWrapper>
                )}

                {story?.Prvenstvo?.Matches?.Finals?.RoundOf16 &&
                    <StorySectionWrapper title='Osmina Finala' isCollapsable={true}>
                        <MatchDetails matchData={story?.Prvenstvo.Matches.Finals.RoundOf16} />
                    </StorySectionWrapper>
                }


                {story?.Prvenstvo?.Matches?.Finals?.QuarterFinal &&
                    <StorySectionWrapper title='Cetvrt Finala' isCollapsable={true}>
                        <MatchDetails matchData={story?.Prvenstvo.Matches.Finals.QuarterFinal} />
                    </StorySectionWrapper>
                }

                {story?.Prvenstvo?.Matches.Finals?.SemiFinal &&
                    <StorySectionWrapper title='Polu Finale' >
                        <MatchDetails matchData={story?.Prvenstvo.Matches.Finals.SemiFinal} />
                    </StorySectionWrapper>
                }

                {story?.Prvenstvo?.Matches.Finals?.Final &&
                    <StorySectionWrapper title='Finale'>
                        <MatchDetails matchData={story?.Prvenstvo.Matches.Finals.Final} />
                    </StorySectionWrapper>
                }
                {story?.Prvenstvo?.Champ && <ChampionCard data={story?.Prvenstvo.Champ} />}

            </>
        );
    }

    const handleOpenModal = (index: number) => {
        setCurrentImageIndex(index);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex: number) => (prevIndex + 1) % (story?.Reprezentacija?.galleryImages?.length || 1));
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex: number) => (prevIndex - 1 + (story?.Reprezentacija?.galleryImages?.length || 1)) % (story?.Reprezentacija?.galleryImages?.length || 1));
    };



    const slideVariants = varFade();
    return (
        <Container>
            <Grid container alignItems="center" my={2} spacing={2} justifyContent="center">
                <Grid item>
                    <img src={story?.storyLogo} alt="Logo_Prvenstva" style={{ height: '60px' }} />
                </Grid>
                <Grid item>
                    <Typography variant="h2" color={'primary'}>{story?.storyTitle}</Typography>
                </Grid>
            </Grid>            <Tabs
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
                {currentTab === 0 && (
                    <>
                        {story?.Qualifications?.Description && (
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
                )}

                {currentTab === 1 &&

                    <TabOneContent story={story} />
                }

                {currentTab === 2 && (

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
                )}

                {currentTab === 3 && story?.Izbornik && (
                    <StorySectionWrapper title='Izbornik'>

                        <Box sx={{ display: 'flex', flexDirection: ['column', 'row'], gap: '1rem' }}>
                            <Box sx={{ flex: 1, padding: '1rem', borderRadius: 2, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', bgcolor: theme.palette.background.paper }}>
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

                )}
                {currentTab === 4 && (
                    <StorySectionWrapper title='Reprezentacija'>
                        <Grid container spacing={2}>
                            {story?.Reprezentacija?.galleryImages.map((imgUrl: string | undefined, index: number) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                    <Card onClick={() => handleOpenModal(index)}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={imgUrl}
                                            alt={`Gallery image ${index + 1}`}
                                        />
                                    </Card>

                                </Grid>
                            ))}
                        </Grid>
                        <Modal
                            open={openModal}
                            onClose={handleCloseModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"

                        >
                            <Box sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                bgcolor: 'background.paper',
                                boxShadow: 24,
                                p: 4,
                                width: '100%',
                                maxWidth: 800

                            }}>
                                {story?.Reprezentacija?.galleryImages[currentImageIndex] && (
                                    <img
                                        src={story.Reprezentacija.galleryImages[currentImageIndex]}
                                        alt={`Gallery image ${currentImageIndex + 1}`}
                                        style={{ width: '100%', cursor: 'pointer' }}
                                    />
                                )}
                                <IconButton onClick={handlePrevImage}><NavigateBeforeIcon /></IconButton>
                                <IconButton onClick={handleNextImage}><NavigateNextIcon /></IconButton>
                            </Box>
                        </Modal>
                    </StorySectionWrapper>
                )}
                {currentTab === 5 && story?.Zanimljivosti && (
                    <StorySectionWrapper title='Zanimljivosti'>
                        <List>
                            {story?.Zanimljivosti.map((fact: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
                                <ListItem key={index} >
                                    <ListItemAvatar>
                                        <Avatar>
                                            <StarRateIcon />
                                        </Avatar>
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
                )}
            </MotionContainer>


        </Container>
    );
};

export default StoryContent;
