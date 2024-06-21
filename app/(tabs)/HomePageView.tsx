import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

const HomePageView = ({ time, timeLeft, hasStarted, isRunning, handleStart, handleStop, setTime, formatTime }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>
                {hasStarted ? 'Focus Session in Progress!' : 'Start your focus session!'}
            </Text>

            <View style={styles.timerContainer}>
                <Image source={require('../../assets/Shark.png')} style={styles.image} />
                <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
                <View style={styles.tokenContainer}>
                    <Image source={require('../../assets/Token.png')} style={styles.tokenIcon} />
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

export default HomePageView;
