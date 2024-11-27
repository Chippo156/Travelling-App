import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const AddReviewModal = ({ isVisible, onClose, onSubmit }) => {
  const [rating, setRating] = useState("");
  const [liked, setLiked] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const handleAddReview = () => {
    if (rating && liked && content) {
      onSubmit({ rating, title, content });
      setRating("");
      setLiked("");
      setContent("");
      onClose();
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add Review</Text>
          <ScrollView>
            <Text style={styles.label}>Rating (1-5):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={rating}
              onChangeText={setRating}
              placeholder="Enter rating"
            />

            <Text style={styles.label}>Title:</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              value={title}
              onChangeText={setTitle}
              placeholder="Write your title..."
            />

            <Text style={styles.label}>Content:</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              value={content}
              onChangeText={setContent}
              placeholder="Write your review..."
            />
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleAddReview}
              style={styles.addButton}
            >
              <Text style={styles.addButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  closeButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  addButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  closeButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default AddReviewModal;
