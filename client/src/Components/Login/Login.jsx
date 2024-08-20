import { CssBaseline, Grid, Button, TextField, Paper, Box, Typography, Avatar, Alert } from "@mui/material"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ErrorIcon from '@mui/icons-material/Error';
import loginBackground from "../../assets/login-bg.svg"
import axios from "axios"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { setUser } from "../../Slices/UserSlice";

function Login(){

    // User verilerini tutacak useState hook'u
    const [userData, setUserData] = useState({
      username: '',
      password: '',
    })

    // Input değerleri değiştikçe verileri userData state'inde
    // güncelleyecek handler fonksiyonu
    const changeInputHandler = (e) => {
      setUserData(prevState =>{
          return {...prevState, [e.target.name]: e.target.value}
      })
  }

    // Error durumlarını tutan useState hook'u
    const [error, setError] = useState('')

    // Site içi navigasyon için react-router-dom useNavigate hook'u
    const navigate = useNavigate()

    const dispatch = useDispatch();

    // Login fonksiyonu
    const loginUser = async (e) => {
      // Submit'i engelle
      e.preventDefault();
      try {
        // Login requestinin yanıtını tutacak değişken
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/user/login`, userData);
        
        // Alınan yanıttan gelen verileri user değişkenine at
        // BURAYA DÖNMEM GEREKEBİLİR !!!!!!!!!!!!
        const user = response.data.data.user;
        // BURAYA DÖNMEM GEREKEBİLİR !!!!!!!!!!!

        // Kullanıcı bilgilerini Redux state'ine kaydet
        dispatch(setUser({
          id: user.id,
          username: user.username,
          role: user.role,
          base64Photo: user.base64Photo
        }));
        
        // JWT'yi localStorage'a kaydet
        localStorage.setItem('token', response.data.data.token);
        
        // Veriler alındıktan sonra /home route'una yönlendir
        navigate('/home');
      } catch (err) {
        // error durumunda error'u açıklayacak mesajı yazdır
        setError(err.response.data.error);
        console.log(err);
      }
    };

    return(

        <>
        <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              `url(${loginBackground})`,

            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'left',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box component="form" onSubmit={loginUser} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={userData.username}
                onChange={changeInputHandler}
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
                value={userData.password}
                onChange={changeInputHandler}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
              {error && (
                <Alert icon={<ErrorIcon />} severity="error" sx={{ mt: 2, width: '100%' }}>
                  {error}
                </Alert>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
        </>

    )

}

export default Login