import { useState } from "react";
import { TouchableOpacity, View, Text, TextInput, ScrollView } from "react-native";
import { registerUser } from "../controller/registerController";
import Icon from "react-native-vector-icons/Ionicons";

function Register({ navigation }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const register = async () => {
    let res = await registerUser(userName, email, password, phoneNumber);
    console.log(res);
    if (res && res.code === 200) {
      alert("Register success");
      navigation.navigate("Login");
    } else {
      alert("Register fail");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
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
            Sign up now
          </Text>
          <Text style={{ color: "#7D848D", fontSize: 16, lineHeight: 20 }}>
            Please fill the details and create account
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
              placeholder="User Name"
              style={{ fontSize: 16, lineHeight: 58 }}
              value={userName}
              onChangeText={setUserName}
            />
          </View>
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
              width: "100%",
              height: 58,
              backgroundColor: "#F7F7F9",
              paddingLeft: 8,
              paddingRight: 8,
              marginTop: 30,
            }}
          >
            <TextInput
              placeholder="Phone Number"
              style={{ fontSize: 16, lineHeight: 58 }}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
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
              secureTextEntry={!showPassword}
              style={{ fontSize: 16, lineHeight: 58, width: "100%" }}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={{ position: "absolute", top: 20, right: 8 }}
            >
              <Icon
                name={showPassword ? "eye" : "eye-off"}
                size={24}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 14,
              textAlign: "left",
              width: "100%",
              color: "#FF6421",
              marginTop: 8,
            }}
          >
            Password must be 8 characters long
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
            onPress={register}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontSize: 20,
                lineHeight: 58,
              }}
            >
              Sign up
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
              Already have an account?
            </Text>
            <TouchableOpacity
              style={{ cursor: "pointer" }}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={{ fontSize: 14, lineHeight: 16, color: "#FF6421" }}>
                Sign in
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
            marginTop: 30,
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
    </ScrollView>
  );
}

export default Register;