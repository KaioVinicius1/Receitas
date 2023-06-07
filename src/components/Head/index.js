import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

export default function Head() {
 return (
   <View style={styles.header}>
    <Text style={styles.title}>Receitas Feitas</Text>
   </View>
  );
}

const styles = StyleSheet.create({
  header:{
    height: 100,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    shadowColor: 'green',
    borderBottomWidth: 0.5,
    elevation: 30
  },
  title:{
    fontSize: 24,
    color: 'red',
    fontWeight: 'bold',
    marginTop:25,
  }
})
  