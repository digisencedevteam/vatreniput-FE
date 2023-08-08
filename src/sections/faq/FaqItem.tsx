import React, { useState } from "react";
import { Typography, Box, Collapse, IconButton, useTheme } from "@mui/material";
import { FAQ } from '../../types/index'
import { ExpandMore, ExpandLess } from '@mui/icons-material';

type FAQItemProps = {
    faq: FAQ;
};

const FAQItem = ({ faq }: FAQItemProps) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (

        <Box sx={{ my: 2, p: 2, borderRadius: 2, background: theme.palette.background.paper }}>
            <Box display="flex" alignItems="center" onClick={handleClick}>
                <Typography variant="h6">{faq.question}</Typography>
                <Box flexGrow={1} />
                <IconButton color="error">
                    {open ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
            </Box>
            <Collapse in={open}>
                <Typography py={3}>{faq.answer}</Typography>
            </Collapse>
        </Box>

    );
};

export default FAQItem;
