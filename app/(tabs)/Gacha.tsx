import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FIREBASE_AUTH, FIREBASE_DB } from './../Firebase/FirebaseConfig';
import { collection, getDocs, query, where, updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useFocusEffect } from '@react-navigation/native';

const fishDict = {
  "Tier1": ["fish1", "fish2", "fish3", "fish4", "clownfish", "bluetang", "fish7"],
  "Tier2": ["morayeel", "lionfish", "jellyfish", "pufferfish", "spidercrab", "lobster"],
  "Tier3": ["sunkenship", "log", "submarine", "castle", "seaweed", "braincoral", "redcoral", "pinkcoral"],
  "Tier4": ["whale", "orca", "bluemarlin", "mantaray", "lemonshark", "sidewaysfish", "greatwhite"],
};

const getRandomFish = (tier) => {
  const fishList = fishDict[tier];
  const randomIndex = Math.floor(Math.random() * fishList.length);
  return fishList[randomIndex];
};

const generateUniqueId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const Gacha = ({ navigation }) => {
  const [selectedTier, setSelectedTier] = useState('Tier1');
  const [tokens, setTokens] = useState(0);
  const [userDocId, setUserDocId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setUserEmail(user.email);
      }
    });

    return () => unsubscribe();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchTokens = async () => {
        if (userEmail) {
          const userQuery = query(collection(FIREBASE_DB, 'Users'), where('email', '==', userEmail));
          const userQuerySnapshot = await getDocs(userQuery);

          if (!userQuerySnapshot.empty) {
            const userDoc = userQuerySnapshot.docs[0];
            setTokens(userDoc.data().tokens);
            setUserDocId(userDoc.id);
          }
        }
      };

      fetchTokens();
    }, [userEmail])
  );

  const handlePress = async (requiredTokens, tier) => {
    if (tokens >= requiredTokens) {
      try {
        const newTokens = tokens - requiredTokens;
        setTokens(newTokens);

        // Select a random fish
        const randomFishName = getRandomFish(tier);

        // Create a new fish object with a unique ID
        const newFish = {
          id: generateUniqueId(),
          name: randomFishName,
        };

        // Update Firestore with the new token count and add the fish to the user's collection
        const userDocRef = doc(FIREBASE_DB, 'Users', userDocId);
        await updateDoc(userDocRef, {
          tokens: newTokens,
          fishes: arrayUnion(newFish),
        });

        Alert.alert('Success', `You have spent ${requiredTokens} tokens and received a fish!`);
      } catch (error) {
        console.error('Error updating tokens: ', error);
        Alert.alert('Error', 'An error occurred while updating tokens.');
      }
    } else {
      Alert.alert('Not enough tokens', `You need ${requiredTokens} tokens but you only have ${tokens}.`);
    }
  };

  const renderTierContent = () => {
    switch (selectedTier) {
      case 'Tier1':
        return (
          <View style={styles.content}>
            <Image source={require('../../assets/gacha.png')} style={styles.tierImage} />
            <TouchableOpacity style={styles.tokenButton} onPress={() => handlePress(100, 'Tier1')}>
              <View style={styles.tokenContainer}>
                <Image source={require('../../assets/Token.png')} style={styles.tokenIcon} />
                <Text style={styles.tokenText}>100</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      case 'Tier2':
        return (
          <View style={styles.content}>
            <Image source={require('../../assets/gacha.png')} style={styles.tierImage} />
            <TouchableOpacity style={styles.tokenButton} onPress={() => handlePress(300, 'Tier2')}>
              <View style={styles.tokenContainer}>
                <Image source={require('../../assets/Token.png')} style={styles.tokenIcon} />
                <Text style={styles.tokenText}>300</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      case 'Tier3':
        return (
          <View style={styles.content}>
            <Image source={require('../../assets/gacha.png')} style={styles.tierImage} />
            <TouchableOpacity style={styles.tokenButton} onPress={() => handlePress(500, 'Tier3')}>
              <View style={styles.tokenContainer}>
                <Image source={require('../../assets/Token.png')} style={styles.tokenIcon} />
                <Text style={styles.tokenText}>500</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      case 'Tier4':
        return (
          <View style={styles.content}>
            <Image source={require('../../assets/gacha.png')} style={styles.tierImage} />
            <TouchableOpacity style={styles.tokenButton} onPress={() => handlePress(1000, 'Tier4')}>
              <View style={styles.tokenContainer}>
                <Image source={require('../../assets/Token.png')} style={styles.tokenIcon} />
                <Text style={styles.tokenText}>1000</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.tokensLabel}>Tokens: </Text>
        <Image source={require('../../assets/Token.png')} style={styles.tokenIconTop} />
        <Text style={styles.tokens}>{tokens}</Text>
      </View>
      <Picker
        selectedValue={selectedTier}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedTier(itemValue)}
      >
        <Picker.Item style={styles.tier} label="Tier 1" value="Tier1" />
        <Picker.Item style={styles.tier} label="Tier 2" value="Tier2" />
        <Picker.Item style={styles.tier} label="Tier 3" value="Tier3" />
        <Picker.Item style={styles.tier} label="Tier 4" value="Tier4" />
      </Picker>
      {renderTierContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    padding: 20,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  tokensLabel: {
    fontSize: 20,
  },
  tokens: {
    fontSize: 20,
    marginLeft: 5,
  },
  tokenIconTop: {
    width: 40,
    height: 40,
    marginLeft: 5,
    marginTop: 5,
  },
  picker: {
    height: 40,
    width: 160,
    marginBottom: 20,
  },
  content: {
    alignItems: 'center',
  },
  tierImage: {
    width: 350,
    height: 500,
    marginLeft: 12,
  },
  tokenButton: {
    backgroundColor: '#ADD8E6',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  tokenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenIcon: {
    width: 50,
    height: 50,
    marginRight: 1, 
    marginTop: 5,
  },
  tokenText: {
    color: 'white',
    fontSize: 30,
    marginRight: 10
  },
  tier: {
    fontSize: 30,
  },
});

export default Gacha;