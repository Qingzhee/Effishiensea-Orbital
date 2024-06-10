import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import EmailTextbox from './components/EmailTextbox';
import PwTextbox from './components/PwTextbox';
import UsernameTextbox from './components/UsernameTextbox';
import SignUpButton from './components/SignUpButton';
import LogIn from './components/LogIn';
import ForgotYourPassword from './components/ForgotYourPassword';

export default function CreateAccount({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.register}>Register</Text>
      <Text style={styles.text}>Create your new account</Text>
      <EmailTextbox email={email} setEmail={setEmail} />
      <UsernameTextbox username={username} setUsername={setUsername} />
      <PwTextbox password={password} setPassword={setPassword}/>
      <SignUpButton navigation={navigation} email={email} password={password} username={username} />
      <Text style={styles.text1}>OR</Text>
      <Text>Already have an Account? <LogIn navigation={navigation}/> </Text>
      <ForgotYourPassword navigation={navigation} />
    </View>
  );
}

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
});
