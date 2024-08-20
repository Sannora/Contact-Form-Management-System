import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/user/check-login`, {}, {
          headers: {
            'token': localStorage.getItem('token'), // Token'ı başlık olarak gönder
          }
        });
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { isAuthenticated, loading };
};

export default useAuth;
