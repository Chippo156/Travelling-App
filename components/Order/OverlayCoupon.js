import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";

const CouponOverlay = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = () => {
    // Xử lý mã coupon ở đây
    console.log("Applied Coupon:", couponCode);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Nút mở overlay */}
      <TouchableOpacity
        style={styles.openButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.openButtonText}>Nhập mã khuyến mãi</Text>
      </TouchableOpacity>

      {/* Overlay Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Có mã coupon hoặc mã khuyến mãi?
            </Text>
            <Text style={styles.modalSubtitle}>Vui lòng nhập bên dưới</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập mã tại đây"
              value={couponCode}
              onChangeText={(text) => setCouponCode(text)}
            />
            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleApplyCoupon}
            >
              <Text style={styles.applyButtonText}>Áp dụng</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  openButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
  },
  openButtonText: {
    color: "white",
    fontWeight: "bold",
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
});

export default CouponOverlay;
