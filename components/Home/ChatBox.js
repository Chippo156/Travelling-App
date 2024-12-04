import React from "react";
import { View, StyleSheet } from "react-native";
import { Platform } from "react-native";

const Chatbot = () => {
  if (Platform.OS === "web") {
    return (
      <View>
        <iframe
          srcDoc={`
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></script>
            </head>
            <body>
              <df-messenger 
                intent="WELCOME"
                chat-title="Chatbox"
                agent-id="aca0949f-e170-4edc-9572-4d174d1f0f1f"
                language-code="en"
              ></df-messenger>
            </body>
            </html>
          `}
          style={styles.iframe}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>WebView is supported only on mobile platforms.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 300,
    height: 400,
    overflow: "hidden",
  },
  iframe: {
    width: "100%",
    height: "100%",
    border: "none",
  },
});

export default Chatbot;
