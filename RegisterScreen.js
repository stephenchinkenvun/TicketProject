import * as React from 'react';
import { Button, Text, View } from 'react-native';


const RegisterScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Register</Text>
      <Button
        title="Click here"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}

//must export to run bottom tab
export default RegisterScreen;