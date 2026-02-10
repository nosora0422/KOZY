import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { colors } from '@/constants/colors';

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Type a message..."
        placeholderTextColor={colors.semantic.text.placeholder}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleSend} style={styles.send}>
        <Text style={styles.sendText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    borderTopWidth: 1,
    borderColor: colors.base.primary,
    backgroundColor: colors.base.background,
  },
  input: {
    flex: 1,
    color: colors.semantic.text.primary,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
  },
  send: {
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  sendText: {
    color: colors.semantic.text.primary,
    fontWeight: "600",
  },
});
