import { useContext, useState } from 'react';
import {
    Button,
    TextField,
    Typography,
    Container,
    Box,
    Divider
} from '@mui/material';
import { useSettingsContext } from 'src/components/settings';
import { AuthContext } from 'src/auth/context/jwt';
import { useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';


interface Voting {
    title: string;
    description: string;
    availableUntil: string;
    thumbnail: string;
    votingOptions: Array<{ text: string }>;
}

const ManageVoting = () => {
    const [voting, setVoting] = useState<Partial<Voting>>({ votingOptions: [] });
    const settings = useSettingsContext();
    const history = useNavigate();
    const auth = useContext(AuthContext);
    const { votingId } = useParams();
    const isAdmin = auth.user && auth.user.email === "antonio@test.com";

    // TODO: WHen rendering form check for votingId, 
    //if it exits fill the form with the data of that voting so we can update it, 
    // if votingId does not exits it is a form to create a new voting.

    if (!isAdmin) {
        history('/');
    }

    const handleSubmit = async () => {
        //TODO: Update update&deleteVoiting method in useVoting(); And Implement it here
        {
            console.log('submittan', votingId);
        }
    };

    const handleAddOption = () => {
        setVoting(prev => ({
            ...prev,
            votingOptions: [...(prev.votingOptions || []), { text: '' }]
        }));
    };

    const handleRemoveOption = (index: number) => {
        const newOptions = [...(voting.votingOptions || [])];
        newOptions.splice(index, 1);
        setVoting({ ...voting, votingOptions: newOptions });
    };

    const handleOptionChange = (index: number, text: string) => {
        const newOptions = [...(voting.votingOptions || [])];
        newOptions[index].text = text;
        setVoting({ ...voting, votingOptions: newOptions });
    };

    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
            <Box>
                <Typography variant='h4' textAlign={'center'} m={1}> {votingId ? "Azuriraj" : "Stvori novi"} glasanje</Typography>
                <Divider />
                <TextField sx={{ my: 1 }} value={voting.title || ''} label="Naslov" fullWidth onChange={(e) => setVoting({ ...voting, title: e.target.value })} />
                <TextField sx={{ my: 1 }} value={voting.description || ''} label="Opis" fullWidth onChange={(e) => setVoting({ ...voting, description: e.target.value })} />
                <TextField sx={{ my: 1 }} value={voting.thumbnail || ''} label="Thumbnail URL" fullWidth onChange={(e) => setVoting({ ...voting, thumbnail: e.target.value })} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label="Available Until"
                        value={dayjs(voting.availableUntil || undefined)}
                        disablePast
                        onChange={(newValue) => {
                            setVoting({ ...voting, availableUntil: newValue?.toISOString() });
                        }}
                    />
                </LocalizationProvider>
                {voting.votingOptions?.map((option, index) => (
                    <Box key={index} display="flex" alignItems="center">
                        <TextField
                            label={`Opcija ${index + 1}`}
                            fullWidth
                            value={option.text}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                        />
                        <Button onClick={() => handleRemoveOption(index)}>-</Button>
                    </Box>
                ))}
                <Button onClick={handleAddOption}>Dodaj opciju</Button>
                <Button variant='contained' onClick={handleSubmit}>Potvrdi</Button>
            </Box>
        </Container>
    );
};

export default ManageVoting;
