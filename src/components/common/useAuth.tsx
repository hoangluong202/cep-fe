import React from 'react';

interface AuthContextType {
  isAuth: boolean;
  login: (token: string) => void;
  logout: () => void;
}
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = React.useState(false);

  React.useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('authToken', token);
    setIsAuth(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuth(false);
  };
  return <AuthContext.Provider value={{ isAuth, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
