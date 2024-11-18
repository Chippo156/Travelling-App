import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
function Footer({value,navigation}) {
  const [activeTab, setActiveTab] = useState(value ||"home");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={[styles.footerButton, activeTab === "home" && styles.activeTab]}
        onPress={() => handleTabChange("home")}
      >
        <Icon name="home" style={{ fontSize: 20 }} />
        <Text style={styles.footerText}>Trang Chủ</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.footerButton,
          activeTab === "search" && styles.activeTab,
        ]}
        onPress={() => handleTabChange("search")}
      >
        <Icon name="search" style={{ fontSize: 20 }} />
        <Text style={styles.footerText}>Tìm Kiếm</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.footerButton, activeTab === "user" && styles.activeTab]}
        onPress={() => navigation.navigate("User")}
      >
        <Icon name="person" style={{ fontSize: 20 }} />
        <Text style={styles.footerText}>Tài Khoản</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
    footerText: {
        fontSize: 16,
        color: "#000",
      },
      footer: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: "#ccc",
      },
      footerButton: {
        flex: 1,
        alignItems: "center",
        gap: 4,
      },
      activeTab: {
        color: "#3f3ff5",
      },
  });
  
export default Footer;
