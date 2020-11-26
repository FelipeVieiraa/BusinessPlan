import React from 'react';
import { ViewStyle, Text, TextStyle } from 'react-native';
import { Layout, Icon, Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native'

import { BUTTON, evaPallete } from '../../theme'

const HEADER: ViewStyle = {
  backgroundColor: "#FFF",
  height: 60,
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row"
}

const TEXT: TextStyle = {
  fontSize: 25,
  color: evaPallete["color-text-primary"]
}

const Menu = (props: any) => (
  <Icon name='menu-outline' {...props} />
);

const Header: React.FC = () => {
  const navigation = useNavigation();

  return(
    <Layout style={HEADER}>
      <Layout style={{ width: "15%"}}>
      </Layout>

      <Layout style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
        <Text style={TEXT}>Felipe Vieira</Text>
      </Layout>

      <Layout style={{ width: "15%"}}>
        <Button 
          style={[BUTTON, {height: "100%"}]} 
          accessoryLeft={Menu}
          onPress={() => navigation.toggleDrawer()}
        />
      </Layout>
    </Layout>
  );
}

export default Header;