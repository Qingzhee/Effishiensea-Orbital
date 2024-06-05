import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import getUser from "./../Firebase/Firestore";
import { FIREBASE_AUTH } from "./../Firebase/FirebaseConfig";



export default function HomePage({ navigation }) {

    //Dummy debugging code, can be deleted and moved around
    //Get the current user's data from Firestore on opening the Home Page
    useEffect(() => {
        getUser({ userEmail: FIREBASE_AUTH.currentUser.email});
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome to the Home Page!</Text>
            <Text>Imagine there's a timer here and a fish tank with many fish</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});