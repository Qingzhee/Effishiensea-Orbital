import React, { useEffect, useState, useRef } from 'react';
import { Alert } from 'react-native';
import HomePageView from './HomePageView';
import UserModel from './Models/UserModel';

const HomePageController = () => {
    const [time, setTime] = useState<number>(10); // default 10 minutes
    const [timeLeft, setTimeLeft] = useState<number>(time * 60); // time in seconds
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [hasStarted, setHasStarted] = useState<boolean>(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const formatTime = (seconds: number): string => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleStart = () => {
        setHasStarted(true);
        setIsRunning(true);
        timerRef.current = setInterval(async () => {
            setTimeLeft((prevTimeLeft) => {
                if (prevTimeLeft <= 1) {
                    clearInterval(timerRef.current!);
                    // Update Firebase with the number of tokens
                    UserModel.updateTokens(time)
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
                            console.error('Error updating tokens:', error);
                            Alert.alert("Error", "There was an error updating your tokens.");
                        });
                    return 0;
                }
                return prevTimeLeft - 1; // Decrement by 60 seconds each interval
            });
        }, 1000); // Set interval to 1 second (smaller faster)
    };

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

    useEffect(() => {
        if (!hasStarted) {
            setTimeLeft(time * 60);
        }
    }, [time]);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    return (
        <HomePageView
            time={time}
            timeLeft={timeLeft}
            hasStarted={hasStarted}
            isRunning={isRunning}
            handleStart={handleStart}
            handleStop={handleStop}
            setTime={setTime}
            formatTime={formatTime}
        />
    );
};

export default HomePageController;
