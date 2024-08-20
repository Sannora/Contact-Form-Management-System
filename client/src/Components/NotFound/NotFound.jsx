import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box, CssBaseline } from '@mui/material';
import bgImage from '../../assets/404-bg.svg';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/home');
  };

  return (
    <>
    <CssBaseline />
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'black.main',
          opacity: 0.5,
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          color: '#fff',
          padding: '20px',
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Page Not Found
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoHome}
        >
          Homepage
        </Button>
      </Box>
    </Box>
    </>
  );
};

export default NotFound;
