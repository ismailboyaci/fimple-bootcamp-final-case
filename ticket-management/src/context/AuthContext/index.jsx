import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'https://ticket-management-fe3dfc84f4a8.herokuapp.com/';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}login`, {
        email: email,
        password: password,
      },{
        withCredentials: true
      })
      if (response) {
        const userData = response.data.userPayload;
        setUser(userData);
        Cookies.set('userToken', response.data.userToken, { expires: 7 }); // Cookie süresini dilediğiniz gibi ayarlayabilirsiniz.
        return response.status;
      }
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  const logout = async () => {
    try {
      const result = await axios.post(`${BASE_URL}logout`).then((response) => {
        if (response) {
          setUser(null);
          Cookies.remove('userToken');
        }
      })
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  const verifyToken = async () => {
    try {
      const userToken = Cookies.get('userToken');

      if (!userToken) {
        console.error('Us er token not found');
        return;
      }
      const response = await axios.post(`${BASE_URL}verifyToken`, {
        userToken: userToken
      });
  
      if (response) {
        const userData = response.data.userPayload;
        const userToken = response.data.userToken;
        Cookies.set('userToken', userToken, { expires: 7 });
        return userData;
      }
    } catch (error) {
      console.error('Verify token error:', error.message);
    }
  };
  

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const userData = await verifyToken();
      setUser(userData);
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const values = {
    user,
    setUser,
    login,
    logout
  };

  return <AuthContext.Provider value={values}>{!loading && children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
