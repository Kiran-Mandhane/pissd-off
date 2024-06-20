import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import axios from 'axios';

interface MapScreenProps {
  timerSeconds: number;
}

const MapScreen: React.FC<MapScreenProps> = ({ timerSeconds }) => {
  const [washrooms, setWashrooms] = useState<{ washroomName: string, latitude: string, longitude: string }[]>([]);

  useEffect(() => {
    // Fetch data from your PHP API
    axios.get('http://172.20.10.2:8000/test.php/coordinates')
      .then(response => {
        console.log('API response data:', response.data);
        setWashrooms(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 0, // Update this with your initial latitude if needed
          longitude: 0, // Update this with your initial longitude if needed
          latitudeDelta: 50, // Adjust the zoom level here
          longitudeDelta: 50,
        }}
      >
        {washrooms.map((washroom, index) => {
          const latitude = parseFloat(washroom.latitude);
          const longitude = parseFloat(washroom.longitude);

          if (isNaN(latitude) || isNaN(longitude)) {
            console.warn(`Invalid coordinates for washroom ${washroom.washroomName}: ${washroom.latitude}, ${washroom.longitude}`);
            return null;
          }

          return (
            <Marker
              key={index}
              coordinate={{ latitude, longitude }}
              title={`Washroom ${washroom.washroomName}`}
            >
              <Callout>
                <View>
                  <Text>{`Washroom ${washroom.washroomName}`}</Text>
                  <Text>{`Coordinates: ${washroom.latitude}, ${washroom.longitude}`}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>

      {/* Display Timer */}
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>Timer: {timerSeconds} seconds</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  timerContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
    padding: 10,
    borderRadius: 10,
  },
  timerText: {
    fontSize: 16,
  },
});

export default MapScreen;
