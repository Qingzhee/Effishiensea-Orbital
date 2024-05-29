import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ForgotYourPassword({ navigation }) {
  const handlePress = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.text}>Forgot your password?</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});
