import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

export default function UserPw() {
    return (
        <View>
            <TextInput
                    style = {styles.input1}
                    placeholder = "Username"
                    />
            <TextInput
                    style = {styles.input2}
                    placeholder = "Password"
                    /> 
        </View>
    )
}

const styles = StyleSheet.create({

  input1: {
    marginTop: 10,
    paddingHorizontal: 70,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    fontSize: 16,
  
  },
  input2: {
    marginTop: 10,
    paddingHorizontal: 70,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    fontSize: 16,
  },
  
  });
  