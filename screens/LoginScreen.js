import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EyeIcon from 'react-native-vector-icons/Feather';
import { LoginUser } from '../helper/LocalStorage';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {

        if (!email || !password) {
            Alert.alert("Please Enter All Details")
            return
        }

        try {
            const response = await LoginUser(email, password);
            navigation.reset({
                index: 0,
                routes: [{ name: 'Drawer' }],
            });
        } catch (error) {
            console.log("Error in login")
            Alert.alert("Error Login")
        }

    };

    const openSignupScreen = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Signup' }],
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Login</Text>

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
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <EyeIcon
                        name={showPassword ? 'eye' : 'eye-off'}
                        size={22}
                        color="#666"
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                <Text style={styles.link}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleLogin} >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={openSignupScreen}>
                <Text style={styles.link}>Don't have an account? Create one</Text>
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
        marginHorizontal: 8,
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
        marginTop: 15,
        alignSelf: 'center',
        fontSize: 14,
    },
});
