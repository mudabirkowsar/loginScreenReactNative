import { View, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function AuthCheck({ navigation }) {
    useEffect(() => {
        const checkLogin = async () => {
            const token = await AsyncStorage.getItem('auth_token');

            if (token) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Drawer" }]
                })
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Login" }]
                })
            }
        }
        checkLogin();
    }, [])
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#4a90e2" />
        </View>
    )
}