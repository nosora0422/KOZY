import { View, StyleSheet, FlatList } from "react-native";
import { useState, useCallback } from "react";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useFocusEffect, useLocalSearchParams, useNavigation} from 'expo-router';

import { mockMessages, currentUser, otherUser } from "@/data/mockChatData";
import MessageBubble from "@/components/ui/chat/MessageBubble";
import ChatInput from "@/components/ui/chat/ChatInput";
import AppText from "@/components/ui/appText";
import { DATA } from "@/data/mockListData";

export default function ChatScreen() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const [messages, setMessages] = useState(mockMessages);
    // For demo purposes, we use the first listing as the chat context
    const handleSend = (text) => {
    const newMessage = {
        id: Date.now().toString(),
        text,
        senderId: currentUser.id,
        createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    };

    useFocusEffect(
            useCallback(() => {
            const parent = navigation.getParent();
            parent?.setOptions({
                tabBarStyle: { display: 'none' },
            });
        
            return () => {
                parent?.setOptions({
                tabBarStyle: {
                    position: 'absolute',
                    alignSelf: 'center', 
                    bottom: insets.bottom + 10,
                    borderRadius: 16,
                    borderTopWidth: 0,
                    height: 56,
                    backgroundColor: 'rgba(0,0,0,1)',
                    maxWidth: 400,
                    paddingTop: 7,
                    marginHorizontal: 16,
                },
                });
            };
            }, [navigation, insets.bottom])
    );
    
    // Getting the laatest message for display in the chat header
    const latestMessage = messages[messages.length - 1];
    const formatMessageDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMs = now - date;
        const diffInMins = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        const formatTime = (d) => {
            let hours = d.getHours();
            const mins = d.getMinutes();
            const ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12 || 12;
            const minsStr = mins < 10 ? `0${mins}` : mins;
            return `${hours}:${minsStr}${ampm}`;
        };

        if (diffInMins < 60) {
            return `${diffInMins}m ago`;
        } else if (diffInHours < 24) {
            return `Today, ${formatTime(date)}`;
        } else if (diffInDays === 1) {
            return `Yesterday, ${formatTime(date)}`; 
        } else if (diffInDays === 2) {
            return `2 days ago, ${formatTime(date)}`;
        } else if (diffInDays < 7) {
            return `${diffInDays} days ago, ${formatTime(date)}`;
        } else {
            return date.toLocaleDateString();
        }
    };

    return (
    <View style={styles.container}>
        <View style={styles.chatHeader}>
            <AppText variant="body-sm-strong">{DATA[0].owner.name}</AppText>
            {latestMessage && (
                <AppText variant="caption">{formatMessageDate(latestMessage.createdAt)}</AppText>
            )}
            <AppText variant="caption" color="secondary" style={{marginTop: 10 }}>Your chat request has been accepted.</AppText>
        </View>
        <FlatList
            data={[...messages].reverse()}
            inverted
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <MessageBubble
                    message={item}
                    isMine={item.senderId === currentUser.id}
                    avatar={item.senderId === currentUser.id ? currentUser.avatar : otherUser.avatar}
                />
        )}
            contentContainerStyle={styles.list}
        />

        <ChatInput onSend={handleSend} />
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  list: {
    padding: 16,
  },
  chatHeader: {
    alignItems: "center",
  }
});
