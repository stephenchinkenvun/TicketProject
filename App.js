import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler'

import TabNavigator from './navigation/tabs';

const App = () => {
  return(
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

export default App;