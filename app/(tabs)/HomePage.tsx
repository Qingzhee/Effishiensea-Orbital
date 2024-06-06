import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import getUser from './../Firebase/Firestore';
import { FIREBASE_AUTH } from './../Firebase/FirebaseConfig';

export default function HomePage() {
  // State for the timer
  const [time, setTime] = useState<number>(10); // default 10 minutes

  // Function to format time
  const formatTime = (minutes: number): string => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:00`;
  };

  // Dummy debugging code, can be deleted and moved around
  // Get the current user's data from Firestore on opening the Home Page
  useEffect(() => {
    getUser({ userEmail: FIREBASE_AUTH.currentUser.email });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Start your study session!</Text>

      <View style={styles.timerContainer}>
        <Image source={require('./components/Shark.png')} style={styles.image} />
        <Text style={styles.timer}>{formatTime(time)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={120}
          step={1}
          value={time}
          onValueChange={setTime}
          minimumTrackTintColor="#1067c8"
          maximumTrackTintColor="#D3D3D3"
          thumbTintColor="#1067c8"
        />
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ADD8E6', 
    padding: 20,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  timerContainer: {
    backgroundColor: '#FFFFFF', 
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    width: '100%',
    maxWidth: 400,
  },
  image: {
    width: 275,
    height: 250,
    marginBottom: 20,
    marginTop: 20
  },
  timer: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 60,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 30,
    color: '#1067c8',
    fontWeight: 'bold',
  },
});

export default HomePage;
