import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <IonIcon name="menu" size={30} color="#113946" />
        </TouchableOpacity>
        <Text style={styles.title}>AnimeCompass</Text>
        <IonIcon
          name="exit"
          size={30}
          color="#113946"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
      {/* <Image source={require("../assets/anime.png")} style={styles.image} /> */}
      <Text style={styles.categories}>Categories</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>ALL ANIME</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRecommended}>
          <Text style={styles.buttonText}>RECOMMENDED ANIME</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF2D8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#EAD7BB",
  },
  title: {
    fontSize: 20,
    color: "#113946",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  categories: {
    margin: 15,
    fontSize: 18,
    color: "#113946",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#BCA37F",
    padding: 15,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonRecommended: {
    backgroundColor: "#113946",
    padding: 15,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#FFF2D8",
    fontSize: 16,
  },
});

export default Home;
