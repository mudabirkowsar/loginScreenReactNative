import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UsersScreen from '../screens/UsersScreen';
import LogoutScreen from '../screens/LogoutScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TodoApp from '../screens/TodoApp';
import CrudOp from '../screens/CrudOp';

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
          // backgroundColor: 'tomato'
          // backgroundColor:"#2dd4bf",
          // backgroundColor:"#6d28d9" 
          // backgroundColor:"#0f172a" 
          // backgroundColor:"#ec4899" 
          backgroundColor:"#374151" 
        },
        // headerTintColor: '#222',
        headerTintColor: '#ffe2db',
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
        name="Todo"
        component={TodoApp}
        options={{
          title: "Todo",
          drawerIcon: ({ color, size }) => (
            <AntDesign name="dropbox" color={color} size={size} />
          )
        }} />

        <Drawer.Screen
        name="CRUD"
        component={CrudOp}
        options={{
          title: "CRUD",
          drawerIcon: ({ color, size }) => (
            <AntDesign name="antdesign" color={color} size={size} />
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
