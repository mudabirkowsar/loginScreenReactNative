import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

export default function AddUserScreen() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [smallDescription, setSmallDescription] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");

  const handleSubmit = () => {
    if (
      !name ||
      !username ||
      !imageLink ||
      !backgroundImage ||
      !followers ||
      !following ||
      !smallDescription
    ) {
      Alert.alert("Validation Error", "Please fill in all fields.");
      return;
    }

    const user = {
      name,
      username,
      imageLink,
      backgroundImage,
      followers: parseInt(followers),
      following: parseInt(following),
      smallDescription,
    };

    console.log("User Data Submitted:", user);
    Alert.alert("Success", "User added successfully!");

    setName("");
    setUsername("");
    setImageLink("");
    setBackgroundImage("");
    setFollowers("");
    setFollowing("");
    setSmallDescription("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.mainContainer}
    >
      <Text style={styles.UserDetailText}>Enter User Details</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.TextBoxView}>
          <TextInput
            placeholder="Enter Name"
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholderTextColor="black"
          />

          <TextInput
            placeholder="Enter Username"
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            placeholderTextColor="black"
          />

          <TextInput
            placeholder="Enter Profile Image Link"
            style={styles.input}
            onChangeText={setImageLink}
            value={imageLink}
            placeholderTextColor="black"
          />

          <TextInput
            placeholder="Enter Background Image Link"
            style={styles.input}
            onChangeText={setBackgroundImage}
            value={backgroundImage}
            placeholderTextColor="black"
          />

          <View style={styles.followerFollowingView}>
            <TextInput
              placeholder="Followers"
              style={[styles.input, styles.flexInput]}
              onChangeText={setFollowers}
              value={followers}
              placeholderTextColor="black"
              keyboardType="number-pad"
            />

            <TextInput
              placeholder="Following"
              style={[styles.input, styles.flexInput]}
              onChangeText={setFollowing}
              value={following}
              placeholderTextColor="black"
              keyboardType="number-pad"
            />
          </View>

          <TextInput
            placeholder="Enter Small Description"
            style={styles.input}
            onChangeText={setSmallDescription}
            value={smallDescription}
            placeholderTextColor="black"
            multiline
          />
        </View>
      </ScrollView>

      <View style={styles.btnsView}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.textBtn}>Submit</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  UserDetailText: {
    fontSize: 23,
    fontWeight: "600",
    marginBottom: 10,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  TextBoxView: {
    gap: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    padding: 15,
    fontSize: 16,
    backgroundColor: "#fff"
  },
  followerFollowingView: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  flexInput: {
    flex: 1,
  },
  btnsView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    width: "90%",
    backgroundColor: "#28a745",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  textBtn: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
