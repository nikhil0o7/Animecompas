import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { DataTable } from "react-native-paper";

const PAGE_SIZE = 10;
const allAnimeData = [
  {
    anime: "Naruto",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 1,
  },
  {
    anime: "Jujutsu Kaisen",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 2,
  },
  {
    anime: "Demon Slayer",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 1,
  },
  {
    anime: "Naruto",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 1,
  },
  {
    anime: "Jujutsu Kaisen",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 2,
  },
  {
    anime: "Demon Slayer",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 1,
  },
  {
    anime: "Naruto",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 1,
  },
  {
    anime: "Jujutsu Kaisen",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 2,
  },
  {
    anime: "Demon Slayer",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 1,
  },
  {
    anime: "Naruto",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 1,
  },
  {
    anime: "Jujutsu Kaisen",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 2,
  },
  {
    anime: "Demon Slayer",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 1,
  },
  {
    anime: "Naruto",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 1,
  },
  {
    anime: "Jujutsu Kaisen",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 2,
  },
  {
    anime: "Demon Slayer",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 1,
  },
  {
    anime: "Naruto",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 1,
  },
  {
    anime: "Jujutsu Kaisen",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 2,
  },
  {
    anime: "Demon Slayer",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 1,
  },
  {
    anime: "Naruto",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 1,
  },
  {
    anime: "Jujutsu Kaisen",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 2,
  },
  {
    anime: "Demon Slayer",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 1,
  },
  {
    anime: "Naruto",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 1,
  },
  {
    anime: "Jujutsu Kaisen",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 2,
  },
  {
    anime: "Demon Slayer",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 1,
  },
  {
    anime: "Naruto",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 1,
  },
  {
    anime: "Jujutsu Kaisen",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 2,
  },
  {
    anime: "Demon Slayer",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 1,
  },
  {
    anime: "Naruto",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 1,
  },
  {
    anime: "Jujutsu Kaisen",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 2,
  },
  {
    anime: "Demon Slayer",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 1,
  },
  {
    anime: "Naruto",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 1,
  },
  {
    anime: "Jujutsu Kaisen",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 2,
  },
  {
    anime: "Demon Slayer",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 1,
  },
  {
    anime: "Naruto",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 1,
  },
  {
    anime: "Jujutsu Kaisen",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 2,
  },
  {
    anime: "Demon Slayer",
    genre: "Action",
    description: "Ninja adventures",
    rating: 4.8,
    ranking: 1,
  },
];

function AnimeTable() {
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(allAnimeData);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData(allAnimeData);
    } else {
      const loweredSearchTerm = searchTerm.toLowerCase();
      setFilteredData(
        allAnimeData.filter((anime) => {
          const stringMatch =
            anime.anime.toLowerCase().includes(loweredSearchTerm) ||
            anime.genre.toLowerCase().includes(loweredSearchTerm) ||
            anime.description.toLowerCase().includes(loweredSearchTerm);
          const numberMatch =
            anime.rating.toString().includes(searchTerm) ||
            anime.ranking.toString().includes(searchTerm);
          return stringMatch || numberMatch;
        })
      );
    }
  }, [searchTerm]);

  useEffect(() => {
    setPage(0);
  }, [filteredData]);

  const from = page * PAGE_SIZE;
  const to = (page + 1) * PAGE_SIZE;

  const dataToShow = filteredData.slice(from, to);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>List of Anime</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Anime..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <DataTable style={styles.dataTable}>
        <DataTable.Header style={styles.header}>
          <DataTable.Title textStyle={{ color: "white" }}>
            Anime
          </DataTable.Title>
          <DataTable.Title textStyle={{ color: "white" }}>
            Genre
          </DataTable.Title>
          <DataTable.Title textStyle={{ color: "white" }}>
            Rating
          </DataTable.Title>
          <DataTable.Title textStyle={{ color: "white" }}>
            Ranking
          </DataTable.Title>
        </DataTable.Header>

        {dataToShow.map((anime, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>{anime.anime}</DataTable.Cell>
            <DataTable.Cell>{anime.genre}</DataTable.Cell>
            <DataTable.Cell>{anime.rating}</DataTable.Cell>
            <DataTable.Cell>{anime.ranking}</DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.floor(filteredData.length / PAGE_SIZE)}
          onPageChange={(newPage) => setPage(newPage)}
          label={`${from + 1}-${to} of ${filteredData.length}`}
        />
      </DataTable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF2D8",
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
    paddingLeft: 15,
    color: "black",
    marginBottom: 10,
  },
});

export default AnimeTable;
