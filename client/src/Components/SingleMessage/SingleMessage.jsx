import { Box, Card, CardContent, CssBaseline, Grid, Typography } from "@mui/material";
import { shadows } from '@mui/system';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import VisibilityIcon from '@mui/icons-material/Visibility';

function SingleMessage() {

  // URL ID'sini tutan useParams hook'u
  const { id } = useParams();

  // Alınan mesajı tutan useState hook'u
  const [message, setMessage] = useState(null);

  // Error durumlarını tutan useState hook'u
  const [error, setError] = useState(null);

  // Tekil mesajı çekecek useEffect hook'u
  useEffect(() => {
    const fetchMessage = async () => {
      try {

        // Authorization için JWT'yi al
        const token = localStorage.getItem('token');

        // Tekil mesajı çeken axios isteği ve gelecek veriyi tutacak response
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/message/${id}`, {

          // JWT authorization için token'ı istek header'ına ekle
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        // Alınan yanıttaki verileri useState'e gönder
        setMessage(response.data.data.message);
        console.log(response.data.data.message.read);

        // Detaylarına girilen mesajı okundu olarak işaretle
        if (response.data.data.message.read == "false") {

          // Mark message as read by ID isteği
          await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/message/read/${id}`, {}, {

            // JWT authorization için token'ı istek header'ına ekle
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
        }
      } catch (err) {
        setError(err.response?.data?.error || 'An error occurred');
      }
    };

    fetchMessage();
  }, [id]);

  return (
    <>
      <CssBaseline />
      <Grid container justifyContent="center" alignItems="center" backgroundColor='white.background' style={{ minHeight: '100vh' }}>
        <Grid
          item
          xs={12}
          sm={10}
          md={8}
          lg={6}
          xl={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '60%',
          }}
        >
          <Card variant="outlined" sx={{ width: '100%', p:0, m:0, boxShadow:2}}>
            <CardContent>
              {error ? (
                <Typography variant="body1" color="error">
                  {error}
                </Typography>
              ) : message ? (
                <>
                  <Typography variant="h4" gutterBottom sx={{fontWeight:'bold'}}>
                    {message.name}:
                  </Typography>
                  <Typography component="p" variant="body1" color="text.main" sx={{py:2}}>
                    {message.message}
                  </Typography>
                  <Box display='flex' gap={2} sx={{pt:2}}>
                    <Typography component="p" variant="caption" color="white.main"
                    sx={{ textTransform: 'capitalize', fontWeight: 'bold', backgroundColor: 'primary.main', px:1, py:0.25, borderRadius:5 }}
                    >
                      {message.gender}
                    </Typography>
                    <Typography component="p" variant="caption" color="white.main"
                    sx={{ textTransform: 'capitalize', fontWeight: 'bold', backgroundColor: 'primary.main', px:1, py:0.25, borderRadius:5 }}
                    >
                      {message.country}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} sx={{borderTop: '1px solid #FFCE35', py:2}}>
                    <Typography variant="body2" color="text.secondary" sx={{fontWeight: 'bold'}}>
                      Message ID: #{message.id}
                    </Typography>
                    {message.read && (
                      <Box display="flex" alignItems="center">
                        <VisibilityIcon sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary" sx={{fontSize: { xs: '0.75rem', sm: '1rem', md: '1rem' }, fontWeight: 'bold'}}>
                          Read
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  <Typography variant="body2" color="gray.light">
                    {new Date(message.creationDate).toLocaleDateString()}
                  </Typography>
                </>
              ) : (
                <Typography variant="body1">Loading...</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default SingleMessage;
