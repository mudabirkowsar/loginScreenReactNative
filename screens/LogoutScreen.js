import React from 'react';
import { View, Text, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LogoutScreen({ navigation }) {

    const handleLogout = () => {
        Alert.alert(
            'Confirm Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Logout cancelled'),
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    onPress: async () => {
                        await AsyncStorage.clear(); // or remove specific user data
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }],
                        });
                    },
                    style: 'destructive'
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.message}>Are you sure you want to logout?</Text>

            <TouchableOpacity style={styles.button} onPress={handleLogout} >
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
        backgroundColor: '#fff',
    },
    message: {
        fontSize: 18,
        marginBottom: 20,
    },
    
    button: {
        backgroundColor: '#fc1414e4',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 15,
    },
    buttonText: {
        color: '#fff',
        fontWeight:"bold",
        fontSize: 16,
        letterSpacing: 2,
    },
});
