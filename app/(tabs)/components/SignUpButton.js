import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../Firebase/FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection } from 'firebase/firestore';
import SuccessAlert from './SuccessAlert';

export default function SignUpButton({ navigation, email, password, username }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const auth = FIREBASE_AUTH;

  const signUp = async () => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const userRef = doc(FIREBASE_DB, 'Users', response.user.uid);
      await setDoc(userRef, {
        email: email,
        username: username,
        tokens: 0,
      });
      const fishesRef = collection(userRef, 'Fishes');
      const newFishDoc = doc(fishesRef);
      await setDoc(newFishDoc, {
        type: 'clownfish',
      });

      setIsSuccess(true);
    } catch (error) {
      console.error('Sign up failed: ', error);
      alert('Sign up failed: ' + error.message);
    }
  };

  const handleContinue = () => {
    setIsSuccess(false);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.loginContainer}>
      {isSuccess ? (
        <SuccessAlert onContinue={handleContinue} message="Congratulations, your account has been successfully created." />
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
