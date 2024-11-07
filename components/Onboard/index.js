import { useState } from "react";
import { TouchableOpacity, ImageBackground, StyleSheet, Text, View } from "react-native";

function Onboard({navigation}) {
  const [index, setIndex] = useState(0);

  // This function will handle changing the index, can be adjusted for navigation
  const handleGetStarted = () => {
    if (index === 2) {
      navigation.navigate("Home");
    }
    if (index < 2) {
      setIndex(index + 1); // Change to the next index
    } else {
      // Handle the end of the onboarding process, e.g., navigate to main app
    }
  };

  // Array of content to render based on index
  const contentData = [
    {
      image:require("../../assets/carosel_1.png"),
      text: "Life is brief, but the universe is vast.",
      content: "At Tourista Adventures, we curate unique and immersive travel experiences to destinations around the globe.",
    },
    {
      image:require("../../assets/carosel_2.png"),
      text: "The world is waiting for you, go discover it. ",
      content: "Embark on an unforgettable journey by venturing outside of your comfort zone. The world is full of hidden gems just waiting to be discovered.",
    },
    {
      image:require("../../assets/carosel_3.png"),
      text: "People don’t take trips, trips take people",
      content: "To get the best of your adventure you just need to leave and go where you like. we are waiting for you",
    },
  ];

  return (
    <ImageBackground
      source={contentData[index].image} // Đường dẫn đến hình ảnh nền
      style={styles.background}
      imageStyle={styles.image}
      resizeMode="cover" // Cách xử lý hình ảnh khi nó không vừa với khung
    >
      <View style={styles.overlay}>
        <Text style={styles.text}>{contentData[index].text}</Text>
        <Text style={styles.content}>{contentData[index].content}</Text>
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{position:"absolute",top:30,right:20,cursor:"pointer"}} onPress={()=>navigation.navigate("Home")}><Text style={{fontSize:24,color:"#CAEAFF"}}>Skip</Text></TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1, // Chiếm toàn bộ không gian
    justifyContent: "center", // Căn giữa nội dung theo chiều dọc
    alignItems: "center", // Căn giữa nội dung theo chiều ngang
    position: "relative", // Để overlay lên trên hình ảnh
  },
  overlay: {
    flex: 1, // Để overlay cũng chiếm toàn bộ không gian
    justifyContent: "flex-end", // Căn giữa nội dung theo chiều dọc
    alignItems: "center", // Căn giữa nội dung theo chiều ngang
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu nền đen với độ trong suốt
    width: "100%",
    height: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 40,
    gap: 20,
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  content: {
    color: "#DBDBDB",
    fontSize: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FF6421",
    height: 56,
    width: "100%",
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    lineHeight: 56,
    fontSize: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default Onboard;
