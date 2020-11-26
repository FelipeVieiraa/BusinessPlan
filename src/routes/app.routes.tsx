import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

import Home from '../screens/Home';
import Register from '../screens/Register';
import Info from '../screens/Info';
import Config from '../screens/Config';

const LoginRoutes: React.FC = () => {
  return(
    <Drawer.Navigator>
      <Drawer.Screen 
        name="Home" 
        component={Home} 
        options={{ headerShown: false }} 
      />
      <Drawer.Screen 
        name="Register" 
        component={Register} 
        options={{ headerShown: false }} 
      />
      <Drawer.Screen 
        name="Info" 
        component={Info} 
        options={{ headerShown: false }} 
      />
      <Drawer.Screen 
        name="Config" 
        component={Config} 
        options={{ headerShown: false }} 
      />
    </Drawer.Navigator>
  );
}

export default LoginRoutes;