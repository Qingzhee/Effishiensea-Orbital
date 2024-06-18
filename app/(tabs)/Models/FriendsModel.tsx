import UserModel from './UserModel';
import { updateDoc, arrayUnion, getDoc } from 'firebase/firestore';

export default {
    //Fetches the array field 'friends' from the user document
    getUsernames: async function () {
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
        updateDoc(userDoc, { friends: arrayUnion(friendToAdd) })
    },
};