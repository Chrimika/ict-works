import React from 'react';
import {Text, View} from 'react-native';

const HomeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        margin:16
      }}>
      <Text style={{fontFamily:'UbuntuMono-Bold',fontSize:32}}>Bienvenu</Text>
    </View>
  );
};
export default HomeScreen;