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
import { getDestinationById } from "../controller/DetailsController";
export default function TravelDetail({ navigation }) {
  const [destination, setDestinations] = useState({});
  const [loading, setLoading] = useState(true);

  const getDestinationDetails = async () => {
    let res = await getDestinationById(1);
    setDestinations(res);
    setLoading(false);
  };
  useEffect(() => {
    getDestinationDetails();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{ uri: destination?.image_url?.toString() }}
          style={{ width: "100%", height: 200 }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Text>Entire Home</Text>
        <Text
          style={{
            padding: 3,
            fontWeight: "bold",
            fontSize: 14,
            backgroundColor: "black",
            color: "white",
          }}
        >
          VIP access
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 22,
          }}
        >
          {destination.name}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Text>Sao</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Text style={{ color: "green" }}>Fully refundable</Text>
        <Text style={{ color: "green" }}>Reserve now, pay later</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <View
          style={{ padding: 7, borderRadius: 10, backgroundColor: "green" }}
        >
          <Text style={{ color: "white" }}>{destination?.average_rating}</Text>
        </View>
        <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold" }}>
          Exceptional
        </Text>
      </View>
      <View>
        <Text style={{ color: "blue" }}>See all 10 reviews</Text>
      </View>
      <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold" }}>
        About this property
      </Text>
      <Text>{destination.description}</Text>

      <Text>See all about this property</Text>
      <View>
        <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold" }}>
          Explore the area
        </Text>
        <Text>{destination?.location}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin: 10,
    backgroundColor: "#fff",
    gap: 20,
    height: "100%",
  },
});
