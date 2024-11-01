// App.js

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import Splash from './components/Splash';
import Onboard from './components/Onboard';
import Login from './components/Login';
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Onboard" component={Onboard} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
