import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FishesModel from './Models/FishesModel';
import { Entypo } from '@expo/vector-icons';

export default function FriendsAquarium({ route, navigation }) {
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
    const { friendId } = route.params;
    const background = require('./../../assets/aquariumbg.webp');
    const [fishData, setFishData] = useState([]);
    const { width, height } = Dimensions.get('screen');
    const insets = useSafeAreaInsets();

    const usableHeight = height - insets.top - insets.bottom;
    const usableWidth = width - insets.left - insets.right;
    
    //Get the user's fish data from Firebase and stores fish types and tiers in fishData array
    const getFishes = () => {
        FishesModel.getFishes(friendId)
            .then((fishes) => {
                setFishData(fishes);
                console.log(fishes);
        }).catch((error) => {
            console.log(error);
        });
    }

    //Fetch the user's fish data by calling getFishes() each time the friend's aquarium page is re-opened
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getFishes();
        });
        return unsubscribe;
    }, [navigation]
    );

    //Initializes the starting position of each fish
    const fishAnimValues = fishData.map((fish) => {
        let xValue = Math.random() * usableWidth * 0.8;
        let yValue = (fish.type == 'lobster' || fish.type == 'spidercrab')
                    ? 700
                    : Math.random() * usableHeight * 0.7 + 100;

        console.log("type: " + fish.type + " x: " + xValue + " y: " + yValue);
        return new Animated.ValueXY({
            x: xValue,
            y: yValue,
        });
    }, [fishData]);

    //Animation loop for fishes
    const animateAndLoop = (position, fishAnimValues, index, type) => {    
        const animation = animate(position, fishAnimValues, index);
        animation.start(({ finished }) => {
            if (finished) {
                position = { 
                    x: Math.random() * usableWidth * 0.5, 
                    y: (type =='lobster' || type == 'spidercrab') 
                        ? Math.random() * 50 + 670 
                        : Math.random() * usableHeight * 0.7 + 100 };
                animateAndLoop(position, fishAnimValues, index, type);
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
        const animations = fishData.map((data, index) => {
            let xValue = Math.random() * usableWidth * 0.5;
            let yValue = (data.type == 'lobster' || data.type == 'spidercrab') 
                        ? 700 
                        : Math.random() * usableHeight * 0.7 + 100;
            let position = { x: xValue, y: yValue };
            return animateAndLoop(position, fishAnimValues, index, data.type);
        });
    });

    return (
        <ImageBackground source={background} style={styles.background}>
            <View>
                <TouchableOpacity>
                    <Entypo name="back" size={40} color="white" onPress={() => navigation.navigate("FriendsMain")}/>
                </TouchableOpacity>
                <View style={{ justifyContent: 'space-evenly', flex: 1 }}> 
                    {fishData.map((fishObj, index) => (
                        <Animated.Image
                            key={fishObj.uid}
                            source={fishDict[fishObj.type]}
                            style={{
                                ...styles[fishObj.tier],
                                transform: fishAnimValues[index].getTranslateTransform()
                            }}
                            resizeMode="contain"
                        />
                    ))}
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

    tier1: {
        width: 40,
        height: 40,
    },

    tier2: {
        width: 60,
        height: 60,
    },

    tier3: {
        width: 80,
        height: 80,
    },

    tier4: {
        width: 150,
        height: 150,
    }
});