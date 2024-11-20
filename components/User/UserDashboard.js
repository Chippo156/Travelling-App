import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Footer from "../Footer";
import { login, logout, loadingTrue, loadingFalse } from "../Redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../controller/loginController";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserDashboard = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    let token = await AsyncStorage.getItem("token");
    dispatch(loadingTrue());
    
    let res = await logoutUser(token);
    console.log(res);
    if (res && (res.code === 200 || res.code === 400)) {
      await AsyncStorage.removeItem("token");
      dispatch(logout());
      navigation.navigate("Home");
    } else {
      alert("Đăng xuất thất bại");
    }
    dispatch(loadingFalse());
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16,paddingBottom:80 }}>
        <Text style={styles.header}>Xin chào Dat!</Text>
        <Text style={styles.email}>ngodat200319@gmail.com</Text>

        {/* Settings Options */}
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("Profile")}>
          <Icon name="person-outline" style={styles.icon} />
          <View style={styles.optionContent}>
            <View>
              <Text style={styles.optionText}>Hồ sơ</Text>
              <Text style={styles.subText}>
                Cung cấp thông tin cá nhân cho chuyến đi
              </Text>
            </View>
          </View>
          <Icon name="chevron-forward-outline" style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("ContactInfo")}>
          <Icon name="call-outline" style={styles.icon} />
          <View style={styles.optionContent}>
            <View>
              <Text style={styles.optionText}>Thông tin liên lạc</Text>
              <Text style={styles.subText}>
                Quản lý loại thông báo bạn nhận
              </Text>
            </View>
          </View>
          <Icon name="chevron-forward-outline" style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("PaymentMethods")}>
          <Icon name="card-outline" style={styles.icon} />
          <View style={styles.optionContent}>
            <View>
              <Text style={styles.optionText}>Phương thức thanh toán</Text>
              <Text style={styles.subText}>
                Xem phương thức thanh toán đã lưu
              </Text>
            </View>
          </View>
          <Icon name="chevron-forward-outline" style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("Legal")}>
          <Icon name="document-text-outline" style={styles.icon} />
          <View style={styles.optionContent}>
            <View>
              <Text style={styles.optionText}>Pháp Lý</Text>
              <Text style={styles.subText}>
                Điều khoản và điều kiện, quyền riêng tư
              </Text>
            </View>
          </View>
          <Icon name="chevron-forward-outline" style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("Help And Feedback")}>
          <Icon name="help-circle-outline" style={styles.icon} />
          <View style={styles.optionContent}>
            <View>
              <Text style={styles.optionText}>Trợ Giúp và Phản Hồi</Text>
              <Text style={styles.subText}>
                Đặt câu hỏi và nhận hỗ trợ từ chúng tôi
              </Text>
            </View>
          </View>
          <Icon name="chevron-forward-outline" style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Đăng Xuất</Text>
        </TouchableOpacity>
        <View style={{backgroundColor:"#fff",gap:12,padding:12,borderRadius:12}}>
          <Text style={{color:"#282d70",fontSize:24}}>T1 group</Text>
          <Text style={styles.subMainfooter}>Công ty</Text>
          <Text style={styles.subSubFooter}>Về Chúng tôi</Text>
          <Text style={styles.subSubFooter}>Việc làm</Text>
          <Text style={styles.subSubFooter}>Đăng thông tin nơi lưu trú</Text>
          <Text style={styles.subSubFooter}>Hợp tác</Text>
          <Text style={styles.subSubFooter}>Tin tức & báo chí</Text>
          <Text style={styles.subMainfooter}>Khám phá</Text>
          <Text style={styles.subSubFooter}>Cẩm năng du lịch Việt Nam</Text>
          <Text style={styles.subSubFooter}>Khách sạn tại Việt Nam</Text>
          <Text style={styles.subSubFooter}>Nhà và căn hộ tại Việt Nam</Text>
          <Text style={styles.subSubFooter}>Thuê xe tự lái tại Việt Nam</Text>
          <Text style={styles.subMainfooter}>Chính sách</Text>
          <Text style={styles.subSubFooter}>Tuyên bố bảo mật</Text>
          <Text style={styles.subSubFooter}>Điều khoản sử dụng</Text>
        </View>
      </ScrollView>

      <Footer value={"user"} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  subMainfooter:{ 
    color:"#191e3b",
    fontSize: 16,
    fontWeight: "bold",
  },
  subSubFooter:{
    color:"#1668e3",
    fontSize: 12,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: "#888",
    marginBottom: 16,
  },
  option: {
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
  icon: {
    fontSize: 24,
    marginRight: 16,
    color: "#000",
    flex: 1,
  },
  optionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 9,
  },
  optionText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 14,
    color: "#888",
  },
  arrowIcon: {
    fontSize: 24,
    color: "#888",
    flex: 1,
  },
  logoutButton: {
    padding: 16,
    alignItems: "center",
    marginTop: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 100,
  },
  logoutButtonText: {
    fontSize: 18,
    color: "#0000FF",
    fontWeight: "bold",
  },
  footerText: {
    fontSize: 16,
    color: "#000",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  footerButton: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  activeTab: {
    color: "#3f3ff5",
  },
});

export default UserDashboard;