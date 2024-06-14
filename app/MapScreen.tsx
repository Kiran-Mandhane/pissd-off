// MapScreen.tsx
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import axios from 'axios';

let ipAddress = "172.20.10.3"

const MapScreen = () => {
  const [washrooms, setWashrooms] = useState<{ WashroomID: string, CoordinateX: string, CoordinateY: string }[]>([]);

  useEffect(() => {
    // Fetch data from your PHP API
    axios.get('http://'+ ipAddress + ':8000/test.php/coordinates')
      .then(response => {
        setWashrooms(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 0, // Update this with your initial latitude if needed
          longitude: 0, // Update this with your initial longitude if needed
          latitudeDelta: 50, // Adjust the zoom level here
          longitudeDelta: 50,
        }}
      >
        {washrooms.map((washroom, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(washroom.CoordinateX),
              longitude: parseFloat(washroom.CoordinateY),
            }}
            title={`Washroom ${washroom.WashroomID}`}
          >
            <Callout>
              <View>
                <Text>{`Washroom ${washroom.WashroomID}`}</Text>
                <Text>{`Coordinates: ${washroom.CoordinateX}, ${washroom.CoordinateY}`}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;
