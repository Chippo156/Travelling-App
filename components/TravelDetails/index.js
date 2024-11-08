import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Destination } from "../../model/Destination";
import { useEffect, useState } from "react";
import { environtment } from "../../environtment/environtment";
import {
  getAmenities,
  getDestinationById,
  getRoomsByDestinationId,
} from "../controller/DetailsController";
import Icon from "react-native-vector-icons/Ionicons";

export default function TravelDetail({ navigation }) {
  const [destination, setDestinations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amenities, setAmenities] = useState([]);
  const [rooms, setRooms] = useState([]);

  const getDestinationDetails = async () => {
    let res = await getDestinationById(1);
    setDestinations(res);
    setLoading(false);
  };

  const getAmenity = async () => {
    if (destination && destination.destination_id) {
      let res = await getAmenities(destination.destination_id);
      setAmenities(res);
    }
  };

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
    <View style={styles.container}>
      {/* <View>
        <Image
          source={{ uri: destination?.image_url?.toString() }}
          style={{ width: "100%", height: 200 }}
        />
      </View>
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
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
      </View> */}
      <View>
        <Text style={styles.sectionTitle}>Explore the area</Text>
        <Text style={styles.description}>{destination?.location}</Text>
      </View>
      <Text style={styles.sectionTitle}>Choose your room</Text>
      <View style={{ height: 700 }}>
        <FlatList
          data={rooms}
          renderItem={({ item }) => (
            <View style={styles.roomItem}>
              <Image
                source={{ uri: item.image_url }}
                style={styles.roomImage}
              />
              <Text style={styles.roomType}>{item.room_type}</Text>
              <Text style={styles.roomDescription}>{item.description}</Text>
            </View>
          )}
          numColumns={1}
        />
      </View>
    </View>
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
  },
  roomImage: {
    width: "100%",
    height: 200,
  },
  roomType: {
    fontSize: 18,
  },
  roomDescription: {
    fontSize: 18,
  },
});
