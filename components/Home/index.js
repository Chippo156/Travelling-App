import { useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

function Home() {
  const [activeTab, setActiveTab] = useState("home"); // Trạng thái theo dõi tab đang active
  const data = [
    {
      city: "Vũng Tàu",
      country: "Việt Nam",
      uri: "https://res.cloudinary.com/dqnwxejgy/image/upload/v1730812408/UUID.randomUUID%28%29.toString%28%29.webp",
    },
    {
      city: "Vũng Tàu",
      country: "Việt Nam",
      uri: "https://res.cloudinary.com/dqnwxejgy/image/upload/v1730812408/UUID.randomUUID%28%29.toString%28%29.webp",
    },
    {
      city: "Vũng Tàu",
      country: "Việt Nam",
      uri: "https://res.cloudinary.com/dqnwxejgy/image/upload/v1730812408/UUID.randomUUID%28%29.toString%28%29.webp",
    },
    {
      city: "Vũng Tàu",
      country: "Việt Nam",
      uri: "https://res.cloudinary.com/dqnwxejgy/image/upload/v1730812408/UUID.randomUUID%28%29.toString%28%29.webp",
    },
  ];
  const dataLastWeekend = [
    {
      uri: "https://res.cloudinary.com/dqnwxejgy/image/upload/v1730812408/UUID.randomUUID%28%29.toString%28%29.webp",
      title: "Cam Ranh",
      description: "Resort",
      rating: 4.5,
      review: 100,
    },
    {
      uri: "https://res.cloudinary.com/dqnwxejgy/image/upload/v1730812408/UUID.randomUUID%28%29.toString%28%29.webp",
      title: "Cam Ranh",
      description: "Resort",
      rating: 4.5,
      review: 100,
    },
    {
      uri: "https://res.cloudinary.com/dqnwxejgy/image/upload/v1730812408/UUID.randomUUID%28%29.toString%28%29.webp",
      title: "Cam Ranh",
      description: "Resort",
      rating: 4.5,
      review: 100,
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={{ margin: 4 }}>
        <Image
          source={{ uri: item.uri }}
          style={{ width: 240, height: 135, borderRadius: 8 }}
        />
        <View style={{ width: "100%", padding: 12, display: "flex", gap: 10 }}>
          <Text style={{ fontSize: 18 }}>{item.title}</Text>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
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
              {item.rating}
            </Text>
            <Text style={{ paddingLeft: 12 }}>({item.review} reviews)</Text>
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
      >
        <Image source={{ uri: item.uri }} style={styles.image} />
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

  // Hàm để đổi trạng thái active tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello!</Text>
      <Text style={styles.title}>Explore stays in trending destinations</Text>
      <View>
        <FlatList
          data={data} // Dữ liệu để hiển thị
          renderItem={renderCity} // Hàm render cho từng item
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

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.footerButton,
            activeTab === "home" && styles.activeTab,
          ]}
          onPress={() => handleTabChange("home")}
        >
          <Icon name="home" style={{ fontSize: 20 }} />
          <Text style={styles.footerText}>Trang Chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.footerButton,
            activeTab === "search" && styles.activeTab,
          ]}
          onPress={() => handleTabChange("search")}
        >
          <Icon name="search" style={{ fontSize: 20 }} />
          <Text style={styles.footerText}>Tìm Kiếm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.footerButton,
            activeTab === "user" && styles.activeTab,
          ]}
          onPress={() => handleTabChange("user")}
        >
          <Icon name="person" style={{ fontSize: 20 }} />
          <Text style={styles.footerText}>Tài Khoản</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
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
  },
  footer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  footerButton: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  footerText: {
    fontSize: 16,
    color: "#000",
  },
});

export default Home;
