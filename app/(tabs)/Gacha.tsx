import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import GachaView from './GachaView';
import UserModel from './Models/UserModel';
import { FIREBASE_AUTH } from './../Firebase/FirebaseConfig';

const fishDict = {
  "tier1": ["fish1", "fish2", "fish3", "fish4", "clownfish", "bluetang", "fish7"],
  "tier2": ["morayeel", "lionfish", "jellyfish", "pufferfish", "spidercrab", "lobster"],
  "tier3": ["sunkenship", "log", "submarine", "castle", "seaweed", "braincoral", "redcoral", "pinkcoral"],
  "tier4": ["whale", "orca", "bluemarlin", "mantaray", "lemonshark", "sidewaysfish", "greatwhite"],
};

const getRandomFish = (tier) => {
  const fishList = fishDict[tier];
  const randomIndex = Math.floor(Math.random() * fishList.length);
  return fishList[randomIndex];
};

const GachaController = ({ navigation }) => {
  const [selectedTier, setSelectedTier] = useState('tier1');
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
          const userData = await UserModel.fetchTokens(userEmail);
          if (userData) {
            setTokens(userData.tokens);
            setUserDocId(userData.userDocId);
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

        const randomFishName = getRandomFish(tier);
        const newFish = {
          type: randomFishName,
          tier: tier,
        };

        await UserModel.updateTokensAndAddFish(userDocId, newTokens, newFish);
        Alert.alert('Success', `You have spent ${requiredTokens} tokens and received a fish!`);
      } catch (error) {
        console.error('Error updating tokens: ', error);
        Alert.alert('Error', 'An error occurred while updating tokens.');
      }
    } else {
      Alert.alert('Not enough tokens', `You need ${requiredTokens} tokens but you only have ${tokens}.`);
    }
  };

  return (
    <GachaView
      tokens={tokens}
      selectedTier={selectedTier}
      setSelectedTier={setSelectedTier}
      handlePress={handlePress}
    />
  );
};

export default GachaController;
