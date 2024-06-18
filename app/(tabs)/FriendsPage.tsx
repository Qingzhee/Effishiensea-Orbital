import React, { useEffect, useState } from 'react';
import { Text, View, Button, TextInput, StyleSheet, Keyboard } from 'react-native';
import FriendProfile from './components/FriendProfile';
import { FIREBASE_AUTH, FIREBASE_DB } from '../Firebase/FirebaseConfig';
import { collection, doc, query, where, getDoc, getDocs, updateDoc, arrayUnion } from 'firebase/firestore';

export default function Friends({ navigation }) {
    const [usernames, setUsernames] = useState([]);
    const [friendToAdd, setFriendToAdd] = useState('');

    //Fetches friends list from database to update friends list array
    const fetchUsernames = async () => {
        const userEmail = FIREBASE_AUTH.currentUser?.email;
        const usersRef = collection(FIREBASE_DB, 'Users');
        const q = query(usersRef, where('email', '==', userEmail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userDoc = doc(FIREBASE_DB, 'Users', querySnapshot.docs[0].id);

            getDoc(userDoc)
                .then((doc) => {
                    setUsernames(doc.data().friends);
                }); 
        }
    };

    //Adds inputted friend to the user's friend list
    const addFriendToList = async () => {
        const userEmail = FIREBASE_AUTH.currentUser?.email;
        const usersRef = collection(FIREBASE_DB, 'Users');
        const q = query(usersRef, where('email', '==', userEmail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userDoc = doc(FIREBASE_DB, 'Users', querySnapshot.docs[0].id);
            updateDoc(userDoc, { friends: arrayUnion(friendToAdd) })
            fetchUsernames();
            alert("Friend added!")
            Keyboard.dismiss();
        }
    };

    //Triggers fetchUsernames every time the Friends page is opened, updating the friends list
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchUsernames();
        });
        return unsubscribe;
    }, [navigation]
    );

    return (
        <View style={styles.container}>
            <View style={styles.friendContainer}>
                <TextInput 
                style={styles.addFriendBox} 
                placeholder="Enter your friend's username to add them."
                onChangeText={setFriendToAdd} />
                <Button title='Add Friend' onPress={addFriendToList} />
            </View>
            {usernames.map((username) => <FriendProfile key={username} username={username} navigation={navigation}/>)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
    },
    addFriendBox: {
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000000',
        width: '75%',
    },
    friendContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5,
    },
});