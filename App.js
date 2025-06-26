import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './navigation/DrawerNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LoginScreen from './screens/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SignupScreen from './screens/SignupScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>

        <Stack.Navigator initialRouteName='Login'
          options={{ headerShown: false }} >

          <Stack.Screen
            name='Login'
            component={LoginScreen}
            options={{ headerShown: false }} />

          <Stack.Screen
            name='Drawer'
            component={DrawerNavigator}
            options={{ headerShown: false }} />

          <Stack.Screen 
          name='Signup'
          component={SignupScreen}
          options={{headerShown: false}}
          />

        </Stack.Navigator>

      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
