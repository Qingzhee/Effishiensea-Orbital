import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Logout() {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Navigate to login screen
    navigation.navigate('Login');
  };

  return (
    <Button title="Log Out" onPress={handleLogout} />
  );
}
