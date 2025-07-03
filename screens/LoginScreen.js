import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EyeIcon from 'react-native-vector-icons/Feather';
import { LoginUser } from '../helper/LocalStorage';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showError, setShowError] = useState(false)
    const [errMessage, setErrMessage] = useState("")

    setTimeout(() => {
        setShowError(false);
    }, 5000);

    const handleLogin = async () => {
        if (!email || !password) {
            setShowError(true)
            setErrMessage("Please enter both email and password")
            return;
        }

        try {
            const response = await LoginUser(email, password);
            navigation.reset({
                index: 0,
                routes: [{ name: 'Drawer' }],
            });
        } catch (error) {
            setShowError(true)
            console.log("Error in login:", error);
            setErrMessage("Login Failed, Invalid email or password.")
        }
    };

    const openSignupScreen = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Signup' }],
        });
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >

            <Text style={styles.heading}>Welcome Back 👋</Text>
            <Text style={styles.subheading}>Please login to continue</Text>

            <View style={styles.inputContainer}>
                <Icon name="email" size={22} color="#888" style={styles.icon} />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    placeholderTextColor="#aaa"
                    keyboardType="email-address"
                    autoCapitalize='none'
                />
            </View>

            <View style={styles.inputContainer}>
                <Icon name="lock" size={22} color="#888" style={styles.icon} />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    style={styles.input}
                    placeholderTextColor="#aaa"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <EyeIcon
                        name={showPassword ? 'eye' : 'eye-off'}
                        size={20}
                        color="#888"
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>

            {
                showError && (
                    <View style={styles.errContainer}>
                        <Text style={styles.errText}>⚠️ {errMessage}</Text>
                    </View>
                )
            }

            <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={openSignupScreen}>
                <Text style={styles.signupText}>
                    Don’t have an account? <Text style={styles.signupLink}>Sign up</Text>
                </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f8fc',
        paddingHorizontal: 25,
        justifyContent: 'center',
    },
    heading: {
        fontSize: 28,
        fontWeight: '700',
        color: '#222',
        textAlign: 'center',
        marginBottom: 8,
    },
    subheading: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 15,
        marginBottom: 20,
        height: 55,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    forgotText: {
        textAlign: 'right',
        color: '#4a90e2',
        marginBottom: 25,
        fontSize: 14,
    },
    button: {
        backgroundColor: '#4a90e2',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    signupText: {
        textAlign: 'center',
        marginTop: 25,
        fontSize: 14,
        color: '#333',
    },
    signupLink: {
        color: '#4a90e2',
        fontWeight: '600',
    },

    errContainer: {
        backgroundColor: '#fdecea',
        padding: 12,
        marginVertical: 10,
        borderRadius: 8,
        borderLeftWidth: 5,
        borderLeftColor: '#f44336',
    },
    errText: {
        color: '#b71c1c',
        fontSize: 15,
        fontWeight: '500',
    },
});
