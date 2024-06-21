import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import EmailTextbox from './components/EmailTextbox';
import PwTextbox from './components/PwTextbox';
import UsernameTextbox from './components/UsernameTextbox';
import SuccessAlert from './components/SuccessAlert';
import LogIn from './components/LogIn';
import ForgotYourPassword from './components/ForgotYourPassword';

const CreateAccountView = ({
  email,
  setEmail,
  password,
  setPassword,
  username,
  setUsername,
  handleSignUp,
  isSuccess,
  handleContinue,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.register}>Register</Text>
      <Text style={styles.text}>Create your new account</Text>
      <EmailTextbox email={email} setEmail={setEmail} />
      <UsernameTextbox username={username} setUsername={setUsername} />
      <PwTextbox password={password} setPassword={setPassword} />
      {isSuccess ? (
        <SuccessAlert onContinue={handleContinue} message="Congratulations, your account has been successfully created." />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.text1}>OR</Text>
      <Text>Already have an Account? <LogIn navigation={navigation} /> </Text>
      <ForgotYourPassword navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  register: {
    fontSize: 35,
    color: '#000',
    fontWeight: 'bold',
    marginTop: -80,
  },
  text: {
    fontSize: 20,
    marginBottom: 50
  },
  text1: {
    fontSize: 20,
  },
  button: {
    width: 220,
    paddingVertical: 10,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CreateAccountView;
