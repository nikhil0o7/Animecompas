import React, { useState } from "react";
import { Button, Text, Dialog, Portal, Chip } from "react-native-paper";

const GenreSelection = ({
  visible,
  onDismiss,
  onGenresSelected,
  availableGenres,
}) => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const toggleGenre = (genre) => {
    setSelectedGenres((prevSelectedGenres) =>
      prevSelectedGenres.includes(genre)
        ? prevSelectedGenres.filter((g) => g !== genre)
        : [...prevSelectedGenres, genre]
    );
  };

  const handleOk = () => {
    onGenresSelected(selectedGenres);
    setSelectedGenres([]); // clearing the selection
    onDismiss(); // Close the dialog
  };

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={{
          width: 400,
          padding: 5,
          height: 400,
          alignSelf: "center",
          overflowY: "scroll",
        }}
      >
        <Dialog.Title>Select Genres</Dialog.Title>
        <Dialog.Content style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
            Select one or multiple genres, based on your interest
          </Text>
          {availableGenres.map((genre) => (
            <Chip
              key={genre}
              selected={selectedGenres.includes(genre)}
              onPress={() => toggleGenre(genre)}
              style={{ margin: 2 }}
            >
              {genre}
            </Chip>
          ))}
        </Dialog.Content>
        <Dialog.Actions style={{ marginTop: 100 }}>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={handleOk}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default GenreSelection;
