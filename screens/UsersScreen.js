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
            <Text>Email: {item.email}</Text>
            <Text>Role: {item.role}</Text>
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
        <View style={{ flex: 1 }}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search by name or email"
                placeholderTextColor="gray"
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
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        padding: 16,
    },
    searchInput: {
        height: 45,
        marginHorizontal: 16,
        marginBottom: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        marginTop: 30,
    },
    card: {
        backgroundColor: '#f1f1f1',
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
        elevation: 2,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
