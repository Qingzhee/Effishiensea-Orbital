import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import EmailTextbox from './components/EmailTextbox';
import SendEmailButton from './components/SendEmailButton';
import LogIn from './components/LogIn';
import CreateAccount from './components/CreateAccount';

const ForgotPasswordView = ({ email, setEmail, navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.forgot}>Forgot your password?</Text>
      <Text style={styles.text}>Enter your email</Text>
      <EmailTextbox email={email} setEmail={setEmail} />
      <SendEmailButton navigation={navigation} email={email} />
      <Text style={styles.text1}>OR</Text>
      <Text>Already have an Account? <LogIn navigation={navigation} /></Text>
      <Text>Don't have an Account? <CreateAccount navigation={navigation} /></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgot: {
    fontSize: 35,
    color: '#000',
    fontWeight: 'bold',
    marginTop: -80,
  },
  text: {
    fontSize: 20,
    marginBottom: 50,
  },
  text1: {
    fontSize: 20,
  },
});

export default ForgotPasswordView;
