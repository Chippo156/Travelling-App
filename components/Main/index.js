import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ActivityIndicator, Image, Text } from "react-native";
import { reloadUser } from "../controller/loginController";
import { login, logout, loadingTrue, loadingFalse } from "../Redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Login from "../Login";
import Splash from "../Splash";
import Onboard from "../Onboard";
import ForgotPassword from "../ForgotPassword";
import Register from "../Register";
import TravelDetail from "../TravelDetails";
import { View } from "react-native";
import FilterPage from "../Filter";
import Deserve from "../Order/Deserve";
import User from "../User";
import HistoryBooking from "../historybooking";
import ProfileScreen from "../User/Profile";
import HelpAndFeedback from "../User/HelpAndFeedBack";
import BookingPage from "../BookingPage.js";
import Home from "../Home";

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
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="HistoryBooking">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main;
