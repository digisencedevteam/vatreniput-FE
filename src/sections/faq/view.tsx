// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSettingsContext } from 'src/components/settings';
import FAQItem from "./FaqItem";
import { FAQ } from './Types';
import React, { FC } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
// ----------------------------------------------------------------------

type FaqViewProps = {
    faqs: FAQ[];
};

const FaqView: FC<FaqViewProps> = ({ faqs }) => {
    const navigate = useNavigate();
    return (

        <Box sx={{ p: 2, borderRadius: 2 }} >
            <Typography variant="h2" >Cesta Pitanja</Typography>
            {faqs.map((faq, index) => (
                <FAQItem key={index} faq={faq} />
            ))}
            <Button color="primary" onClick={() => navigate(-1)}>
                Nazad
            </Button>
        </Box>

    );
};

export default FaqView;


