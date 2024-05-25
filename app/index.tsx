// import { Text, View } from "react-native";

// export default function Index() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text>Edit app/index.tsx to edit this screen.</Text>
//     </View>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';

export default function Index() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://172.20.10.3:8000/test.php')
      .then(response => response.json())
      .then(data => {
        console.log('Data from server:', data);
        setItems(data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Items</Text> 
      <FlatList
        data={items}
        renderItem={({ item }) => <Text style={styles.item}>{item.uid}</Text>} // Access uid property instead of name
        keyExtractor={item => item.uuid} // Use uid instead of id
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    fontSize: 18,
    marginBottom: 5,
  },
});
