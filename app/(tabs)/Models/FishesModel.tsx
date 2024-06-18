//All interactions between the app and fishes subcollection in Firebase should be done here
//Create a new function for each interaction 
//Export the functions to the respective screens that use them 
import UserModel from './UserModel';
import { collection, getDocs } from 'firebase/firestore';

export default {
    getFishes: async function (): Promise<{ uid: string, type: string, tier: string }[]> {
        const userDoc = await UserModel.getUserDoc();
        let fishes = [];
        if (userDoc != null) {
            const fishRef = collection(userDoc, 'Fishes');

            const fishSnapshot = await getDocs(fishRef);

            fishSnapshot.docs.forEach((doc) => {
                const fish = doc.data();
                const fishUID = doc.id;
                const fishNumber = fish.number;
                fishes.push({ uid: fishUID, type: fish.type, tier: fish.tier });
            }
        );}
        return fishes;
    },
};