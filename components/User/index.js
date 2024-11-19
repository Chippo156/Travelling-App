import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { login, logout, loadingTrue, loadingFalse } from "../Redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import UserDashboard from "./UserDashboard";
import Footer from "../Footer";
import { logoutUser } from "../controller/loginController";
import AsyncStorage from "@react-native-async-storage/async-storage";
function User({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [activeTab, setActiveTab] = useState("user");
  console.log(user, isLoggedIn);
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };


  return isLoggedIn ? (
   <UserDashboard handleTabChange={handleTabChange} activeTab={activeTab} setActiveTab={setActiveTab} navigation={navigation} />
  ) : (
    <View style={styles.container}>
      <View style={{ padding: 16 }}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.loginButtonText}>Đăng Nhập</Text>
        </TouchableOpacity>
        <Text style={styles.description}>
          Quản lý hồ sơ, phần thưởng và tùy chọn ưu tiên cho toàn bộ các thương
          hiệu của chúng tôi tại cùng một nơi
        </Text>
        <TouchableOpacity style={styles.optionButton}>
          <Icon name="settings-outline" style={styles.icon} />
          <Text style={styles.optionText}>Thiết Lập</Text>
          <Icon name="chevron-forward-outline" style={styles.chevronIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Icon name="document-text-outline" style={styles.icon} />
          <Text style={styles.optionText}>Pháp Lý</Text>
          <Icon name="chevron-forward-outline" style={styles.chevronIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Icon name="help-circle-outline" style={styles.icon} />
          <Text style={styles.optionText}>Trợ Giúp và Phản Hồi</Text>
          <Icon name="chevron-forward-outline" style={styles.chevronIcon} />
        </TouchableOpacity>
      </View>
      {/* <Text style={styles.footerText}>
        © 2024 Expedia, Inc., một công ty thuộc Expedia Group. Mọi quyền được
        bảo lưu. Expedia và logo Expedia là thương hiệu hoặc thương hiệu đã đăng
        ký bảo hộ của Expedia, Inc.
      </Text> */}
      <Footer value={"user"} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  loginButton: {
    backgroundColor: "#3f3ff5",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
  },
  icon: {
    fontSize: 24,
    marginRight: 16,
  },
  optionText: {
    flex: 1,
    fontSize: 18,
  },
  chevronIcon: {
    fontSize: 24,
    color: "#ccc",
  },
});

export default User;
