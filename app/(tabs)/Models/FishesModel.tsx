import UserModel from './UserModel';
import { collection, getDocs } from 'firebase/firestore';

export default {
    // Fetches the user's collection of fish and returns it in an array
    // If no arguments are passed, the function will fetch the current user's fish data
    // If user ID is passed as an argument, the function will fetch the fish data of the user with that ID
    getFishes: async function (...friendIds): Promise<{ uid: string, type: string, tier: string }[]> {
        let userDoc = null;
        if (arguments.length == 0) {
            userDoc = await UserModel.getUserDoc();
        } else if (arguments.length == 1) {
            userDoc = await UserModel.getUserDocById(arguments[0]);
        }       
        
        let fishes = [];
        if (userDoc != null) {
            const fishRef = collection(userDoc, 'Fishes');

            const fishSnapshot = await getDocs(fishRef);

            fishSnapshot.docs.forEach((doc) => {
                const fish = doc.data();
                const fishUID = doc.id;
                fishes.push({ uid: fishUID, type: fish.type, tier: fish.tier });
            }
        );}
        return fishes;
    },
};