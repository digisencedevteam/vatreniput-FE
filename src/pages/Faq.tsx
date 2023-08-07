import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
// sections
import { NotFoundView } from 'src/sections/error';
import FaqView from 'src/sections/faq/view';

// ----------------------------------------------------------------------
const FAQs = [
    {
        question: "What is the purpose of this platform?",
        answer: "Our platform allows football fans to digitally collect and trade stickers of Croatian football players, interact with other collectors, and learn more about their favorite players."
    },
    {
        question: "How can I start collecting stickers?",
        answer: "You can start by creating an account on our platform. Once registered, you'll receive a starter pack of stickers. You can acquire more stickers by purchasing packs or trading with other users."
    },
    {
        question: "Can I trade stickers with other users?",
        answer: "Yes, our platform includes a feature that allows users to trade stickers with each other. You can offer a trade to any user and they have the option to accept, decline, or counter your offer."
    },
    {
        question: "What happens if I complete my sticker collection?",
        answer: "If you complete your collection, you will receive a badge of completion on your profile. We may also run special events or competitions for users who complete their collections."
    },
    {
        question: "Are all Croatian football players available?",
        answer: "We strive to have a comprehensive collection of stickers, which includes many Croatian football players. However, availability can vary and not all players may be available at all times."
    },
    {
        question: "Is this platform free to use?",
        answer: "Yes, it's free to register and you'll receive a starter pack of stickers for free. However, additional packs of stickers are available for purchase."
    }
];
export default function Faq() {
    return (
        <>
            <Helmet>
                <title> This is Faq</title>
            </Helmet>

            <FaqView faqs={FAQs} />

        </>
    );
}
