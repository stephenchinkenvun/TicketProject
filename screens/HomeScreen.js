import * as React from 'react';
import { Text, View } from 'react-native';


function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

//must export to run bottom tab
export default HomeScreen;