import React from 'react';
import { View } from 'react-native';
import { Spinner } from '@ui-kitten/components';

export const Loading = (props: any) => {
  return(
    <View>
      <Spinner size="small" style={{ backgroundColor: "#FFF", borderColor: "#FFF" }} />    
    </View>
  );
}
