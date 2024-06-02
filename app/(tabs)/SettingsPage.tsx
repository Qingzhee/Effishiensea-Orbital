import React from 'react';
import { View } from 'react-native';
import Logout from './components/Logout';

export default function Settings() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Logout />
    </View>
  );
}
