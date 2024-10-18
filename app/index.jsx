import { View, Text, Image, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router'; // Import expo-router

export default function index() {
  const router = useRouter();

  const [loaded] = useFonts({
    SofadiOne: require('../assets/fonts/SofadiOne-Regular.ttf'),
    PlayenSans: require('../assets/fonts/PlaypenSans-VariableFont_wght.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" backgroundColor="#ffa703" />
      <Pressable onPress={() => router.push('HomeScreen')} style={styles.container}>
        <Image style={styles.img} source={require('../assets/images/hungry_6675109.png')} />
        <Text style={styles.title}>Foody</Text>
        <Text style={styles.slogan}>Food is always right</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffa703",
  },
  img: {
    height: 200,
    width: 200,
  },
  title: {
    marginTop: 10,
    fontFamily: 'SofadiOne',
    fontWeight: "bold",
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.4,
    fontSize: 34,
  },
  slogan: {
    fontFamily: 'PlayenSans',
    fontSize: 18,
  },
});