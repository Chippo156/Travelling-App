import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  getDestinationById,
  getImagesDestination,
  getRoomById,
} from "../controller/DetailsController";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import ImageSlider from "../TravelDetails/ImageSlide";
import { CheckBox } from "react-native-elements";
import Svg, { Path } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import {
  createBooking,
  fetchPaymentInfo,
  paymentVNPAY,
} from "../controller/BookingController";
import { loadingTrue, loadingFalse } from "../Redux/userSlice";

export default function Deserve({ route, navigation }) {
  const dispatch = useDispatch();

  const destinationId = route.params.desId;
  const roomId = route.params.roomId;
  const numberGuest = route.params.numberGuest;
  const numberRoom = route.params.numberRoom;
  const DateCheckIn = route.params.startDate;
  const DateCheckOut = route.params.endDate;
  const refund = route.params.refund;
  const extra = route.params.extra;

  const checkInDate = new Date(DateCheckIn);
  const checkOutDate = new Date(DateCheckOut);
  const timeDiff = checkOutDate - checkInDate; // Milliseconds
  const dayDiff = timeDiff / (1000 * 60 * 60 * 24);

  const [destination, setDestination] = useState({});
  const [imagesDes, setImagesDes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(100000);
  const [loading, setLoading] = useState(true);

  const fetchDestination = async () => {
    try {
      if (destinationId) {
        let res = await getDestinationById(destinationId);
        if (res.code === 200) {
          setDestination(res.result);
        }
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  const fetchImagesDestination = async () => {
    if (destinationId) {
      let res = await getImagesDestination(destinationId);
      setImagesDes(res);
    } else {
      let res = await getImagesDestination(1);
      setImagesDes(res);
    }
  };
  const [room, setRoom] = useState({});
  const fetchRoom = async () => {
    try {
      let res = await getRoomById(roomId);
      setRoom(res);
      console.log(res);
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  useEffect(() => {
    fetchDestination();
    fetchImagesDestination();
    fetchRoom();
  }, []);
  const currentDate = new Date();
  const refundDate = new Date(currentDate);
  refundDate.setDate(currentDate.getDate() + 7);
  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  const [selectedOptions, setSelectedOptions] = useState({
    payAtProperty: false,
    VNPAY: false,
  });
  const handleToggle = (option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const [total, setTotal] = useState(0);
  const [refundCost, setRefundCost] = useState(0);
  const [extraCost, setExtraCost] = useState(0);
  useEffect(() => {
    setRefundCost(refund === "first" ? 0 : room.price * 0.15);
    setExtraCost(extra === "first" ? 0 : 500000);
    setTotal(room.price * dayDiff * numberRoom);
  }, [room]);

  const [flag, setFlag] = useState(false);
  const handleApplyCoupon = () => {
    // Xử lý mã coupon ở đây
    if (couponCode === "DISCOUNT" && flag === false) {
      setFlag(true);
      setTotal(total - discount);
      setModalVisible(false);
    }
    if (flag === true) {
      Alert.alert("Coupon code is applied successfully!");
      setModalVisible(false);
    }
  };
  //Bookings API
  const user_id = 1;
  const fetchBooking = async () => {
    const selectPaymentMethod = () => {
      if (selectedOptions.payAtProperty) {
        return "payAtProperty";
      } else if (selectedOptions.VNPAY) {
        return "VNPAY";
      }
    };
    try {
      dispatch(loadingTrue());
      let res = await createBooking(
        user_id,
        destinationId,
        roomId,
        "pending",
        selectPaymentMethod(),
        DateCheckIn,
        DateCheckOut,
        total * 1.1 + refundCost + extraCost,
        numberRoom
      );
      if (res.code === 200 && res) {
        Alert.alert("Booking successfully!");
      } else {
        Alert.alert("Booking failed!");
      }
      dispatch(loadingFalse());
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  const handleBooking = () => {
    fetchBooking();
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.flexRow}>
        <Icon name="calendar" size={50} color="#FFD700"></Icon>
        <Text style={{ color: "#000", fontSize: 11, width: 340 }}>
          <Text style={{ fontWeight: "bold" }}>
            Full refund before 6:00 p.m., {formatDate(refundDate)} (local time
            of property).
          </Text>
          You can change or cancel any of these reservations to receive the full
          refund if plans change. Because of duplication, flexibility is needed.
        </Text>
      </View>
      <View style={{ borderWidth: 1, borderRadius: 5 }}>
        <ImageSlider images={imagesDes} />
        <View style={{ padding: 20 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              borderBottomWidth: 1,
              padding: 10,
              marginBottom: 10,
            }}
          >
            {destination.name}
          </Text>
          <View style={{ gap: 10 }}>
            <Text style={{ fontSize: 16 }}>{destination.description}</Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Check in:</Text>{" "}
              {DateCheckIn}
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Check out:</Text>{" "}
              {DateCheckOut}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{ borderWidth: 1, borderRadius: 5, marginTop: 20, padding: 10 }}
      >
        <Text style={{ color: "green" }}>
          Great choice! Hurry and book now before the room runs out!
        </Text>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderRadius: 5,
          marginTop: 20,
          padding: 10,
          gap: 20,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Room details</Text>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <Image
            source={{ uri: room.image_url }}
            style={{ width: 150, height: 150, borderRadius: "50%" }}
          />
          <View style={{ gap: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {room.room_type} {room.description}
            </Text>
            <Text>{room.beds}</Text>
            <Text>{room.features}</Text>
            <Text>{room.area} sq m</Text>
            <Text>Each room has {room.sleeps} guests</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderRadius: 5,
          marginTop: 20,
          padding: 10,
          gap: 20,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Price details</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>
            {dayDiff} night, {numberRoom} room
          </Text>
          <Text>{formatCurrency(total)}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",

            paddingVertical: 10,
          }}
        >
          <Text>Tax</Text>
          <Text>{formatCurrency(total * 0.1)}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",

            paddingVertical: 10,
          }}
        >
          <Text>Refund</Text>
          <Text>{formatCurrency(refundCost)}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomWidth: 1,
            paddingVertical: 10,
          }}
        >
          <Text>Extra</Text>
          <Text>{formatCurrency(extraCost)}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Total</Text>
          <Text style={{ fontWeight: "bold" }}>
            {formatCurrency(total * 1.1 + refundCost + extraCost)}
          </Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold" }}>
            Not included in total price
          </Text>
          <Text>Additional fees are charged by the property</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.openButtonText}>
              Use coupon codes, credits or promotional codes
            </Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.overlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>
                  Have a coupon code or promotion code?
                </Text>
                <Text style={styles.modalSubtitle}>Please enter below</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter code here"
                  value={couponCode}
                  onChangeText={(text) => setCouponCode(text)}
                />
                <TouchableOpacity
                  style={styles.applyButton}
                  onPress={handleApplyCoupon}
                >
                  <Text style={styles.applyButtonText}>Apply</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderRadius: 5,
          marginTop: 20,
          padding: 10,
          gap: 20,
        }}
      >
        <Text>Who's checking in?</Text>
        <View>
          <Text>
            <Text style={{ fontWeight: "bold" }}> {numberRoom} Room: </Text>{" "}
            {numberGuest} Guest , {room.beds} , no smokers, no pets
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
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
            <Text style={{ color: "green" }}>Free parking</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Svg
              class="uitk-icon uitk-icon-small uitk-icon-default-theme"
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
                fill-rule="evenodd"
                d="m1 9 2 2a12.73 12.73 0 0 1 18 0l2-2A15.57 15.57 0 0 0 1 9zm8 8 3 3 3-3a4.24 4.24 0 0 0-6 0zm-2-2-2-2a9.91 9.91 0 0 1 14 0l-2 2a7.07 7.07 0 0 0-10 0z"
                clip-rule="evenodd"
              ></Path>
            </Svg>
            <Text style={{ color: "green", justifyContent: "center" }}>
              Free Wifi
            </Text>
          </View>
        </View>
        <View>
          <Text>Guest Name:</Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Vo Van Nghia Hiep</Text>
          </Text>
        </View>
        <View>
          <Text>Email:</Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>vovannghiahiep@gmail.com</Text>
          </Text>
        </View>
        <View style={{ gap: 10 }}>
          <Text>FirstName:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your first name"
          ></TextInput>
        </View>
        <View style={{ gap: 10 }}>
          <Text>LastName:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your last name"
          ></TextInput>
        </View>
        <View style={{ gap: 10 }}>
          <Text>Phone number:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
          ></TextInput>
        </View>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderRadius: 5,
          marginTop: 20,
          padding: 10,
          gap: 20,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Payment method</Text>
        <View style={styles.option}>
          <CheckBox
            title="Pay at the property"
            checked={selectedOptions.payAtProperty}
            onPress={() => handleToggle("payAtProperty")}
          />
          <Text style={styles.description}>
            Your credit card is required to secure your booking. You will pay
            for your stay at the property.
          </Text>
        </View>

        <View style={styles.option}>
          <CheckBox
            title="VNPAY"
            checked={selectedOptions.VNPAY}
            onPress={() => handleToggle("VNPAY")}
          />
          <Text style={styles.description}>Pay with VNPAY</Text>
        </View>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderRadius: 5,
          marginTop: 20,
          padding: 10,
          gap: 20,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Policy Cancel</Text>
        <View>
          <Text style={{ color: "green" }}>
            Full refund in advance {formatDate(refundDate)}
          </Text>
          <Text>
            Changes or cancellations made after 6:00 PM (local time) on{" "}
            {formatDate(refundDate)} or no-shows will be charged a property fee
            equal to 100% of the total price paid for the reservation.
          </Text>
        </View>
      </View>
      <View style={{ marginVertical: 10 }}>
        <TouchableOpacity style={styles.openButton} onPress={handleBooking}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
            Complete booking
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  openButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  openButtonText: {
    color: "blue",
    fontWeight: "bold",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    gap: 5,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  applyButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  applyButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  closeButton: {
    padding: 10,
    width: "100%",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#6c757d",
  },
  option: {
    marginBottom: 20,
  },
  description: {
    marginLeft: 35,
    fontSize: 14,
    color: "#6c757d",
  },
});
