import { Alert, Box, Button, Card, CardContent, CssBaseline, Divider, Grid, Paper, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ChevronRight from '@mui/icons-material/ChevronRight';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect, useState } from "react";
import ErrorIcon from '@mui/icons-material/Error';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Messages() {

  // Messages verilerini tutacak useState hook'u
  const [messages, setMessages] = useState([]);

  // Error durumlarını tutan useState hook'u
  const [error, setError] = useState('');

  // Success durumlarını tutan useState hook'u
  const [success, setSuccess] = useState('');

  // Site içi navigasyon için react-router-dom useNavigate hook'u
  const navigate = useNavigate();

  // Mesajları çekecek useState hook'u
  useEffect(() => {
    const fetchMessages = async () => {
      try {

        // Authentication için JWT'yi localStorage'dan al
        const token = localStorage.getItem('token');

        // Get messages isteğinin yanıtını tutacak değişken
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/messages`, {

          // JWT authorization için token'ı istek header'ına ekle
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        // Alınan yanıttaki verileri useState'e gönder
        setMessages(response.data.data.messages);

      } catch (err) {
        setError(err.response.data.error);

        //Error durumunda kullanıcıyı /login'e yönlendir
        navigate('/login');
        console.log(err);
      }
    };

    fetchMessages();
  }, []);

  // Delete message fonksiyonu
  const deleteMessage = async (id) => {
    try {

      // Authentication için JWT'yi localStorage'dan al
      const token = localStorage.getItem('token');

      // Delete message by ID isteği
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/message/delete/${id}`, {}, {

        // JWT authorization için token'ı istek header'ına ekle
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Seçili ID'ye sahip mesaj hariç tüm mesajları ekranda tutacak şekilde yeniden filtrele
      setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id));

      setSuccess('Message deleted successfully!');
      setError('');
    } catch (err) {
      setError('Failed to delete the message.');
      setSuccess('');
      console.log(err);
    }
  };

  return (
    <>
      <CssBaseline />
      <Grid
        container
        spacing={2}
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
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              padding: 3,
            }}
          >
            {error && (
              <Alert icon={<ErrorIcon />} severity="error" sx={{ mt: 2, width: '100%' }}>
                {error}
              </Alert>
            )}
            {messages.map((message) => (
              <Card
                key={message.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: 'auto',
                  flexShrink: 0,
                  padding: 0,
                  position: 'relative',
                  backgroundColor: message.read === 'true' ? 'white.dark' : 'white',
                  '&:hover': {
                    backgroundColor: message.read === 'true' ? 'white.hover' : 'white.light',
                  },
                  transition: '0.3s',
                  cursor: 'pointer',
                  mb: 3,
                }}
              >
                <CardContent
                  component="div"
                  sx={{
                    flex: '1 0 auto',
                    display: 'flex',
                    width: '100%',
                    padding: 0,
                    '&:last-child': {
                      paddingBottom: 0,
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', width: '100%' }}>
                    <Box
                      sx={{
                        flex: '0 0 30%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                      }}
                    >
                      <Typography
                        component="div"
                        variant="h5"
                        sx={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: 0,
                          padding: 0,
                          fontSize: { xs: '0.75rem', sm: '1rem' },
                        }}
                      >
                        {message.name}
                      </Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box sx={{ flex: '1', paddingLeft: 2 }}>
                      <Typography component="p" variant="body1" color="text.main"
                      sx={{ 
                        margin: 0,
                        padding: 0,
                        marginTop: 2,
                        marginBottom: 2,
                        whiteSpace: 'normal',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: '1',
                      }}>
                        {message.message}
                      </Typography>
                      <Box display='flex' gap={2}>
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
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography component="p" variant="caption" color="gray.main" sx={{ fontWeight: 'bold', flexShrink: 0 }}>
                            Message ID: {`#${message.id}`}
                          </Typography>
                          {message.read === 'false' && <MarkEmailUnreadIcon color="secondary" />}
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            size="small"
                            sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
                            startIcon={<ChevronRight />}
                            component={Link}
                            to={`/message/${message.id}`}
                          >
                            Details
                          </Button>
                          <Button
                            size="small"
                            sx={{ display: { xs: 'none', sm: 'inline-flex' }, ml: 1 }}
                            startIcon={<DeleteIcon />}
                            onClick={() => deleteMessage(message.id)}
                          >
                            Delete
                          </Button>
                          <Button
                            size="small"
                            sx={{ display: { xs: 'inline-flex', sm: 'none' }, ml: 1 }}
                            startIcon={<ChevronRight />}
                            component={Link}
                            to={`/message/${message.id}`}
                          />
                          <Button
                            size="small"
                            sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
                            startIcon={<DeleteIcon />}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
            {success && (
            <Alert icon={<CheckCircleIcon />} severity="success" sx={{ mt: 2, width: '100%' }}>
              {success}
            </Alert>
          )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Messages;
