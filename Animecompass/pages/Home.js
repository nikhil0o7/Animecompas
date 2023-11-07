import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { Card, Avatar, IconButton } from "react-native-paper";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
        ></TouchableOpacity>
        <Text style={styles.title}>AnimeCompass</Text>
        <IonIcon
          name="exit"
          size={30}
          color="#113946"
          onPress={() => navigation.navigate("Login")}
        />
      </View>

      <Text style={styles.categories}>Categories</Text>
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <Card.Title
            title="All Anime"
            subtitle="View all anime"
            titleStyle={{ color: "white" }}
            left={(props) => (
              <Avatar.Icon
                {...props}
                icon="animation-play-outline"
                color="#113946"
              />
            )}
            right={(props) => (
              <IconButton
                {...props}
                icon="arrow-right"
                color="#113946"
                onPress={() => navigation.navigate("AnimeData")}
              />
            )}
          />
        </Card>

        <Card style={styles.cardRecommended}>
          <Card.Title
            titleStyle={{ color: "white" }}
            title="Recommended Anime"
            subtitle="View anime recommendations"
            subtitleStyle={{ color: "white" }}
            left={(props) => (
              <Avatar.Icon {...props} icon="star" color="#FFF2D8" />
            )}
            right={(props) => (
              <IconButton
                {...props}
                icon="arrow-right"
                color="white"
                onPress={() => navigation.navigate("RecommendedAnime")}
              />
            )}
          />
        </Card>
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

  cardContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: "#BCA37F",
    marginBottom: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    color: "white",
  },
  cardRecommended: {
    backgroundColor: "#113946",
    borderRadius: 10,
    marginHorizontal: 10,
    color: "white",
  },
});

export default Home;
