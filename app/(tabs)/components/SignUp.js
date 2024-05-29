import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import SuccessAlert from './SuccessAlert'; // Adjust the import path as necessary

export default function SignUpButton({ navigation, user, password }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const auth = FIREBASE_AUTH;

  const signUp = async () => {
    try {
      const response = await createUserWithEmailAndPassword(auth, user, password);
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Sign up failed: " + error.message);
    }
  };

  const handleContinue = () => {
    setIsSuccess(false);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.loginContainer}>
      {isSuccess ? (
        <SuccessAlert onContinue={handleContinue} message="Congratulations, your account has been successfully created."/>
      ) : (
        <TouchableOpacity style={styles.button} onPress={signUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    marginTop: 20,
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
