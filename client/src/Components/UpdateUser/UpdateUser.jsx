import { Avatar, Button, CssBaseline, TextField, Box, Typography, Container, styled, Alert } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateUser() {
  // URL'deki ID'yi almak için useParams hook'u
  const { id } = useParams();

  // Form verilerini ve diğer state'leri tutmak için useState hook'ları
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [base64Photo, setBase64Photo] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  // Kullanıcının mevcut bilgilerini backend'den çekmek için useEffect
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/user/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        // Kullanıcı bilgilerini state'e aktar
        setUsername(response.data.data.user.username);
        setPassword(''); // Şifreyi boş bırakmak isteyebilirsin, güvenlik amacıyla
        setBase64Photo(response.data.data.user.base64Photo || '');
      } catch (err) {
        setError(err.response?.data?.error || 'An error occurred');
      }
    };

    fetchUser();
  }, [id]);

  // Kullanıcı güncelleme fonksiyonu
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/user/update/${id}`, {
        username,
        password,
        base64Photo
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setSuccess('User updated successfully!');
      setError('');

      // Başarıyla güncellendiğinde başka bir sayfaya yönlendir
      navigate('/users');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
      setSuccess('');
    }
  };

  // Görsel yükleme fonksiyonu
  const uploadFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBase64Photo(reader.result.split(',')[1]);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

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

  return (
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
          Update User
        </Typography>
        <Box component="form" onSubmit={handleUpdateUser} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={username} // Value ile state bağlanıyor
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
            value={password} // Value ile state bağlanıyor
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)} 
          />
          <Button
            component='label'
            variant='contained'
            fullWidth
            startIcon={<AddAPhotoIcon />}
            sx={{
              my: 2,
              backgroundColor: 'secondary.main',
              color: 'text.main',
              '&:hover': { backgroundColor: 'secondary.dark' },
            }}
          >
            Upload Profile Image
            <VisuallyHiddenInput type='file' onChange={uploadFile} />
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Update User
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
  );
}

export default UpdateUser;
