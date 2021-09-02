import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler'

import OnBoardingScreen from './screens/OnBoardingScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import TabNavigator from './navigation/tabs';
import ShowScreen from './screens/ShowScreen';
import ShowTicketScreen from './screens/ShowTicketScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnBoardingScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="HomeStack" component={TabNavigator} />
        <Stack.Screen name="Show" component={ShowScreen} />
        <Stack.Screen name="Ticket" component={ShowTicketScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;