import { FIREBASE_DB } from "./FirebaseConfig";
import { collection, onSnapshot, query, where, QuerySnapshot, DocumentData } from "firebase/firestore";

interface GetUserProps {
    userEmail: string;
}

export default function getUser({ userEmail }: GetUserProps, callback: (userData: DocumentData[] | null, error?: string) => void) {
    // Grabs the collection of users from the Firestore database
    const colRef = collection(FIREBASE_DB, 'Users');

    // Queries colRef for the doc of the current user
    const q = query(colRef, where('email', '==', userEmail));
    console.log("User email: " + userEmail);

    // Returns the user data from Firestore (for debugging)
    return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
        let userData: DocumentData[] = [];
        snapshot.docs.forEach(doc => {
            userData.push({ ...doc.data() });
        });

        if (userData.length > 0) {
            // Prints out user data (email + tokens) in console
            console.log("User data from Firestore.ts: " + userData[0]['email'] + ", " + userData[0]['tokens'] + " tokens");
            callback(userData);
        } else {
            console.error("No user data found");
            callback(null, "No user data found");
        }
    }, (error) => {
        console.error("Error fetching user data: ", error);
        callback(null, error.message);
    });
}
