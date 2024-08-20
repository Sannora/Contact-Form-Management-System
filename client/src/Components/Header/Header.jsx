import { AppBar, Avatar, Box, Container, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemText, Menu, MenuItem, Toolbar, Tooltip } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { logout } from '../../Slices/UserSlice';
import Logo from '../../assets/kont.act.png';

function Header() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleOpenUserMenu = (e) => {
        setAnchorElUser(e.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');

            await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/user/logout`, {}, {
                headers: { 'token': token },
            });

            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.error("Logout error: ", err);
        }
    };

    const renderNavigation = (
        <>
            <ListItem button component={Link} to="/home">
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/messages">
                <ListItemText primary="Messages" />
            </ListItem>
            {user.role === 'admin' && (
                <>
                    <ListItem button component={Link} to="/users">
                        <ListItemText primary="Users" />
                    </ListItem>
                    <ListItem button component={Link} to="/reports">
                        <ListItemText primary="Reports" />
                    </ListItem>
                </>
            )}
        </>
    );

    return (
        <>
        <CssBaseline />
            <AppBar
                position="sticky"
                sx={{
                    boxShadow: '0px 4px 4px -2px rgba(0, 0, 0, 0.2)',
                    width: '100%',
                    overflow: 'hidden',
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Logo */}
                        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                            <Link to="/home">
                                <img
                                    src={Logo}
                                    alt="Logo"
                                    style={{
                                        width: '100%',
                                        maxWidth: 150,
                                        height: 'auto',
                                        '@media (max-width:600px)': {
                                            maxWidth: 120,
                                        },
                                        '@media (max-width:400px)': {
                                            maxWidth: 100,
                                        }
                                    }}
                                />
                            </Link>
                        </Box>

                        {/* Desktop Navigation */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                            {renderNavigation}
                        </Box>

                        {/* Desktop Avatar */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                            <Tooltip title="User Menu">
                                <IconButton onClick={handleOpenUserMenu}>
                                    <Avatar src={`data:image/jpeg;base64,${user.base64Photo}`} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem>{user.username}</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </Box>

                        {/* Mobile Menu Button */}
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={handleDrawerToggle}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                sx={{ '& .MuiDrawer-paper': { width: 250 } }}
            >
                <Box
                    role="presentation"
                    onClick={handleDrawerToggle}
                    onKeyDown={handleDrawerToggle}
                >
                    <List disablePadding>
                        <ListItem sx={{ backgroundColor: 'primary.main', color: 'white.main' }}>
                            <Avatar src={`data:image/jpeg;base64,${user.base64Photo}`} />
                            <ListItemText primary={user.username} sx={{ ml: 2 }} />
                        </ListItem>
                        {renderNavigation}
                        <Divider />
                        <ListItem button onClick={handleLogout}>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
}

export default Header;
