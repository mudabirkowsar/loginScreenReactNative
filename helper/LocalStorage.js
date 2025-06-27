import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'user'

export const registerUser = async (newUser) => {
  try {
    const usersJSON = await AsyncStorage.getItem(USER_KEY)
    const users = usersJSON ? JSON.parse(usersJSON) : [];
    const existing = users.find(u => u.email === newUser.email);

    if (existing) {
      console.log("Error")
      return
    }

    users.push(newUser)
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(users));
    return true

  } catch (error) {
    console.log(error)
  }
}


export const loginUser = async (email, password) => {
  try {
    const usersJSON = await AsyncStorage.getItem(USER_KEY);
    const users = usersJSON ? JSON.parse(usersJSON) : [];

    console.log("Stored users:", users); 

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      console.log("ERROR: No matching user");
      throw new Error("Invalid email or password");
    }

    const fakeToken = `${user.email}Mudabir`;
    await AsyncStorage.setItem('auth_token', fakeToken);
    await AsyncStorage.setItem('logged_in_user', JSON.stringify(user)); // optional

    return { ...user, token: fakeToken };

  } catch (error) {
    console.log("Login Function Error:", error.message);
    throw error;
  }
};
