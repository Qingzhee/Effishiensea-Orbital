import UserModel from './UserModel';
import { updateDoc, arrayUnion, getDoc, query, where } from 'firebase/firestore';

export default {
    //Fetches the array field 'friends' from the user document
    getIDs: async function () {
        const userDoc = await UserModel.getUserDoc();
        let friendsArr = [];
        await getDoc(userDoc)
            .then((doc) => {
                friendsArr = doc.data().friends;
            });
        return friendsArr;
    },
    
    //Adds a friend to the user's friends list
    addFriend: async function (friendToAdd: string) {
        const userDoc = await UserModel.getUserDoc();
        const friendDoc = await UserModel.getUserDocByUsername(friendToAdd);
        if (friendDoc === null) {
            throw new Error('There is no user with that username. Usernames are case-sensitive.');
        }
        await getDoc(friendDoc)    
        .then((doc) => {
                if (doc.id === userDoc.id) {
                    throw new Error('You cannot add yourself as a friend. Are you that lonely.');
                } 
                updateDoc(userDoc, { friends: arrayUnion(doc.id) }); 
            });
    },

    //Fetch the username of a user from their ID
    getUsernameFromId: async function(id: string) {
        let name = 'placeholder';
        await getDoc(await UserModel.getUserDocById(id))
        .then((doc) => {
            name = doc.data().username;
        });
        return name;
    },

    //Fetch the tokens of a user from their ID
    getTokensFromId : async function(id: string) {
        let tokens = 0;
        await getDoc(await UserModel.getUserDocById(id))
        .then((doc) => {
            tokens = doc.data().tokens;
        });
        return tokens;
    },

    //Fetch profile picture link of a user from their ID
    getProfilePicFromId: async function(id: string) {
        let link = '';
        await getDoc(await UserModel.getUserDocById(id))
        .then((doc) => {
            link = doc.data().profilepicture;
        });
        return link;
    },
};