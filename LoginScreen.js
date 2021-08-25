import * as React from 'react';
import { Button, Text, View } from 'react-native';


const LoginScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login!</Text>
      <Button
        title="Click here"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
}

//must export to run bottom tab
export default LoginScreen;