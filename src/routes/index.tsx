import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import LoginRoutes from './login.routes';
import AppRoutes from './app.routes';

import { AuthContext } from '../contexts/auth';

const Routes: React.FC = () => {
  const { signed } = useContext(AuthContext);

  return(
    <NavigationContainer>
      { signed ? <AppRoutes /> : <LoginRoutes/> }
    </NavigationContainer>
  );
}

export default Routes;