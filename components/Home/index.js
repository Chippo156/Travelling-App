import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { handleGetDestination } from "../controller/homeController";
import Footer from "../Footer";
import { getCountReview } from "../controller/DetailsController";
import WebView from "react-native-webview";
import Chatbot from "./ChatBox";

function Home({ navigation }) {
  const data = [
    {
      city: "Hồ Chí Minh",
      country: "Việt Nam",
      uri: "https://res.cloudinary.com/dqnwxejgy/image/upload/v1732625782/yxnc5fajorvttzl460zo.jpg",
      value: "Hồ Chí Minh",
    },
    {
      city: "Hà Nội",
      country: "Việt Nam",
      uri: "https://res.cloudinary.com/dqnwxejgy/image/upload/v1732625782/edartsrn1jrjiz9mghkc.jpg",
      value: "Hanoi",
    },
    {
      city: "Đà Nẵng",
      country: "Việt Nam",
      uri: "https://res.cloudinary.com/dqnwxejgy/image/upload/v1732625795/yqljcvlgycvdphi7ucso.jpg",
      value: "Da nang",
    },
    {
      city: "Khu Vực Khác",
      country: "Việt Nam",
      uri: "https://res.cloudinary.com/dqnwxejgy/image/upload/v1732625782/thlqbjw6vxkk8g0cq4ko.jpg",
      value: "Other",
    },
  ];
  const handleGetCountReview = async (des_id) => {
    let res = await getCountReview(des_id);
    if (res && res.code === 200) {
      return res.result;
    }
  };
  const [dataLastWeekend, setDataLastWeekend] = useState([]);
  const handleGetData = async () => {
    let res = await handleGetDestination();
    if (res && res.code === 200) {
      for (const item of res.result) {
        let count = await handleGetCountReview(item.destination_id);
        item.count_review = count;
      }
      setDataLastWeekend(res.result);
    }
  };
  useEffect(() => {
    handleGetData();
  }, []);
  const handleCityDetail = (value) => {
    navigation.navigate("Filter", { city: value });
  };
  const handleDetails = (id) => {
    navigation.navigate("TravelDetail", { id });
  };
  const renderItem = ({ item }) => {
    const imgUri = { uri: item.image_url };

    return (
      <TouchableOpacity
        style={{
          margin: 4,
          borderColor: "#fff",
          borderWidth: 1,
          borderStyle: "solid",
          borderRadius: 8,
        }}
        onPress={() => handleDetails(item.destination_id)}
      >
        <Image
          source={{ uri: item.image_url, cache: "force-cache" }}
          style={{ width: "100%", height: 135, borderRadius: 8 }}
        />
        <View style={{ width: "100%", padding: 12, display: "flex", gap: 10 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              width: 240,
              lineHeight: 18,
              height: 36,
              color: "white", // Thêm màu trắng
            }}
          >
            {item.name}
          </Text>

          <Text
            numberOfLines={2}
            style={{
              fontSize: 16,
              width: 240,
              color: "white", // Thêm màu trắng
            }}
          >
            {item.description}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 8,
              width: "100%",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                backgroundColor: "#57ca61",
                borderRadius: 12,
                textAlign: "center",
                padding: 8,
                color: "white",
              }}
            >
              {item.average_rating}
            </Text>
            <Text style={{ paddingLeft: 12, color: "#fff" }}>
              ({item.count_review.toFixed(1)} reviews)
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCity = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          width: 250,
          height: 250,
          borderRadius: 8,
          margin: 4,
          borderColor: "#fff",
          borderWidth: 1,
          borderStyle: "solid",
        }}
        onPress={() => handleCityDetail(item.value)}
      >
        <Image source={{ uri: item.uri }} style={styles.image} />
        <Text
          style={{
            paddingLeft: 12,
            fontWeight: "bold",
            paddingTop: 10,
            paddingBottom: 6,
            color: "white",
          }}
        >
          {item.city}
        </Text>
        <Text style={{ paddingLeft: 12, color: "white" }}>{item.country}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ padding: 16 }}>
        <Text style={styles.title}>Hello!</Text>

        <Text style={styles.title}>Explore stays in trending destinations</Text>
        <View>
          <FlatList
            data={data}
            renderItem={renderCity}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.containerr}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Last-minute weekend deals</Text>
            <TouchableOpacity>
              <Text
                style={{ color: "#ff6347", fontSize: 18, marginBottom: 10 }}
              >
                See all
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 300 }}>
            <FlatList
              data={dataLastWeekend}
              renderItem={renderItem}
              horizontal={true}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </View>
      <Footer value={"home"} navigation={navigation} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#191e3b",
    minHeight: "100vh",
    paddingBottom: 80,
    height: 700,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white", // Thêm màu trắng
  },
  image: {
    width: "100%",
    height: 150,
    marginBottom: 10,
    resizeMode: "cover",
    borderRadius: 8,
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
  },
  containerr: {
    marginTop: 30,
    marginBottom: 80,
    width: "500px",
    minHeight: 350,
    paddingBottom: 20,
  },
});

export default Home;
