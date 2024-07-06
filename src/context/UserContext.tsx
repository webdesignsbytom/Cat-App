import React, { createContext, useContext, useState } from 'react';
// Api
import client from '../api/client';
// Interfaces
import { User } from '../utils/User/UserInterfaces';

interface UserContextType {
  token: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  
  const login = async (email: string, password: string) => {
    const loginForm = { email: email, password: password };

    client
    .post('/login', loginForm, false)
    .then((res) => {
      localStorage.setItem('token', res.data.data.token);
      setToken(res.data.data.token);
      setUser(res.data.data.existingUser);
    })

    .catch((err) => {
      console.error('Unable to login', err);
    });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ token, user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
