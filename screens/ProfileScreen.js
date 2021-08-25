import * as React from 'react';
import { Text, View } from 'react-native';


function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile!</Text>
    </View>
  );
}

//must export to run bottom tab
export default ProfileScreen;