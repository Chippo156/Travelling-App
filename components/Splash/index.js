import { useEffect } from "react";
import { Text, View } from "react-native";

export default Splash = ({ navigation }) => {
  useEffect(() => {
    // Điều hướng đến trang 2 sau 2 giây
    const timer = setTimeout(() => {
      navigation.navigate("Onboard");
    }, 5000);

    // Xóa timer khi component unmount
    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <View
      style={{
        minWidth: "100vw",
        minHeight: "100vh",
        backgroundColor: "#FF6421",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#fff", fontSize: 30, fontWeight: "bold" }}>
        Tourista
      </Text>
    </View>
  );
};
