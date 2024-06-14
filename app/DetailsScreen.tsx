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


import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DetailsScreen = () => {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [showTapInButton, setShowTapInButton] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
    setShowTapInButton(true);
  };

  const handleTapIn = () => {
    if (!timerRunning) {
      setTimerRunning(true);
      let seconds = 0;
      const interval = setInterval(() => {
        seconds++;
        setTimerSeconds(seconds);
      }, 1000);
      // Optionally, you can store the interval ID in state if you need to clearInterval later
    }
  };

  return (
    <View style={styles.container}>
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

      {/* Tap In Button */}
      {showTapInButton && (
        <TouchableOpacity style={styles.tapInButton} onPress={handleTapIn}>
          <Text style={styles.buttonText}>Tap In</Text>
        </TouchableOpacity>
      )}

      {/* Timer Display */}
      {timerRunning && (
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>Timer: {timerSeconds} seconds</Text>
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
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
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
  },
  tapInButton: {
    backgroundColor: '#6495ED', // Cornflower blue or any other color
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  timerContainer: {
    marginTop: 20,
  },
  timerText: {
    fontSize: 18,
  },
});

export default DetailsScreen;
