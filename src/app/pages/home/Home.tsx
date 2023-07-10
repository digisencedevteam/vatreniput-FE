import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet';

// example of custom component
const CustomButton = styled(Button)({
  // your custom styles go here
  color: 'white',
  background: 'blue',
  padding: 8,
}) as typeof Button;

export const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Vatreni Put - Naslovnica</title>
        <meta
          name="description"
          content="This is the home page of my website."
        />
      </Helmet>

      <div className="App">
        <header className="App-header">
          <p>This is home page</p>
          <Button
            variant="contained"
            onClick={() => navigate('/library')}
          >
            Go To Library
          </Button>
          <CustomButton
            variant="contained"
            onClick={() => navigate('/login')}
            color="secondary"
          >
            This is custom button - LOGIN
          </CustomButton>
        </header>
      </div>
    </>
  );
};
