import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import FriendsModel from './../Models/FriendsModel';

export default function FriendProfile({ navigation, id }) {
    const [username, setUsername] = useState('');
    const [tokens, setTokens] = useState(0);
    const [profilePic, setProfilePic] = useState(''); 

    //Update each friend's info to display in the friends list based on their id
    useEffect(() => {
        const fetchUserData = async () => {
            const fetchedUsername = await FriendsModel.getUsernameFromId(id);
            const fetchedTokens = await FriendsModel.getTokensFromId(id);
            const fetchedProfilePic = await FriendsModel.getProfilePicFromId(id);
            setUsername(fetchedUsername);
            setTokens(fetchedTokens);
            setProfilePic(fetchedProfilePic);
        };
        fetchUserData();

    }, [id]);

    return (
        <View style={styles.container}>
            <Image 
            source={ profilePic ? { uri: profilePic } : require('./../../../assets/profilepicstock.jpg') } 
            style={styles.profilepic} />
            <View>
            <Text style={styles.profileDesc}>{username}</Text>
            <Text style={styles.tokens}>Tokens: {tokens}</Text>
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