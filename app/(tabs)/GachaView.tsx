import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const GachaView = ({ tokens, selectedTier, setSelectedTier, handlePress }) => {

  const renderTierContent = () => {
    switch (selectedTier) {
      case 'Tier1':
        return (
          <View style={styles.content}>
            <Image source={require('../../assets/gacha.png')} style={styles.tierImage} />
            <TouchableOpacity style={styles.tokenButton} onPress={() => handlePress(100, 'tier1')}>
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
            <TouchableOpacity style={styles.tokenButton} onPress={() => handlePress(300, 'tier2')}>
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
            <TouchableOpacity style={styles.tokenButton} onPress={() => handlePress(500, 'tier3')}>
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
            <TouchableOpacity style={styles.tokenButton} onPress={() => handlePress(1000, 'tier4')}>
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
    marginTop: 5,
  },
  tokenText: {
    color: 'white',
    fontSize: 30,
    marginRight: 10,
  },
  tier: {
    fontSize: 30,
  },
});

export default GachaView;
