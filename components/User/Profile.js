import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Picker } from "@react-native-picker/picker";
// import { updateUser } from "./userSlice"; // Giả sử bạn có một action để cập nhật user
import Icon from "react-native-vector-icons/Ionicons";

const ProfileScreen = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [basicInfoModalVisible, setBasicInfoModalVisible] = useState(false);
  const [contactInfoModalVisible, setContactInfoModalVisible] = useState(false);
  const [editUser, setEditUser] = useState({ ...user });
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedGender, setSelectedGender] = useState(user.gender || "");

  const handleEditBasicInfo = () => {
    setBasicInfoModalVisible(true);
  };

  const handleEditContactInfo = () => {
    setContactInfoModalVisible(true);
  };

  const handleSave = () => {
    // dispatch(updateUser(editUser));
    setBasicInfoModalVisible(false);
    setContactInfoModalVisible(false);
  };
  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate(); // Trả về số ngày trong tháng
  };

  // Lấy danh sách các tháng
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // Lấy danh sách các năm (từ 2023 đến 1924)
  const years = Array.from({ length: 100 }, (_, i) => 2023 - i);

  // Cập nhật ngày khi tháng hoặc năm thay đổi
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    if (selectedDay > getDaysInMonth(month, selectedYear)) {
      setSelectedDay(getDaysInMonth(month, selectedYear)); // Cập nhật ngày nếu vượt quá số ngày trong tháng
    }
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    if (selectedDay > getDaysInMonth(selectedMonth, year)) {
      setSelectedDay(getDaysInMonth(selectedMonth, year)); // Cập nhật ngày nếu vượt quá số ngày trong năm
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Thông tin cơ bản</Text>
        <Button title="Chỉnh sửa" onPress={handleEditBasicInfo} />
      </View>
      <Text style={styles.note}>
        Hãy chắc rằng thông tin này khớp với giấy tờ bạn dùng khi đi lại, như hộ
        chiếu hoặc căn cước công dân (chỉ trong lãnh thổ Việt Nam).
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Tên:</Text>{" "}
          {user.username || "Không cung cấp"}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Giới thiệu:</Text> {"Không cung cấp"}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Ngày sinh:</Text>{" "}
          {user.birthDate || "Không cung cấp"}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Giới tính:</Text>{" "}
          {user.gender || "Không cung cấp"}
        </Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Thông tin liên hệ</Text>
        <Button title="Chỉnh sửa" onPress={handleEditContactInfo} />
      </View>
      <Text style={styles.note}>
        Chia sẻ thông tin này để nhận thông báo về hoạt động tài khoản và cập
        nhật liên quan đến chuyến đi.
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Số điện thoại di động:</Text>{" "}
          {user.phone || "Không cung cấp"}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Email:</Text>{" "}
          {user.email || "Không cung cấp"}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Địa chỉ:</Text>{" "}
          {user.address || "Không cung cấp"}
        </Text>
      </View>

      <Modal
        animationType="fade"
        transparent={false}
        visible={basicInfoModalVisible}
        onRequestClose={() => {
          setBasicInfoModalVisible(!basicInfoModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setBasicInfoModalVisible(false)}
          >
            <Icon name="close" size={24} color="red" />
          </TouchableOpacity>
          <Text style={styles.modalText}>Chỉnh sửa thông tin cơ bản</Text>
          <Text style={styles.subHeader}>
            Hãy chắc rằng thông tin này khớp với giấy tờ bạn dùng khi đi lại,
            như hộ chiếu hoặc căn cước công dân (chỉ trong lãnh thổ Việt Nam).
          </Text>
          <Text style={styles.label}>Họ tên đầy đủ</Text>
          <TextInput
            style={styles.input}
            placeholder="Tên"
            value={editUser.username}
            onChangeText={(text) =>
              setEditUser({ ...editUser, username: text })
            }
          />
          <Text style={styles.label}>Ngày sinh</Text>
          <View style={styles.datePickerContainer}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Text style={{ width: 100, fontSize: 16, fontWeight: "bold" }}>
                Ngày:{" "}
              </Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedDay}
                  style={styles.picker}
                  onValueChange={(itemValue) => setSelectedDay(itemValue)}
                >
                  {Array.from(
                    { length: getDaysInMonth(selectedMonth, selectedYear) },
                    (_, i) => (
                      <Picker.Item
                        key={i + 1}
                        label={`${i + 1}`}
                        value={i + 1}
                      />
                    )
                  )}
                </Picker>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Text style={{ width: 100, fontSize: 16, fontWeight: "bold" }}>
                Tháng :{" "}
              </Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedMonth}
                  style={styles.picker}
                  onValueChange={handleMonthChange}
                >
                  {months.map((month) => (
                    <Picker.Item key={month} label={`${month}`} value={month} />
                  ))}
                </Picker>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Text style={{ width: 100, fontSize: 16, fontWeight: "bold" }}>
                Năm:{" "}
              </Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedYear}
                  style={styles.picker}
                  onValueChange={handleYearChange}
                >
                  {years.map((year) => (
                    <Picker.Item key={year} label={`${year}`} value={year} />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
          <Text style={styles.label}>Giới tính</Text>
          <View style={styles.radioContainer}>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setSelectedGender("Nam")}
            >
              <View
                style={[
                  styles.radioOuterCircle,
                  selectedGender === "Nam" && styles.radioSelectedOuterCircle,
                ]}
              >
                {selectedGender === "Nam" && (
                  <View style={styles.radioInnerCircle} />
                )}
              </View>
              <Text style={styles.radioText}>Nam</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setSelectedGender("Nữ")}
            >
              <View
                style={[
                  styles.radioOuterCircle,
                  selectedGender === "Nữ" && styles.radioSelectedOuterCircle,
                ]}
              >
                {selectedGender === "Nữ" && (
                  <View style={styles.radioInnerCircle} />
                )}
              </View>
              <Text style={styles.radioText}>Nữ</Text>
            </TouchableOpacity>
          </View>
          <Button title="Lưu" onPress={handleSave} />
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={false}
        visible={contactInfoModalVisible}
        onRequestClose={() => {
          setContactInfoModalVisible(!contactInfoModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setContactInfoModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.modalText}>Chỉnh sửa thông tin liên hệ</Text>
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            value={editUser.phone}
            onChangeText={(text) => setEditUser({ ...editUser, phone: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={editUser.email}
            onChangeText={(text) => setEditUser({ ...editUser, email: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Địa chỉ"
            value={editUser.address}
            onChangeText={(text) => setEditUser({ ...editUser, address: text })}
          />
          <Button title="Lưu" onPress={handleSave} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
    paddingBottom: 10,
    marginTop: 20, // Added marginTop for spacing
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#343a40",
  },
  note: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 20,
    lineHeight: 20,
  },
  infoContainer: {
    marginTop: 20,
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  infoText: {
    fontSize: 16,
    color: "#495057",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    padding:20,
    width: "100%",
  },
  modalView: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    paddingTop: 40,
  },
  closeButton: {
    padding: 10,
    position: "absolute",
  },
  closeButtonText: {
    fontSize: 18,
    color: "red",
  },
  modalText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
    width: "100%",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    width: 120,
  },
  datePickerContainer: {
    flexDirection: "column",
    marginBottom: 15,
    justifyContent: "space-between",
    gap: 10,
  },
  picker: {
    height: 60,
    width: 120,
  },
  radioContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginBottom: 20,
    gap: 10,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioOuterCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  radioSelectedOuterCircle: {
    borderColor: "blue",
  },
  radioInnerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "blue",
  },
  radioText: {
    fontSize: 16,
  },
});

export default ProfileScreen;
