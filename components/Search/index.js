import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { getFilterDestination } from "../controller/filterController";
import { Rating } from "react-native-ratings";

const SearchPage = ({ navigation }) => {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetFilterDestination = async () => {
    setIsLoading(true);
    let param = "";
    if (searchValue) {
      param = `&search=${searchValue}`;
    }
    let res = await getFilterDestination("Other", param);
    console.log(res.data.result);
    if (res && res.data.code === 200) {
      setResults(res.data.result); // Cập nhật dữ liệu sau khi nhận được
    } else {
      setResults([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (searchValue.length > 0) {
      handleGetFilterDestination();
    } else {
      setResults([]);
    }
  }, [searchValue]);
  const handleDetails = (id) => {
    console.log(id);
    navigation.navigate("TravelDetail", { id });
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchValue}
        onChangeText={setSearchValue}
      />
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#00bbf2"
          style={{ paddingTop: 30 }}
        />
      ) : (
        <View>
          <Text style={styles.searchTitle}>Search Results</Text>
          <FlatList
            data={results}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.resultItem}
                onPress={() => handleDetails(item.destination_id)}
              >
                <Image source={{ uri: item.image_url }} style={styles.image} />
                <View style={styles.content}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.location}>{item.location}</Text>
                  <Text style={styles.description}>{item.description}</Text>

                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.rating}>Rating: </Text>
                    <Rating
                      imageSize={20}
                      style={styles.rating}
                      readonly={true}
                      startingValue={4}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={styles.noResultsText}>No results found</Text>
            }
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "700px",
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  searchTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  resultItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  rating: {
    fontSize: 16,
    color: "#444",
  },
  noResultsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
});

export default SearchPage;
