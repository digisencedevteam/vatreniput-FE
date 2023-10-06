// @mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// components
import FAQItem from "./FaqItem";
import { FAQ } from '../../types/index'
import { useNavigate } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';
// ----------------------------------------------------------------------

type FaqViewProps = {
    faqs: FAQ[];
};

const FaqView = ({ faqs }: FaqViewProps) => {
    const navigate = useNavigate();
    const settings = useSettingsContext();

    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>

            <Box sx={{ p: 2, borderRadius: 2, textAlign: "left" }} >
                <Typography variant="h4" >Česta Pitanja</Typography>
                {faqs.map((faq, index) => (
                    <FAQItem key={index} faq={faq} />
                ))}
                <Button color="primary" onClick={() => navigate(-1)}>
                    Povratak
                </Button>
            </Box>
            <Box
                component="img"
                sx={{
                    height: 150
                    ,
                    width: 'auto',
                }}
                alt="Vatroslav Upute"
                src="https://res.cloudinary.com/dzg5kxbau/image/upload/v1695824037/vatroslav_upute_2_xjcpuj.png"
            />
        </Container>
    );
};
export default FaqView;


