import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Rating } from "react-native-ratings";
import {
  getDestinationById,
  getRoomById,
} from "../controller/DetailsController";

const BookingPage = ({ route }) => {
  const { bookid } = route.params;
  const [destination, setDestination] = useState({});
  const [room, setRoom] = useState({});
  const handleGetDestination = async (id) => {
    let res = await getDestinationById(id);
    if (res && res.code === 200) {
      setDestination(res.result);
    }
  };
  const handleGetRoom = async (id) => {
    let res = await getRoomById(id);
    if (res) {
      setRoom(res);
    }
  };
  useEffect(() => {
    handleGetDestination(bookid.destination_id);
    handleGetRoom(bookid.room_id);
  }, []);
  function calculateNights(checkInDate, checkOutDate) {
    // Chuyển đổi ngày check-in và check-out thành đối tượng Date
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    // Tính toán sự khác biệt giữa hai ngày (mili giây)
    const differenceInTime = checkOut - checkIn;

    // Chuyển đổi sự khác biệt từ mili giây sang số đêm
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    return differenceInDays;
  }
  const formatDate = (date) => {
    date = new Date(date);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    // Thêm hậu tố "st", "nd", "rd", hoặc "th" vào ngày
    const daySuffix = (day) => {
      if (day > 3 && day < 21) return "th"; // 4th - 20th
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${day}${daySuffix(day)} ${month} ${year}`;
  };
  const formatCurrencyVND = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  const getBookingStatusStyle = (status) => {
    switch (status) {
      case "BOOKED":
        return "statusBooked";
      case "CANCELLED":
        return "statusCancelled";
      case "COMPLETED":
        return "statusCompleted";
      default:
        return "statusDefault";
    }
  };

  const getPaymentStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "paymentPending";
      case "paid":
        return "paymentPaid";
      case "failed":
        return "paymentFailed";
      default:
        return "statusDefault";
    }
  };
  const canCancelBooking = (bookId) => {
    const currentDate = new Date();
    const checkInDate = new Date(bookId.check_in_date);
    return checkInDate <= currentDate;
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View>
          <View style={styles.header}>
            <Text style={styles.hotelName}>{destination.name}</Text>
            <Text style={styles.bookingId}>Booking ID: {bookid.id}</Text>
          </View>
          <View style={styles.location}>
            <Icon
              name="location"
              size={20}
              color="#ff4d4d"
              style={styles.icon}
            />
            <Text style={styles.address}>
              Number 9, Ha Long Street, Ha Long, Quang Ninh, 200000
            </Text>
          </View>
        </View>
        <View style={[styles.statusContainer]}>
          <View
            style={[
              styles.statusBox,
              styles[getBookingStatusStyle(bookid.booking_status)],
            ]}
          >
            <Text style={styles.statusText}>
              Order Status: {bookid.booking_status}
            </Text>
          </View>
          <View
            style={[
              styles.statusBox,
              styles[getPaymentStatusStyle(bookid.payment_status)],
            ]}
          >
            <Text style={styles.statusText}>
              Payment Status: {bookid.payment_status}
            </Text>
          </View>
        </View>
        <View style={styles.details}>
          <Image
            style={styles.roomImage}
            source={{
              uri: "https://res.cloudinary.com/dqnwxejgy/image/upload/v1731073126/250d5782-b587-46fa-9a5f-dece05ff1a28.avif",
            }}
          />
          <Text style={styles.roomType}>{room.description}</Text>
          <Rating
            imageSize={20}
            style={styles.rating}
            readonly={true}
            startingValue={4}
          />
          <View style={styles.container_date}>
            <View style={styles.column_date}>
              <Text style={styles.label_date}>Check In</Text>
              <Text style={styles.date}>
                {formatDate(bookid.check_in_date)}
              </Text>
            </View>
            <Icon name="arrow-forward" style={styles.icon_date} size={20} />
            <View style={styles.column_date}>
              <Text style={styles.label_date}>Check Out</Text>
              <Text style={styles.date}>
                {formatDate(bookid.check_out_date)}
              </Text>
            </View>
          </View>
          <Text style={styles.guests}>
            {calculateNights(bookid.check_in_date, bookid.check_out_date)}{" "}
            Nights, {room.sleeps} Room, 2 Guests
          </Text>
        </View>
      </View>

      <View style={[styles.card, styles.priceCard]}>
        <View style={styles.priceBreakup}>
          <Text style={styles.priceText}>Price Breakup</Text>
          <View style={styles.priceItem}>
            <Text style={styles.priceLabel}>Booking Price:</Text>
            <Text style={styles.priceAmount}>
              {formatCurrencyVND((bookid.amount * 90) / 100)}
            </Text>
          </View>
          <View style={styles.priceItem}>
            <Text style={styles.priceLabel}>Services Tax:</Text>
            <Text style={styles.priceAmount}>
              {formatCurrencyVND((bookid.amount * 10) / 100)}
            </Text>
          </View>
          <View style={styles.totalPayable}>
            <Text style={styles.priceLabel}>Total Payable:</Text>
            <Text style={styles.priceAmount}>
              {formatCurrencyVND(bookid.amount)}
            </Text>
          </View>
          <Text style={styles.savings}>Your total saving: $240</Text>
        </View>
      </View>

      <TouchableOpacity
        style={canCancelBooking(bookid) ? styles.button : styles.buttonDisabled}
        onPress={() => {
          if (canCancelBooking(bookid)) {
            // Thực hiện hành động hủy đặt phòng ở đây
          } else {
            Alert.alert(
              "Cannot cancel booking",
              "The check-in date has already passed."
            );
          }
        }}
        disabled={!canCancelBooking(bookid)}
      >
        <Text style={styles.buttonText}>Cancel Booking</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 12,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  hotelName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bookingId: {
    fontSize: 14,
    color: "#888",
  },
  location: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  icon: {
    width: 30,
  },
  address: {
    fontSize: 14,
    color: "#888",
    flex: 1,
  },
  details: {
    marginTop: 20,
    alignItems: "center",
  },
  roomImage: {
    width: 300,
    height: 200,
    marginBottom: 10,
    borderRadius: 12,
  },
  roomType: {
    fontSize: 18,
    fontWeight: "bold",
  },
  rating: {
    paddingVertical: 10,
  },
  container_date: {
    borderTopWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    width: "100%",
    justifyContent: "space-between",
  },
  column_date: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  label_date: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 16,
  },
  icon_date: {
    marginHorizontal: 10,
  },
  guests: {
    borderTopWidth: 1,
    width: "100%",
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    paddingVertical: 10,
  },
  priceCard: {
    marginTop: 12,
  },
  priceBreakup: {
    marginTop: 20,
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  priceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  buttonDisabled: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  priceLabel: {
    fontSize: 16,
    color: "#444",
  },
  priceAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalPayable: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    borderTopWidth: 1,
    paddingTop: 10,
  },
  savings: {
    fontSize: 14,
    color: "green",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#ff4d4d",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  statusContainer: {
    marginTop: 20,
    flexDirection: "row",
    gap: 8,
  },
  statusBox: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
  },
  statusText: {
    color: "#fff",
    fontSize: 10,
  },
  statusBooked: {
    backgroundColor: "#007bff", // Xanh
  },
  statusCancelled: {
    backgroundColor: "#dc3545", // Đỏ
  },
  statusCompleted: {
    backgroundColor: "#28a745", // Xanh lá
  },
  paymentPending: {
    backgroundColor: "#ffc107", // Vàng
  },
  paymentPaid: {
    backgroundColor: "#17a2b8", // Xanh dương nhạt
  },
  paymentFailed: {
    backgroundColor: "#6c757d", // Xám
  },
  statusDefault: {
    backgroundColor: "#6c757d", // Mặc định
  },
});

export default BookingPage;
