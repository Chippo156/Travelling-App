import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Button,
} from "react-native";
import {
  getDesitnationById,
  getListBookingById,
} from "../controller/BookingController";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";

const HistoryBooking = ({ navigation }) => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filter, setFilter] = useState("Booked");
  const user = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("User state:", user);
    if (user) {
      handleGetBooking();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    filterBookings();
  }, [bookings, filter]);

  const handleGetDestination = async (id) => {
    try {
      let res = await getDesitnationById(id);
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetBooking = async () => {
    if (user && user.id) {
      try {
        let res = await getListBookingById(user.id);
        if (res && res.code === 200) {
          for (const booking of res.result) {
            const destination = await handleGetDestination(
              booking.destination_id
            );
            if (destination && destination.code === 200) {
              booking.destination = destination.result;
            }
          }
          setBookings(res.result);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const filterBookings = () => {
    if (filter === "Booked") {
      setFilteredBookings(bookings.filter((booking) => booking.status === "Booked"));
    } else {
      setFilteredBookings(bookings.filter((booking) => booking.status === "Cancelled"));
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (user && bookings.length === 0) {
    return (
      <View style={styles.nullContainer}>
        <Image
          source={{
            uri: "https://a.travel-assets.com/egds/illustrations/uds-default/baggage__large.svg",
          }}
          style={styles.image}
        />
        <Text style={styles.title}>Chuyến đi</Text>
        <Text style={styles.description}>
          {user.first_name}, bạn không có chuyến đi sắp tới nào. Bạn định đi đâu
          tiếp theo?
        </Text>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.primaryButtonText}>Bắt đầu khám phá</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("Filter")}
        >
          <Text style={styles.secondaryButtonText}>Tìm đặt phòng của bạn</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.nullContainer}>
        <Text
          style={{
            position: "absolute",
            top: 30,
            left: 16,
            fontSize: 28,
            fontWeight: "bold",
          }}
        >
          Chuyến đi
        </Text>
        <Image
          source={{
            uri: "https://a.travel-assets.com/egds/illustrations/uds-default/unlock__large.svg",
          }}
          style={styles.image}
        />
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.primaryButtonText}>
            Đăng nhập hoặc tạo tài khoản miễn phí
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const tinhSoNgay = (check_in_date, check_out_date) => {
    const date1 = new Date(check_in_date);
    const date2 = new Date(check_out_date);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 1) {
      return diffDays + " day - 1 night";
    }
    return diffDays + " day - " + (diffDays - 1) + " night";
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const renderItem = ({ item }) => {
    const paymentStatusStyle =
      item.payment_status === "success"
        ? styles.paymentStatusSuccess
        : styles.paymentStatusPending;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate("Booking Details", { bookid: item })}
      >
        <View style={{ flexDirection: "row", width: "100%", gap: 20 }}>
          <Image
            source={{ uri: item.destination.image_url }}
            style={styles.image}
          />
          <View style={styles.detailsContainer}>
            <Text style={styles.destinationTitle}>{item.destination.name}</Text>
            <Text style={styles.stayDuration}>
              {tinhSoNgay(item.check_out_date, item.check_in_date)}
            </Text>
            <Text style={styles.location} numberOfLines={2}>
              Address:{" "}
              {item.destination.location
                ? item.destination.location
                : "Loading..."}
            </Text>
            <Text style={[styles.paymentStatus, paymentStatusStyle]}>
              Payment Status: {item.payment_status}
            </Text>
            <Text style={styles.amount}>
              Amount: {formatCurrency(item.amount)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Booking history</Text>
      <View style={styles.filterContainer}>
        <Button
          title="Booked"
          onPress={() => setFilter("Booked")}
          color={filter === "Booked" ? "#007bff" : "#ccc"}
        />
        <Button
          title="Cancelled"
          onPress={() => setFilter("Cancelled")}
          color={filter === "Cancelled" ? "#007bff" : "#ccc"}
        />
      </View>
      <FlatList
        data={filteredBookings}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#333",
  },
  link: {
    fontSize: 14,
    color: "#007bff",
    textDecorationLine: "underline",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#191e3b",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    width: "100%",
    gap: 20,
  },
  image: {
    borderRadius: 8,
    marginRight: 16,
    flex: 2,
    resizeMode: "cover",
  },
  detailsContainer: {
    flex: 3,
  },
  destinationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  stayDuration: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: "#888",
    marginBottom: 8,
  },
  paymentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paymentStatus: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "bold",
  },
  paymentStatusSuccess: {
    color: "green",
  },
  paymentStatusPending: {
    color: "red",
  },
  amount: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    borderColor: "#007bff",
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  secondaryButtonText: {
    color: "#007bff",
    fontSize: 16,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  nullContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    gap: 20,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
});

export default HistoryBooking;