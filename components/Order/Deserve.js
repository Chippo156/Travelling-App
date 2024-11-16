import {
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
import { FlatList } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import ImageSlider from "../TravelDetails/ImageSlide";
import { CheckBox } from "react-native-elements";
import { Checkbox } from "react-native-paper";

export default function Deserve({ route, navigation }) {
  //   const destinationId = route.params.desId;
  //   const roomId = route.params.roomId;
  const destinationId = 1;
  const roomId = 1;
  const adult = 2;

  const [destination, setDestination] = useState({});
  const [imagesDes, setImagesDes] = useState([]);

  const DateCheckIn = "30/11";
  const DateCheckOut = "01/12";
  const [modalVisible, setModalVisible] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = () => {
    // Xử lý mã coupon ở đây
    console.log("Applied Coupon:", couponCode);
    setModalVisible(false);
  };
  const fetchDestination = async () => {
    try {
      let res = await getDestinationById(destinationId);
      setDestination(res);
    } catch (error) {
      console.error(error);
      return error;
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
  const [room, setRoom] = useState({});
  const fetchRoom = async () => {
    try {
      let res = await getRoomById(roomId);
      setRoom(res);
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
    creditCard: false,
    momo: false,
  });

  const handleToggle = (option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
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
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Price details</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>1 night, 1 room</Text>
          <Text>{formatCurrency(room.price)}</Text>
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
          <Text>Tax</Text>
          <Text>{formatCurrency(room.price * 0.1)}</Text>
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
            {formatCurrency(room.price * 1.1)}
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
            <Text style={{ fontWeight: "bold" }}>Room 1:</Text> Adult {adult},{" "}
            {room.beds} , no smokers, no pets
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ color: "green" }}> Free parking</Text>
          <Text style={{ color: "green" }}>Free Wifi</Text>
        </View>
        <View>
          <Text>Customer Name:</Text>
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
            title="Credit card"
            checked={selectedOptions.creditCard}
            onPress={() => handleToggle("creditCard")}
          />
          <Text style={styles.description}>
            Visa, Mastercard, JCB, American Express
          </Text>
        </View>

        <View style={styles.option}>
          <CheckBox
            title="Momo"
            checked={selectedOptions.momo}
            onPress={() => handleToggle("momo")}
          />
          <Text style={styles.description}>Pay with Momo</Text>
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
        <TouchableOpacity style={styles.openButton}>
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
