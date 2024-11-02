import React, { useEffect } from 'react';
import {Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import EventScreen from './screens/Events';
import MoreScreen from './screens/More';


const Tab = createBottomTabNavigator();

const App = () => {
  useEffect(()=>{
    setTimeout(()=>{
      SplashScreen.hide()
    },500)
  })
  function MyTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Tab.Screen name="Event" component={EventScreen} options={{headerShown: false}}/>
        <Tab.Screen name="Profile" component={MoreScreen} options={{headerShown: false}}/>
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
};
export default App;