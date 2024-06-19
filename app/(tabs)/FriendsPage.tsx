import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import FriendsModel from './Models/FriendsModel';
import FriendsPageView from './FriendsPageView';

export default function Friends({ navigation }) {
    const [usernames, setUsernames] = useState([]);
    const [friendToAdd, setFriendToAdd] = useState('');

    //Fetches friends list from database to update friends list array
    const fetchUsernames = async () => {
        const friendsArray = await FriendsModel.getUsernames();
        console.log(friendsArray);
        setUsernames(friendsArray);
    };

    //Adds inputted friend to the user's friend list
    const addFriendToList = async () => {
        console.log(friendToAdd);
        if (friendToAdd == '') {
            alert("Please enter a username to add a friend.");
            return;
        } else {
            try {
                await FriendsModel.addFriend(friendToAdd);
                fetchUsernames();
                alert("Friend added!");
                Keyboard.dismiss();
            } catch (error) {
                alert(error.message);
            }
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
        <FriendsPageView
            navigation={navigation}
            usernames={usernames}
            setFriendToAdd={setFriendToAdd}
            addFriendToList={addFriendToList} />
    );
};