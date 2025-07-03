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
import { loadData, saveUser } from '../helper/storage';

export default function AddUserScreen() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [smallDescription, setSmallDescription] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [updatedUserr, setUpdatedUserr] = useState([])
  const [isModalVisible, setModalVisible] = useState(false);
  const [showError, setShowError] = useState(false);

  const followers = Math.floor(Math.random() * (1500 - 1 + 1)) + 1;
  const following = Math.floor(Math.random() * (100 - 1 + 1)) + 1;

  setTimeout(() => {
    setShowError(false)
  }, 5000);

  const handleSubmit = async () => {
    if (
      !name ||
      !username ||
      !imageLink ||
      !backgroundImage ||
      !smallDescription
    ) {
      setShowError(true);
      return;
    }

    const newUser = {
      name,
      username,
      imageLink,
      backgroundImage,
      followers: parseInt(followers),
      following: parseInt(following),
      smallDescription,
    };

    try {
      const existingUser = await loadData('users') || [];
      const updatedUser = [...existingUser, newUser]
      setUpdatedUserr(updatedUser)
      setModalVisible(true);

    } catch (error) {
      Alert.alert("Error in adding user ")
    }


  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.mainContainer}
    >

      {
        showError && (
          <View style={styles.errContainer}>
            <Text style={styles.errText}>⚠️ Add all the fields</Text>
          </View>
        )
      }

      {isModalVisible && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add User</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to Add <Text style={{ fontWeight: 'bold' }}>{name}</Text>?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#6c757d' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#78dc78' }]}
                onPress={async () => {
                  await saveUser('users', updatedUserr);
                  setModalVisible(false);
                  setName("");
                  setUsername("");
                  setImageLink("");
                  setBackgroundImage("");
                  setSmallDescription("");
                  navigation.goBack();
                }}
              >
                <Text style={[styles.modalBtnText, { color: 'black' }]}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
            autoCapitalize='none'
          />

          <TextInput
            placeholder="Enter Profile Image Link"
            style={styles.input}
            onChangeText={setImageLink}
            multiline
            value={imageLink}
            placeholderTextColor="black"
          />

          <TextInput
            placeholder="Enter Background Image Link"
            style={styles.input}
            onChangeText={setBackgroundImage}
            multiline
            value={backgroundImage}
            placeholderTextColor="black"
          />

          {/* <View style={styles.followerFollowingView}>
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
          </View> */}

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
    backgroundColor: "#f0f4f7",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  UserDetailText: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  TextBoxView: {
    gap: 20,
  },
  input: {
    borderWidth: 0,
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
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
    height: 90,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  submitButton: {
    width: "90%",
    backgroundColor: "#28a745",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  textBtn: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },


  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  errContainer: {
    backgroundColor: '#fdecea',
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#f44336',
  },
  errText: {
    color: '#b71c1c',
    fontSize: 15,
    fontWeight: '500',
  },
});

