import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EyeIcon from 'react-native-vector-icons/Feather';
import { registerUser } from '../helper/LocalStorage';

// import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignupScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSignup = async () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Please fill all fields');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Passwords do not match');
            return;
        }

        try {
            await registerUser({ name, email, password })
            navigation.reset({ index: 0, routes: [{ name: 'Login' }] })
        } catch (error) {
            Alert.alert("Login Error")
        }
        // Alert.alert('Account Created!', `Welcome, ${name}`);
        // navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Create Account</Text>

            <View style={styles.inputContainer}>
                <Icon name="person" size={24} color="#666" style={styles.icon} />
                <TextInput
                    placeholder="Name"
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />
            </View>

            <View style={styles.inputContainer}>
                <Icon name="email" size={24} color="#666" style={styles.icon} />
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
            </View>

            <View style={styles.inputContainer}>
                <Icon name="lock" size={24} color="#666" style={styles.icon} />
                <TextInput
                    placeholder="Password"
                    style={styles.input}
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <EyeIcon name={showPassword ? 'eye' : 'eye-off'} size={22} color="#666" />
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <Icon name="lock-outline" size={24} color="#666" style={styles.icon} />
                <TextInput
                    placeholder="Confirm Password"
                    style={styles.input}
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <EyeIcon name={showConfirmPassword ? 'eye' : 'eye-off'} size={22} color="#666" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            })}>
                <Text style={styles.link}>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30,
        alignSelf: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eee',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        height: 50,
        color: "black"
    },
    button: {
        backgroundColor: '#4a90e2',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    link: {
        color: '#4a90e2',
        marginTop: 20,
        alignSelf: 'center',
        fontSize: 14,
    },
});
