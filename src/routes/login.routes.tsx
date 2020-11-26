import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Logon from '../screens/Logon';

const LoginRoutes: React.FC = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen 
        name="Logon" 
        component={Logon} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

export default LoginRoutes;