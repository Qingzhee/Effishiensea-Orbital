import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CreateAccount({ navigation }) {
  const handlePress = () => {
    navigation.navigate('Login');
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.text}>Log in</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});