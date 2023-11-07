import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Button,
  Modal,
  Portal,
  Provider,
  Snackbar,
  TextInput,
} from "react-native-paper";
import { firestore } from "../config.js";
import GenreSelection from "./GenreSelection";

const RecommendedAnime = () => {
  const [beginner, setBeginner] = useState(null);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const docRef = doc(firestore, "Genre", "inputGenres");
  const [recommendedAnime, setRecommondedAnime] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackVisible, setSnackVisible] = useState(false);
  const genres = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Sci-Fi",
  ];

  const handleSubmit = async () => {
    const docRef = doc(firestore, "Genre", "inputTitle");
    await setDoc(docRef, {
      title: beginner,
    })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
    setLoading(true);
    setSnackVisible(true);
    setTimeout(() => {
      displayTitleRecommendation();
    }, 3000);
  };

  const displayTitleRecommendation = async () => {
    const docRef = doc(firestore, "recommended_anime", "result");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setRecommondedAnime(docSnap.data().recommendations);
      setLoading(false);
      setSnackVisible(false);
      showModal();
    } else {
      console.log("No such document!");
    }
  };

  const onGenresSelected = async (genres) => {
    setSelectedGenres(genres);
    const passGenres = selectedGenres.join(", ");
    await setDoc(docRef, {
      Genre: passGenres,
    })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
    setSelectedGenres([]);
    setLoading(true);
    setSnackVisible(true);
    setTimeout(() => {
      displayGenreRecommendation();
    }, 3000);
  };

  const displayGenreRecommendation = async () => {
    const docRef = doc(firestore, "recommended_anime", "genre_result");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setRecommondedAnime(docSnap.data().recommendations);
      setLoading(false);
      setSnackVisible(false);
      showModal();
    } else {
      console.log("No such document!");
    }
  };

  return (
    <Provider style={{ backgroundColor: "#FFF2D8" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Anime Recommendations</Text>
        <Text style={styles.label}>Anime Name?</Text>
        <TextInput
          style={styles.inputPaper}
          placeholder="Enter Anime Name"
          onChangeText={setBeginner}
          placeholderTextColor="#BCA37F"
          value={beginner}
          Type="outlined"
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            Get Recommendations (based on title)
          </Text>
        </TouchableOpacity>
        <Text style={styles.label}>Anime genre:</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setDialogVisible(true)}
        >
          <Text style={styles.buttonText}>
            Get Recommendations(based on genres)
          </Text>
        </TouchableOpacity>
        {/* genre selection dialog */}
        <GenreSelection
          availableGenres={genres}
          visible={dialogVisible}
          onDismiss={() => setDialogVisible(false)}
          onGenresSelected={onGenresSelected}
        />
        {loading && (
          <Snackbar
            visible={snackVisible}
            style={{
              alignSelf: "center",
              width: 400,
              height: 50,
              justifyContent: "center",
              marginLeft: 35,
              backgroundColor: "white",
              borderRadius: 10,
              border: "1px solid black",
            }}
          >
            <Text style={{ color: "black" }}>
              {" "}
              Please wait while the results are loading...{" "}
            </Text>
          </Snackbar>
        )}

        {/* <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Get Recommendations</Text>
        </TouchableOpacity> */}
      </View>
      {/* This is the modal section */}
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContent}
        >
          <Text>These are your recommendations:</Text>
          {recommendedAnime.map((rec, index) => (
            <React.Fragment key={index}>
              <Text>
                {index + 1}. {rec.Title} - Rating: {rec.Rating}
              </Text>
              <Text
                onPress={() => Linking.openURL(rec.Link)}
                style={{ color: "blue", marginBottom: 5 }}
              >
                {rec.Link}
              </Text>
            </React.Fragment>
          ))}
          <Button onPress={hideModal}>Close</Button>
        </Modal>
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    width: 410,
    height: 600,
    justifyContent: "center",
    borderRadius: 10,
    alignSelf: "center",
    overflowY: "scroll",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#FFF2D8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#113946",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginTop: 10,
    color: "#113946",
  },
  slider: {
    marginTop: 10,
  },
  ratingValue: {
    textAlign: "center",
    marginTop: 10,
    color: "#113946",
    fontSize: 18,
  },
  button: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#BCA37F",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF2D8",
    fontSize: 18,
  },
  dropdownStyle: {
    marginTop: 5,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "rgba(234, 215, 187, 0.7)",
  },
  rowText: {
    color: "black",
    paddingLeft: 15,
    fontSize: 16,
  },
  input: {
    backgroundColor: "rgba(234, 215, 187, 0.7)",
    height: 35,
    width: 390,
    borderRadius: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  inputPaper: {
    backgroundColor: "rgba(234, 215, 187, 0.7)",
    height: 35,
    width: 390,
    paddingHorizontal: 15,
    justifyContent: "center",
    borderColor: "black",
    marginBottom: 10,
    marginTop: 10,
  },
});

export default RecommendedAnime;
