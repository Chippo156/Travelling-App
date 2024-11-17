import React, { useEffect, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaFacebook, FaTwitter } from "react-icons/fa";
// import { FaSquareInstagram } from "react-icons/fa6";
import { TouchableOpacity, View, Text, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, loadingTrue, loadingFalse } from "../Redux/userSlice";
import TravelDetail from "../TravelDetails";
import { loginUser, reloadUser } from "../controller/loginController";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";

function Login({ navigation }) {
  const [isFocused, setIsFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const handleLogin = async () => {
    dispatch(loadingTrue());
    const userInfo = { email, password };
    let res = await loginUser(email, password);
    if (res && res.code === 1000) {
      await AsyncStorage.setItem("token", res.result.token);
      const token = await AsyncStorage.getItem("token");
      let res_token = await reloadUser(token);
      if (res_token && res_token.code === 200) {
        dispatch(
          login({
            user: res_token.result.user,
            isLoggedIn: res_token.result.valid,
          })
        );
        navigation.navigate("Home"); // Điều hướng sang trang Home sau khi đăng nhập
      } else {
        alert("Đăng nhập thất bại");
      }
    } else {
      alert("Đăng nhập thất bại");
    }
    dispatch(loadingFalse());
  };

  useEffect(() => {
    console.log(isLoggedIn);
    if (isLoggedIn) {
      navigation.navigate("Home");
    }
  }, [isLoggedIn]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
        paddingTop: 50,
        paddingBottom: 50,
        justifyContent: "space-around",
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          gap: 10,
          width: "100%",
        }}
      >
        <Text
          style={{
            color: "#000",
            fontSize: 26,
            lineHeight: 34,
            fontWeight: "bold",
          }}
        >
          Sign in now
        </Text>
        <Text style={{ color: "#7D848D", fontSize: 16, lineHeight: 20 }}>
          Please sign in to continue our app
        </Text>
        <View
          style={{
            width: "100%",
            height: 58,
            backgroundColor: "#F7F7F9",
            paddingLeft: 8,
            paddingRight: 8,
            marginTop: 30,
          }}
        >
          <TextInput
            placeholder="Email"
            style={{ fontSize: 16, lineHeight: 58 }}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            height: 58,
            backgroundColor: "#F7F7F9",
            paddingLeft: 8,
            paddingRight: 8,
            position: "relative",
            marginTop: 20,
          }}
        >
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            style={{ fontSize: 16, lineHeight: 58, width: "100%" }}
            value={password}
            onChangeText={setPassword}
          />
          <Icon
            name="eye-off"
            size={24}
            style={{ position: "absolute", top: 20, right: 8 }}
          />
        </View>
        <Text
          style={{
            fontSize: 14,
            textAlign: "right",
            width: "100%",
            color: "#FF6421",
            marginTop: 8,
          }}
        >
          Forgot password?
        </Text>
        <TouchableOpacity
          style={{
            width: "100%",
            backgroundColor: "#FF6421",
            borderRadius: 12,
            height: 58,
            cursor: "pointer",
            marginTop: 30,
          }}
          onPress={handleLogin}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
              fontSize: 20,
              lineHeight: 58,
            }}
          >
            Sign in
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            marginTop: 20,
            gap: 8,
          }}
        >
          <Text style={{ fontSize: 14, lineHeight: 16, color: "#707B81" }}>
            Don't have an account?
          </Text>
          <TouchableOpacity
            style={{ cursor: "pointer" }}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={{ fontSize: 14, lineHeight: 16, color: "#FF6421" }}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <Icon
          name="logo-facebook"
          size={30}
          style={{
            padding: 12,
            borderRadius: 50,
            backgroundColor: "#1877f2",
            color: "#fff",
          }}
        />
        <Icon
          name="logo-instagram"
          size={30}
          style={{
            padding: 12,
            borderRadius: 50,
            backgroundColor: "#d94dac",
            color: "#fff",
          }}
        />
        <Icon
          name="logo-twitter"
          size={30}
          style={{
            padding: 12,
            borderRadius: 50,
            backgroundColor: "#03a9f4",
            color: "#fff",
          }}
        />
      </View>
    </View>
  );
}

export default Login;
