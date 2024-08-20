import { Avatar, CssBaseline, Grid, Paper, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography, Divider, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/users`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        // Verileri state'e aktar
        setUsers(response.data.data.users);
      } catch (err) {
        setError(err.response?.data?.error);
        navigate('/401');
      }
    };

    fetchUsers();
  }, [navigate]);

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
            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              <Grid container spacing={2} sx={{ px: 2 }}>
                <Grid item xs={8}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Username</Typography>
                </Grid>
                <Grid item xs={4} container justifyContent="flex-end">
                  <Typography variant="subtitle1" align="right" sx={{ fontWeight: 'bold' }}>Edit User</Typography>
                </Grid>
              </Grid>
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />

            <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {users.map((user) => (
                <ListItem
                  key={user.id}
                  disablePadding
                  divider
                  sx={{ 
                    marginBottom: 3,
                    backgroundColor: user.role === 'admin' ? 'secondary.main' : 'inherit'
                  }}
                  secondaryAction={
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item xs={4} textAlign="right" color='primary.main'>
                        <IconButton edge="end" onClick={() => navigate(`/update-user/${user.id}`)}>
                          <EditIcon sx={{color: 'primary.main'}}/>
                        </IconButton>
                      </Grid>
                    </Grid>
                  }
                >
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar
                        alt={`Avatar n°${user.id}`}
                        src={user.base64Photo}
                      />
                    </ListItemAvatar>
                    <ListItemText primary={user.username} 
                    primaryTypographyProps={{
                      fontWeight: user.role === 'admin' ? 'bold' : 'normal'
                    }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
              <Link to='/add-new-user' style={{textDecoration: 'none'}}>
              <ListItem
                disablePadding
                sx={{
                  marginBottom: 3,
                  px: 4, py: 1,
                  border: '2px dashed #0000004D',
                  backgroundColor: 'white.light',
                  borderRadius: 5,
                  cursor: 'pointer'
                }}
                secondaryAction={
                  <Typography color="primary.main" sx={{ marginRight: 2 }}>
                    <AddCircleIcon />
                  </Typography>
                }
              >
                <ListItemText variant="body2" primary="Add New User" primaryTypographyProps={{ fontWeight: 'bold', color: 'black.main' }} />
              </ListItem>
              </Link>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Users;
