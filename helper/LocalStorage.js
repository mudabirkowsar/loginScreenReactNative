// import AsyncStorage from '@react-native-async-storage/async-storage';

// const USER_KEY = 'user'

// export const registerUser = async (newUser) => {
//   try {
//     const usersJSON = await AsyncStorage.getItem(USER_KEY)
//     const users = usersJSON ? JSON.parse(usersJSON) : [];
//     const existing = users.find(u => u.email === newUser.email);

//     if (existing) {
//       console.log("Error")
//       return
//     }

//     users.push(newUser)
//     await AsyncStorage.setItem(USER_KEY, JSON.stringify(users));
//     return true

//   } catch (error) {
//     console.log(error)
//   }
// }

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

const BASE_URL = 'https://mobile.faveodemo.com/mudabir/public';

export const LoginUser = async (email, password) => {
  try {
    const url = `${BASE_URL}/v3/api/login`;
    const response = await axios.post(url, null, {
      params: {
        email,
        password,
      },
    })

    const fakeToken = `Mudabir`;
    await AsyncStorage.setItem('auth_token', fakeToken);

    console.log("Login successful")
    return response.data;
  } catch (error) {
    console.log(error)
    throw error;
  }
}


export const forgotPassword = async () => {
  try {
    const url = `${BASE_URL}/api/password/email`
    const response = await axios.post(url, null, {
      params: { email }
    })
    return response;
  } catch (error) {
    console.log("Error", error);
  }
}