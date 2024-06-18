import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../Firebase/FirebaseConfig';
import SuccessAlert from './SuccessAlert';
import UserModel from './../Models/UserModel';

export default function SignUpButton({ navigation, email, password, username }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const auth = FIREBASE_AUTH;

  const signUp = (email, password, username) => {
    UserModel.signUp(email, password, username)
      .then(() => {
        setIsSuccess(true)
        Keyboard.dismiss();
      })
      .catch((error) => {
        setIsSuccess(false);
        console.error('Sign up failed: ', error);
        alert('Sign up failed: ' + error.message);
      });
  }

  const handleContinue = () => {
    setIsSuccess(false);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.loginContainer}>
      {isSuccess ? (
        <SuccessAlert onContinue={handleContinue} message="Congratulations, your account has been successfully created." />
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => signUp(email, password, username)}>
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
    alignItems: 'center',
  },
  button: {
    width: 220,
    paddingVertical: 10,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
