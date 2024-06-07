// import React, { useState, useEffect } from 'react';
// import { Text, View, FlatList, StyleSheet, Dimensions } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import WebView from 'react-native-webview'; // Import WebView from

// export default function Index() {
//   const [items, setItems] = useState<any[]>([]);

//   const [region, setRegion] = useState({
//     latitude: 37.78825, // Default latitude
//     longitude: -122.4324, // Default longitude
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   });

//   useEffect(() => {
//     fetch('http://172.20.10.3:8000/test.php')
//       .then(response => response.json())
//       .then(data => {
//         console.log('Data from server:', data);
//         setItems(data);
//       })
//       .catch(error => console.error(error));
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Items</Text> 
//       <FlatList
//         data={items}
//         renderItem={({ item }) => <Text style={styles.item}>{item.uid}</Text>} // Access uid property instead of name
//         keyExtractor={item => item.uuid} // Use uid instead of id
//       />
//     </View>
//   );
// }



import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

const App = () => {


  const markers = [
    {
      coordinate: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
      title: 'Marker 1',
      description: 'This is marker 1',
    },
    // Add more markers as needed
  ];

const App = () => {
  return (
    <View style={styles.container}>
      <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
      >
      {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          >
          <Callout>
            <View>
              <Text>{marker.title}</Text>
              <Text>{marker.description}</Text>
              <Text>{marker.description}</Text>
              <Text>{marker.description}</Text>
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
  map: {
    flex: 1,
  },
});

export default App;