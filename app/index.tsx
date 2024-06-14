// // export default App;
// import React, { useEffect, useState } from 'react';
// import { StyleSheet, View, Text } from 'react-native';
// import MapView, { Marker, Callout } from 'react-native-maps';
// import axios from 'axios';

// let ipAddress = "172.20.10.3"

// const App = () => {
//   const [washrooms, setWashrooms] = useState<{ WashroomID: string, CoordinateX: string, CoordinateY: string }[]>([]);

//   useEffect(() => {
//     // Fetch data from your PHP API
//     axios.get('http://'+ ipAddress + ':8000/test.php/coordinates')
//       .then(response => {
//         setWashrooms(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching data: ', error);
//       });
//   }, []);

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={{ flex: 1 }}
//         initialRegion={{
//           latitude: 0, // Update this with your initial latitude if needed
//           longitude: 0, // Update this with your initial longitude if needed
//           latitudeDelta: 50, // Adjust the zoom level here
//           longitudeDelta: 50,
//         }}
//       >
//         {washrooms.map((washroom, index) => (
//           <Marker
//             key={index}
//             coordinate={{
//               latitude: parseFloat(washroom.CoordinateX),
//               longitude: parseFloat(washroom.CoordinateY),
//             }}
//             title={`Washroom ${washroom.WashroomID}`}
//           >
//             <Callout>
//               <View>
//                 <Text>{`Washroom ${washroom.WashroomID}`}</Text>
//                 <Text>{`Coordinates: ${washroom.CoordinateX}, ${washroom.CoordinateY}`}</Text>
//               </View>
//             </Callout>
//           </Marker>
//         ))}
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default App;



import React, { useState } from 'react';
import { SafeAreaView, View, Button, StyleSheet } from 'react-native';
import MapScreen from './MapScreen';
import DetailsScreen from './DetailsScreen';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<'Map' | 'Details'>('Map');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Map':
        return <MapScreen />;
      case 'Details':
        return <DetailsScreen />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      <View style={styles.navBar}>
        <Button
          title="Map"
          onPress={() => setCurrentScreen('Map')}
          color={currentScreen === 'Map' ? '#007bff' : '#666'}
        />
        <Button
          title="Details"
          onPress={() => setCurrentScreen('Details')}
          color={currentScreen === 'Details' ? '#007bff' : '#666'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    height: 50,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default App;
