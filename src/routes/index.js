import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Text, StyleSheet } from "react-native";

import Main from '../pages/Main'
import Food from '../pages/Food'

const Stack = createNativeStackNavigator();

export default function Routes(){
  return(
    <Stack.Navigator>
      <Stack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
      />
      
      <Stack.Screen
          name="Food"
          component={Food}
          options={({ route }) => ({
            headerTitle: () => <Text style={styles.headerTitle}>{route.params.item.strMeal}</Text>,
            headerShown: true
          })}
        />  
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "orange"
  }
});