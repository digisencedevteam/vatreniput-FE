import { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Dialog } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { useResponsive } from 'src/hooks/use-responsive';
import { HighlightProps } from 'src/types/story';

const Highlight = ({ data }: HighlightProps) => {
    const isDesktop = useResponsive('up', 'md');
    const [open, setOpen] = useState(false);
    const imageHeight = isDesktop ? "375" : "200";
    const isVideoHighlight = data.Title.includes('Reportaža');
    const videoHref = data.videoLink;

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card style={{ marginBottom: '20px', minHeight: 700 }}>
            <div style={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    height={imageHeight}
                    image={data.imgUrl}
                    alt={data.Title}
                />
                {isVideoHighlight && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <IconButton
                            color='primary'
                            onClick={handleOpen}
                        >
                            <PlayCircleOutlineIcon sx={{ fontSize: '250%' }} />
                        </IconButton>
                    </div>
                )}
            </div>
            <CardContent>
                <Typography variant="h6" component="div">
                    {data.Title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {data.Description}
                </Typography>
            </CardContent>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
            >
                <IconButton onClick={handleClose} style={{ position: 'absolute', right: 0, top: 0 }}>
                    <CloseIcon />
                </IconButton>
                {videoHref && (
                    <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                        <iframe
                            src={`${videoHref}?dnt=1`}
                            style={{
                                position: 'absolute',
                                top: '0',
                                left: '0',
                                width: '100%',
                                height: '100%',
                                border: '0'
                            }}
                            allow="autoplay; fullscreen; picture-in-picture"
                            title={data.Title}
                        />
                    </div>
                )}
            </Dialog>
        </Card>
    );
};

export default Highlight;
