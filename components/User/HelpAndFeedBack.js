import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const HelpAndFeedback = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Có câu hỏi hoặc phản hồi cho chúng tôi? Chúng tôi sẵn sàng lắng nghe.
      </Text>
      <TouchableOpacity style={styles.button}>
        <Icon
          name="chatbubble-ellipses-outline"
          size={24}
          color="black"
          style={styles.icon}
        />
        <Text style={styles.buttonText}>Trò chuyện ngay</Text>
        <Icon
          name="chevron-forward-outline"
          size={24}
          color="black"
          style={styles.iconRight}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Icon
          name="help-circle-outline"
          size={24}
          color="black"
          style={styles.icon}
        />
        <Text style={styles.buttonText}>Truy cập Trung tâm hỗ trợ</Text>
        <Icon
          name="chevron-forward-outline"
          size={24}
          color="black"
          style={styles.iconRight}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Icon
          name="share-social-outline"
          size={24}
          color="black"
          style={styles.icon}
        />
        <Text style={styles.buttonText}>Chia sẻ phản hồi của bạn</Text>
        <Icon
          name="chevron-forward-outline"
          size={24}
          color="black"
          style={styles.iconRight}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  buttonText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  iconRight: {
    marginLeft: "auto",
  },
});

export default HelpAndFeedback;
