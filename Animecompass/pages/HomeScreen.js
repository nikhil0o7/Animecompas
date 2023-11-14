import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { TouchableRipple } from "react-native-paper";

export default function HomeScreen({ navigation }) {
  return (
    <TouchableRipple
      style={styles.ripple}
      onPress={() => navigation.navigate("Home")}
      rippleColor="rgba(0, 0, 0, .32)"
    >
      <View style={styles.container}>
        <Image
          source={require("../assets/naruto.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.welcomeText}>Welcome to AnimeCompass!</Text>
        <Text style={styles.description}>
          Anime Compass offers a vast collection of anime titles for every
          enthusiast. Whether you're looking to discover shows similar to your
          favorites, explore by genre, or simply find your next anime adventure,
          you've arrived at the perfect destination. Begin your journey to the
          next great watch with us!
        </Text>
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  ripple: {
    flex: 1, // The ripple effect will fill the whole screen
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF2D8",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 300, // Adjust according to your image's aspect ratio
    height: 350, // Adjust according to your image's aspect ratio
    marginBottom: 10,
    borderRadius: 30, // If your image is not meant to have rounded corners, you can remove this
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#113946",
  },
  description: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 25,
    textAlign: "center",
    lineHeight: 24,
    color: "#113946",
  },
});
