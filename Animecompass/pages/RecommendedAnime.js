import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Slider from "@react-native-community/slider";
import SelectDropdown from "react-native-select-dropdown";
import { Modal, Portal, Button, Provider } from "react-native-paper";

const RecommendedAnime = () => {
  const [beginner, setBeginner] = useState(null);
  const [genre, setGenre] = useState(null);
  const [rating, setRating] = useState(1);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const beginnerOptions = ["Yes", "No"];
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

  const handleSubmit = () => {
    showModal();
  };

  return (
    <Provider style={{ backgroundColor: "#FFF2D8" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Anime Recommendations</Text>

        <Text style={styles.label}>Anime Name?</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Anime Name"
          onChangeText={setBeginner}
          placeholderTextColor="#BCA37F"
          value={beginner}
        />
        {/* <SelectDropdown
          data={beginnerOptions}
          buttonTextAfterSelection={(selectedItem) => selectedItem}
          rowTextForSelection={(item) => item}
          dropdownIconColor="#113946"
          buttonStyle={styles.input}
          rowStyle={styles.input}
          dropdownStyle={styles.dropdownStyle}
          rowTextStyle={styles.rowText}
        /> */}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            Get Recommendations (based on title){" "}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>Anime genre:</Text>
        <SelectDropdown
          data={genres}
          onSelect={(selectedItem) => setGenre(selectedItem)}
          buttonTextAfterSelection={(selectedItem) => selectedItem}
          rowTextForSelection={(item) => item}
          dropdownIconColor="#113946"
          buttonStyle={styles.input}
          rowStyle={styles.input}
          dropdownStyle={styles.dropdownStyle}
          rowTextStyle={styles.rowText}
        />

        <Text style={styles.label}>Rating:</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={0.5}
          value={rating}
          onValueChange={(value) => setRating(value)}
          thumbTintColor="#113946"
        />
        <Text style={styles.ratingValue}>{rating.toFixed(1)}</Text>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Get Recommendations</Text>
        </TouchableOpacity>
      </View>
      {/* This is the modal section */}
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContent}
        >
          <Text>
            These are your recommendations!!:{"\n"}
            1. Naruto{"\n"}
            2. One Piece{"\n"}
            3. Bleach
          </Text>
          <Button onPress={hideModal}>Close</Button>
        </Modal>
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
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
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
});

export default RecommendedAnime;
