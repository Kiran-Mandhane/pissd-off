import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import * as Font from 'expo-font';

interface DetailsScreenProps {
  timerRunning: boolean;
  timerSeconds: number;
  handleTapIn: () => void;
  handleTapOut: () => void;
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({ timerRunning, timerSeconds, handleTapIn, handleTapOut }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [showTapInButton, setShowTapInButton] = useState(false);
  const [waitTimeOver, setWaitTimeOver] = useState(false);
  const [isRatingPopupVisible, setRatingPopupVisible] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [bathroomRating, setBathroomRating] = useState<number | null>(null);

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

  const handleTapInPress = () => {
    handleTapIn(); // Start the timer
  };

  const handleTapOutPress = () => {
    handleTapOut(); // Stop the timer
    setRatingPopupVisible(true); // Show rating pop-up
  };

  const handleRatingSelect = (rating: number) => {
    setBathroomRating(rating);
    setShowFeedback(true);
    setRatingPopupVisible(false); // Hide rating pop-up
  };

  const handleCloseRatingPopup = () => {
    setRatingPopupVisible(false); // Hide rating pop-up
  };

  useEffect(() => {
    return () => {
      // Clean up any timers or effects if needed
    };
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      {!isRatingPopupVisible ? (
        !waitTimeOver ? (
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
            {showTapInButton && !timerRunning && !showFeedback && (
              <TouchableOpacity style={styles.tapInButton} onPress={handleTapInPress}>
                <Text style={styles.buttonText}>Tap In</Text>
              </TouchableOpacity>
            )}

            {/* Timer Display and Tap Out Button */}
            {timerRunning && (
              <View style={styles.timerContainer}>
                <Text style={styles.timerText}>Timer: {timerSeconds} seconds</Text>
                <TouchableOpacity style={styles.tapOutButton} onPress={handleTapOutPress}>
                  <Text style={styles.buttonText}>Tap Out</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Feedback Display */}
            {showFeedback && (
              <View style={styles.feedbackContainer}>
                <Text style={styles.feedbackText}>Thanks for your feedback. You rated this bathroom a: {bathroomRating}</Text>
              </View>
            )}
          </>
        ) : (
          <View style={styles.waitTimeOverContainer}>
            <Text style={styles.waitTimeOverText}>Wait Time Over</Text>
          </View>
        )
      ) : null}

      {/* Rating Pop-up */}
      <Modal visible={isRatingPopupVisible} transparent={true} animationType="slide">
        <View style={styles.ratingPopupContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseRatingPopup}>
            <Text style={styles.closeButtonText}>x</Text>
          </TouchableOpacity>
          <Text style={styles.ratingTitle}>Rate the bathroom:</Text>
          <View style={styles.ratingButtonsContainer}>
            {[1, 2, 3, 4, 5].map((rating) => (
              <TouchableOpacity
                key={rating}
                style={styles.ratingButton}
                onPress={() => handleRatingSelect(rating)}>
                <Text style={styles.ratingButtonText}>{rating}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
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
  feedbackContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
  },
  ratingPopupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#ccc',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  ratingTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  ratingButtonsContainer: {
    flexDirection: 'row',
  },
  ratingButton: {
    backgroundColor: '#e5c3ff',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  ratingButtonText: {
    fontSize: 16,
  },
});

export default DetailsScreen;
