// All interactions between the app and user document in Firebase should be done here
// Create a new function for each interaction (e.g. updateTokens, update profile pic, update username, etc.)
// Export the functions to the respective screens that use them 

import { FIREBASE_DB, FIREBASE_AUTH } from './../../Firebase/FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc, collection, query, where, getDocs, updateDoc, increment, addDoc, getDoc } from 'firebase/firestore';


export default {
    // Create Account 
    signUp: async function (email, password, username) {
        if (typeof email !== 'string' || typeof password !== 'string' || typeof username!== 'string' 
            || username === null || username === '') {
            return null;
        }
        const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
        // Creates user document
        const userRef = doc(FIREBASE_DB, 'Users', response.user.uid);
        await setDoc(userRef, {
            email: email,
            username: username,
            tokens: 0,
            friends: [],
            profilepicture: "https://firebasestorage.googleapis.com/v0/b/effishiensea.appspot.com/o/profilepictures%2FcSfuxJZ7LCcb0Y2IkVp2BbhCEDf2?alt=media&token=12d4dc6c-6ae5-4e52-a240-5e3a4705edff",
        });

        // Creates Fishes subcollection
        const fishesRef = collection(userRef, 'Fishes');
        const newFishDoc = doc(fishesRef);
        await setDoc(newFishDoc, {
            type: 'clownfish',
            tier: 'tier1'
        });
    },

    // Log In
    signIn: async function (email, password) {
        if (typeof email !== 'string' || typeof password !== 'string') {
            return null;
        }
        await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
    },

    // Forget Password
    changePw: async function (email) {
        if (typeof email !== 'string') {
            return null;
        }
        await sendPasswordResetEmail(FIREBASE_AUTH, email);
    },

    // Fetch the current user's document
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


    //Fetch a specific user document via username search
    getUserDocByUsername: async function(username) {
        const userRef = collection(FIREBASE_DB, 'Users');
        const q = query(userRef, where('username', '==', username));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return doc(FIREBASE_DB, 'Users', querySnapshot.docs[0].id);
        }
        return null;
    },

    //Fetch a specific user document via unique Firebase ID
    getUserDocById: async function(id) {
        const userRef = doc(FIREBASE_DB, 'Users', id);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            return userRef;
        }
    },

    // Fetch the current user's tokens
    fetchTokens: async function(userEmail) {
        if (typeof userEmail !== 'string') {
            return null;
        }
        const userQuery = query(collection(FIREBASE_DB, 'Users'), where('email', '==', userEmail));
        const userQuerySnapshot = await getDocs(userQuery);

        if (!userQuerySnapshot.empty) {
            const userDoc = userQuerySnapshot.docs[0];
            return {
                tokens: userDoc.data().tokens,
                userDocId: userDoc.id
            };
        }
        return null;
    },
      
    // Update tokens and add fish. newFish is an object with type and tier fields
    updateTokensAndAddFish: async function(userDocId: string, newTokens: number, newFish) {
        if (typeof userDocId !== 'string' || typeof newTokens !== 'number' || typeof newFish !== 'object') {
            return null;
        }
        const userDocRef = doc(FIREBASE_DB, 'Users', userDocId);
        await updateDoc(userDocRef, {
            tokens: newTokens,
        });

        const fishesCollectionRef = collection(userDocRef, 'Fishes');
        await addDoc(fishesCollectionRef, newFish);
    },

    // Update tokens
    updateTokens: async function(userDoc: string, newTokens: number) {
        if (typeof userDoc !== 'string' || typeof newTokens !== 'number') {
            return null;
        }
        const userDocRef = doc(FIREBASE_DB, 'Users', userDoc);
        await updateDoc(userDocRef, {
            tokens: increment(newTokens)
        });
    },
};