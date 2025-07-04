import AsyncStorage from '@react-native-async-storage/async-storage';


export const saveUser = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.log("Error in adding user")
    }
}
export const loadData = async (key) => {
    try {
        const data = await AsyncStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.log("Error in fetching user", error);
        return null;
    }
};

export const deleteUserByUsername = async (usernameToDelete) => {
    try {
        const data = await AsyncStorage.getItem('users');
        const users = data ? JSON.parse(data) : [];
        const updatedUsers = users.filter(user => user.username !== usernameToDelete);
        await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
        console.log(`User "${usernameToDelete}" deleted successfully`);
    } catch (error) {
        console.log("❌ Error deleting user: ", error);
    }
};

export const updateUserByUsername = async (username, updatedUser) => {
  try {
    const users = JSON.parse(await AsyncStorage.getItem('users')) || [];

    const newUsers = users.map(user =>
      user.username === username ? updatedUser : user
    );

    await AsyncStorage.setItem('users', JSON.stringify(newUsers));
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

