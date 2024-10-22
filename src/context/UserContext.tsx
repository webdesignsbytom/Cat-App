import React, { createContext, useContext, useEffect, useState } from 'react';
// Api
import client from '../api/client';
// Interfaces
import { UserToken, NewUser, User } from '../utils/user/UserInterfaces';
// Constants
import {
  ACCOUNT_TOKEN_NAME,
  GET_USER_BY_ID_API,
  LOGIN_USER_API,
  REGISTER_USER_API,
  TOKEN_NAME,
} from '../utils/contstants/Constants';
// Function
import LoggedInUser from '../utils/user/LoggedInUser';

interface UserContextType {
  token: UserToken | null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (newUser: NewUser) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [token, setToken] = useState<UserToken | null>(null);
  const [user, setUser] = useState<User | null>(null);
  // const [user, setUser] = useState<User | null>({
  //   id: 'dev',
  //   email: 'dev@dev.com',
  //   password: '123',
  //   role: 'DEVELOPER',
  //   agreedToTerms: true,
  //   createdEvents: [],
  //   receivedEvents: [],
  //   createdAt: new Date(),
  // });

  console.log('STATE USER', user);

  useEffect(() => {
    const foundUserToken = LoggedInUser() as UserToken;

    if (foundUserToken) {
      getUser(foundUserToken);
    }
  }, []);

  const getUser = async (foundUserToken: UserToken) => {
    client
      .get(`${GET_USER_BY_ID_API}${foundUserToken.id}`)
      .then((res) => {
        setUser(res.data.user);
        console.log('GET USER', res.data.user);
      })

      .catch((err) => {
        console.error('Unable to get user by id', err);
      });
  };

  const login = async (email: string, password: string) => {
    const loginForm = { email: email, password: password };

    client
      .post(LOGIN_USER_API, loginForm, false)
      .then((res) => {
        localStorage.setItem(TOKEN_NAME, res.data.token);
        localStorage.setItem(
          ACCOUNT_TOKEN_NAME,
          JSON.stringify(res.data.existingUser)
        );
        setToken(res.data.token);
        setUser(res.data.existingUser);
        console.log('LOGIN USER', res.data.existingUser);
      })

      .catch((err) => {
        console.error('Unable to login', err);
      });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_NAME);
    localStorage.removeItem(ACCOUNT_TOKEN_NAME);
  };

  const register = async (newUser: NewUser) => {
    client
      .post(REGISTER_USER_API, newUser, false)
      .then((res) => {
        localStorage.setItem(TOKEN_NAME, res.data.token);
        setToken(res.data.token);
        setUser(res.data.newUser);
      })

      .catch((err) => {
        console.error('Unable to register', err);
      });
  };

  return (
    <UserContext.Provider value={{ token, user, login, logout, register }}>
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
