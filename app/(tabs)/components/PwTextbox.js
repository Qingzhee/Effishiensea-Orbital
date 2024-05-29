import { KeyboardAvoidingView, StyleSheet, TextInput, Platform } from 'react-native';
import { FIREBASE_AUTH } from "../../../FirebaseConfig";

export default function Password({password, setPassword}) {
    const auth = FIREBASE_AUTH;

    return (
      <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> 
        {/* Adjusts text inputs so it's not blocked by keyboard */}
        <TextInput
            style = {styles.input}
            placeholder = "Password"
            value = {password}
            onChangeText = {setPassword}
            secureTextEntry = {true}
            /> 
      </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    input: {
      marginTop: 10,
      paddingLeft: 10,
      paddingVertical: 2,
      borderWidth: 1,
      borderColor: "#000",
      borderRadius: 5,
      fontSize: 16,
      width: 250,
    },  
    });