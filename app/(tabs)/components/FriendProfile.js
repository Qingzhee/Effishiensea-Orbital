import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import FriendsModel from './../Models/FriendsModel';

export default function FriendProfile({ navigation, id }) {
    const [username, setUsername] = useState('');
    const [tokens, setTokens] = useState(0);
    const [profilePic, setProfilePic] = useState('');

    //store the user doc of the friend in a const here
    useEffect(() => {
        console.log("the id is: " + id);
        const fetchUserData = async () => {
            const fetchedUsername = await FriendsModel.getUsernameFromId(id);
            const fetchedTokens = await FriendsModel.getTokensFromId(id);
            const fetchedProfilePic = await FriendsModel.getPicFromId(id);
            setUsername(fetchedUsername);
            setTokens(fetchedTokens);
            setProfilePic(fetchedProfilePic);
            console.log("username: " + fetchedUsername + " tokens: " + fetchedTokens);
        };
        fetchUserData();

    }, [id]);

    return (
        <View style={styles.container}>
            <Image source={require('./../../../assets/profilepicstock.jpg')} style={styles.profilepic}/>
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