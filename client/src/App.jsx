import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import { createTheme, ThemeProvider } from '@mui/material';
import Homepage from './Components/Homepage/Homepage';
import Layout from './Components/Layout/Layout';
import Messages from './Components/Messages/Messages';
import SingleMessage from './Components/SingleMessage/SingleMessage';
import Users from './Components/Users/Users';
import AddUser from './Components/AddUser/AddUser';
import UpdateUser from './Components/UpdateUser/UpdateUser';
import Reports from './Components/Reports/Reports';
import NotFound from './Components/NotFound/NotFound';
import { Provider } from 'react-redux';
import store from '../store';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import NotAuthorized from './Components/NotAuthorized/NotAuthorized';
import Header from './Components/Header/Header';

function App() {
  // MUI renk paleti
  const theme = createTheme({
    palette: {
      primary: {
        light: '#8797E8',
        main: '#3B55D9',
        dark: '#243DBC',
        contrastText: '#FFF',
      },
      secondary: {
        light: '#FFE085',
        main: '#FFCE35',
        dark: '#F5B800',
        contrastText: '#313131',
      },
      white: {
        main: '#FFFFFF',
        light: '#0000000D',
        dark: '#0000001A',
        hover: '#00000026',
        background: '#EBEBEB'
      },
      accent: {
        main: '#FEBEBE',
        contrastText: '#FFF',
      },
      text: {
        main: '#303030',
      },
      black: {
        main: '#000',
      },
      gray: {
        main: '#3C3C3C',
        light: '#0000004D',
      },
    },
  });

  // Site içi route'lar
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/login" />, // Kök URL'den /login'e yönlendir
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: '/',
      element: <PrivateRoute />, // Giriş kontrolü için PrivateRoute kullan
      children: [
        {
          path: '',
          element: <Layout />, // Layout bileşenini içeren rotalar
          children: [
            { path: 'home', element: <Homepage /> },
            { path: 'messages', element: <Messages /> },
            { path: 'message/:id', element: <SingleMessage /> },
            { path: 'users', element: <Users /> },
            { path: 'add-new-user', element: <AddUser /> },
            { path: 'update-user/:id', element: <UpdateUser /> },
            { path: 'reports', element: <Reports /> },
            { path: '401', element: <NotAuthorized /> },
            { path: 'header', element: <></>},
            { path: '*', element: <NotFound /> }, // Tanımlı olmayan alt yollar için 404
          ],
        },
      ],
    },
    {
      path: '*', // Tanımlı olmayan ana yollar için 404
      element: <NotFound />,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
