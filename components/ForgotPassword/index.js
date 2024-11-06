import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { TouchableOpacity, View } from "react-native";
import { Text, TextInput } from "react-native";
function ForgotPassword({ navigation }) {
  const [isFocused, setIsFocused] = useState(false);
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
          Forgot password
        </Text>
        <Text style={{ color: "#7D848D", fontSize: 16, lineHeight: 20 }}>
          Enter your email account to reset your password
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
            placeholder="New password"
            style={{ fontSize: 16, lineHeight: 58 }}
          />
        </View>
        <TouchableOpacity
          style={{
            width: "100%",
            backgroundColor: "#FF6421",
            borderRadius: 12,
            height: 58,
            cursor: "pointer",
            marginTop: 30,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
              fontSize: 20,
              lineHeight: 58,
            }}
          >
            Reset password
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ForgotPassword;
