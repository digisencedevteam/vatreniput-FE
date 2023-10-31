import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useResponsive } from 'src/hooks/use-responsive';
import { HighlightProps } from 'src/types';

const Highlight = ({ data }: HighlightProps) => {
    const isDesktop = useResponsive('up', 'md');
    const imageHeight = isDesktop ? "375" : "200";
    const isReportaza = data.Title.includes('Reportaža');
    const videoHref = data.videoLink || '';

    return (
        <Card style={{ marginBottom: '20px', minHeight: 700 }}>
            <div style={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    height={imageHeight}
                    image={data.imgUrl}
                    alt={data.Title}
                />
                {isReportaza && (
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
                            href={videoHref}
                            target="_blank"
                            rel="noopener noreferrer"
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
        </Card>
    );
};

export default Highlight;