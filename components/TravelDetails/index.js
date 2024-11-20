import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  ScrollViewBase,
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
  getFilterRoom,
  getImageRoom,
  getImagesDestination,
  getReviews,
  getRoomsByDestinationId,
} from "../controller/DetailsController";
import Icon from "react-native-vector-icons/Ionicons";
import { RadioButton } from "react-native-paper";
import Svg, { Path } from "react-native-svg";
import ImageSlider from "./ImageSlide";
import Header from "../Header/Header";
import { handleGetDestination } from "../controller/homeController";
import { Overlay } from "@rneui/themed";
import { loadingTrue, loadingFalse } from "../Redux/userSlice";

import OverlayDate from "../Filter/OverlayDate";
import { useDispatch } from "react-redux";
export default function TravelDetail({ route, navigation }) {
  const dispatch = useDispatch();

  const [destination, setDestinations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amenities, setAmenities] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [checked, setChecked] = useState("first"); // State for radio button
  const [checkedExtra, setCheckedExtra] = useState("first"); // State for radio button

  const [imagesDes, setImagesDes] = useState([]);
  const [roomImages, setRoomImages] = useState({});
  const [destinations, setListDestination] = useState([]);
  const [selectDay, setSelectDay] = useState(true);
  const [selectedSecondLastDay, setSelectedSecondLastDay] = useState("");
  const [selectedLastDayOfMonth, setSelectedLastDayOfMonth] = useState("");
  const [visibleDate, setVisibleDate] = useState(false); // Overlay cho ngày

  const [visibleGuest, setVisibleGuest] = useState(false); // Overlay cho khách
  const [numberGuest, setNumberGuest] = useState(1);
  const [numberRoom, setNumbeRoom] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const currentDate = new Date();
  const refundDate = new Date(currentDate);
  refundDate.setDate(currentDate.getDate() + 7);
  const formatDateRefund = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const fetchListDestination = async () => {
    try {
      let res = await handleGetDestination();
      setListDestination(res.result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchImagesDestination = async () => {
    if (route.params && route.params.id) {
      let res = await getImagesDestination(route.params.id);
      setImagesDes(res);
    } else {
      let res = await getImagesDestination(1);
      setImagesDes(res);
    }
  };

  const fetchImageRoom = async (id) => {
    if (roomImages[id]) {
      return; // Nếu đã có ảnh trong state, không cần gọi lại API
    }
    let res = await getImageRoom(id);
    setRoomImages((prev) => ({ ...prev, [id]: res })); // Lưu ảnh với ID tương ứng
  };
  const getDestinationDetails = async () => {
    if (route.params && route.params.id) {
      let res = await getDestinationById(route.params.id);
      if (res.code === 200) {
        setDestinations(res.result);
        setLoading(false);
      }
    } else {
      let res = await getDestinationById(1);
      if (res.code === 200) {
        setDestinations(res.result);
      }
    }
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
  const liked =
    "Cleanliness, staff & service, property conditions & facilities, room comfort";

  const getReview = async () => {
    try {
      if (destination && destination.destination_id) {
        let res = await getReviews(destination.destination_id);
        if (res.code === 200) {
          setReviews(res.result);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    rooms.forEach((room) => {
      fetchImageRoom(room.id);
    });
  }, [rooms]);
  useEffect(() => {
    fetchImagesDestination();
    getDestinationDetails();
    fetchListDestination();
  }, []);

  useEffect(() => {
    getAmenity();
    getReview();
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
  const toggleGuestOverlay = () => setVisibleGuest(!visibleGuest);
  const handleAddGuest = () => {
    setNumberGuest(numberGuest + 1);
  };
  const handleRemoveGuest = () => {
    if (numberGuest > 1) {
      setNumberGuest(numberGuest - 1);
    }
  };
  const handleAddRoom = () => {
    setNumbeRoom(numberRoom + 1);
  };
  const handleRemoveRoom = () => {
    if (numberRoom > 1) {
      setNumbeRoom(numberRoom - 1);
    }
  };
  const toggleDateOverlay = () => setVisibleDate(!visibleDate);
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

  const handleNavigate = (id) => {
    navigation.push("TravelDetail", { id });
  };
  const handleDeserve = (desid, roomid) => {
    navigation.navigate("Deserve", {
      desId: desid,
      roomId: roomid,
      startDate: selectedSecondLastDay,
      endDate: selectedLastDayOfMonth,
      numberGuest: numberGuest,
      numberRoom: numberRoom,
      refund: checked,
      extra: checkedExtra,
    });
  };

  const fetchFilterRoom = async () => {
    try {
      let res = await getFilterRoom(
        numberGuest,
        selectedSecondLastDay,
        selectedLastDayOfMonth,
        numberRoom,
        destination.destination_id
      );
      setRooms(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFilterRoom();
  }, [numberGuest, numberRoom, selectedSecondLastDay, selectedLastDayOfMonth]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[styles.roomItem, { margin: 4 }]}
        onPress={() => handleNavigate(item.destination_id)}
      >
        <Image
          source={{ uri: item.image_url }}
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
            }}
          >
            {item.name}
          </Text>
          <Text numberOfLines={2} style={{ fontSize: 16, width: 240 }}>
            {item.description}
          </Text>
          <View>
            <FlatList
              data={amenities.slice(0, 4)}
              renderItem={({ item }) => (
                <View style={styles.flexRow}>
                  <Icon name={item.amenityIcon} size={24} color="#333" />
                  <Text style={styles.amenityText}>{item?.amenityName}</Text>
                </View>
              )}
              nestedScrollEnabled={true}
              keyExtractor={(item) => item.id.toString()}
              numColumns={1}
            />
          </View>
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
              {item.average_rating.toFixed(1)}
            </Text>
            <Text style={{ paddingLeft: 12 }}>(400 reviews)</Text>
          </View>
        </View>
      </TouchableOpacity>
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
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.reviewsText}>
          See all {reviews?.length} reviews
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reviews ({reviews.length})</Text>

            <FlatList
              data={reviews}
              keyExtractor={(index, item) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.reviewCard}>
                  <Text style={styles.rating}>{item.rating + 3}</Text>
                  <Text style={styles.reviewerInfo}>
                    {item.username} - {item.created_at}
                  </Text>
                  <Text style={styles.liked}>Liked: {liked}</Text>
                  <Text style={styles.reviewTitle}>{item.title}</Text>
                  <Text style={styles.description}>{item.content}</Text>
                </View>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Text style={styles.sectionTitle}>About this property</Text>
      <Text style={styles.description}>{destination?.description}</Text>
      <View>
        <FlatList
          data={amenities}
          renderItem={({ item }) => (
            <View style={styles.amenityItem}>
              <Icon name={item.amenityIcon} size={24} color="#333" />
              <Text style={styles.amenityText}>{item?.amenityName}</Text>
            </View>
          )}
          nestedScrollEnabled={true}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      </View>
      <View>
        <Text style={styles.sectionTitle}>Explore the area</Text>
        <Text style={styles.description}>{destination?.location}</Text>
      </View>
      <Text style={styles.sectionTitle}>Choose your room</Text>
      <TouchableOpacity
        style={styles.buttonContainer1}
        onPress={toggleDateOverlay}
      >
        <Icon name="calendar" size={30} color="green" />
        <View>
          <Text>Ngày</Text>
          <Text style={{ fontSize: 18 }}>
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
          <Text>Guest</Text>
          <Text style={{ fontSize: 20 }}>
            {numberGuest} guest , {numberRoom} room
          </Text>
        </View>
      </TouchableOpacity>

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
      <Overlay
        isVisible={visibleGuest}
        onBackdropPress={() => {}}
        overlayStyle={styles.overlay}
      >
        <View style={styles.overlayContent}>
          <Text style={{ fontSize: 30 }}>Filter</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 20 }}>Số Khách</Text>
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 20 }}>Số phòng</Text>
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
                onPress={() => handleRemoveRoom()}
              >
                <Icon name="remove" size={20} />
              </TouchableOpacity>
              <Text style={{ fontSize: 20 }}>{numberRoom}</Text>
              <TouchableOpacity
                style={{
                  padding: 6,
                  borderRadius: "50%",
                  borderColor: "gray",
                  borderStyle: "solid",
                  borderWidth: 1,
                }}
                onPress={() => handleAddRoom()}
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
      <View style={{ marginVertical: 20 }}>
        <FlatList
          data={rooms}
          nestedScrollEnabled={true}
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
                  clipRule="evenodd"
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
                      clipRule="evenodd"
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
                      clipRule="evenodd"
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
                      clipRule="evenodd"
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
                      clipRule="evenodd"
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
                      Fully refundable before {formatDateRefund(refundDate)}
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
                  <View>
                    {item.quantity < 1 ? (
                      <Text style={{ color: "red" }}>Full room</Text>
                    ) : (
                      <>
                        <Text style={{ color: "green" }}>
                          {item.quantity} room left
                        </Text>
                        <TouchableOpacity
                          style={{
                            padding: 12,
                            borderRadius: 20,
                            backgroundColor: "blue",
                            marginVertical: 10,
                          }}
                          onPress={() =>
                            handleDeserve(destination.destination_id, item.id)
                          }
                        >
                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: 14,
                              color: "white",
                            }}
                          >
                            Reserve {numberRoom} room
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
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
      <Text>
        <Text style={styles.sectionTitle}>Explore other options</Text>
      </Text>
      <View style={{ marginTop: 10 }}>
        <FlatList
          data={destinations}
          renderItem={renderItem}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  vipText: {
    backgroundColor: "#FFD700",
    color: "#fff",
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  refundRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  refundText: {
    color: "#007BFF",
    fontWeight: "600",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  ratingBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFD700",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  ratingNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  excellentText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  reviewsText: {
    color: "#007BFF",
    textDecorationLine: "underline",
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
    marginBottom: 10,
  },
  amenityItem: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f2f2f2",
    margin: 5,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
  amenityText: {
    fontSize: 14,
    color: "#333",
  },
  roomItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#fff",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 4,
  },

  roomType: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  titleRoom: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
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
  openButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  reviewCard: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  reviewerInfo: {
    fontSize: 14,
    color: "#555",
  },
  liked: {
    fontSize: 14,
    color: "#007BFF",
    marginVertical: 5,
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginVertical: 5,
  },
  stayPeriod: {
    fontSize: 12,
    color: "#999",
  },
  closeButton: {
    backgroundColor: "#FF5722",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "center",
  },
});
