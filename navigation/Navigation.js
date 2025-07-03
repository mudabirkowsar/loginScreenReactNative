import React from 'react'
import LoginScreen from '../screens/LoginScreen'
import AuthCheck from '../middleware/AuthCheck'
import DrawerNavigator from './DrawerNavigator'
import SignupScreen from '../screens/SignupScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ForgotPassword from '../screens/ForgotPassword'
import AddUserScreen from '../screens/AddUserScreen'
import ShowUserDetailScreen from '../screens/ShowUserDetailScreen'
import UpdateUserScreen from '../screens/UpdateUserScreen'

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

            <Stack.Screen
                name="Add User"
                component={AddUserScreen}
                options={{
                    headerShown: true,
                    title: 'Add User', 
                    headerStyle: {
                        backgroundColor:"tomato",
                    },
                    headerTitleStyle: {
                        color:"black" 
                    },
                    headerTintColor: 'black', 
                    headerTitleAlign: 'left',
                }}
            />

            <Stack.Screen
                name="User Detail"
                component={ShowUserDetailScreen}
                options={{
                    headerShown: true,
                    title: 'User Detail',
                    headerStyle: {
                        backgroundColor:"tomato",
                    },
                    headerTitleStyle: {
                        color:"black" 
                    },
                    headerTintColor: 'black', 
                    headerTitleAlign: 'left', 
                }}
            />

            <Stack.Screen
                name="UpdateUser"
                component={UpdateUserScreen}
                options={{
                    headerShown: true,
                    title: 'Update',
                    headerStyle: {
                        backgroundColor:"tomato",
                    },
                    headerTitleStyle: {
                        color:"black" 
                    },
                    headerTintColor: 'black', 
                    headerTitleAlign: 'left', 
                }}
            />

        </Stack.Navigator>
    )
}