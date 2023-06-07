import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

import api from '../../services/api';

export default function Food() {
  const navigation = useNavigation();
  const { params } = useRoute();
  const [itemData, setItemData] = useState(null);

  const route = useRoute();
  const itemId = route.params.item.idMeal;

  useEffect(() => {
    async function fetchItemData() {
      try {
        const { data } = await api.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemId}`);
        const { meals } = data;

        if (meals && meals.length > 0) {
          const item = meals[0];
          setItemData(item);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do item:', error);
      }
    }

    fetchItemData();
  }, [itemId]);

  return (
    <View style={styles.container}>
      {itemData && (
        <>
          <View style={styles.videoContainer}>
            <WebView
              style={styles.video}
              source={{ uri: itemData.strYoutube }}
              allowsFullscreenVideo
            />
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Text style={styles.subtitle}>Categoria:</Text>
              <Text style={styles.infoText}>{itemData.strCategory}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.subtitle}>Origem:</Text>
              <Text style={styles.infoText}>{itemData.strArea}</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>Ingredientes e Medidas:</Text>
          <FlatList
            data={getIngredientsAndMeasuresData(itemData)}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text style={styles.ingredient}>{item.ingredient}</Text>
                <Text style={styles.measure}>{item.measure}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.flatListContainer}
          />
          <Text style={[styles.subtitle, { marginTop: 16 }]}>Instruções:</Text>
          <ScrollView style={styles.instructionsContainer}>
            <Text style={styles.instructions}>{itemData.strInstructions}</Text>
          </ScrollView>
        </>
      )}
    </View>
  );
}

function getIngredientsAndMeasuresData(itemData) {
  const ingredientsAndMeasures = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = itemData[`strIngredient${i}`];
    const measure = itemData[`strMeasure${i}`];
    if (ingredient && measure) {
      ingredientsAndMeasures.push({ ingredient, measure });
    }
  }
  return ingredientsAndMeasures;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {
    width: '100%',
    height: 200,
    marginBottom: 12,
    borderRadius: 8,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 4,
    marginTop: 12,
    paddingHorizontal: 16,
  },
  infoText: {
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
    paddingHorizontal: 16,
  },
  ingredient: {
    flex: 1,
    fontSize: 16,
  },
  measure: {
    fontSize: 16,
  },
  instructionsContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
    maxHeight: 200,
  },
  instructions: {
    fontSize: 16,
  },
  flatListContainer: {
    paddingHorizontal: 16,
  },
});
