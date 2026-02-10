import { View, Text, StyleSheet, Image } from "react-native";
import AppText from "../appText";

export default function MessageBubble({ message, isMine, avatar }) {
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    const mins = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;
    const minsStr = mins < 10 ? `0${mins}` : mins;
    return `${hours}:${minsStr}${ampm}`;
  };

  return (
    <View style={styles.container}>
        {!isMine && avatar && (
            <Image source={{ uri: avatar }} style={styles.avatar} />
        )}
        <View style={[styles.messageContainer, isMine ? { alignItems: "flex-end" } : { alignItems: "flex-start" }]}>
            <View
                style={[
                    styles.bubble,
                    isMine ? styles.mine : styles.theirs,
                ]}
            >
                <AppText variant="body-xs">{message.text}</AppText>
            </View>
            <AppText variant="caption" color="primary" style={{textAlign: isMine ? "right" : "left"}}>
                {formatTime(message.createdAt)}
            </AppText>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 8,
    gap: 8,
  },
messageContainer: {
    flex:1,
},
  bubble: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  mine: {
    alignSelf: "flex-end",
    backgroundColor: "#4F46E5",
  },
  theirs: {
    alignSelf: "flex-start",
    backgroundColor: "#1F2937",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});
