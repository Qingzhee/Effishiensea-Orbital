import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, TextInput, Modal } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB, FIREBASE_STORAGE } from './../Firebase/FirebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged, updatePassword } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import Logout from './components/Logout';

export default function Settings() {
  const [userData, setUserData] = useState({ email: '', username: '', profilepicture: '' });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState({ username: false, password: false });

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const userDoc = await getDoc(doc(FIREBASE_DB, 'Users', userId));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        fetchUserData(user.uid);
      } else {
        console.log('No user is signed in.');
      }
    });

    return () => unsubscribe();
  }, []);

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access gallery is required!');
    }
  };

  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access gallery is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;  // Access the URI correctly
      console.log('Image selected: ', uri);
      if (uri) {
        uploadImage(uri);
      } else {
        console.log('No image URI found.');
      }
    } else {
      console.log('Image picker was canceled');
    }
  };

  const uploadImage = async (uri) => {
    const user = FIREBASE_AUTH.currentUser;
    if (!user) {
      Alert.alert('No user is signed in.');
      return;
    }

    try {
      console.log('Uploading image: ', uri);
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      console.log('Blob created: ', blob);

      const storageRef = ref(FIREBASE_STORAGE, `profilepictures/${user.uid}`);

      await uploadBytes(storageRef, blob);
      console.log('Image uploaded to Firebase Storage');

      const downloadURL = await getDownloadURL(storageRef);
      console.log('Download URL: ', downloadURL);

      await updateDoc(doc(FIREBASE_DB, 'Users', user.uid), { profilepicture: downloadURL });

      setUserData((prevData) => ({ ...prevData, profilepicture: downloadURL }));
      Alert.alert('Profile picture updated successfully!');
    } catch (error) {
      console.error('Error uploading image: ', error);
      Alert.alert('Error uploading image: ' + error.message);
    }
  };

  const handleChangeUsername = async () => {
    const user = FIREBASE_AUTH.currentUser;
    if (!user) {
      Alert.alert('No user is signed in.');
      return;
    }

    try {
      await updateDoc(doc(FIREBASE_DB, 'Users', user.uid), { username });
      setUserData((prevData) => ({ ...prevData, username }));
      Alert.alert('Username updated successfully!');
      setModalVisible({ ...modalVisible, username: false });
    } catch (error) {
      console.error('Error updating username: ', error);
      Alert.alert('Error updating username: ' + error.message);
    }
  };

  const handleChangePassword = async () => {
    const user = FIREBASE_AUTH.currentUser;
    if (!user) {
      Alert.alert('No user is signed in.');
      return;
    }

    try {
      await updatePassword(user, password);
      Alert.alert('Password updated successfully!');
      setModalVisible({ ...modalVisible, password: false });
    } catch (error) {
      console.error('Error updating password: ', error);
      Alert.alert('Error updating password: ' + error.message);
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profilePicture}
          source={userData.profilepicture ? { uri: userData.profilepicture } : require('../../assets/profilepicstock.jpg')}
        />
        <Text style={styles.profileName}>{userData.username}</Text>
        <Text style={styles.profileEmail}>{userData.email}</Text>
      </View>
      <TouchableOpacity style={styles.settingOption} onPress={handlePickImage}>
        <Text>Change Profile Picture</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingOption} onPress={() => setModalVisible({ ...modalVisible, username: true })}>
        <Text>Change Username</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingOption} onPress={() => setModalVisible({ ...modalVisible, password: true })}>
        <Text>Change Password</Text>
      </TouchableOpacity>
      <Logout />

      <Modal visible={modalVisible.username} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Enter new username"
              value={username}
              onChangeText={setUsername}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleChangeUsername}>
              <Text>Update Username</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible({ ...modalVisible, username: false })}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={modalVisible.password} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Enter new password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleChangePassword}>
              <Text>Update Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible({ ...modalVisible, password: false })}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 16,
    color: 'gray',
  },
  settingOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButton: {
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
});
