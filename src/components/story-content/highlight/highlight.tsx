
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

interface HighlightProps {
    data: {
        Title: string;
        imgUrl: string;
        Description: string;
    };
}

const Highlight = ({ data }: HighlightProps) => {
    return (
        <Card style={{ marginBottom: '20px' }}>
            <CardMedia
                component="img"
                height="140"
                image={data.imgUrl}
                alt={data.Title}
            />
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
