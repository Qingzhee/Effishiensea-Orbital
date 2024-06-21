import UserModel from './UserModel';
import { collection, getDocs } from 'firebase/firestore';

export default {
    // Fetches the user's collection of fish and returns it in an array
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