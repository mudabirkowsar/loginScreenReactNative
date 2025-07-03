import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function LogoutScreen({ navigation }) {

    const handleLogout = async () => {
        await AsyncStorage.clear(); // or remove specific user data
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/1828/1828479.png" }}
                style={styles.logoutImage}
            />

            <Text style={styles.heading}>Are you sure you want to log out?</Text>
            <Text style={styles.subtext}>We'll miss you! Come back soon.</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.cancelBtn]}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.logoutBtn]}
                    onPress={handleLogout}
                >
                    <Text style={[styles.buttonText, { color: '#fff' }]}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f7',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    logoutImage: {
        width: 120,
        height: 120,
        marginBottom: 30,
    },
    heading: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtext: {
        fontSize: 15,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 15,
    },
    button: {
        paddingVertical: 14,
        paddingHorizontal: 25,
        borderRadius: 10,
        minWidth: 120,
        alignItems: 'center',
        elevation: 2,
    },
    cancelBtn: {
        backgroundColor: '#e0e0e0',
    },
    logoutBtn: {
        backgroundColor: '#e53935',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});
