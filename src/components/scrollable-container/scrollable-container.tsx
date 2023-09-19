import React, { useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

type ScrollableContainerProps = {
    children: React.ReactNode;
};

const ScrollableContainer = ({ children }: ScrollableContainerProps) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -200,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 200,
                behavior: 'smooth',
            });
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', overflowY: 'hidden' }}>
            <IconButton onClick={scrollLeft} sx={{ '@media (max-width: 600px)': { display: 'none' } }}>
                <ArrowBackIosIcon />
            </IconButton>
            <Box ref={scrollContainerRef} sx={{ flex: 1, display: "flex", overflowX: "auto", whiteSpace: "nowrap", scrollSnapType: 'x mandatory' }}>
                {children}
            </Box>
            <IconButton onClick={scrollRight} sx={{ '@media (max-width: 600px)': { display: 'none' } }}>
                <ArrowForwardIosIcon />
            </IconButton>
        </Box>
    );
}

export default ScrollableContainer;
