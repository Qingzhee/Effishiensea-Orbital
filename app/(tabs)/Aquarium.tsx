import React, { useEffect, useState, useRef } from 'react';
import { Text, View, ImageBackground, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FIREBASE_AUTH, FIREBASE_DB } from './../Firebase/FirebaseConfig';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';

const background = require('./../../assets/aquariumbg.webp');
const fishDict = {
    "fish1":        require('./../../assets/Fishes/Tier-1-1.png'),
    "fish2":        require('./../../assets/Fishes/Tier-1-2.png'),
    "fish3":        require('./../../assets/Fishes/Tier-1-3.png'),
    "fish4":        require('./../../assets/Fishes/Tier-1-4.png'),
    "clownfish":    require('./../../assets/Fishes/Tier-1-5.png'),
    "bluetang":     require('./../../assets/Fishes/Tier-1-6.png'),
    "fish7":        require('./../../assets/Fishes/Tier-1-7.png'),
    "morayeel":     require('./../../assets/Fishes/Tier-2-1.png'),
    "lionfish":     require('./../../assets/Fishes/Tier-2-2.png'),
    "jellyfish":    require('./../../assets/Fishes/Tier-2-3.png'),
    "pufferfish":   require('./../../assets/Fishes/Tier-2-4.png'),
    "spidercrab":   require('./../../assets/Fishes/Tier-2-5.png'),
    "lobster":      require('./../../assets/Fishes/Tier-2-6.png'),
    "sunkenship":   require('./../../assets/Fishes/Tier-3-1.png'),
    "log":          require('./../../assets/Fishes/Tier-3-2.png'),
    "submarine":    require('./../../assets/Fishes/Tier-3-3.png'),
    "castle":       require('./../../assets/Fishes/Tier-3-4.png'),
    "seaweed":      require('./../../assets/Fishes/Tier-3-5.png'),
    "braincoral":   require('./../../assets/Fishes/Tier-3-6.png'),
    "redcoral":     require('./../../assets/Fishes/Tier-3-7.png'),
    "pinkcoral":    require('./../../assets/Fishes/Tier-3-8.png'),
    "whale":        require('./../../assets/Fishes/Tier-4-1.png'),
    "orca":         require('./../../assets/Fishes/Tier-4-2.png'),
    "bluemarlin":   require('./../../assets/Fishes/Tier-4-3.png'),
    "mantaray":     require('./../../assets/Fishes/Tier-4-4.png'),
    "lemonshark":   require('./../../assets/Fishes/Tier-4-5.png'),
    "sidewaysfish": require('./../../assets/Fishes/Tier-4-6.png'),
    "greatwhite":   require('./../../assets/Fishes/Tier-4-7.png'),
};

export default function Aquarium({ navigation }) {
    const [fishData, setFishData] = useState([]);
    const fishAnimValues = fishData.map(() => new Animated.ValueXY());
    const insets = useSafeAreaInsets();
    const { width, height } = Dimensions.get('screen');
    const usableHeight = height - insets.top - insets.bottom;
    const usableWidth = width - insets.left - insets.right;

    /* Get the user's fish data from Firebase and stores fish types and number in fishData array
     */
    const getFishes = async () => {
        //Grabs the user document from the Users collection
        const userEmail = FIREBASE_AUTH.currentUser?.email;
        const userRef = collection(FIREBASE_DB, 'Users');
        const q = query(userRef, where('email', '==', userEmail));
        const querySnapshot = await getDocs(q);
 
        //Stores the fish data of the user in the fishData array
        if (!querySnapshot.empty) {
            const userDoc = doc(FIREBASE_DB, 'Users', querySnapshot.docs[0].id);
            const fishRef = collection(userDoc, 'Fishes');

            const fishSnapshot = await getDocs(fishRef);
            let fishes = [];
            fishSnapshot.docs.forEach((doc) => {
                const fish = doc.data();
                const fishUID = doc.id;
                const fishNumber = fish.number;
                fishes.push({uid: fishUID, type: fish.type, number: fishNumber});
            });
            setFishData(fishes);
        }
    };

    /* Fetch the user's fish data by calling getFishes() each time the aquarium page is re-opened
     */
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getFishes();
        });
        return unsubscribe;
    }, [navigation]
    );

    /*Animation loop for fishes
     *Whole animation is sequence from left to right rn, then loops
     */
     useEffect(() => {
        console.log("width = " + usableWidth + ", height = " + usableHeight)
        const animations = fishData.map((fish, index) => {
            return Animated.loop(
                Animated.sequence([
                Animated.timing(fishAnimValues[index], {
                    toValue: { x: Math.random() * usableWidth * 0.8, y: Math.random() * usableHeight * 0.7 },
                    duration: 5000,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.ease),
                }),
                Animated.timing(fishAnimValues[index], {
                    toValue: 0,
                    duration: 5000,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.ease),
                })
            ])
            );
        });
        Animated.parallel(animations).start();
    }, [fishData]);

    return (
        <ImageBackground source={background} style={styles.background}>
            <View>
                <View>
                    {fishData.map((fishObj, index) => (
                            <Animated.Image
                                key={fishObj.uid}
                                source={fishDict[fishObj.type]} 
                                style={{
                                    ...styles.fish, 
                                    transform: fishAnimValues[index].getTranslateTransform()
                                }} 
                                resizeMode="contain"
                            />
                        )
                    )}
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
    },

    fish: {
        width: 60,
        height: 60,
    }
});
