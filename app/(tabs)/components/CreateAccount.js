import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CreateAccount({ navigation }) {
  const handlePress = () => {
    navigation.navigate('CreateAcc');
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.text}>Create Account</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});
