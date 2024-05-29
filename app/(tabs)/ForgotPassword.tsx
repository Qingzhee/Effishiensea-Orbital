import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import UserTextbox from './components/UserTextbox';
import SendEmail from './components/SendEmailButton';
import LogIn from './components/LogIn';
import CreateAccount from './components/CreateAccount';

export default function ForgotPassword({ navigation}) {
    const [user, setUser] = useState('');

    return (
      <View style={styles.container}>
        <Text style={styles.forgot}>Forgot your password?</Text>
        <Text style={styles.text}>Enter your email</Text>
        <UserTextbox user={user} setUser={setUser} />
        <SendEmail navigation={navigation} user={user} />
        <Text style={styles.text1}>OR</Text>
        <Text>Already have an Account? <LogIn navigation={navigation}/> </Text>
        <Text>Dont have an Account? <CreateAccount navigation={navigation}/> </Text> 
      </View>
    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    forgot: {
        fontSize: 35, 
        color: '#000', 
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