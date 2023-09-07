// @mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// components
import FAQItem from "./FaqItem";
import { FAQ } from '../../types/index'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
// ----------------------------------------------------------------------

type FaqViewProps = {
    faqs: FAQ[];
};

const FaqView = ({ faqs }: FaqViewProps) => {
    const navigate = useNavigate();
    return (
        <Box sx={{ p: 2, borderRadius: 2, textAlign: "left" }} >
            <Typography variant="h4" >Česta Pitanja</Typography>
            {faqs.map((faq, index) => (
                <FAQItem key={index} faq={faq} />
            ))}
            <Button color="primary" onClick={() => navigate(-1)}>
                Povratak
            </Button>
        </Box>
    );
};
export default FaqView;


