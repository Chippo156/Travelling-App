import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Destination } from "../../model/Destination";
import { useEffect, useState } from "react";
import { environtment } from "../../environtment/environtment";
import {
  getAmenities,
  getDestinationById,
  getImageRoom,
  getImagesDestination,
  getRoomsByDestinationId,
} from "../controller/DetailsController";
import Icon from "react-native-vector-icons/Ionicons";
import { RadioButton } from "react-native-paper";
import Svg, { Path } from "react-native-svg";
import ImageSlider from "./ImageSlide";
export default function TravelDetail({ navigation }) {
  const [destination, setDestinations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amenities, setAmenities] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [checked, setChecked] = useState("first"); // State for radio button
  const [checkedExtra, setCheckedExtra] = useState("first"); // State for radio button

  const [imagesDes, setImagesDes] = useState([]);
  const [roomImages, setRoomImages] = useState({});

  const fetchImagesDestination = async () => {
    let res = await getImagesDestination(1);
    setImagesDes(res);
    console.log(res);
  };

  const fetchImageRoom = async (id) => {
    if (roomImages[id]) {
      return; // Nếu đã có ảnh trong state, không cần gọi lại API
    }
    let res = await getImageRoom(id);
    setRoomImages((prev) => ({ ...prev, [id]: res })); // Lưu ảnh với ID tương ứng
  };
  const getDestinationDetails = async () => {
    let res = await getDestinationById(1);
    setDestinations(res);
    setLoading(false);
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  const getAmenity = async () => {
    if (destination && destination.destination_id) {
      let res = await getAmenities(destination.destination_id);
      setAmenities(res);
    }
  };
  useEffect(() => {
    rooms.forEach((room) => {
      fetchImageRoom(room.id);
    });
  }, [rooms]);
  useEffect(() => {
    fetchImagesDestination();
  }, []);

  useEffect(() => {
    getDestinationDetails();
  }, []);

  useEffect(() => {
    getAmenity();
  }, [destination]);

  const getRoomsByDestination = async () => {
    if (destination && destination.destination_id) {
      let res = await getRoomsByDestinationId(destination.destination_id);
      setRooms(res);
    }
  };

  useEffect(() => {
    getRoomsByDestination();
  }, [destination]);

  const StarRating = ({ rating = 0 }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <View style={{ flexDirection: "row" }}>
        {[...Array(fullStars)].map((_, index) => (
          <Icon key={index} name="star" size={20} color="#FFD700" />
        ))}
        {halfStar && <Icon name="star-half" size={20} color="#FFD700" />}
        {[...Array(emptyStars)].map((_, index) => (
          <Icon key={index} name="star-o" size={20} color="#FFD700" />
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <ImageSlider images={imagesDes} />
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <Text>Entire Home</Text>
        <Text style={styles.vipText}>VIP access</Text>
      </View>
      <View>
        <Text style={styles.title}>{destination?.name}</Text>
        <StarRating rating={destination?.average_rating} />
      </View>
      <View style={styles.refundRow}>
        <Text style={styles.refundText}>Fully refundable</Text>
        <Text style={styles.refundText}>Reserve now, pay later</Text>
      </View>
      <View style={styles.ratingRow}>
        <View style={styles.ratingBox}>
          <Text style={styles.ratingNumber}>{destination?.average_rating}</Text>
        </View>
        <Text style={styles.excellentText}>Exceptional</Text>
      </View>
      <View>
        <Text style={styles.reviewsText}>See all 10 reviews</Text>
      </View>
      <Text style={styles.sectionTitle}>About this property</Text>
      <Text style={styles.description}>{destination?.description}</Text>
      <View>
        <FlatList
          data={amenities}
          renderItem={({ item }) => (
            <View style={styles.amenityItem}>
              <Text style={styles.amenityText}>{item?.amenityName}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      </View>
      <View>
        <Text style={styles.sectionTitle}>Explore the area</Text>
        <Text style={styles.description}>{destination?.location}</Text>
      </View>
      <Text style={styles.sectionTitle}>Choose your room</Text>
      <View style={{ marginVertical: 20 }}>
        <FlatList
          data={rooms}
          renderItem={({ item }) => (
            <View style={styles.roomItem}>
              <View>
                {/* Sử dụng ảnh từ roomImages */}
                <ImageSlider images={roomImages[item.id] || []} />
              </View>
              <Text style={styles.roomType}>
                {item.room_type + " " + item.description}
              </Text>
              <View
                style={[
                  styles.flexRow,
                  {
                    marginVertical: 10,
                  },
                ]}
              >
                <Svg
                  className="uitk-icon uitk-icon-small uitk-icon-positive-theme"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width={24}
                  height={24}
                  fill={"green"}
                >
                  <Path
                    fillRule="evenodd"
                    d="M6 3h7a6 6 0 0 1 0 12h-3v6H6V3zm4 8h3.2a2 2 0 0 0 2-2 2 2 0 0 0-2-2H10v4z"
                    clipRule="evenodd"
                  />
                </Svg>

                <Text style={{ color: "green", gap: 10 }}>
                  Free self parking
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                  paddingBottom: 10,
                  marginVertical: 10,
                }}
              >
                <View style={{ gap: 10 }}>
                  <View style={styles.flexRow}>
                    <Svg
                      class="uitk-icon uitk-icon-small uitk-icon-default-theme"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width={24}
                      height={24}
                    >
                      <Path
                        fill-rule="evenodd"
                        d="m1 9 2 2a12.73 12.73 0 0 1 18 0l2-2A15.57 15.57 0 0 0 1 9zm8 8 3 3 3-3a4.24 4.24 0 0 0-6 0zm-2-2-2-2a9.91 9.91 0 0 1 14 0l-2 2a7.07 7.07 0 0 0-10 0z"
                        clip-rule="evenodd"
                      ></Path>
                    </Svg>

                    <Text style={{ width: 80, flexWrap: "wrap" }}>
                      {" "}
                      {item.features}
                    </Text>
                  </View>
                  <View style={styles.flexRow}>
                    <Svg
                      class="uitk-icon uitk-icon-default-theme"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width={24}
                      height={24}
                    >
                      <Path d="M6 18h2l-3 3-3-3h2V6c0-1.1.9-2 2-2h12V2l3 3-3 3V6H6v12zm14-8v2h-2v-2h2zm0 8a2 2 0 0 1-2 2v-2h2zm0-4v2h-2v-2h2zm-4 4v2h-2v-2h2zm-4 0v2h-2v-2h2z"></Path>
                    </Svg>
                    <Text>{item.area} sq m</Text>
                  </View>
                </View>
                <View style={{ gap: 10 }}>
                  <View style={styles.flexRow}>
                    <Svg
                      class="uitk-icon uitk-icon-small uitk-icon-default-theme"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width={24}
                      height={24}
                    >
                      <Path
                        fill-rule="evenodd"
                        d="M10.99 8A3 3 0 1 1 5 8a3 3 0 0 1 6 0zm8 0A3 3 0 1 1 13 8a3 3 0 0 1 6 0zM8 13c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm7.03.05c.35-.03.68-.05.97-.05 2.33 0 7 1.17 7 3.5V19h-6v-2.5c0-1.48-.81-2.61-1.97-3.45z"
                        clip-rule="evenodd"
                      ></Path>
                    </Svg>
                    <Text>Sleeps {item.sleeps}</Text>
                  </View>
                  <View style={styles.flexRow}>
                    <Svg
                      class="uitk-icon uitk-icon-small uitk-icon-default-theme"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width={24}
                      height={24}
                    >
                      <Path
                        fill-rule="evenodd"
                        d="M11 7h8a4 4 0 0 1 4 4v9h-2v-3H3v3H1V5h2v9h8V7zm-1 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
                        clip-rule="evenodd"
                      ></Path>
                    </Svg>
                    <Text>{item.beds}</Text>
                  </View>
                </View>
              </View>
              <View>
                <Text style={styles.titleRoom}>Cancellation policy</Text>
                <Text>More details on all policy options</Text>
              </View>
              <RadioButton.Group
                onValueChange={(value) => setChecked(value)}
                value={checked}
              >
                <View style={styles.row}>
                  <View style={styles.row}>
                    <RadioButton value="first" />
                    <Text>None-refundable</Text>
                  </View>
                  <View style={{ marginLeft: 40, marginRight: 10 }}>
                    <Text>+ 0đ</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.row}>
                    <RadioButton value="second" />
                    <Text style={{ width: 150 }}>
                      Fully refundable before 27 Nov
                    </Text>
                  </View>
                  <View style={{ marginLeft: 40, marginRight: 10 }}>
                    <Text>{formatCurrency(item.price * 0.15)}</Text>
                  </View>
                </View>
              </RadioButton.Group>
              <View
                style={{
                  borderTopWidth: 1,
                  borderTopColor: "gray",
                  paddingTop: 10,
                }}
              >
                <Text style={styles.titleRoom}>Extras</Text>
              </View>
              <RadioButton.Group
                onValueChange={(value) => setCheckedExtra(value)}
                value={checkedExtra}
              >
                <View style={styles.row}>
                  <View style={styles.row}>
                    <RadioButton value="first" />
                    <Text>Breakfast buffet</Text>
                  </View>
                  <View style={{ marginLeft: 40, marginRight: 10 }}>
                    <Text>+ 0đ</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.row}>
                    <RadioButton value="second" />
                    <Text>Half board</Text>
                  </View>
                  <View style={{ marginLeft: 40, marginRight: 10 }}>
                    <Text>{formatCurrency(500000)}</Text>
                  </View>
                </View>
              </RadioButton.Group>
              <Text
                style={[
                  styles.titleRoom,
                  {
                    borderTopWidth: 1,
                    borderTopColor: "gray",
                    paddingTop: 10,
                  },
                ]}
              >
                Price details
              </Text>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                    {formatCurrency(item.price)}
                  </Text>
                  <TouchableOpacity
                    style={{
                      padding: 12,
                      borderRadius: 20,
                      backgroundColor: "blue",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 14,
                        color: "white",
                      }}
                    >
                      Reserve
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text></Text>
                </View>
              </View>
            </View>
          )}
          numColumns={1}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    margin: 10,
    backgroundColor: "white",
    padding: 16,
    height: 300,
  },
  flexRow: {
    flexDirection: "row",
    gap: 10,
  },
  vipText: {
    padding: 3,
    fontWeight: "bold",
    fontSize: 14,
    backgroundColor: "black",
    color: "white",
    marginVertical: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    marginVertical: 10,
  },
  refundRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
  refundText: {
    color: "green",
    fontSize: 18,
    marginVertical: 10,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
  ratingBox: {
    padding: 7,
    borderRadius: 10,
    backgroundColor: "green",
    marginVertical: 10,
  },
  ratingNumber: {
    color: "white",
    marginVertical: 10,
  },
  excellentText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  reviewsText: {
    color: "blue",
    marginVertical: 10,
  },
  sectionTitle: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  description: {
    fontSize: 18,
    marginVertical: 10,
  },
  amenityItem: {
    width: 200,
    marginVertical: 10,
  },
  amenityText: {
    fontSize: 18,
  },
  roomItem: {
    flexGrow: 1,
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 7.84,
    elevation: 5,
  },
  roomImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  roomType: {
    fontSize: 20,
    fontWeight: "bold",
  },
  titleRoom: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 5,
  },

  roomDescription: {
    fontSize: 18,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5, // Add vertical margin to create space between rows
  },
  vipText: {
    padding: 3,
    fontWeight: "bold",
    fontSize: 14,
    backgroundColor: "black",
    color: "white",
    marginLeft: 10, // Add left margin to create space between text elements
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    marginVertical: 10, // Add vertical margin to create space between title and other elements
  },
});
