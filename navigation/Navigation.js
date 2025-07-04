import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotPassword from '../screens/ForgotPassword';
import AddUserScreen from '../screens/AddUserScreen';
import ShowUserDetailScreen from '../screens/ShowUserDetailScreen';
import UpdateUserScreen from '../screens/UpdateUserScreen';
import DrawerNavigator from './DrawerNavigator';
import AuthCheck from '../middleware/AuthCheck';
import UserDetailScreen from '../screens/UserDetailScreen ';

const Stack = createNativeStackNavigator();

const commonHeaderOptions = (title) => ({
  headerShown: true,
  title,
  headerStyle: {
    backgroundColor: '#374151',
  },
  headerTitleStyle: {
    color: 'white',
  },
  headerTintColor: 'white',
  headerTitleAlign: 'left',
});

export default function Navigation() {
  return (
    <Stack.Navigator
      initialRouteName="AuthCheck"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="AuthCheck" component={AuthCheck} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Drawer" component={DrawerNavigator} />

      <Stack.Screen
        name="Add User"
        component={AddUserScreen}
        options={commonHeaderOptions('Add User')}
      />
      <Stack.Screen
        name="User Detail"
        component={ShowUserDetailScreen}
        options={commonHeaderOptions('User Detail')}
      />
      <Stack.Screen
        name="UpdateUser"
        component={UpdateUserScreen}
        options={commonHeaderOptions('Update User')}
      />

      
      <Stack.Screen
        name="UserDetail"
        component={UserDetailScreen}
        options={commonHeaderOptions('Show Detail')}
      />
    </Stack.Navigator>
  );
}
