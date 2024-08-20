import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // Yükleniyor durumunda (giriş kontrolü yapılıyor) herhangi bir şey render etmeyin
  if (loading) {
    return <div>Loading...</div>;
  }

  // Eğer kullanıcı giriş yapmamışsa, /login sayfasına yönlendir
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Kullanıcı giriş yapmışsa, içeriği render et
  return <Outlet />;
};

export default PrivateRoute;
