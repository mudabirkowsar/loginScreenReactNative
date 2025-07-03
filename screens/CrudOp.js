import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useFocusEffect } from '@react-navigation/native';
import { loadData } from '../helper/storage'; // Your AsyncStorage load function
import dummyUsers from "../data/userData.json"


export default function CrudOp({ navigation }) {
    const [userData, setUserData] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const fetchUsers = async () => {
                const data = await loadData('users');
                setUserData(data || []);
            };
            fetchUsers();
        }, [])
    );

    const navigateToAddPage = () => {
        navigation.navigate("Add User");
    };

    const navigateToShowDetailPage = (item) => {
        navigation.navigate("User Detail", { item });
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.btnContainer}>
                <Pressable style={styles.addBtn} onPress={navigateToAddPage}>
                    <AntDesign name="adduser" color="#000" size={24} />
                </Pressable>
            </View>

            <ScrollView>

                {userData.map((item, key) => (
                    <Pressable
                        onPress={() => navigateToShowDetailPage(item)}
                        key={key}
                        style={({ pressed }) => [
                            styles.cardMainContainer,
                            pressed && styles.cardPressed
                        ]}
                    >
                        <View style={styles.imageAndTextView}>
                            <View style={styles.imageView}>
                                <Image style={styles.profileImage} source={{ uri: item.imageLink }} />
                            </View>
                            <View>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.username}>@{item.username}</Text>
                            </View>
                        </View>
                        <Text style={styles.desc}>{item.smallDescription}</Text>
                        <View style={styles.followersFollowing}>
                            <Text style={styles.follower}>
                                <Text style={styles.abc}>{item.followers}</Text> Followers
                            </Text>
                            <Text style={styles.following}>
                                <Text style={styles.abc}>{item.following}</Text> Following
                            </Text>
                        </View>
                    </Pressable>
                ))}

                {dummyUsers.map((item, key) => (
                    <Pressable
                        onPress={() => navigateToShowDetailPage(item)}
                        key={key}
                        style={({ pressed }) => [
                            styles.cardMainContainer,
                            pressed && styles.cardPressed
                        ]}
                    >
                        <View style={styles.imageAndTextView}>
                            <View style={styles.imageView}>
                                <Image style={styles.profileImage} source={{ uri: item.imageLink }} />
                            </View>
                            <View>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.username}>@{item.username}</Text>
                            </View>
                        </View>
                        <Text style={styles.desc}>{item.smallDescription}</Text>
                        <View style={styles.followersFollowing}>
                            <Text style={styles.follower}>
                                <Text style={styles.abc}>{item.followers}</Text> Followers
                            </Text>
                            <Text style={styles.following}>
                                <Text style={styles.abc}>{item.following}</Text> Following
                            </Text>
                        </View>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        padding: 20,
        paddingTop: 5,
        paddingBottom: 0

    },
    btnContainer: {
        alignItems: "flex-end"
    },
    addBtn: {
        width: 60,
        height: 60,
        borderRadius: 50,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#78dc78',
        position: "absolute",
        top: 700,
        zIndex: 1000,
    },
    cardMainContainer: {
        width: '100%',
        borderRadius: 20,
        marginBottom: 10,
        padding: 10,
        backgroundColor: "white",
        elevation: 1,
        transform: [{ scale: 1 }],
    },
    cardPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
    },
    imageAndTextView: {
        flexDirection: "row"
    },
    followersFollowing: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "90%",
        marginTop: 10,
    },
    imageView: {
        borderRadius: 100,
        marginRight: 10
    },
    profileImage: {
        height: 90,
        width: 90,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: "green"
    },
    name: { 
        fontSize: 23, 
        fontWeight: "bold", 
        marginBottom: 4, 
        marginTop: 5 
    },
    username: { 
        fontSize: 16, 
        color: "#0000007e" 
    },
    desc: { 
        fontSize: 17, 
        color: "#0000007d", 
        marginTop: 10, 
        marginLeft: 10 
    },
    follower: { 
        fontSize: 16, 
        marginLeft: 10 
    },
    following: { 
        fontSize: 16, 
        marginLeft: 10 
    },
    abc: { 
        fontWeight: "bold" 
    }
});
