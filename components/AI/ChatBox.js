import React, { useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const apiKey = "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"; // Thay thế với API key của bạn từ Hugging Face

  // Hàm gửi tin nhắn
  const onSend = async (newMessages = []) => {
    // Cập nhật tin nhắn của người dùng vào GiftedChat
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    const userMessage = newMessages[0]?.text;

    if (!userMessage) return;

    // Tạo lịch sử cuộc trò chuyện hợp lý (cập nhật tin nhắn chỉ bao gồm User và AI)
    const conversationHistory = messages
      .map(msg => (msg.user._id === 1 ? `User: ${msg.text}` : `AI: ${msg.text}`))
      .join("\n");

    try {
      // Gửi yêu cầu POST tới Hugging Face API
      const response = await fetch("https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B", { // Sử dụng mô hình gpt-neo-2.7B
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          inputs: `${conversationHistory}\nUser: ${userMessage}\nAI:`, // Gửi toàn bộ lịch sử trò chuyện
        }),
      });

      // Kiểm tra xem phản hồi từ API có hợp lệ không
      if (!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        return;
      }

      // Đọc dữ liệu JSON từ phản hồi
      const data = await response.json();
      console.log("API response data:", data); // Ghi nhật ký phản hồi từ API để kiểm tra

      let aiResponse = data.generated_text?.trim(); // Trích xuất văn bản được tạo từ mô hình

      // Kiểm tra nếu aiResponse là hợp lý và không trống
      if (!aiResponse || aiResponse.length < 3) {
        aiResponse = "Xin lỗi, tôi không thể hiểu yêu cầu của bạn. Bạn có thể thử lại không?";
      }

      // Nếu phản hồi từ AI có độ dài quá lớn, cắt bớt lại
      if (aiResponse && aiResponse.length > 200) {
        aiResponse = aiResponse.substring(0, 200) + "..."; // Cắt bớt độ dài của phản hồi
      }

      // Nếu có phản hồi từ AI, cập nhật tin nhắn vào GiftedChat
      if (aiResponse) {
        setMessages((prevMessages) =>
          GiftedChat.append(prevMessages, [
            {
              _id: Math.random().toString(), // ID tin nhắn AI
              text: aiResponse, // Nội dung tin nhắn từ AI
              createdAt: new Date(), // Thời gian tạo tin nhắn
              user: { _id: 2, name: "AI" }, // Thông tin người gửi (AI)
            },
          ])
        );
      } else {
        console.error("AI response is undefined or empty.");
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  return (
    <GiftedChat
      messages={messages} // Tin nhắn hiện tại
      onSend={(newMessages) => onSend(newMessages)} // Hàm xử lý gửi tin nhắn
      user={{ _id: 1 }} // Người dùng có ID là 1
    />
  );
};

export default ChatBox;
