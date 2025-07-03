// screens/UpdateUserScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { updateUserByUsername } from '../helper/storage'; // You need to implement this if not already done

export default function UpdateUserScreen({ route, navigation }) {
    const { item } = route.params;

    const [name, setName] = useState(item.name);
    const [imageLink, setImageLink] = useState(item.imageLink);
    const [smallDescription, setSmallDescription] = useState(item.smallDescription);
    const [backgroundImage, setBackgroundImage] = useState(item.backgroundImage)

    const handleUpdate = async () => {
        const updatedUser = {
            ...item,
            name,
            imageLink,
            smallDescription
        };

        await updateUserByUsername(item.username, updatedUser);
        Alert.alert("Success", "User updated successfully");
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name:</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />

            <Text style={styles.label}>Image URL:</Text>
            <TextInput style={styles.input} value={imageLink} onChangeText={setImageLink} />

            <Text style={styles.label}>Background Image  URL:</Text>
            <TextInput style={styles.input} value={backgroundImage} onChangeText={setBackgroundImage} />

            <Text style={styles.label}>Short Description:</Text>
            <TextInput style={styles.input} value={smallDescription} onChangeText={setSmallDescription} />

            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: 'white', flex: 1 },
    label: { fontSize: 16, fontWeight: '600', marginTop: 15 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginTop: 5
    },
    button: {
        marginTop: 30,
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center'
    },
    buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});
