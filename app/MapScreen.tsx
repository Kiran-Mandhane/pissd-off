import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import axios from 'axios';

let ipAddress = "172.20.10.3";

const MapScreen = () => {
  const [washrooms, setWashrooms] = useState<{ washroomName: string, latitude: string, longitude: string }[]>([]);

  useEffect(() => {
    // Fetch data from your PHP API
    axios.get('http://' + ipAddress + ':8000/test.php/coordinates')
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
        style={{ flex: 1 }}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;
