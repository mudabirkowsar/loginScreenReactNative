import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const UserListScreen = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);

    const navigation = useNavigation();

    const fetchUsers = async (pageNumber = 1) => {
        try {
            const token = await AsyncStorage.getItem('auth_token');
            if (!token) return console.warn('Token not found');

            const res = await axios.get(
                `https://mobile.faveodemo.com/mudabir/public/v3/user-export-data`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        'roles[0]': 'user',
                        'roles[1]': 'agent',
                        'sort-order': 'desc',
                        'search-query': '',
                        limit: 10,
                        page: pageNumber,
                    },
                }
            );

            const newUsers = res.data?.data?.data || [];
            setUsers((prev) => (pageNumber === 1 ? newUsers : [...prev, ...newUsers]));
            setHasMore(newUsers.length > 0);
            console.log(users)
        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
            setIsFetchingMore(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const loadMore = () => {
        if (hasMore && !isFetchingMore) {
            setIsFetchingMore(true);
            const nextPage = page + 1;
            setPage(nextPage);
            fetchUsers(nextPage);
        }
    };

    const handleCardPress = (user) => {
        navigation.navigate('UserDetail', { user }); // Pass user to detail screen
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleCardPress(item)} style={styles.card}>
            <Text style={styles.name}>{item.first_name} {item.last_name}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Role: {item.role}</Text>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading users...</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={users}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
                isFetchingMore ? (
                    <View style={styles.footer}>
                        <ActivityIndicator size="small" />
                        <Text>Loading more...</Text>
                    </View>
                ) : null
            }
        />
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
    footer: {
        paddingVertical: 16,
        alignItems: 'center',
    },
});
