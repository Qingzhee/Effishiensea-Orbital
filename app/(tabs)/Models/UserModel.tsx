//All interactions between the app and user document in Firebase should be done here
//Create a new function for each interaction (e.g. updateTokens, update profile pic, update username, etc.)
//Export the functions to the respective screens that use them 

import { FIREBASE_DB, FIREBASE_AUTH } from './../../Firebase/FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc, collection, query, where, getDocs, updateDoc, increment } from 'firebase/firestore';

export default {
    //Create Account 
    signUp: async function (email, password, username) {
        const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
        //Creates user document
        const userRef = doc(FIREBASE_DB, 'Users', response.user.uid);
        await setDoc(userRef, {
            email: email,
            username: username,
            tokens: 0,
            friends: [],
            profilepicture: "https://firebasestorage.googleapis.com/v0/b/effishiensea.appspot.com/o/profilepictures%2FcSfuxJZ7LCcb0Y2IkVp2BbhCEDf2?alt=media&token=12d4dc6c-6ae5-4e52-a240-5e3a4705edff",
        });

        //Creates Fishes subcollection
        const fishesRef = collection(userRef, 'Fishes');
        const newFishDoc = doc(fishesRef);
        await setDoc(newFishDoc, {
            type: 'clownfish',
            tier: 'tier1'
        });
    },

    //Log In
    signIn: async function (email, password) {
        await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
    },

    //Forget Password
    changePw: async function (email) {
        await sendPasswordResetEmail(FIREBASE_AUTH, email);
    },

    //Fetch the current user's document
    getUserDoc: async function() {
        const userEmail = FIREBASE_AUTH.currentUser?.email;
        const userRef = collection(FIREBASE_DB, 'Users');
        const q = query(userRef, where('email', '==', userEmail));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return doc(FIREBASE_DB, 'Users', querySnapshot.docs[0].id);
        }
        return null;
    },

    // Update tokens
    updateTokens: async function (time) {
        const userEmail = FIREBASE_AUTH.currentUser?.email;
        if (userEmail) {
            const usersRef = collection(FIREBASE_DB, 'Users');
            const q = query(usersRef, where('email', '==', userEmail));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0]; // Assume there is only one document per user email
                const userDocRef = doc(FIREBASE_DB, 'Users', userDoc.id);
                await updateDoc(userDocRef, {
                    tokens: increment(time)
                });
            } else {
                throw new Error("No user document found.");
            }
        }
    }
};
