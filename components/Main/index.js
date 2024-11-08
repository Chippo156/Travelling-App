import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";
import { reloadUser } from "../controller/loginController";
import { login, logout } from "../Redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Login from "../Login";
import Splash from "../Splash";
import Onboard from "../Onboard";
import ForgotPassword from "../ForgotPassword";
import Register from "../Register";
import Home from "../Home";
import TravelDetail from "../TravelDetails";

const Stack = createStackNavigator();

function Main() {
  const dispatch = useDispatch();

  const handleReloadUser = async () => {
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
  };

  useEffect(() => {
    handleReloadUser();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TravelDetail">
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
        <Stack.Screen name="TravelDetail" component={TravelDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main;
