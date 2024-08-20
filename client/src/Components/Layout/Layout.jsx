import { useSelector } from 'react-redux';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      {user.id && <Header />} {/* Yalnızca giriş yapmış kullanıcılar için Header'ı render et */}
      <Outlet />
    </>
  );
};

export default Layout;
