import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserDetailScreen = ({ route }) => {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user.first_name} {user.last_name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Role: {user.role}</Text>
      {/* Add more details if available */}
    </View>
  );
};

export default UserDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10
  }
});
