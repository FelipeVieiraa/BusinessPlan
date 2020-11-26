import React from 'react';
import { View, ViewStyle } from 'react-native';

import { evaPallete } from '../../theme';

const SCREEN_CONTAINER: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: evaPallete["background-color-primary"]
}

export const Screen: React.FC = ({children}) => {
  return(
    <View style={SCREEN_CONTAINER}>
      {children}
    </View>
  );
}