import { useState } from "react";
import { StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { View, Text, TextInput } from "react-native";
import { loginUser } from "../controller/loginController";
import Icon from "react-native-vector-icons/Ionicons";

function Login({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const login = async () => {
    setIsLoading(true);
    try {
      let res = await loginUser(email, password);
      if (res && res.code === 200) {
        alert("Login success");
        navigation.navigate("Home");
      } else {
        alert("Login fail");
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
        <Text style={styles.title}>Sign in</Text>
        <Text style={styles.subtitle}>
          Please enter your email and password to login
        </Text>

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
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
          onPress={login}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.signUpText}>Sign in</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footerText}>
          <Text style={styles.footerNormalText}>Don't have an account?</Text>
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
          <Icon name="logo-google" size={30} color="#D44638" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="logo-github" size={30} color="#333" />
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