import { View, Text, StyleSheet, TextInput, Image, FlatList, ScrollView, Pressable } from 'react-native';
import PersonIcon from '../assets/icons/PersonIcon';
import BellIcon from '../assets/icons/BellIcon';
import SearchIcon from '../assets/icons/SearchIcon';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

interface categoryData {
  strCategory: string;
  strCategoryThumb?: string;
}
interface mealData {
  strMeal: string | null;
  strMealThumb?: string;
}

export default function Home() {
  let [category, setCategory] = useState<categoryData[]>([]);
  let [items, setItems] = useState<mealData[]>([]);
  let [recipe, setRecipe] = useState<string>();
  let [search,setSearch] = useState<string>();

  console.log(search);
  

  const getCategory = () => {
    axios
      .get('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then((response) => {
        setCategory(response.data.categories as categoryData[]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRecipies = () => {
    if (!recipe) return; // Prevent API call if recipe is not set
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${recipe}`)
      .then((response) => {
        setItems(response.data.meals as mealData[]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fetch categories once on component mount
  useEffect(() => {
    getCategory();
  }, []);

  // Fetch recipes whenever 'recipe' state changes
  useEffect(() => {
    getRecipies();
  }, [recipe]);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        <View style={styles.nav}>
          <PersonIcon />
          <BellIcon />
        </View>

        <View style={styles.welcomeMessage}>
          <Text style={styles.helloText}>Hello, Foodies!</Text>
          <Text style={styles.mainMessage}>
            Make your own Food, stay at <Text style={styles.homeHighlight}>home</Text>
          </Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search any recipe"
            onChangeText={(text)=>{setSearch(text)}}
          />
          <SearchIcon />
        </View>

        <FlatList
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={category}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                setRecipe(item.strCategory); // This will trigger 'getRecipies' on recipe change
              }}
            >
              <View style={styles.categoryItem}>
                <Image
                  source={{ uri: item.strCategoryThumb }}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryText}>{item.strCategory}</Text>
              </View>
            </Pressable>
          )}
        />

        <View style={styles.recipeContainer}>
          <Text style={styles.recipeTitle}>Recipes</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.recipeItem}>
                <Image 
                  source={{ uri: item.strMealThumb }}
                  style={styles.recipeImage}
                />
                <Text style={styles.recipeText}>{item.strMeal}</Text>
              </View>
            )}
            numColumns={2}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  nav: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
  },
  welcomeMessage: {
    padding: 10,
  },
  helloText: {
    fontSize: 17,
    fontWeight: '400',
  },
  mainMessage: {
    fontSize: 27,
    fontWeight: '700',
  },
  homeHighlight: {
    color: '#ffa703',
  },
  searchContainer: {
    margin: 10,
    borderWidth: 2,
    borderRadius: 30,
    backgroundColor: '#c2c0c0',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
  },
  searchInput: {
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    height: 40,
    paddingHorizontal: 20,
    fontSize: 17,
    width: '90%',
    borderWidth: 0,
  },
  categoryItem: {
    padding: 10,
  },
  categoryImage: {
    height: 64,
    width: 64,
    backgroundColor: '#c2c0c0',
    borderRadius: 35,
  },
  categoryText: {
    textAlign: 'center',
    marginTop: 5,
  },
  recipeContainer: {
    margin: 10,
  },
  recipeTitle: {
    marginBottom: 10,
    fontSize: 27,
    fontWeight: '700',
  },
  recipeItem: {
    justifyContent:"center",
    alignItems:"center",
    flex: 1,
  },
  recipeImage: {
    height: 100,
    width: 180,
  },
  recipeText: {
    textAlign: 'center',
    marginTop: 5,
  },
});
