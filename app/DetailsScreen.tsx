// // DetailsScreen.tsx
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const DetailsScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Details Screen</Text>
//       <Text style={styles.text}>Add your detailed content here.</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 20,
//     marginBottom: 10,
//   },
// });

// export default DetailsScreen;


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';

const DetailsScreen = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [showTapInButton, setShowTapInButton] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const [waitTimeOver, setWaitTimeOver] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
        'Lato-Bold': require('../assets/fonts/Lato-Bold.ttf'),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
    setShowTapInButton(true);
    setWaitTimeOver(false);
  };

  const handleTapIn = () => {
    if (!timerRunning) {
      setTimerRunning(true);
      let seconds = 0;
      const interval = setInterval(() => {
        seconds++;
        setTimerSeconds(seconds);
      }, 1000);
      setTimerInterval(interval);
    }
  };

  const handleTapOut = () => {
    if (timerRunning && timerInterval) {
      clearInterval(timerInterval);
      setTimerRunning(false);
      setWaitTimeOver(true);
    }
  };

  useEffect(() => {
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      {!waitTimeOver ? (
        <>
          {selectedGender ? null : (
            <>
              <Text style={styles.text}>Details Screen</Text>
              <Text style={styles.text}>Add your detailed content here.</Text>

              {/* Gender Buttons */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, selectedGender === 'female' && styles.selectedButton]}
                  onPress={() => handleGenderSelect('female')}>
                  <Text style={styles.buttonText}>Female</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, selectedGender === 'male' && styles.selectedButton]}
                  onPress={() => handleGenderSelect('male')}>
                  <Text style={styles.buttonText}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, selectedGender === 'other' && styles.selectedButton]}
                  onPress={() => handleGenderSelect('other')}>
                  <Text style={styles.buttonText}>Other</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* Tap In Button */}
          {showTapInButton && !timerRunning && (
            <TouchableOpacity style={styles.tapInButton} onPress={handleTapIn}>
              <Text style={styles.buttonText}>Tap In</Text>
            </TouchableOpacity>
          )}

          {/* Timer Display and Tap Out Button */}
          {timerRunning && (
            <View style={styles.timerContainer}>
              <Text style={styles.timerText}>Timer: {timerSeconds} seconds</Text>
              <TouchableOpacity style={styles.tapOutButton} onPress={handleTapOut}>
                <Text style={styles.buttonText}>Tap Out</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      ) : (
        <View style={styles.waitTimeOverContainer}>
          <Text style={styles.waitTimeOverText}>Wait Time Over</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e4fee6', // Light pink background
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'Lato-Regular', // Use the loaded font
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: '#90EE90', // Light green or any other color to indicate selection
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Lato-Regular', // Use the loaded font
  },
  tapInButton: {
    backgroundColor: '#e5c3ff', // Light purple or any other color
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  timerContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'flex-end',
  },
  timerText: {
    fontSize: 18,
    fontFamily: 'Lato-Regular', // Use the loaded font
  },
  tapOutButton: {
    backgroundColor: '#e5c3ff', // Light purple or any other color
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  waitTimeOverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  waitTimeOverText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold', // Use the loaded font
    color: '#000000',
  },
});

export default DetailsScreen;
