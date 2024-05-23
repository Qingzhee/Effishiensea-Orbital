import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomePage({ navigation }) {
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