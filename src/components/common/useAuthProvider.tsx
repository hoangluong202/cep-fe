import { server } from '@/services';
import React from 'react';

interface AuthContextType {
  isAuth: boolean;
  saveToken: (token: string) => void;
  deleteToken: () => void;
}
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  const saveToken = (token: string) => {
    localStorage.setItem('token', token);
    server.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setIsAuth(true);
  };

  const deleteToken = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
  };
  return (
    <AuthContext.Provider value={{ isAuth, saveToken, deleteToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthProvider = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
