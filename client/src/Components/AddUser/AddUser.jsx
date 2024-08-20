import { Avatar, Button, CssBaseline, TextField, Box, Typography, Container, styled, Alert } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddUser(){

    // Post ile backend'e gönderilecek verileri tutacak useState hook'ları
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [base64Photo, setBase64Photo] = useState('');

    // Error durumlarını tutan useState hook'u
    const [error, setError] = useState('')

    // Başarılı kayıt useState hook'u
    const [success, setSuccess] = useState('')

    // Site içi navigasyon için react-router-dom useNavigate hook'u
    const navigate = useNavigate();

    // Görsel yükleme fonksyionu
    const uploadFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            // Base64 string'e dönüştür
            setBase64Photo(reader.result.split(',')[1])
        };

        if(file){
            reader.readAsDataURL(file);
        }
    };

    // Yeni kullanıcı ekleme fonksyionu
    const addNewUser = async (e) => {
        e.preventDefault();

        try {

            // Authorization için JWT'yi al
            const token = localStorage.getItem('token');

            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/user/add-reader`, {username, password, base64Photo} , {

                // JWT authorization için token'ı istek header'ına ekle
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
              });

              if(!token){
                navigate('/login');
              }

            setSuccess('User added successfully.')
        } catch (err) {
            // error durumunda error'u açıklayacak mesajı yazdır
            setError(err.response.data.error);
            console.log(err);
        }
    }

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });

    return(

        <>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add New User
          </Typography>
          <Box component="form" onSubmit={addNewUser} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)} 
              />
              <Button
              component='label'
              role={undefined}
              variant='contained'
              tabIndex={-1}
              startIcon={<AddAPhotoIcon />}
              required
              fullWidth
              onChange={uploadFile}
              sx={{my: 2, backgroundColor: 'secondary.main', color: 'text.main', '&:hover': { backgroundColor: 'secondary.dark', }}}
              >
                Upload Profile Image
                <VisuallyHiddenInput type='file' />
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Add User
              </Button>
              {error && (
                <Alert icon={<ErrorIcon />} severity="error" sx={{ mt: 2, width: '100%' }}>
                  {error}
                </Alert>
              )}
              {success && (
                <Alert icon={<CheckCircleIcon />} severity="success" sx={{ mt: 2, width: '100%' }}>
                  {success}
                </Alert>
              )}
            </Box>
        </Box>
      </Container>
        </>

    )

}

export default AddUser