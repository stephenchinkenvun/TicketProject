import React from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import RegisterScreen from './RegisterScreen';

const OnBoardingStack = createStackNavigator();

const OnBoardingScreen = ({navigation}) => {
  return (
        <Onboarding
        onSkip={() => navigation.replace("Login")}
        onDone={() => navigation.navigate("Login")}
        pages={[
            {
                backgroundColor: '#a6e4d0',
                image: <Entypo name="ticket" size={50} color="black" />,
                title: 'Easy Ticket Booking',
                subtitle: 'Please login to enjoy full benefit!',
            },
            {
                backgroundColor: '#fdeb93',
                image: <MaterialIcons name="payment" size={50} color="black" />,
                title: 'Secure Payment',
                subtitle: 'Please login to enjoy full benefit!',
            },
            {
                backgroundColor: '#e9bcbe',
                image: <AntDesign name="customerservice" size={50} color="black" />,
                title: '24/7 Customer Support',
                subtitle: 'Please login to enjoy full benefit!',
            },
        ]}
/>
  );
}

//must export to run bottom tab
export default OnBoardingScreen;