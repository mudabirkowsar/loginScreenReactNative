import React from 'react'
import LoginScreen from '../screens/LoginScreen'
import AuthCheck from '../middleware/AuthCheck'
import DrawerNavigator from './DrawerNavigator'
import SignupScreen from '../screens/SignupScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ForgotPassword from '../screens/ForgotPassword'

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <Stack.Navigator initialRouteName='AuthCheck'
            options={{ headerShown: false }} >

            <Stack.Screen
                name='AuthCheck'
                component={AuthCheck}
                options={{ headerShown: false }} />

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
                options={{ headerShown: false }} />

            <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{ headerShown: false }} />

        </Stack.Navigator>
    )
}