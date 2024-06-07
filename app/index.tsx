import React from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

const App = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 0,
          longitude: 0,
          latitudeDelta: 2,
          longitudeDelta: 2,
        }}
      >
        <Marker
          coordinate={{
            latitude: 43,
            longitude: -80.4960872580559,
          }}
          pinColor="red"
        >
          <Callout>
            <View style={styles.callout}>
              <Text style={styles.calloutTitle}>Your Marker Title</Text>
              <Text style={styles.calloutDescription}>Your Marker Description</Text>
              <Text style={styles.calloutDescription}>Your Marker Description</Text>
              <Text style={styles.calloutDescription}>Your Marker Description</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  callout: {
    width: 150,
    padding: 5,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  calloutDescription: {
    fontSize: 14,
  },
});

export default App;