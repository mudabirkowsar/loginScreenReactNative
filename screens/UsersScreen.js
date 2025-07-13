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
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [isSearchMode, setIsSearchMode] = useState(false);

    const navigation = useNavigation();

    const fetchUsers = async (pageNum = 1, append = false) => {
        if (!append) setLoading(true);
        else setIsFetchingMore(true);

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
                        limit: 10,
                        page: pageNum,
                    },
                }
            );

            const fetchedUsers = response.data?.data?.data || [];

            if (append) {
                setUsers(prev => [...prev, ...fetchedUsers]);
            } else {
                setUsers(fetchedUsers);
            }

            if (fetchedUsers.length < 10) {
                setHasMore(false);
            }

        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
            setIsFetchingMore(false);
        }
    };

    const fetchUserById = async (userId) => {
        setLoading(true);
        setIsSearchMode(true);
        try {
            const token = await AsyncStorage.getItem('auth_token');
            if (!token) {
                console.warn('Token not found');
                return;
            }

            const response = await axios.get(
                `https://mobile.faveodemo.com/mudabir/public/v3/api/get-user/view/${userId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const user = response.data?.data;
            if (user) {
                setUsers([user]);
                setHasMore(false);
            } else {
                setUsers([]);
            }

        } catch (error) {
            console.error('Error fetching user by ID:', error);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSearch = (text) => {
        setSearchQuery(text);
        if (text.trim() === '') {
            setIsSearchMode(false);
            setPage(1);
            setHasMore(true);
            fetchUsers(1, false);
        } else {
            // Treat input as user ID
            fetchUserById(text.trim());
        }
    };

    const fetchMoreUsers = () => {
        if (isSearchMode || !hasMore || isFetchingMore || loading) return;
        const nextPage = page + 1;
        setPage(nextPage);
        fetchUsers(nextPage, true);
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

    const renderFooter = () =>
        isFetchingMore ? (
            <View style={styles.center}>
                <ActivityIndicator size="small" color="#555" />
            </View>
        ) : null;

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
                placeholder="Search by User ID"
                placeholderTextColor="#888"
                value={searchQuery}
                onChangeText={handleSearch}
                keyboardType="numeric"
            />

            <FlatList
                data={users}
                keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                ListFooterComponent={renderFooter}
                onEndReached={fetchMoreUsers}
                onEndReachedThreshold={0.5}
                ListEmptyComponent={
                    !loading && (
                        <View style={styles.center}>
                            <Text>No users found</Text>
                        </View>
                    )
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
