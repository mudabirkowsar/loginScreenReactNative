import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { updateUserByUsername } from '../helper/storage';

export default function UpdateUserScreen({ route, navigation }) {
    const { item } = route.params;

    const [name, setName] = useState(item.name);
    const [imageLink, setImageLink] = useState(item.imageLink);
    const [backgroundImage, setBackgroundImage] = useState(item.backgroundImage);
    const [smallDescription, setSmallDescription] = useState(item.smallDescription);
    const [isModalVisible, setModalVisible] = useState(false);

    const handleUpdate = () => {
        setModalVisible(true);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.container}
        >
            {isModalVisible && (
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Update User</Text>
                        <Text style={styles.modalMessage}>
                            Are you sure you want to update <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>?
                        </Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalBtn, { backgroundColor: '#6c757d' }]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.modalBtnText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalBtn, { backgroundColor: '#78dc78' }]}
                                onPress={async () => {
                                    const updatedUser = {
                                        ...item,
                                        name,
                                        imageLink,
                                        backgroundImage,
                                        smallDescription
                                    };
                                    await updateUserByUsername(item.username, updatedUser);
                                    setModalVisible(false)
                                    navigation.goBack();
                                }}
                            >
                                <Text style={[styles.modalBtnText, { color: 'black' }]}>Update</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            )}

            <Text style={styles.title}>Update User</Text>
            <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput style={styles.input} value={name} onChangeText={setName} />

                    <Text style={styles.label}>Image URL</Text>
                    <TextInput style={styles.input} value={imageLink} onChangeText={setImageLink} />

                    <Text style={styles.label}>Background Image URL</Text>
                    <TextInput style={styles.input} value={backgroundImage} onChangeText={setBackgroundImage} />

                    <Text style={styles.label}>Short Description</Text>
                    <TextInput
                        style={[styles.input, { height: 80 }]}
                        multiline
                        value={smallDescription}
                        onChangeText={setSmallDescription}
                    />
                </View>
            </ScrollView>

            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                    <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f4f7",
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        color: "#333",
        textAlign: "center",
        marginBottom: 20,
    },
    formContainer: {
        gap: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#444',
        marginBottom: 5,
        marginLeft: 5,
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        fontSize: 16,
        color: "#333",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    btnContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 90,
        backgroundColor: '#f9f9f9',
        borderTopWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
    },
    button: {
        width: "90%",
        backgroundColor: "#28a745",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    buttonText: {
        color: "white",
        fontWeight: "600",
        fontSize: 18,
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    modalContainer: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 10,
    },
    modalBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
