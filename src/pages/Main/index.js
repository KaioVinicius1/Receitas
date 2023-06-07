import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';
import Head from '../../components/Head';

export default function Main() {
  const [foods, setFoods] = useState([]);
  const navigation = useNavigation();

  async function handleBuscar(item) {
    try {
      const { data } = await api.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${item.key}`);
      console.log(data);

      const { meals } = data;
      if (meals && meals.length > 0) {
        setFoods(meals);
      } else {
        setFoods([]);
      }
    } catch (error) {
      Alert.alert('Buscar', 'Ocorreu um erro ao buscar a série.');
    }
  }

  const data = [
    { id: '1', label: 'Carne', key: 'Beef' },
    { id: '2', label: 'Café da manhã', key: 'Breakfast' },
    { id: '3', label: 'Frango', key: 'Chicken' },
    { id: '4', label: 'Sobremesa', key: 'Dessert' },
    { id: '5', label: 'Cabra', key: 'Goat' },
    { id: '6', label: 'Cordeiro', key: 'Lamb' },
    { id: '7', label: 'Diversos', key: 'Miscellaneous' },
    { id: '8', label: 'Pasta', key: 'Pasta' },
    { id: '9', label: 'Porco', key: 'Pork' },
    { id: '10', label: 'Frutos do Mar', key: 'Seafood' },
    { id: '11', label: 'Outros', key: 'Side' },
    { id: '12', label: 'Entradas', key: 'Starter' },
    { id: '13', label: 'Vegano', key: 'Vegan' },
    { id: '14', label: 'Veegetariano', key: 'Vegetarian' },
  ];

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.button} onPress={() => handleBuscar(item)}>
        <Text style={styles.buttonLabel}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  const renderFoodsItem = ({ item }) => {
    const handleImageClick = () => {
      navigation.navigate('Food', { item });
    };

    return (
      <View style={styles.foodsItem}>
        <Text style={styles.foodsTitle}>{item.strMeal}</Text>
        <TouchableOpacity onPress={handleImageClick}>
          <Image source={{ uri: item.strMealThumb }} style={styles.foodsImage} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Head />
      <View style={styles.category}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <FlatList data={foods} renderItem={renderFoodsItem} keyExtractor={(item) => item.idMeal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  category: {
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#FF8C00',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    margin: 8,
  },
  buttonLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  foodsItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  foodsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  foodsImage: {
    width: 100,
    height: 100,
  },
});
