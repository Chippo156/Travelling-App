import { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { Text, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

function Register({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const register = async () => {
    setIsLoading(true);
    try {
      let res = await registerUser(userName, email, password, phoneNumber);
      if (res && res.code === 200) {
        alert("Register success");
        navigation.navigate("Login");
      } else {
        alert("Register fail");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign up now</Text>
        <Text style={styles.subtitle}>
          Please fill in the details and create an account
        </Text>

        <TextInput
          placeholder="User Name"
          style={[styles.input, { lineHeight: undefined }]} // Không sử dụng lineHeight
          value={userName}
          onChangeText={setUserName}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Phone Number"
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
          />
          <Icon
            name="eye-off"
            size={24}
            color="#888"
            style={styles.passwordIcon}
          />
        </View>
        <Text style={styles.passwordHint}>
          Password must be 8 characters long
        </Text>

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={register}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.signUpText}>Sign up</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footerText}>
          <Text style={styles.footerNormalText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.footerLinkText}>Sign in</Text>
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

export default Register;
