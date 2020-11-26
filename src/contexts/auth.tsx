import React, { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';
import Storage from '@react-native-async-storage/async-storage';

interface User {
  id: Number|null
  name: String
  email: String
  password?: String
  profilePicture?: String
}

interface Context {
  signed?: boolean
  loading?: boolean
  signIn?: any
  config?: User
}

interface PropsProvider {
  children: ReactNode
}

export const AuthContext = createContext<Context>({});

export default function AuthProvider({children}: PropsProvider) {
  const [ user, setUser ] = useState<User>({
    id: null,
    email: '',
    name: '',
    profilePicture: ''
  });
  const [ loading, setLoading ] = useState(true);

  const users = [
    { id: 1, name: "Felipe", email: "felipe@gmail.com", senha: "123123", profilePicture: '' },
    { id: 2, name: "Laura", email: "laura@gmail.com", senha: "123123", profilePicture: '' }
  ];

  useEffect(() => {
    async function loadStorage() {
      const userStorage = await Storage.getItem("Auth_user");

      if(userStorage) {
        setUser(JSON.parse(userStorage));
        setLoading(false);
      }
      setLoading(false)
    }

    loadStorage();
  }, []);

  async function storageUser(user: User) {
    await Storage.setItem('Auth_user', JSON.stringify(user));
  }

  async function signIn(email: string, password: string) {
    const user: User|undefined = users.find( user => user.email == email && user.senha == password);

    if(user) {
      const data = {
          id: user.id,
          name: user.name,
          email: user.email,
          profilePicture: user.profilePicture
      }

      setUser(data);
      storageUser(data);
    }else {
      alert('Dados Incorretos, tente novamente!');
    }
  }

  return(
    <AuthContext.Provider
      value={{signed: !!user.id, config: user, signIn, loading}}
    >
      {children}
    </AuthContext.Provider>
  );

}
