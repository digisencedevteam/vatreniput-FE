import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
// sections
import { NotFoundView } from 'src/sections/error';
import FaqView from 'src/sections/faq/view';

// ----------------------------------------------------------------------
const FAQs = [
    {
        question: "Koja je svrha ove platforme?",
        answer: "Naša platforma omogućuje ljubiteljima nogometa da digitalno skupljaju naljepnice hrvatskih nogometaša putem QR kodova sa sličica, komuniciraju s drugim kolekcionarima i saznaju više o svojim omiljenim igračima."
    },
    {
        question: "Kako mogu početi skupljati naljepnice?",
        answer: "Započinjanje skupljanja naljepnica na našoj platformi započinje kupnjom fizičkog almanaha, koji uključuje QR kod. Skeneranjem tog QR koda možete se registrirati na platformi. Nakon uspješne registracije, možete početi skupljati naljepnice skeniranjem QR kodova sa sličica. Svaka skenirana sličica automatski će se pohraniti na vašem računu na platformi."
    },
    {
        question: "Što se događa ako dovršim svoju kolekciju naljepnica?",
        answer: "Ako dovršite svoju kolekciju, na svom profilu ćete dobiti značku za dovršetak. Također možemo organizirati posebne događaje ili natjecanja za korisnike koji dovrše svoje kolekcije."
    },
    {
        question: "Jesu li dostupni svi hrvatski nogometni igrači?",
        answer: "Težimo tome da imamo sveobuhvatnu kolekciju naljepnica koja uključuje mnoge hrvatske nogometne igrače. Međutim, dostupnost se može razlikovati i svi igrači možda neće biti dostupni u svakom trenutku."
    },
    {
        question: "Kako mogu započeti s kolekcionarstvom naljepnica putem vaše platforme?",
        answer: "Započinjanje kolekcionarstva naljepnica na našoj platformi jednostavno je proces. Prvo, potrebno je kupiti fizički almanah koji sadrži QR kod. Skeneranjem tog QR koda možete se registrirati na platformi. Nakon uspješne registracije, imat ćete pristup funkcijama skupljanja naljepnica, gdje možete skenirati QR kodove sa sličica. Svaka skenirana sličica automatski će se pohraniti na vašem računu na platformi."
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
