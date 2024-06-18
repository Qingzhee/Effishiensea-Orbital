import React, { useEffect, useState, useRef } from 'react';
import { Animated, Easing, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FishesModel from './Models/FishesModel';
import AquariumView from './AquariumView';


export default function Aquarium({ navigation }) {
    const [fishData, setFishData] = useState([]);
    const { width, height } = Dimensions.get('screen');
    const insets = useSafeAreaInsets();
    const usableHeight = height - insets.top - insets.bottom;
    const usableWidth = width - insets.left - insets.right;

    const fishAnimValues = fishData.map(() => {
        return new Animated.ValueXY({
            x: Math.random() * usableWidth * 0.8,
            y: Math.random() * usableHeight * 0.6,
        });
    });

    //Get the user's fish data from Firebase and stores fish types and number in fishData array
    const getFishes = () => {
        FishesModel.getFishes()
            .then((fishes) => {
                setFishData(fishes);
                console.log(fishData);
        }).catch((error) => {
            console.log(error);
        });
    }

    //Fetch the user's fish data by calling getFishes() each time the aquarium page is re-opened
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getFishes();
        });
        return unsubscribe;
    }, [navigation]
    );

    //Animation loop for fishes
    const animateAndLoop = (position, fishAnimValues, index) => {
        const animation = animate(position, fishAnimValues, index);
        animation.start(({ finished }) => {
            if (finished) {
                position = { x: Math.random() * usableWidth * 0.8, y: Math.random() * usableHeight * 0.6 };
                animateAndLoop(position, fishAnimValues, index);
            }
        });
    };

    //Animates each fish from start to end point of one swim movement
    const animate = (toPosition, fishAnimValues, index) => {
        return Animated.sequence([
            Animated.timing(fishAnimValues[index], {
                toValue: toPosition,
                duration: Math.random() * 2000 + 3000,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.ease),
            }),
            Animated.delay(300),
        ]);
    };

    //Starts the animations for all the fishes upon screen open
    useEffect(() => {
        const animations = fishData.map((fish, index) => {
            let position = { x: Math.random() * usableWidth * 0.8, y: Math.random() * usableHeight * 0.6 };
            return animateAndLoop(position, fishAnimValues, index);
        });
    });

    return (
        <AquariumView 
            fishData={fishData} 
            fishAnimValues={fishAnimValues}
        />
    );
}