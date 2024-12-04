import React, { useState } from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from "react-native";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [predefinedQuestions] = useState([
    { question: "1 + 1 bằng mấy?", answer: "1 + 1 = 2." },
    { question: "Bạn có thể giúp tôi với bài tập không?", answer: "Tất nhiên, tôi có thể giúp bạn." },
    { question: "Chỗ này có miễn phí không?", answer: "Cảm ơn bạn đã hỏi. Mọi thông tin sẽ được cung cấp sau." },
    { question: "Bạn có thể chỉ tôi cách sử dụng ứng dụng này?", answer: "Vui lòng làm theo các hướng dẫn trong ứng dụng." },
    { question: "Tôi cần hỗ trợ kỹ thuật, bạn có thể giúp không?", answer: "Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất." },
  ]);

  // Hàm gửi tin nhắn
  const onSend = async (newMessages = []) => {
    const userMessage = newMessages[0]?.text;

    if (!userMessage) return;

    // Kiểm tra nếu câu hỏi là một trong những câu hỏi có sẵn
    const predefinedAnswer = predefinedQuestions.find(
      (q) => q.question === userMessage
    );

    let aiResponse = "";

    if (predefinedAnswer) {
      aiResponse = predefinedAnswer.answer; // Nếu câu hỏi có sẵn, trả lời sẵn
    } else {
      aiResponse = "Chào bạn, Cảm ơn bạn đã liên hệ. Chúng tôi sẽ liên hệ lại sau."; // Trả lời mặc định
    }

    // Cập nhật tin nhắn
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [
        ...newMessages,
        {
          _id: Math.random().toString(), // ID tin nhắn AI
          text: aiResponse, // Nội dung tin nhắn từ AI
          createdAt: new Date(),
          user: { _id: 2, name: "AI" },
        },
      ])
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.chatContainer}>
        {/* Hiển thị tin nhắn */}
        <GiftedChat
          messages={messages}
          onSend={(newMessages) => onSend(newMessages)}
          user={{ _id: 1 }}
          renderBubble={(props) => <Bubble {...props} />}
        />
      </View>

      {/* FlatList hiển thị các câu hỏi gợi ý nằm trên ô nhập tin nhắn */}
      <View style={styles.questionContainer}>
        <FlatList
          data={predefinedQuestions}
          horizontal
          keyExtractor={(item, index) => (item.question ? item.question.toString() : index.toString())}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.questionButton}
              onPress={() => onSend([{ text: item.question, user: { _id: 1 } }])}
            >
              <Text style={styles.questionText}>{item.question}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.questionList}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  questionContainer: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  questionList: {
    paddingVertical: 5,
  },
  questionButton: {
    backgroundColor: "#cfe2f3",
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  questionText: {
    fontSize: 16,
    color: "#1c1c1c",
  },
});

export default ChatBox;