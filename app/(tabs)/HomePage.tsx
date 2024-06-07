import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import { FIREBASE_AUTH, FIREBASE_DB } from './../Firebase/FirebaseConfig';
import { collection, query, where, getDocs, doc, updateDoc, increment } from 'firebase/firestore';

export default function HomePage() {
  // State for the timer
  const [time, setTime] = useState<number>(10); // default 10 minutes
  const [timeLeft, setTimeLeft] = useState<number>(time * 60); // time in seconds
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Function to format time
  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Function to start the timer
  const handleStart = () => {
    setHasStarted(true);
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          clearInterval(timerRef.current!);
          // Update Firebase with the number of tokens
          const userEmail = FIREBASE_AUTH.currentUser?.email;
          if (userEmail) {
            const usersRef = collection(FIREBASE_DB, 'Users');
            const q = query(usersRef, where('email', '==', userEmail));
            getDocs(q).then((querySnapshot) => {
              if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0]; // Assume there is only one document per user email
                const userDocRef = doc(FIREBASE_DB, 'Users', userDoc.id);
                updateDoc(userDocRef, {
                  tokens: increment(time)
                })
                  .then(() => {
                    Alert.alert(
                      "Congratulations!",
                      "You've completed your focus session and earned tokens!",
                      [
                        {
                          text: "OK",
                          onPress: () => {
                            setIsRunning(false);
                            setHasStarted(false);
                            setTimeLeft(time * 60);
                          }
                        }
                      ],
                      { cancelable: false }
                    );
                  })
                  .catch((error) => {
                    console.error('Error updating tokens:', error); // Debugging line
                    Alert.alert("Error", "There was an error updating your tokens.");
                  });
              } else {
                Alert.alert("Error", "No user document found.");
              }
            }).catch((error) => {
              console.error('Error getting documents:', error); // Debugging line
              Alert.alert("Error", "There was an error checking your document.");
            });
          }
          return 0;
        }
        return prevTimeLeft - 1; // Decrement by 60 seconds each interval
      });
    }, 1000); // Set interval to 1 second (smaller faster)
  };

  // Function to stop the timer with confirmation
  const handleStop = () => {
    Alert.alert(
      "Confirm Stop",
      "Are you sure you want to stop the timer?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Stop",
          onPress: () => {
            if (timerRef.current) {
              clearInterval(timerRef.current);
            }
            setIsRunning(false);
            setHasStarted(false);
            setTimeLeft(time * 60);
          },
          style: "destructive"
        }
      ],
      { cancelable: false }
    );
  };

  // Effect to reset timeLeft when the slider changes
  useEffect(() => {
    if (!hasStarted) {
      setTimeLeft(time * 60);
    }
  }, [time]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        {hasStarted ? 'Focus Session in Progress!' : 'Start your focus session!'}
      </Text>

      <View style={styles.timerContainer}>
        <Image source={require('./components/Shark.png')} style={styles.image} />
        <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
        <View style={styles.tokenContainer}>
          <Image source={require('./components/Token.png')} style={styles.tokenIcon} />
          <Text style={styles.tokenText}>{time} Tokens</Text>
        </View>
        {!hasStarted && (
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={120}
            step={1}
            value={time}
            onValueChange={setTime}
            minimumTrackTintColor="#1067c8"
            maximumTrackTintColor="#D3D3D3"
            thumbTintColor="#1067c8"
          />
        )}
        {hasStarted && (
          <TouchableOpacity style={styles.button} onPress={handleStop}>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
        )}
        {!hasStarted && (
          <TouchableOpacity style={styles.button} onPress={handleStart}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

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
  tokenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenIcon: {
    width: 35,
    height: 35,
    marginRight: 5,
  },
  tokenText: {
    fontSize: 20,
    fontWeight: 'bold',
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
