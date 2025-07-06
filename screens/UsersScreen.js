import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const UserListScreen = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const navigation = useNavigation();

    const fetchUsers = async (query = '') => {
        try {
            const token = await AsyncStorage.getItem('auth_token');
            if (!token) {
                console.warn('Token not found');
                return;
            }

            const response = await axios.get(
                'https://mobile.faveodemo.com/mudabir/public/v3/user-export-data',
                {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        'roles[0]': 'user',
                        'roles[1]': 'agent',
                        'sort-order': 'desc',
                        'search-query': query,
                        limit: 10,
                        page: 1,
                    },
                }
            );

            const fetchedUsers = response.data?.data?.data || [];
            setUsers(fetchedUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSearch = (text) => {
        setSearchQuery(text);
        fetchUsers(text);
    };

    const handleCardPress = (user) => {
        navigation.navigate('UserDetail', { user });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleCardPress(item)} style={styles.card}>
            <Text style={styles.name}>{item.first_name} {item.last_name}</Text>
            <Text style={styles.email}>Email: {item.email}</Text>
            <Text style={styles.role}>Role: {item.role}</Text>
        </TouchableOpacity>
    );

    if (loading && users.length === 0) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading users...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>All Users</Text>

            <TextInput
                style={styles.searchInput}
                placeholder="Search by name or email"
                placeholderTextColor="#888"
                value={searchQuery}
                onChangeText={handleSearch}
            />

            <FlatList
                data={users}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <View style={styles.center}>
                        <Text>No users found</Text>
                    </View>
                }
            />
        </View>
    );
};

export default UserListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
        color: '#2c3e50',
    },
    searchInput: {
        height: 48,
        marginHorizontal: 16,
        marginBottom: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#ffffff',
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    listContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 20,
        marginBottom: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: '#555',
        marginBottom: 2,
    },
    role: {
        fontSize: 13,
        color: '#888',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
});
