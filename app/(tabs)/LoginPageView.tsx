import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import EmailTextbox from './components/EmailTextbox';
import PwTextbox from './components/PwTextbox';
import LoginButton from './components/LoginButton';
import CreateAccount from './components/CreateAccount';
import ForgotYourPassword from './components/ForgotYourPassword';
const logoImg = require('../../assets/Logo.png');

const LoginView = ({ email, setEmail, password, setPassword, navigation, signIn }) => {
  return (
    <View style={styles.container}>
      <Image source={logoImg} style={styles.logo} />
      <Text style={styles.welcomeText}>Welcome Back</Text>
      <Text style={styles.login}>Log into your account</Text>
      <EmailTextbox email={email} setEmail={setEmail} />
      <PwTextbox password={password} setPassword={setPassword}/>
      <LoginButton navigation={navigation} signIn={signIn} />
      <Text style={styles.login}>OR</Text>
      <Text>Don't have an Account? <CreateAccount navigation={navigation}/> </Text>
      <ForgotYourPassword navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50
  },
  logo: {
    width: 450,
    height: 450,
    resizeMode: 'contain',
    marginLeft: 20,
  },
  welcomeText: {
    fontSize: 35,
    color: '#000',
    fontWeight: 'bold',
    marginTop: -80,
  },
  login: {
    fontSize: 20,
  },
});

export default LoginView;
