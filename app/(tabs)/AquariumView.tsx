import { View, ImageBackground, Animated, StyleSheet } from 'react-native';

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

const AquariumView = ({ fishData, fishAnimValues }) => (
    <ImageBackground source={background} style={styles.background}>
        <View>
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

export default AquariumView;

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