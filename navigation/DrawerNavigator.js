import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';  // example i18n hook

import HomeScreen from '../screens/HomeScreen';
import UsersScreen from '../screens/UsersScreen';
import TodoApp from '../screens/TodoApp';
import CrudOp from '../screens/CrudOp';
import ChangeLanguage from '../screens/ChangeLanguage';
import LogoutScreen from '../screens/LogoutScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { t } = useTranslation();  // get translation function

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
          drawerLabel: t('drawer.home'),    
          drawerIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          )
        }}
      />

      <Drawer.Screen
        name="Users"
        component={UsersScreen}
        options={{
          drawerLabel: t('drawer.users'),
          drawerIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          )
        }}
      />

      <Drawer.Screen
        name="Todo"
        component={TodoApp}
        options={{
          drawerLabel: t('drawer.todo'),
          drawerIcon: ({ color, size }) => (
            <AntDesign name="checkcircleo" size={size} color={color} />
          )
        }}
      />

      <Drawer.Screen
        name="CRUD"
        component={CrudOp}
        options={{
          drawerLabel: t('drawer.crud'),
          drawerIcon: ({ color, size }) => (
            <AntDesign name="edit" size={size} color={color} />
          )
        }}
      />

      <Drawer.Screen
        name="Change Language"
        component={ChangeLanguage}
        options={{
          drawerLabel: t('drawer.changeLanguage'),
          drawerIcon: ({ color, size }) => (
            <AntDesign name="earth" size={size} color={color} />
          )
        }}
      />

      <Drawer.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          drawerLabel: t('drawer.logout'),
          drawerIcon: ({ color, size }) => (
            <AntDesign name="logout" size={size} color={color} />
          )
        }}
      />
    </Drawer.Navigator>
  );
}
