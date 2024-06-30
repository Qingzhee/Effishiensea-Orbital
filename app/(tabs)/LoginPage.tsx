import React, { useState } from 'react';
import LoginView from './LoginPageView';
import UserModel from './Models/UserModel';

const LoginController = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = (email, password) => {
    UserModel.signIn(email, password)
      .then(() => {
        navigation.navigate('Screens');
      }).catch((error) => {
        console.error(error);
        alert("Sign in failed: " + error.message);
      });
  }

  return (
    <LoginView
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      signIn={() => signIn(email, password)}
      navigation={navigation}
    />
  );
};

export default LoginController;
