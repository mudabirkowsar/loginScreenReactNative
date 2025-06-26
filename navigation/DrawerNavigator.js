import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UsersScreen from '../screens/UsersScreen';
import LogoutScreen from '../screens/LogoutScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#fff',
          width: 240,
        },
        headerStyle: {
          backgroundColor: '#0984e3',
        },
        headerTintColor: '#fff',
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Users" component={UsersScreen}/>
      <Drawer.Screen name="Logout" component={LogoutScreen}/>
    </Drawer.Navigator>
  );
}
