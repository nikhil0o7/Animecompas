import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, DataTable, Searchbar } from "react-native-paper";
import { firestore } from "../config.js";
import ModalComponent from "./Modal.js";
// const allAnimeData = [
//   {
//     anime: "Naruto",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 1,
//   },
//   {
//     anime: "Jujutsu Kaisen",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 2,
//   },
//   {
//     anime: "Demon Slayer",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 1,
//   },
//   {
//     anime: "Naruto",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 1,
//   },
//   {
//     anime: "Jujutsu Kaisen",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 2,
//   },
//   {
//     anime: "Demon Slayer",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 1,
//   },
//   {
//     anime: "Naruto",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 1,
//   },
//   {
//     anime: "Jujutsu Kaisen",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 2,
//   },
//   {
//     anime: "Demon Slayer",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 1,
//   },
//   {
//     anime: "Naruto",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 1,
//   },
//   {
//     anime: "Jujutsu Kaisen",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 2,
//   },
//   {
//     anime: "Demon Slayer",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 1,
//   },
//   {
//     anime: "Naruto",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 1,
//   },
//   {
//     anime: "Jujutsu Kaisen",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 2,
//   },
//   {
//     anime: "Demon Slayer",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 1,
//   },
//   {
//     anime: "Naruto",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 1,
//   },
//   {
//     anime: "Jujutsu Kaisen",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 2,
//   },
//   {
//     anime: "Demon Slayer",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 1,
//   },
//   {
//     anime: "Naruto",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 1,
//   },
//   {
//     anime: "Jujutsu Kaisen",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 2,
//   },
//   {
//     anime: "Demon Slayer",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 1,
//   },
//   {
//     anime: "Naruto",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 1,
//   },
//   {
//     anime: "Jujutsu Kaisen",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 2,
//   },
//   {
//     anime: "Demon Slayer",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 1,
//   },
//   {
//     anime: "Naruto",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 1,
//   },
//   {
//     anime: "Jujutsu Kaisen",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 2,
//   },
//   {
//     anime: "Demon Slayer",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 1,
//   },
//   {
//     anime: "Naruto",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 1,
//   },
//   {
//     anime: "Jujutsu Kaisen",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 2,
//   },
//   {
//     anime: "Demon Slayer",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 1,
//   },
//   {
//     anime: "Naruto",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 1,
//   },
//   {
//     anime: "Jujutsu Kaisen",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 2,
//   },
//   {
//     anime: "Demon Slayer",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 1,
//   },
//   {
//     anime: "Naruto",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 1,
//   },
//   {
//     anime: "Jujutsu Kaisen",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 2,
//   },
//   {
//     anime: "Demon Slayer",
//     genre: "Action",
//     description: "Ninja adventures",
//     rating: 4.8,
//     ranking: 1,
//   },
// ];

const allAnimeData = [];
const PAGE_SIZE = 10;
function AnimeTable() {
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [numberOfItemsPerPageList] = React.useState([10, 20, 30]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );
  const [visible, setVisible] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);

  const showModal = (anime) => {
    setSelectedAnime(anime);
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
    setSelectedAnime(null);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const q = query(collection(firestore, "animes"), orderBy("Popularity"));
      const querySnapshot = await getDocs(q);
      const allAnimeData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        Title: doc.data().Title,
        Genre: doc.data().Genre,
        Rating: doc.data().Rating,
        Popularity: doc.data().Popularity,
        Link: doc.data().Link,
        Synopsis: doc.data().Synopsis,
      }));
      setFilteredData(allAnimeData);
    } catch (error) {
      console.error("Error fetching data from Firestore: ", error);
    }
    setLoading(false);
  };

  //search
  useEffect(() => {
    if (searchTerm !== "") {
      setFilteredData(
        filteredData.filter((anime) => {
          const a = anime.Title.toLowerCase().includes(searchTerm.toLowerCase());
          if (a) {
            console.log(a);
            return a;
          }
        })
      );
    } else {
      fetchData();
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [filteredData]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, filteredData.length);
  const dataToShow = filteredData.slice(from, to);

  return loading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#113946" />
    </View>
  ) : (
    <>
      <ScrollView style={styles.scrollViewStyle}>
        <View style={styles.container}>
          <>
            <Text style={styles.heading}>List of Anime</Text>

            <Searchbar
              style={styles.searchInput}
              placeholder="Search Anime..."
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            <DataTable style={styles.dataTable}>
              <DataTable.Header style={styles.header}>
                <DataTable.Title textStyle={{ color: "white" }} flex={3}>
                  Anime Title
                </DataTable.Title>
                <DataTable.Title textStyle={{ color: "white" }} flex={3}>
                  Genre of Anime
                </DataTable.Title>
                <DataTable.Title textStyle={{ color: "white" }} flex={1}>
                  Rating
                </DataTable.Title>
                <DataTable.Title textStyle={{ color: "white" }} flex={1}>
                  Rank
                </DataTable.Title>
              </DataTable.Header>

              {dataToShow.map((anime, index) => (
                <DataTable.Row
                  key={index}
                  onPress={() => {
                    showModal(anime);
                  }}
                >
                  <DataTable.Cell flex={3}>{anime.Title}</DataTable.Cell>
                  <DataTable.Cell flex={3}>
                    {Array.isArray(anime.Genre)
                      ? anime.Genre.join(", ")
                      : anime.Genre}
                  </DataTable.Cell>
                  <DataTable.Cell flex={1}>{anime.Rating}</DataTable.Cell>
                  <DataTable.Cell flex={1}>{anime.Popularity}</DataTable.Cell>
                </DataTable.Row>
              ))}

              <DataTable.Pagination
                page={page}
                numberOfPages={Math.floor(filteredData.length / itemsPerPage)}
                onPageChange={(newPage) => setPage(newPage)}
                label={
                  filteredData.length
                    ? `${from + 1}-${to} of ${filteredData.length}`
                    : 0
                }
                numberOfItemsPerPageList={numberOfItemsPerPageList}
                numberOfItemsPerPage={itemsPerPage}
                onItemsPerPageChange={onItemsPerPageChange}
                showFastPaginationControls
                selectPageDropdownLabel={"Rows per page"}
              />
            </DataTable>
          </>
        </View>
        <ModalComponent
          anime={selectedAnime}
          visible={visible}
          hideModal={hideModal}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollViewStyle: {
    flex: 1,
    backgroundColor: "#FFF2D8",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#FFF2D8",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    // backgroundColor: "#FFF2D8",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  dataTable: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    marginTop: 10,
    color: "#113946",
  },
  header: {
    backgroundColor: "#2C3E50",
  },
  headerText: {
    color: "#FFF2D8",
    fontWeight: "bold",
  },
  cell: {
    color: "#FFF2D8",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#2C3E50",
    textDecorationLine: "underline",
  },
  searchInput: {
    backgroundColor: "rgba(234, 215, 187, 0.7)",
    height: 50,
    borderRadius: 10,
    // paddingLeft: 15,
    color: "black",
    marginBottom: 10,
  },
});

export default AnimeTable;
