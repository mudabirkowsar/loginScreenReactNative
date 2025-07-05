import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';

import HomeScreen from '../screens/HomeScreen';
import UsersScreen from '../screens/UsersScreen';
import TodoApp from '../screens/TodoApp';
import CrudOp from '../screens/CrudOp';
import ChangeLanguage from '../screens/ChangeLanguage';
import LogoutScreen from '../screens/LogoutScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: { backgroundColor: '#fff', width: 250 },
        headerStyle: { backgroundColor: '#374151' },
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
        }}
      />

      <Drawer.Screen
        name="Users"
        component={UsersScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          )
        }}
      />

      <Drawer.Screen
        name="Todo"
        component={TodoApp}
        options={{
          drawerIcon: ({ color, size }) => (
            <AntDesign name="checkcircleo" size={size} color={color} />
          )
        }}
      />

      <Drawer.Screen
        name="CRUD"
        component={CrudOp}
        options={{
          drawerIcon: ({ color, size }) => (
            <AntDesign name="edit" size={size} color={color} />
          )
        }}
      />

      <Drawer.Screen
        name="Change Language"
        component={ChangeLanguage}
        options={{
          drawerIcon: ({ color, size }) => (
            <AntDesign name="earth" size={size} color={color} />
          )
        }}
      />

      <Drawer.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <AntDesign name="logout" size={size} color={color} />
          )
        }}
      />
    </Drawer.Navigator>
  );
}
