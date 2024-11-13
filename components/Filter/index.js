import { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getFilterDestination } from "../controller/filterController";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import Icon from "react-native-vector-icons/Ionicons";
import { Button, Overlay, SearchBar } from "@rneui/themed";
function FilterPage({ route, navigation }) {
  const [visibleDestination, setVisibleDestination] = useState(false); // Overlay cho địa điểm
  const [visibleDate, setVisibleDate] = useState(false); // Overlay cho ngày
  const [visibleGuest, setVisibleGuest] = useState(false); // Overlay cho khách
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const { city } = route.params || "Hồ Chí Minh"; // Nhận thành phố từ params
  const [filteredDestinations, setFilteredDestinations] = useState([]); // Lưu trữ dữ liệu lọc
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [search, setSearch] = useState("");
  const [selectDay, setSelectDay] = useState(true);
  const updateSearch = (search) => {
    setSearch(search);
  };
  // Hàm gọi API để lấy các địa điểm theo thành phố
  const handleGetFilterDestination = async (city) => {
    console.log("Fetching destinations for:", city);
    let res = await getFilterDestination(city);
    if (res && res.code === 200) {
      console.log("Fetched destinations:", res.result);
      setFilteredDestinations(res.result); // Cập nhật dữ liệu sau khi nhận được
    }
    setLoading(false); // Thay đổi trạng thái khi đã nhận được dữ liệu
  };

  useEffect(() => {
    handleGetFilterDestination(city); // Gọi API khi component mount
    navigation.setOptions({
      headerTitle: `${city}, Việt Nam`, // Cập nhật header với tên thành phố
      headerRight: () => (
        <Image
          source={require("../../assets/logo.png")} // Đường dẫn đến logo của bạn
          style={{ width: 100, height: 40 }} // Điều chỉnh kích thước logo theo ý muốn
          resizeMode="contain"
        />
      ),
    });
  }, [city, navigation]);
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  // Hàm lấy ngày thứ
  const getDayOfWeek = (date) => {
    const daysOfWeek = [
      "Chủ Nhật",
      "Thứ Hai ",
      "Thứ Ba  ",
      "Thứ Tư  ",
      "Thứ Năm ",
      "Thứ Sáu ",
      "Thứ Bảy ",
    ];
    return daysOfWeek[date.getDay()];
  };

  // Hàm lấy 2 ngày cuối tháng
  const getLastTwoDaysOfMonth = () => {
    const today = new Date();
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    ); // Ngày cuối tháng
    const secondLastDay = new Date(lastDayOfMonth);
    secondLastDay.setDate(lastDayOfMonth.getDate() - 1); // Ngày trước đó một ngày

    setSecondLastDay(formatDate(secondLastDay));
    setLastDayOfMonth(formatDate(lastDayOfMonth));
    setSelectedSecondLastDay(formatDate(secondLastDay)); // Thiết lập ngày đã chọn ban đầu
    setSelectedLastDayOfMonth(formatDate(lastDayOfMonth)); // Thiết lập ngày đã chọn ban đầu
  };

  const [secondLastDay, setSecondLastDay] = useState("");
  const [lastDayOfMonth, setLastDayOfMonth] = useState("");
  const [selectedSecondLastDay, setSelectedSecondLastDay] = useState("");
  const [selectedLastDayOfMonth, setSelectedLastDayOfMonth] = useState("");
  useEffect(() => {
    getLastTwoDaysOfMonth();
  }, []);
  const renderItem = ({ item }) => (
    <View style={styles.destinationItem}>
      <Image source={{ uri: item.image_url }} style={styles.destinationImage} />
      <Text style={styles.destinationName}>{item.name}</Text>
      <Text style={styles.destinationDescription} numberOfLines={2}>
        {item.description}
      </Text>
    </View>
  );
  const toggleDestinationOverlay = () =>
    setVisibleDestination(!visibleDestination);
  const toggleDateOverlay = () => setVisibleDate(!visibleDate);
  const toggleGuestOverlay = () => setVisibleGuest(!visibleGuest);
  return (
    <View style={styles.container}>
      {isButtonVisible && (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => setIsButtonVisible(!isButtonVisible)}
        >
          <View style={styles.sub_container}>
            <View style={{ flexDirection: "column", gap: 10 }}>
              <Text style={{ fontSize: 22, color: "#000", fontWeight: "bold" }}>
                {city || "Hồ Chí Minh"}
              </Text>
              <View style={{ flexDirection: "row", gap: 30 }}>
                <Text style={{ fontSize: "20px" }}>
                  {secondLastDay} - {lastDayOfMonth}
                </Text>
                <Text style={{ fontSize: "20px" }}>2 Khách, 1 phòng</Text>
              </View>
            </View>
            <Icon name="pencil" size={30} color="#000" />
          </View>
        </TouchableOpacity>
      )}
      {!isButtonVisible && (
        <View>
          <TouchableOpacity
            style={styles.buttonContainer1}
            onPress={toggleDestinationOverlay}
          >
            <Icon name="location-sharp" size={30} color="blue" />
            <View>
              <Text>Điểm đến</Text>
              <Text style={{ fontSize: "20px" }}>
                {city || "Hồ Chí Minh"},Việt Nam
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer1}
            onPress={toggleDateOverlay}
          >
            <Icon name="calendar" size={30} color="green" />
            <View>
              <Text>Ngày</Text>
              <Text style={{ fontSize: "20px" }}>
                {secondLastDay} - {lastDayOfMonth}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer1}
            onPress={toggleGuestOverlay}
          >
            <Icon name="person" size={30} color="orange" />
            <View>
              <Text>Khách</Text>
              <Text style={{ fontSize: "20px" }}>2 khách, 1 phòng</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: "100%", alignItems: "center" }}
            onPress={() => setIsButtonVisible(!isButtonVisible)}
          >
            <Icon name="close" size={30} color="red" />
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={filteredDestinations} // Dữ liệu lọc được
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      {/* Overlay cho Điểm đến */}
      <Overlay
        isVisible={visibleDestination}
        onBackdropPress={() => {}}
        overlayStyle={styles.overlay}
      >
        <View style={styles.overlayContent}>
          <SearchBar
            placeholder="Tìm kiếm..."
            onChangeText={updateSearch}
            value={search}
            containerStyle={{ width: "100%" }}
          />
          <TouchableOpacity
            onPress={toggleDestinationOverlay}
            style={styles.closeButton}
          >
            <Text>Đóng</Text>
          </TouchableOpacity>
        </View>
      </Overlay>

      {/* Overlay cho Ngày */}
      <Overlay
        isVisible={visibleDate}
        onBackdropPress={() => {}}
        overlayStyle={styles.overlay}
      >
        <View style={styles.overlayContent}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => setSelectDay(true)}
              style={{ flex: 4 }}
            >
              <Text
                style={[
                  {
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                  },
                  selectDay && { color: "blue" },
                ]}
              >
                {getDayOfWeek(new Date(selectedSecondLastDay))},
                {selectedSecondLastDay}
              </Text>
            </TouchableOpacity>
            <Icon
              name="arrow-forward"
              size={20}
              color="blue"
              style={{ flex: 1, textAlign: "center" }}
            />
            <TouchableOpacity
              onPress={() => setSelectDay(false)}
              style={{ flex: 4 }}
            >
              <Text
                style={[
                  {
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                  },
                  !selectDay && { color: "blue" },
                ]}
              >
                {getDayOfWeek(new Date(selectedLastDayOfMonth))},
                {selectedLastDayOfMonth}
              </Text>
            </TouchableOpacity>
          </View>
          <Calendar
            monthFormat={"MM-yyyy"}
            onDayPress={(day) => {
              // Cập nhật ngày đã chọn khi người dùng chọn trên calendar
              if (selectDay) {
                if (
                  new Date(day.dateString) < new Date(selectedLastDayOfMonth)
                ) {
                  setSelectedSecondLastDay(day.dateString);
                }
              } else {
                if (
                  new Date(day.dateString) > new Date(selectedSecondLastDay)
                ) {
                  setSelectedLastDayOfMonth(day.dateString);
                }
              }
              //   if (new Date(day.dateString) < new Date(selectedLastDayOfMonth)) {
              //     setSelectedSecondLastDay(day.dateString);
              //   } else {
              //     setSelectedLastDayOfMonth(day.dateString);
              //   }
            }}
            markedDates={{
              [selectedSecondLastDay]: {
                selected: true,
                selectedColor: "blue",
                selectedTextColor: "white",
              },
              [selectedLastDayOfMonth]: {
                selected: true,
                selectedColor: "blue",
                selectedTextColor: "white",
              },
            }}
          />
        </View>
      </Overlay>

      {/* Overlay cho Khách */}
      <Overlay
        isVisible={visibleGuest}
        onBackdropPress={() => {}}
        overlayStyle={styles.overlay}
      >
        <View style={styles.overlayContent}>
          <Text>Khách Overlay</Text>
          <Text>Chọn số khách ở đây</Text>
          <TouchableOpacity
            onPress={toggleGuestOverlay}
            style={styles.closeButton}
          >
            <Text>Đóng</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  destinationItem: {
    marginBottom: 16,
  },
  destinationImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  destinationName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  destinationDescription: {
    fontSize: 16,
    color: "#777",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  buttonContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  sub_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  buttonContainer1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  overlayContent: {
    // padding: 20,
    width: "100%",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "gray",
    borderRadius: 5,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    paddingTop: 50,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default FilterPage;
