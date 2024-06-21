import React, { useState } from 'react';
import LoginView from './LoginPageView';

const LoginController = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <LoginView
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      navigation={navigation}
    />
  );
};

export default LoginController;
