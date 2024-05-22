import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SignUpButton() {
  return (
    <View style={styles.loginContainer}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
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
