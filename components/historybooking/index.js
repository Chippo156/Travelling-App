import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import {
  getDesitnationById,
  getListBookingById,
} from "../controller/BookingController";
import { useSelector } from "react-redux";

const HistoryBooking = ({ navigation }) => {
  const [bookings, setBookings] = useState([]);
  const user = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    handleGetBooking();
  }, [user]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
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
    console.log(item);
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate("Booking Details", { bookid: item })}
      >
        <View style={{flexDirection:"row"}}>
          <Image
            source={{ uri: item.destination.image_url }}
            style={styles.image}
          />
          <View style={styles.detailsContainer}>
            <Text style={styles.destinationTitle}>{item.destination.name}</Text>
            <Text style={styles.stayDuration}>
              {tinhSoNgay(item.check_out_date, item.check_in_date)}
            </Text>
            <Text style={styles.location}>
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
      <Text style={styles.header}>Lịch sử đặt chuyến</Text>
      <FlatList
        data={bookings}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
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
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  detailsContainer: {
    flex: 1,
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
});

export default HistoryBooking;
