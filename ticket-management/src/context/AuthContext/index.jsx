import { createContext, useState, useEffect, useContext } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = getAuth();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Logout errorsasas:', error.message);
    }
  };

  useEffect(() => {
    let unsubscribe;
    unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const values = {
    user: user,
    setUser: setUser,
  };

  return <AuthContext.Provider value={values}>{!loading && children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

