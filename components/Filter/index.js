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
import { getFilterDestination, getImageDestination } from "../controller/filterController";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import Icon from "react-native-vector-icons/Ionicons";
import { Button, Overlay, SearchBar } from "@rneui/themed";
import OverlayDate from "./OverlayDate";
import OverlayFilter from "./OverLayFilter";
function FilterPage({ route, navigation }) {
  const [visibleFilter, setVisibleFilter] = useState(false); // Overlay cho địa điểm
  const [visibleDestination, setVisibleDestination] = useState(false); // Overlay cho địa điểm
  const [visibleDate, setVisibleDate] = useState(false); // Overlay cho ngày
  const [visibleGuest, setVisibleGuest] = useState(false); // Overlay cho khách
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const { city } = route.params || "Hồ Chí Minh"; // Nhận thành phố từ params
  const [filteredDestinations, setFilteredDestinations] = useState([]); // Lưu trữ dữ liệu lọc
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [search, setSearch] = useState("");
  const [selectDay, setSelectDay] = useState(true);
  const [selectedSecondLastDay, setSelectedSecondLastDay] = useState("");
  const [selectedLastDayOfMonth, setSelectedLastDayOfMonth] = useState("");
  const [numberGuest, setNumberGuest] = useState(1);
  const updateSearch = (search) => {
    setSearch(search);
  };
  // Hàm gọi API để lấy các địa điểm theo thành phố
  const handleGetFilterDestination = async (city) => {
    let res = await getFilterDestination(city || "Ho Chi Minh");
    if (res && res.data.code === 200) {
      setFilteredDestinations(res.data.result); // Cập nhật dữ liệu sau khi nhận được
    }
    setLoading(false); // Thay đổi trạng thái khi đã nhận được dữ liệu
  };

  useEffect(() => {
    handleGetFilterDestination(city); // Gọi API khi component mount
    navigation.setOptions({
      headerTitle: `${city || "Hồ Chí Minh"}, Việt Nam`, // Cập nhật header với tên thành phố
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
  const getMonthDay = (date) => {
    const day = date.split("-")[2];
    const month = date.split("-")[1];
    return `${day}/${month}`;
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

    setSelectedSecondLastDay(formatDate(secondLastDay)); // Thiết lập ngày đã chọn ban đầu
    setSelectedLastDayOfMonth(formatDate(lastDayOfMonth)); // Thiết lập ngày đã chọn ban đầu
  };

  useEffect(() => {
    getLastTwoDaysOfMonth();
  }, []);
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          width: "100%",
          marginTop: 20,
          paddingTop: 10,
          paddingBottom: 10,
          borderColor: "#f0f0f0",
          borderStyle: "solid",
          borderWidth: 1,
        }}
        onPress={() =>
          navigation.navigate("TravelDetail", {
            destination: item,
            selectedSecondLastDay,
            selectedLastDayOfMonth,
            numberGuest,
          })
        }
      >
        <View style={styles.destinationItem}>
          <Image
            source={{ uri: item.image_url }}
            style={styles.destinationImage}
          />
          <View style={{ flex: 3,gap:10 }}>
            <Text style={styles.destinationName}>{item.name}</Text>
            <Text style={styles.destinationDescription}>
              {city || item.location}
            </Text>
            <Text
              style={{
                 borderRadius: "12px",
                color: "#fff",
                backgroundColor: "#00bbf2",
                height: 30,
                width: 30,
                lineHeight:30,
                textAlign: "center",
              }}
            >
              {item.average_rating}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const toggleDestinationOverlay = () =>
    setVisibleDestination(!visibleDestination);
  const toggleDateOverlay = () => setVisibleDate(!visibleDate);
  const toggleGuestOverlay = () => setVisibleGuest(!visibleGuest);
  const toggleFilterOverlay = () => setVisibleFilter(!visibleFilter);
  const handleAddGuest = () => {
    setNumberGuest(numberGuest + 1);
  };
  const handleRemoveGuest = () => {
    if (numberGuest > 1) {
      setNumberGuest(numberGuest - 1);
    }
  };
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
                <Text style={{ fontSize: 20 }}>
                  {getMonthDay(selectedSecondLastDay)} -{" "}
                  {getMonthDay(selectedLastDayOfMonth)}
                </Text>
                <Text style={{ fontSize: 20 }}>{numberGuest} Khách</Text>
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
              <Text style={{ fontSize: 20 }}>
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
              <Text style={{ fontSize: 20 }}>
                {getMonthDay(selectedSecondLastDay)} -{" "}
                {getMonthDay(selectedLastDayOfMonth)}
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
              <Text style={{ fontSize: 20 }}>{numberGuest} khách</Text>
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Danh sách khách sạn
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#f0f0f0",
            padding: 10,
            borderRadius: 10,
          }}
          onPress={toggleFilterOverlay}
        >
          <Icon name="filter" size={20} color="#000" />
          <Text style={{ marginLeft: 8, fontSize: 20 }}>Bộ lọc</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredDestinations} // Dữ liệu lọc được
        renderItem={renderItem}
        keyExtractor={(item, index) => item.destination_id.toString()}
        contentContainerStyle={{ marginVertical: 10 }}
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
        <OverlayDate
          toggleDateOverlay={toggleDateOverlay}
          selectedSecondLastDay={selectedSecondLastDay}
          selectedLastDayOfMonth={selectedLastDayOfMonth}
          setSelectedSecondLastDay={setSelectedSecondLastDay}
          setSelectedLastDayOfMonth={setSelectedLastDayOfMonth}
          selectDay={selectDay}
          setSelectDay={setSelectDay}
          getDayOfWeek={getDayOfWeek}
          getMonthDay={getMonthDay}
        />
      </Overlay>

      {/* Overlay cho Khách */}
      <Overlay
        isVisible={visibleGuest}
        onBackdropPress={() => {}}
        overlayStyle={styles.overlay}
      >
        <View style={styles.overlayContent}>
          <Text style={{ fontSize: 30 }}>Khách</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 20 }}>Số Khách </Text>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <TouchableOpacity
                style={{
                  padding: 6,
                  borderRadius: "50%",
                  borderColor: "gray",
                  borderStyle: "solid",
                  borderWidth: 1,
                }}
                onPress={() => handleRemoveGuest()}
              >
                <Icon name="remove" size={20} />
              </TouchableOpacity>
              <Text style={{ fontSize: 20 }}>{numberGuest}</Text>
              <TouchableOpacity
                style={{
                  padding: 6,
                  borderRadius: "50%",
                  borderColor: "gray",
                  borderStyle: "solid",
                  borderWidth: 1,
                }}
                onPress={() => handleAddGuest()}
              >
                <Icon name="add" size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={toggleGuestOverlay}
            style={styles.closeButton}
          >
            <Text style={{ fontSize: 20, color: "#000" }}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
      <Overlay
        isVisible={visibleFilter}
        onBackdropPress={() => {}}
        overlayStyle={styles.overlay}
      >
        <OverlayFilter city={city||"Hồ Chí Minh"} toggleFilterOverlay={toggleFilterOverlay}/>
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
    gap: 10,

    flexDirection: "row",
    backgroundColor: "#fff",
    width: "100%",
  },
  destinationImage: {
    resizeMode: "contain",
    flex: 2,
  },
  destinationName: {
    fontSize: 18,
    fontWeight: "bold",
    width: "100%",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  destinationDescription: {
    fontSize: 16,
    color: "#777",
    width: "100%",
    flexShrink: 1,
    flexWrap: "wrap",
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
    width: "100%",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#00bbf2",
    borderRadius: 5,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
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
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default FilterPage;
