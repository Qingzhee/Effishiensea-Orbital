import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FIREBASE_AUTH } from "../../Firebase/FirebaseConfig";
import UserModel from './../Models/UserModel';

export default function LoginButton({ navigation, email, password }) {
  const auth = FIREBASE_AUTH;

  const signIn = (email, password) => {
    UserModel.signIn(email, password)
      .then(() => {
        navigation.navigate('Screens');
      }).catch((error) => {
        console.error(error);
        alert("Sign in failed: " + error.message);
      });
  }

  return (
    <View style={styles.loginContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => signIn(email, password)}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    marginTop: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center', // Center the button horizontally
  },
  button: {
    width: 220, // Set the desired width
    paddingVertical: 10,
    backgroundColor: '#007AFF',
    borderRadius: 10, // Curve the edges
    alignItems: 'center', // Center the text inside the button
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
