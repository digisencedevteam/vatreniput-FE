import { Container, Typography } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';
import { useParams } from 'react-router-dom';


const VotingApp = () => {

    const settings = useSettingsContext();

    const { votingId } = useParams();



    return (
        <Container
            maxWidth={settings.themeStretch ? false : 'xl'}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
            }}
        >

            <Typography>{votingId}</Typography>

        </Container>
    );
};

export default VotingApp;
