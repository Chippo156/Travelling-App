import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ActivityIndicator, Image, Text, View, StyleSheet } from "react-native";
import { reloadUser } from "../controller/loginController";
import { login, logout, loadingTrue, loadingFalse } from "../Redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Login from "../Login";
import Splash from "../Splash";
import Onboard from "../Onboard";
import ForgotPassword from "../ForgotPassword";
import Register from "../Register";
import TravelDetail from "../TravelDetails";
import FilterPage from "../Filter";
import Deserve from "../Order/Deserve";
import User from "../User";
import HistoryBooking from "../historybooking";
import ProfileScreen from "../User/Profile";
import HelpAndFeedback from "../User/HelpAndFeedBack";
import BookingPage from "../BookingPage.js";
import Home from "../Home";
import SearchPage from "../Search";
import Chatbox from "../AI/ChatBox";
import { TouchableOpacity } from "react-native";
const Stack = createStackNavigator();

function Main() {
  const linking = {
    prefixes: ["myapp://"], // Schema của bạn
    config: {
      screens: {
        Home: "Home", // Màn hình Home sẽ mở khi app://home được gọi
      },
    },
  };
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
  const handleReloadUser = async () => {
    dispatch(loadingFalse());
    const token = await AsyncStorage.getItem("token");
    let res_token = await reloadUser(token);
    if (res_token && res_token.code === 200) {
      dispatch(
        login({
          user: res_token.result.user,
          isLoggedIn: res_token.result.valid,
        })
      );
    }
    dispatch(loadingFalse());
  };
  const [isChatboxOpen, setChatboxOpen] = useState(false);

  const toggleChatbox = () => {
    setChatboxOpen(!isChatboxOpen);
  };
  useEffect(() => {
    handleReloadUser();
  }, []);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer linking={linking}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Onboard"
            component={Onboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: true,
              headerTitle: () => (
                <View
                  style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
                >
                  <Image
                    source={{
                      uri: "https://res.cloudinary.com/dqnwxejgy/image/upload/v1732625785/cufd5gq2eaaojkjgo8lx.png",
                    }} // Đường dẫn đến logo của bạn
                    style={{ width: 50, height: 20 }} // Điều chỉnh kích thước logo theo ý muốn
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#191e3b",
                    }} // Đổi màu chữ
                  >
                    Tourista
                  </Text>
                </View>
              ),
              headerTitleAlign: "center", // Căn giữa logo
            }}
          />
          <Stack.Screen
            options={{ headerShown: true }}
            name="TravelDetail"
            component={TravelDetail}
          />
          <Stack.Screen name="Filter" component={FilterPage} />
          <Stack.Screen
            options={{ headerShown: true }}
            name="Deserve"
            component={Deserve}
          />
          <Stack.Screen
            options={{ headerShown: true }}
            name="User"
            component={User}
          />
          <Stack.Screen
            options={{ headerShown: true }}
            name="HistoryBooking"
            component={HistoryBooking}
          />
          <Stack.Screen
            options={{ headerShown: true }}
            name="Profile"
            component={ProfileScreen}
          />
          <Stack.Screen
            options={{ headerShown: true }}
            name="Help And Feedback"
            component={HelpAndFeedback}
          />
          <Stack.Screen
            options={{ headerShown: true }}
            name="Booking Details"
            component={BookingPage}
          />
          <Stack.Screen
            options={{ headerShown: true }}
            name="Search"
            component={SearchPage}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <TouchableOpacity style={styles.chatIcon} onPress={toggleChatbox}>
        <Text style={styles.chatIconText}>💬</Text>
      </TouchableOpacity>
      {isChatboxOpen && (
        <View style={styles.chatboxContainer}>
          <Chatbox />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  chatIcon: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4CAF50", // Màu nền cho icon
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Đổ bóng (chỉ dành cho Android)
  },
  chatIconText: {
    fontSize: 30,
    color: "#fff", // Màu chữ/icon
  },
  chatboxContainer: {
    position: "absolute",
    bottom: 100,
    right: 20,
    width: 300,
    height: 400,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
  },
});

export default function App() {
  return (
    <SafeAreaProvider>
      <Main />
    </SafeAreaProvider>
  );
}