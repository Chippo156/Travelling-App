import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ActivityIndicator, Image } from "react-native";
import { reloadUser } from "../controller/loginController";
import { login, logout, loadingTrue, loadingFalse } from "../Redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Login from "../Login";
import Splash from "../Splash";
import Onboard from "../Onboard";
import ForgotPassword from "../ForgotPassword";
import Register from "../Register";
import Home from "../Home";
import TravelDetail from "../TravelDetails";
import { View } from "react-native";
import FilterPage from "../Filter";
import Deserve from "../Order/Deserve";
import User from "../User";
import HistoryBooking from "../historybooking";
import ProfileScreen from "../User/Profile";
import HelpAndFeedback from "../User/HelpAndFeedBack";

const Stack = createStackNavigator();

function Main() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
  const handleReloadUser = async () => {
    dispatch(loadingTrue());
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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="User">
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
              <Image
                source={require("../../assets/logo.png")} // Đường dẫn đến logo của bạn
                style={{ width: 100, height: 40 }} // Điều chỉnh kích thước logo theo ý muốn
                resizeMode="contain"
              />
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
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

export default Main;
