import { FIREBASE_DB } from "./FirebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export default function getUser({ userEmail }) {
    //Grabs the collection of users from the Firestore database
    const colRef = collection(FIREBASE_DB, 'Users');
    
    //Queries colRef for the doc of the current user
    const q = query(colRef, where('email', '==', userEmail));
    console.log("User email: " + userEmail);

    //Returns the user data from Firestore (for debugging)
    return onSnapshot(q, (snapshot) => {
            let userData = [];
            snapshot.docs.forEach(doc => {
                userData.push({...doc.data()});
            })
            //Prints out user data (email + tokens) in console
            console.log("User data from Firestore.ts: " + userData[0]['email'] + ", " + userData[0]['tokens'] + " tokens");
        });
}