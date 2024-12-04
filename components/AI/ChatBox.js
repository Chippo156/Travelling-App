import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Platform } from "react-native";

const Chatbox = () => {
  if (Platform.OS === "web") {
    return (
      <View style={styles.container}>
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
    <View style={styles.mobileContainer}>
      <Text>WebView is supported only on mobile platforms.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
  },
  mobileContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 400,
    height: 500,
    overflow: "hidden",
  },
});

export default Chatbox;