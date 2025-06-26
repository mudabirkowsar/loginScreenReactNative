import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import users from "../data/users.json"
import { ScrollView } from 'react-native-gesture-handler'

export default function UsersScreen() {
    return (
            <ScrollView>
                <SafeAreaView style={styles.mainContainer}>
                    {
                        users.map((item, key) => (
                            <TouchableOpacity key={key}>
                                <View style={styles.container}>
                                    <View style={styles.card}>
                                        <Text style={styles.name}>{item.name}</Text>
                                        <Text style={styles.email}>{item.email}</Text>
                                        <Text style={styles.email}>{item.phone}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </SafeAreaView>
            </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#d3d3d3",
        padding: 10,
        marginTop:0,
    },
    container: {
        // flex: 1,
        padding: 14,
        backgroundColor: '#ecf0f1',
        marginBottom: 12,
        borderRadius: 10,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    card: {
        borderColor: "#222222",
        borderRadius: 12,
    },
    name: {
        fontSize: 19,
        color: '#505050'
    },
    email: {
        fontSize: 15,
    }
})