import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import SuccessAlert from './SuccessAlert';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function SendEmailButton({ navigation, user }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const auth = FIREBASE_AUTH;

  const handleContinue = () => {
    setIsSuccess(false);
    navigation.navigate('Login');
  };

  const changePw = async () => {
    try {
      const response = await sendPasswordResetEmail(auth, user).then(() => {setIsSuccess(true)} );
    } catch (error) {
      console.error(error);
      alert("Sign up failed: " + error.message);
    }
  };


  return (
    <View style={styles.loginContainer}>
      {isSuccess ? (
        <SuccessAlert onContinue={handleContinue} message="Password reset! If your email is in our database, you will receive an email shortly!"/>
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