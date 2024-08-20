import { CssBaseline, Grid, Paper, Box, Avatar, Typography, Button, TextField, FormControl, RadioGroup, FormControlLabel, Radio, FormLabel, Alert } from "@mui/material";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ErrorIcon from '@mui/icons-material/Error';
import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

function Homepage() {

  // Submit verilerini tutacak useState hook'u
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    country: '',
    gender: '',
  });

  // Ülke verilerini tutacak useState hook'u
  const [countries, setCountries] = useState([]);

  // Input değerleri değiştikçe verileri userData state'inde
  // güncelleyecek handler fonksiyonu
  const changeInputHandler = (e) => {
    setFormData(prevState =>{
        return {...prevState, [e.target.name]: e.target.value}
    });
  };

  // Error durumlarını tutan useState hook'u
  const [error, setError] = useState('');

  // Ülke verilerini fetch edecek useEffect hook'u
  useEffect(() =>{
    const fetchCountries = async () =>{
      try {
        // Gelecek countries verisini tutacak response değişkeni
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/countries`);
        // Erişilen response verisi doğrudan countries array'ini vermediği için
        // .data.data.countries ile erişim sağlandı
        setCountries(response.data.data.countries);
      } catch (err) {
        // error durumunda error'u açıklayacak mesajı yazdır
        setError(err.response.data.error);
        // Debug için hatayı ayrıca konsola manuel olarak yazdır
        console.log("Ülke verilerini çekerken hata oluştu", err);
      }
    };

    fetchCountries();

  }, []);

    // Site içi navigasyon için react-router-dom useNavigate hook'u
    const navigate = useNavigate()

  const submitForm = async (e) => {
    // Submit'i engelle
    e.preventDefault();

    try {
      console.log("Form Submitted");
      // Form submission'dan sonra alınacak yanıtı tutacak değişken
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/message/add`, formData);

      // Veriler alındıktan sonra /messages route'una yönlendir
      navigate('/messages');
    } catch (err) {
        // error durumunda error'u açıklayacak mesajı yazdır
        setError(err.response.data.error);
    }
  };

  return (
    <>
      <CssBaseline />
      <Grid
        container
        spacing={0}
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh', backgroundColor:'white.background', py:5 }}
      >
        <Grid
          item
          xs={12}
          sm={10}
          md={8}
          lg={6}
          xl={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Paper
            elevation={6}
            sx={{
              width: '100%',
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '80%',
                maxWidth: '500px',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <EmailOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Contact Us
              </Typography>
              <Typography variant="subtitle1">
                Have any ideas? Feel free to get in touch!
              </Typography>
              <Box component="form" onSubmit={submitForm} noValidate sx={{ mt: 1, width: '100%' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  inputProps={{ maxLength: 50 }}
                  onChange={changeInputHandler}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="message"
                  label="How can we help you?"
                  name="message"
                  multiline
                  rows={3}
                  inputProps={{ maxLength: 500 }}
                  onChange={changeInputHandler}
                />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth margin="normal">
                      <Select
                        options={countries.map(country => ({ value: country, label: country }))}
                        isSearchable
                        name="country"
                        placeholder="Country"
                        onChange={selectedOption => {
                          setFormData(prevState => ({
                            ...prevState,
                            country: selectedOption ? selectedOption.value : ''
                          }));
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                    <FormControl margin="normal">
                      <FormLabel id="gender-label">Gender</FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="gender-label"
                        name="gender"
                        onChange={changeInputHandler}
                      >
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
                {error && (
                <Alert icon={<ErrorIcon />} severity="error" sx={{ mt: 2, width: '100%' }}>
                  {error}
                </Alert>
              )}
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Homepage;