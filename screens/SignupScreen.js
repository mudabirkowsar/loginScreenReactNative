import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EyeIcon from 'react-native-vector-icons/Feather';
import { registerUser } from '../helper/LocalStorage';

export default function SignupScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errMessage, setErrMessage] = useState("")
    const [showError, setShowError] = useState(false)

    const handleSignup = async () => {
        if (!name || !email || !password || !confirmPassword) {
            setErrMessage("Please fill all fields")
            return;
        }
        if (password !== confirmPassword) {
            setErrMessage("Password do not match")
            return;
        }

        try {
            await registerUser({ name, email, password });
            navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        } catch (error) {
            setErrMessage("Failed to create account. Try again")
            Alert.alert('Signup Error', 'Failed to create account. Try again.');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.container}
        >


            {
                showError && (
                    <View style={styles.errContainer}>
                        <Text style={styles.errText}>⚠️ {errMessage}</Text>
                    </View>
                )
            }
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 25 }}>
                <Text style={styles.heading}>Create Account</Text>

                <View style={styles.inputContainer}>
                    <Icon name="person" size={22} color="#888" style={styles.icon} />
                    <TextInput
                        placeholder="Name"
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholderTextColor="#aaa"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="email" size={22} color="#888" style={styles.icon} />
                    <TextInput
                        placeholder="Email"
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        placeholderTextColor="#aaa"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="lock" size={22} color="#888" style={styles.icon} />
                    <TextInput
                        placeholder="Password"
                        style={styles.input}
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
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

                <View style={styles.inputContainer}>
                    <Icon name="lock-outline" size={22} color="#888" style={styles.icon} />
                    <TextInput
                        placeholder="Confirm Password"
                        style={styles.input}
                        secureTextEntry={!showConfirmPassword}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholderTextColor="#aaa"
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                        <EyeIcon
                            name={showConfirmPassword ? 'eye' : 'eye-off'}
                            size={20}
                            color="#888"
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSignup}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() =>
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }],
                        })
                    }
                >
                    <Text style={styles.link}>
                        Already have an account? <Text style={styles.linkHighlight}>Login</Text>
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f8fc',
    },
    heading: {
        fontSize: 28,
        fontWeight: '700',
        color: '#222',
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
        marginTop: 15,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    link: {
        textAlign: 'center',
        marginTop: 25,
        fontSize: 14,
        color: '#333',
    },
    linkHighlight: {
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
