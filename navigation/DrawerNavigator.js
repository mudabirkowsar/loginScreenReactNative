import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UsersScreen from '../screens/UsersScreen';
import LogoutScreen from '../screens/LogoutScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#fff',
          // backgroundColor: '#ffd4c9',
          width: 250,
        },
        headerStyle: {
          // backgroundColor: '#0984e3',
          backgroundColor: 'tomato'
        },
        headerTintColor: '#222',
        // headerTintColor: '#ffe2db',
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          )
        }} />

      {/* <Drawer.Screen 
      name="Profile" 
      component={ProfileScreen} 
      options={{
          drawerIcon: ({ color, size }) => (
            <AntDesign name="user" color="#000" size={24} />
          )
        }}/> */}

      <Drawer.Screen
        name="Users"
        component={UsersScreen}
        options={{
          title: "Users",
          drawerIcon: ({ color, size }) => (
            <AntDesign name="user" color={color} size={size} />
          )
        }} />

      <Drawer.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <AntDesign name="logout" color={color} size={size} />
          )
        }} />



    </Drawer.Navigator>
  );
}
