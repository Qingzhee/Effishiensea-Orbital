import React from 'react';
import { KeyboardAvoidingView, StyleSheet, TextInput, Platform } from 'react-native';

export default function UsernameTextbox({ username, setUsername }) {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    paddingLeft: 10,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    fontSize: 16,
    width: 250,
  },
});
