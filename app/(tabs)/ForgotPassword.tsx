import React, { useState } from 'react';
import ForgotPasswordView from './ForgotPasswordView';

const ForgotPasswordController = ({ navigation }) => {
  const [email, setEmail] = useState('');

  return (
    <ForgotPasswordView
      email={email}
      setEmail={setEmail}
      navigation={navigation}
    />
  );
};

export default ForgotPasswordController;
