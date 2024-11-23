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

function OverlayDate({
  toggleDateOverlay,
  selectedSecondLastDay,
  selectedLastDayOfMonth,
  setSelectedSecondLastDay,
  setSelectedLastDayOfMonth,
  selectDay,
  setSelectDay,
  getDayOfWeek,
  getMonthDay,
  navigation, // Assuming you are using React Navigation
}) {
  return (
    <View style={styles.overlayContent}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={toggleDateOverlay} // Navigate to Home screen
      >
        <Icon name="arrow-back" size={24} color="blue" />
      </TouchableOpacity>
      <View
        style={styles.dateSelectionContainer}
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
            {getMonthDay(selectedSecondLastDay)}
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
            {getMonthDay(selectedLastDayOfMonth)}
          </Text>
        </TouchableOpacity>
      </View>
      <Calendar
        monthFormat={"MM-yyyy"}
        onDayPress={(day) => {
          if (selectDay) {
            if (new Date(day.dateString) < new Date(selectedLastDayOfMonth)) {
              setSelectedSecondLastDay(day.dateString);
            }
          } else {
            if (new Date(day.dateString) > new Date(selectedSecondLastDay)) {
              setSelectedLastDayOfMonth(day.dateString);
            }
          }
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
      <TouchableOpacity onPress={toggleDateOverlay} style={styles.closeButton}>
        <Text>Xong</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  overlayContent: {
    width: "100%",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 10,
  },
  backButtonText: {
    marginLeft: 5,
    fontSize: 16,
    color: "blue",
  },
  dateSelectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginTop: 50, // Adjusted to avoid overlap with the back button
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

export default OverlayDate;