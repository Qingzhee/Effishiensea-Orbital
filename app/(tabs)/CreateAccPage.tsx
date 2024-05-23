
import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import UserPw from './components/UserPw';
import SignUpButton from './components/SignUp'
import LogIn from './components/LogIn'

export default function Index({ navigation }) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
  
    return (
      <View style={styles.container}>
        <Text style={styles.register}>Register</Text>
        <Text style={styles.text}>Create your new account</Text>
        <UserPw user={user} password={password} setUser={setUser} setPassword={setPassword}/>
        <SignUpButton navigation={navigation} user={user} password={password}/>
        <Text style={styles.text1}>OR</Text>
        <Text>Already have an Account? <LogIn navigation={navigation}/> </Text>
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
        fontSize: 35, // Optional: set a font size
        color: '#000', // Optional: set a text color
        fontWeight: 'bold',
        marginTop: -80,
        
    },
    text:{
        fontSize: 20,
        marginBottom: 50
    },
    text1: {
        fontSize: 20,
    },
  
  });
  

