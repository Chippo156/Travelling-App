import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { TouchableOpacity, View } from "react-native";
import { Text, TextInput } from "react-native";
function Register({ navigation }) {
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
          />
          <FaRegEyeSlash style={{ position: "absolute", top: 20, right: 8 }} />
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
          <TouchableOpacity style={{ cursor: "pointer" }} onPress={()=>navigation.navigate("Login")}>
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
        }}
      >
        <FaFacebook style={{padding:12,width:30,height:30,borderRadius:"50%",backgroundColor:"#1877f2",color:"#fff"}} />
        <FaSquareInstagram style={{padding:12,width:30,height:30,borderRadius:"50%",backgroundColor:"#d94dac",color:"#fff"}}/>
        <FaTwitter style={{padding:12,width:30,height:30,borderRadius:"50%",backgroundColor:"#03a9f4",color:"#fff"}} />
      </View>
    </View>
  );
}

export default Register;
