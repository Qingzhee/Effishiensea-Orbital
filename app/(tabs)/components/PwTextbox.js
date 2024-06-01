import { KeyboardAvoidingView, StyleSheet, TextInput, Platform, TouchableOpacity, ImageBackground } from 'react-native';
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';

export default function Password({password, setPassword}) {
    const auth = FIREBASE_AUTH;
    const [hidePassword, setHidePassword] = useState(true);

    return (
      <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> 
        {/* Adjusts text inputs so it's not blocked by keyboard */}
        <TextInput
            style = {styles.input}
            placeholder = "Password"
            value = {password}
            onChangeText = {setPassword}
            secureTextEntry = {hidePassword}
            /> 
            <TouchableOpacity 
              style={styles.icon}
              onPress={() => setHidePassword(!hidePassword)}>
            <Entypo name={hidePassword ? 'eye' : 'eye-with-line'} size={20} color="black" />
          </TouchableOpacity>
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

    icon: {
      position: 'absolute',
      right: 10,
      top: 15,
    },
});