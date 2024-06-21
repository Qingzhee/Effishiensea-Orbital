import React, { useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import UserModel from './Models/UserModel';
import CreateAccountView from './CreateAccPageView';

const CreateAccountController = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSignUp = async () => {
    try {
      await UserModel.signUp(email, password, username);
      setIsSuccess(true);
      Keyboard.dismiss();
    } catch (error) {
      setIsSuccess(false);
      console.error('Sign up failed: ', error);
      Alert.alert('Sign up failed', error.message);
    }
  };

  const handleContinue = () => {
    setIsSuccess(false);
    navigation.navigate('Login');
  };

  return (
    <CreateAccountView
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      username={username}
      setUsername={setUsername}
      handleSignUp={handleSignUp}
      isSuccess={isSuccess}
      handleContinue={handleContinue}
      navigation={navigation}
    />
  );
};

export default CreateAccountController;
