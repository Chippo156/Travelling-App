import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Rating } from "react-native-ratings";

const BookingPage = () => {
  const userid = 1;
  const roomid = 1;
  const desid = 1;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View>
          <View style={styles.header}>
            <Text style={styles.hotelName}>Hotel Grand Plaza</Text>
            <Text style={styles.bookingId}>Booking ID: RC4351</Text>
          </View>
          <View style={styles.location}>
            <Icon name="location" size={20} color="#ff4d4d" style={styles.icon} />
            <Text style={styles.address}>
              Number 9, Ha Long Street, Ha Long, Quang Ninh, 200000
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
          <Text style={styles.roomType}>Deluxe Room (Breakfast)</Text>
          <Rating
            imageSize={20}
            style={styles.rating}
            readonly={true}
            startingValue={4}
          />
          <View style={styles.container_date}>
            <View style={styles.column_date}>
              <Text style={styles.label_date}>Check In</Text>
              <Text style={styles.date}>27th May 2019</Text>
            </View>
            <Icon name="arrow-forward" style={styles.icon_date} size={20} />
            <View style={styles.column_date}>
              <Text style={styles.label_date}>Check Out</Text>
              <Text style={styles.date}>1st Jun 2019</Text>
            </View>
          </View>
          <Text style={styles.guests}>5 Nights, 1 Room, 2 Guests</Text>
        </View>
      </View>

      <View style={[styles.card, styles.priceCard]}>
        <View style={styles.priceBreakup}>
          <Text style={styles.priceText}>Price Breakup</Text>
          <View style={styles.priceItem}>
            <Text style={styles.priceLabel}>Booking Price:</Text>
            <Text style={styles.priceAmount}>$660</Text>
          </View>
          <View style={styles.priceItem}>
            <Text style={styles.priceLabel}>Services Tax:</Text>
            <Text style={styles.priceAmount}>$525</Text>
          </View>
          <View style={styles.totalPayable}>
            <Text style={styles.priceLabel}>Total Payable:</Text>
            <Text style={styles.priceAmount}>$685</Text>
          </View>
          <Text style={styles.savings}>Your total saving: $240</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log("Cancel Booking");
        }}
      >
        <Text style={styles.buttonText}>Cancel Booking</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap:12,
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
});

export default BookingPage;