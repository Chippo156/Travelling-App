import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, loadingTrue, loadingFalse } from "../Redux/userSlice";
import { loginUser, reloadUser } from "../controller/loginController";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";

function Login({ navigation }) {
  const [isFocused, setIsFocused] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const handleLogin = async () => {
    setIsLoading(true);

    const userInfo = { username, password };
    let res = await loginUser(username, password);

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
        Alert.alert("Đăng nhập thất bại");
      }
    } else {
      Alert.alert("Đăng nhập thất bại");
    }
    setIsLoading(false);
  };

  // const login = async () => {
  //   setIsLoading(true);
  //   try {
  //     let res = await loginUser(username, password);
  //     console.log(res);

  //     if (res && res.code === 1000) {
  //       alert("Login success");
  //       navigation.navigate("Home");
  //     } else {
  //       alert("Login fail");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign in now</Text>
        <Text style={styles.subtitle}></Text>

        <TextInput
          placeholder="User Name"
          style={[styles.input, { lineHeight: undefined }]} // Không sử dụng lineHeight
          value={username}
          onChangeText={setUserName}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            secureTextEntry={!isPasswordVisible}
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon
              name={isPasswordVisible ? "eye" : "eye-off"}
              size={24}
              color="#888"
              style={styles.passwordIcon}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.signUpText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footerText}>
          <Text style={styles.footerNormalText}>Don't an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.footerLinkText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.socialContainer}>
        <TouchableOpacity>
          <Icon name="logo-facebook" size={30} color="#4267B2" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="logo-instagram" size={30} color="#C13584" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="logo-twitter" size={30} color="#1DA1F2" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 50,
    justifyContent: "space-between",
  },
  formContainer: {
    alignItems: "center",
    width: "100%",
    gap: 15,
  },
  title: {
    fontSize: 26,
    lineHeight: 34,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#7D848D",
    marginTop: 5,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#F7F7F9",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginTop: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#F7F7F9",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginTop: 15,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },
  passwordIcon: {
    marginLeft: 10,
  },
  passwordHint: {
    fontSize: 14,
    color: "#FF6421",
    marginTop: 5,
    alignSelf: "flex-start",
  },
  signUpButton: {
    width: "100%",
    backgroundColor: "#FF6421",
    borderRadius: 8,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  signUpText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerText: {
    flexDirection: "row",
    marginTop: 15,
  },
  footerNormalText: {
    fontSize: 14,
    color: "#707B81",
  },
  footerLinkText: {
    fontSize: 14,
    color: "#FF6421",
    marginLeft: 5,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 20,
  },
});

export default Login;
