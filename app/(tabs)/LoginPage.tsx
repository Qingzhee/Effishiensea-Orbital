import { useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button } from 'react-native';
import UserPw from './components/UserPw';
import LoginButton from './components/LoginButton';
import RememberMe from './components/RememberMe';
import CreateAccount from './components/CreateAccount';
const logoImg = require('./components/Logo.png');

export default function Index({ navigation }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Image source={logoImg} style={styles.logo} />
      <Text style={styles.welcomeText}>Welcome Back</Text>
      <Text style = {styles.login}>Log into your account</Text>
      <UserPw user={user} password={password} setUser={setUser} setPassword={setPassword}/>
      <RememberMe/>
      <LoginButton navigation={navigation} user={user} password={password} />
      <Text style = {styles.login}>OR</Text>
      <Text>Dont have an Account? <CreateAccount navigation={navigation}/> </Text> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50
  },
  logo: {
    width: 450, // Set the desired width
    height: 450, // Set the desired height
    resizeMode: 'contain', // Ensure the image scales properly
    marginLeft: 20,
  },
  welcomeText: {
    fontSize: 35, // Optional: set a font size
    color: '#000', // Optional: set a text color
    fontWeight: 'bold',
    marginTop: -80,
    
  },
  login:{
    fontSize: 20,
  },


});
