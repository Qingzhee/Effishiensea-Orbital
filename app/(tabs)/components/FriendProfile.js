import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

export default function FriendProfile({ navigation, username }) {
    
    return (
        <View style={styles.container}>
            <Image source={require('./../../../assets/profilepicstock.jpg')} style={styles.profilepic}/>
            <View>
            <Text style={styles.profileDesc}>{username}</Text>
            <Text style={styles.tokens}>Tokens: 00</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#8a8a8a',
    },
    profileDesc: {
        fontSize: 24,
        marginBottom: 16,
        paddingTop: 12,
    },

    profilepic: {
        width: 50,
        height: 50,
        borderRadius: 50,
        margin: 10,
    },

    tokens: {
        fontSize: 16,
        paddingBottom: 12,
    }
});