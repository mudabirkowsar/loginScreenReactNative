import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { deleteUserByUsername } from '../helper/storage'; // Your delete user function

export default function ShowUserDetailScreen({ route, navigation }) {
    const [isModalVisible, setModalVisible] = useState(false);

    const { item } = route.params;
    const bgImage = item.backgroundImage
    const deleteUser = async () => {
        await deleteUserByUsername(item.username);
        setModalVisible(true);
    };


    const updateUser = () => {
        navigation.navigate("UpdateUser", { item })
    }

    return (
        <View style={styles.mainContainer}>
            {isModalVisible && (
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Delete User</Text>
                        <Text style={styles.modalMessage}>
                            Are you sure you want to delete <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>?
                        </Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalBtn, { backgroundColor: '#6c757d' }]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.modalBtnText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalBtn, { backgroundColor: '#dc3545' }]}
                                onPress={async () => {
                                    await deleteUserByUsername(item.username);
                                    setModalVisible(false);
                                    navigation.goBack();
                                }}
                            >
                                <Text style={styles.modalBtnText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}

            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                <ImageBackground
                    source={{ uri: bgImage }}
                    resizeMode="cover"
                    style={styles.bgImage}
                >
                    <View style={styles.imageView}>
                        <Image
                            style={styles.profileImage}
                            source={{ uri: item.imageLink }}
                        />
                    </View>
                </ImageBackground>

                <View style={styles.detailMainContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.username}>@{item.username}</Text>
                    <Text style={styles.desc}>{item.smallDescription}</Text>

                    <View style={styles.followersFollowing}>
                        <Text style={styles.follower}>
                            <Text style={styles.abc}>{item.followers}</Text> Followers
                        </Text>
                        <Text style={styles.following}>
                            <Text style={styles.abc}>{item.following}</Text> Following
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>📍 Location</Text>
                        <Text style={styles.sectionText}>San Francisco, California</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>📝 Bio</Text>
                        <Text style={styles.sectionText}>
                            Passionate full-stack developer with a love for clean UI and scalable architecture.
                            Building innovative digital experiences one line of code at a time.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>🎯 Interests</Text>
                        <Text style={styles.sectionText}>React, Node.js, Open Source, Coffee, UI Design</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.btnsView}>
                <TouchableOpacity style={styles.updateButton} onPress={updateUser}>
                    <Text style={styles.textBtn}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={deleteUser}>
                    <Text style={styles.textBtn}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: "#f7f7f7" },
    bgImage: { height: 220, width: "100%", justifyContent: 'flex-end', paddingBottom: 50 },
    imageView: { alignItems: 'center' },
    profileImage: { height: 110, width: 110, borderRadius: 100, borderWidth: 3, borderColor: "white" },
    detailMainContainer: {
        padding: 15,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -20
    },
    name: { fontSize: 26, fontWeight: "bold", textAlign: "center" },
    username: { fontSize: 18, color: "#555", textAlign: "center", marginBottom: 10 },
    desc: { fontSize: 16, color: "#666", textAlign: "center" },
    followersFollowing: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 15 },
    follower: { fontSize: 16 },
    following: { fontSize: 16 },
    abc: { fontWeight: "bold" },
    btnsView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: '#ccc'
    },
    updateButton: { paddingVertical: 15, paddingHorizontal: 50, backgroundColor: "#28a745", borderRadius: 10 },
    deleteButton: { paddingVertical: 15, paddingHorizontal: 50, backgroundColor: "#dc3545", borderRadius: 10 },
    textBtn: { color: "white", fontWeight: "bold", fontSize: 16 },
    section: { marginTop: 20 },
    sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 5 },
    sectionText: { fontSize: 16, color: '#444' },


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