import { useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ScrollableContainerProps } from 'src/types';

const ScrollableImageContainer = ({ children }: ScrollableContainerProps) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -1000,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 1000,
                behavior: 'smooth',
            });
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            overflowY: 'hidden'
        }}>
            <IconButton onClick={scrollLeft} sx={{ '@media (max-width: 600px)': { display: 'none' } }}>
                <ArrowBackIosIcon />
            </IconButton>
            <Box ref={scrollContainerRef} sx={{
                flex: 1,
                display: "flex",
                overflowX: "auto",
                whiteSpace: "nowrap",
                py: 1,
                scrollSnapType: 'x mandatory',
                '&::-webkit-scrollbar': {
                    display: 'none'
                },
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
            }}>
                {children}
            </Box>
            <IconButton onClick={scrollRight} sx={{ '@media (max-width: 600px)': { display: 'none' } }}>
                <ArrowForwardIosIcon />
            </IconButton>
        </Box>
    );
}

export default ScrollableImageContainer;
