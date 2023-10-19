import React from 'react';
import { StorySection } from 'src/sections/six/view';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

interface StoryContentProps {
    sections: StorySection[];
}

const StoryContent: React.FC<StoryContentProps> = ({ sections }) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

    return (
        <Box mt={4}>
            {sections.map((section, index) => (
                <Box
                    key={index}
                    display="flex"
                    flexDirection={isDesktop ? 'row' : 'column'}
                    alignItems={isDesktop ? 'center' : 'flex-start'}
                    justifyContent={!isDesktop ? 'center' : 'flex-start'}
                    mt={index > 0 ? (isDesktop ? 4 : 2) : 0}
                >
                    {/* Image Container */}
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                    >
                        <img
                            src={section.imageUrl}
                            alt={section.title}
                            style={{
                                borderRadius: '20px',
                                maxWidth: '350',
                                width: '100%',
                                height: 'auto',
                                aspectRatio: '3/2',
                            }}
                        />
                    </Box>
                    <Box
                        ml={isDesktop ? 2 : 0}
                        mt={!isDesktop ? 2 : 0}
                        display="flex"
                        flexDirection="column"
                        alignItems={isDesktop ? 'flex-start' : 'center'}
                    >
                        <Typography variant="h5" color="error">
                            {section.title}
                        </Typography>
                        <Typography variant="body1">{section.content}</Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default StoryContent;
