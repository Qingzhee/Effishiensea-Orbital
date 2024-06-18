import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { FIREBASE_AUTH } from "../../Firebase/FirebaseConfig";
import SuccessAlert from './SuccessAlert';
import UserModel from './../Models/UserModel';

export default function SendEmailButton({ navigation, email }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const auth = FIREBASE_AUTH;

  const handleContinue = () => {
    setIsSuccess(false);
    navigation.navigate('Login');
  };

  const changePw = async () => {
    try {
      UserModel.changePw(email);
      Keyboard.dismiss();
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Password reset failed: " + error.message);
    }
  };

  return (
    <View style={styles.loginContainer}>
      {isSuccess ? (
        <SuccessAlert onContinue={handleContinue} message="Password reset! If your email is in our database, you will receive an email shortly!" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={changePw}>
          <Text style={styles.buttonText}>Send Email</Text>
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
