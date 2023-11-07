import * as React from "react";
import { Linking } from "react-native";
import { Modal, Portal, Text, Button, PaperProvider } from "react-native-paper";

const ModalComponent = ({ anime, visible, hideModal }) => {
  //   const [visible, setVisible] = React.useState(false);

  //   const showModal = () => setVisible(true);
  //   const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    width: 410,
    height: 600,
    justifyContent: "center",
    borderRadius: 10,
    alignSelf: "center",
    overflowY: "scroll",
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        {anime ? (
          <>
            <Text
              style={{ fontWeight: "bold", fontSize: 24, textAlign: "center" }}
            >
              {anime.Title}
            </Text>
            <Text>Rating: {anime.Rating}</Text>
            <Text>
              Genre:{" "}
              {Array.isArray(anime.Genre)
                ? anime.Genre.join(", ")
                : anime.Genre}
            </Text>
            <Text>Popularity: {anime.Popularity}</Text>
            <Text
              style={{ color: "blue" }}
              onPress={() => (anime.Link ? Linking.openURL(anime.Link) : null)}
            >
              Link: {anime.Link}
            </Text>
            <Text>Synopsis: {anime.Synopsis}</Text>

            {/* Add other details you want to display here */}
          </>
        ) : (
          <Text>No Anime Selected</Text>
        )}
      </Modal>
    </Portal>
  );
};

export default ModalComponent;
