import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import ShowTicketScreen from '../screens/ShowTicketScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: {
                position: 'absolute',
                bottom: 25,
                left: 20,
                right: 20,
                elevation: 0,
                backgroundColor: '#ffffff',
                borderRadius: 15,
                height: 60,
                ...styles.shadow
            }
        }}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ Color }) => (
                    <Feather name="home" size={24} color="black" />
                )
            }} />
            <Tab.Screen name="Ticket" component={ShowTicketScreen} options={{
                tabBarLabel: 'Ticket',
                tabBarIcon: ({ Color }) => (
                    <Fontisto name="bus-ticket" size={24} color="black" />
                )
            }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ Color }) => (
                    <MaterialCommunityIcons name="account" size={24} color="black" />
                )
            }} />
        </Tab.Navigator>
    );
}

export default TabNavigator;

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }

});

