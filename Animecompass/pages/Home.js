import React, { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { Card, Avatar, IconButton } from "react-native-paper";
import { AuthContext } from "../utils/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../config";

const Home = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        navigation.navigate("Login");
      }
    });
    return () => unsubscribe();
  }, [navigation]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

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
          onPress={handleSignOut}
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
