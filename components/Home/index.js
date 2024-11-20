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

function Home({ navigation }) {
  const data = [
    {
      city: "Hồ Chí Minh",
      country: "Việt Nam",
      uri: require("../../assets/anh-hcm.png"),
      value: "Hồ Chí Minh",
    },
    {
      city: "Hà Nội",
      country: "Việt Nam",
      uri: require("../../assets/anh-ha-noi.png"),
      value: "Hanoi",
    },
    {
      city: "Đà Nẵng",
      country: "Việt Nam",
      uri: require("../../assets/anh-da=nang.png"),
      value: "Da nang",
    },
    {
      city: "Khu Vực Khác",
      country: "Việt Nam",
      uri: require("../../assets/anh-khac.png"),
      value: "Other",
    },
  ];

  const [dataLastWeekend, setDataLastWeekend] = useState([]);
  const handleGetData = async () => {
    let res = await handleGetDestination();
    if (res && res.code === 200) {
      console.log(res.result);
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
    return (
      <TouchableOpacity
        style={{ margin: 4 }}
        onPress={() => handleDetails(item.destination_id)}
      >
        <Image
          source={{ uri: item.image_url }}
          style={{ width: 240, height: 135, borderRadius: 8 }}
        />
        <View style={{ width: "100%", padding: 12, display: "flex", gap: 10 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              width: 240,
              lineHeight: 18,
              height: 36,
            }}
          >
            {item.name}
          </Text>
          <Text numberOfLines={2} style={{ fontSize: 16, width: 240 }}>
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
              }}
            >
              {item.average_rating}
            </Text>
            <Text style={{ paddingLeft: 12 }}>(400 reviews)</Text>
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
          borderColor: "gray",
          borderWidth: 1,
          borderStyle: "solid",
        }}
        onPress={() => handleCityDetail(item.value)}
      >
        <Image source={item.uri} style={styles.image} />
        <Text
          style={{
            paddingLeft: 12,
            fontWeight: "bold",
            paddingTop: 10,
            paddingBottom: 6,
          }}
        >
          {item.city}
        </Text>
        <Text style={{ paddingLeft: 12 }}>{item.country}</Text>
      </TouchableOpacity>
    );
  };


  return (
    <View style={styles.container}>
      <ScrollView style={{padding:16}}>
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
              <Text style={{ color: "#ff6347", fontSize: 18, marginBottom: 10 }}>
                See all
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={dataLastWeekend}
            renderItem={renderItem}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
      <Footer value={"home"} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    minHeight:"100vh",
    paddingBottom:80
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 150,
    marginBottom: 10,
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
  },
  containerr: {
    marginTop: 30,
    marginBottom: 50,
  },
});

export default Home;