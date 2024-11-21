import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Slider, Rating, Button, CheckBox } from "@rneui/themed";
import Icon from "react-native-vector-icons/Ionicons";
import { getFullAmenities } from "../controller/DetailsController";
import { login, logout, loadingTrue, loadingFalse } from "../Redux/userSlice";
import { useSelector, useDispatch } from "react-redux";

const OverLayFilter = ({ handleGetFilterDestination,toggleFilterOverlay,activeAmenities,setActiveAmenities,priceRange,setPriceRange,rating,setRating,selectedCategory,setSelectedCategory,searchText, setSearchText}) => {
  
  const [amenities, setAmenities] = useState([]);
  const categories = [
    {
      id: 1,
      categoryName: "Villa",
    },
    {
      id: 2,
      categoryName: "Resort",
    },
    {
      id: 3,
      categoryName: "Hotel",
    },
    {
      id: 4,
      categoryName: "Apartment",
    },
  ];

  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  const getAmenity = async () => {
    let res = await getFullAmenities();
    if (res && res.code === 200) {
      setAmenities(res.result);
    }
  };
  const toggleAmenity = (amenity) => {
    setActiveAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };
  useEffect(() => {
    getAmenity();
  }, []);

  const renderAmenity = ({ item, index }) => (
    <View style={styles.flexRow}>
      <Button
        title={item.amenity_name}
        icon={
          <Icon
            name={item.amenity_icon}
            size={24}
            color={activeAmenities.includes(index+1) ? "#fff" : "#333"}
          />
        }
        buttonStyle={
          activeAmenities.includes(index+1)
            ? styles.activeButton
            : styles.inactiveButton
        }
        titleStyle={
          activeAmenities.includes(index+1)
            ? { color: "#fff" }
            : { color: "#000" }
        }
        onPress={() => toggleAmenity(index+1)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={toggleFilterOverlay}
      >
        <Icon name="close" size={24} color="#000" />
      </TouchableOpacity>
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.label}>Tìm theo tên nơi lưu trú</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập tên nơi lưu trú"
              value={searchText}
              onChangeText={setSearchText}
            />

            <Text style={styles.label}>Lọc theo danh sách</Text>
            {categories.map((category) => (
              <CheckBox
                key={category.id}
                title={category.categoryName}
                checked={selectedCategory === category.id}
                onPress={() => setSelectedCategory(category.id)}
                containerStyle={styles.checkboxContainer}
              />
            ))}

            <Text style={styles.label}>
              Giá mỗi đêm: {formatPrice(priceRange)}
            </Text>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              maximumValue={30000000}
              minimumValue={0}
              step={500000}
              thumbStyle={styles.thumb}
              trackStyle={styles.track}
              minimumTrackTintColor="#2E7D32"
              maximumTrackTintColor="#D3D3D3"
            />

            <Text style={styles.label}>Xếp hạng sao</Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  title={`${star}`}
                  icon={
                    <Icon
                      name="star"
                      type="font-awesome"
                      color={rating >= star ? "#FFD700" : "#000"}
                    />
                  }
                  buttonStyle={
                    rating >= star ? styles.activeStarButton : styles.starButton
                  }
                  onPress={() => setRating(star)}
                  iconRight
                  titleStyle={{ color: "#000" }}
                />
              ))}
            </View>

            <Text style={styles.label}>Tiện nghi, dịch vụ</Text>
          </>
        }
        data={amenities}
        renderItem={renderAmenity}
        keyExtractor={(item) => item.amenity_name}
        numColumns={2}
        ListFooterComponent={
          <Button
            title="Submit"
            buttonStyle={styles.button}
            onPress={() =>
              handleGetFilterDestination() &&
              toggleFilterOverlay()
            }
          />
        }
        style={{ flex: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,

    backgroundColor: "#F5F5F5",
    width: "100%",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: -50,
    left: 0,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  closeButtonText: {
    color: "#000",
    fontSize: 18,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  checkboxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    margin: 0,
    padding: 0,
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: "#2E7D32",
  },
  track: {
    height: 10,
    borderRadius: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 12,
  },
  starButton: {
    backgroundColor: "#ccc",
  },
  activeStarButton: {
    backgroundColor: "#2089dc",
  },
  button: {
    backgroundColor: "#2089dc",
    marginTop: 20,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    margin: 12,
  },
  amenityText: {
    fontSize: 14,
    color: "#333",
  },
  activeButton: {
    backgroundColor: "#2089dc",
    width: 160,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    height: 100,
    borderRadius: 5,
    color: "#fff",
  },
  inactiveButton: {
    backgroundColor: "#ccc",
    width: 160,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    borderRadius: 5,
  },
  buttonTitle: {
    color: "#000",
  },
});
export default OverLayFilter;
