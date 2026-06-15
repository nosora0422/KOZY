import { View, StyleSheet, FlatList, KeyboardAvoidingView, Platform, Keyboard, Alert } from "react-native";
import { useState, useCallback, useEffect, useRef } from "react";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect, useLocalSearchParams, useNavigation} from 'expo-router';

import { currentUser, getMockChatThread } from "@/data/mockChatData";
import MessageBubble from "@/components/ui/chat/MessageBubble";
import ChatInput from "@/components/ui/chat/ChatInput";
import AppText from "@/components/ui/appText";
import AppButton from "@/components/ui/appButton";
import { DATA } from "@/data/mockListData";
import { colors } from "@/constants/colors";
import AppDrawer from "@/components/ui/drawer/AppDrawer";
import ProfileSection from "@/components/ui/profileSection";

const KEYBOARD_INPUT_GAP = 100; //setts a gap between keyboard and input

export default function ChatScreen() {
    const navigation = useNavigation();
    const { chatId } = useLocalSearchParams();
    const insets = useSafeAreaInsets();
    const chatThread = getMockChatThread(chatId);
    const listing = DATA.find((item) => item.id === chatThread.id) ?? DATA[0];
    const [messages, setMessages] = useState(chatThread.messages);
    const [requestMeta, setRequestMeta] = useState({
        status: chatThread.requestStatus,
        label: chatThread.requestLabel,
        canAccept: chatThread.canAccept,
    });
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const isPendingRequest = requestMeta.status?.startsWith("pending");
    const profileDrawerRef = useRef(null);


    const handleSend = (text) => {
    const newMessage = {
        id: Date.now().toString(),
        text,
        senderId: currentUser.id,
        createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    };

    useEffect(() => {
        setMessages(chatThread.messages);
        setRequestMeta({
            status: chatThread.requestStatus,
            label: chatThread.requestLabel,
            canAccept: chatThread.canAccept,
        });
    }, [chatThread]);

    const handleAcceptRequest = () => {
        setRequestMeta({
            status: "accepted",
            label: "Chat request accepted",
            canAccept: false,
        });
        setMessages((prev) => [
            ...prev,
            {
                id: `accepted-${Date.now()}`,
                type: "system",
                text: "Chat request accepted",
                createdAt: new Date().toISOString(),
            },
        ]);
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

    useEffect(() => {
        const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
        const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
        const showSubscription = Keyboard.addListener(showEvent, () => setIsKeyboardVisible(true));
        const hideSubscription = Keyboard.addListener(hideEvent, () => setIsKeyboardVisible(false));

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);
    
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

    const openProfile = () => profileDrawerRef.current?.snapToIndex(0);

    return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
        <View style={styles.chatHeader}>
            <AppText variant="body-sm-strong">{listing.owner.name}</AppText>
            {latestMessage && (
                <AppText variant="caption">{formatMessageDate(latestMessage.createdAt)}</AppText>
            )}
            <AppText variant="caption" color="secondary" style={{marginTop: 10 }}>{requestMeta.label}</AppText>
            {requestMeta.canAccept && (
                <AppButton
                    text="Accept Chat"
                    size="sm"
                    type="secondary"
                    onPress={() =>
                        Alert.alert(
                            'Have you checked user\'s profile?', 
                            'Review their profile, then accept to start chatting.',
                            [
                                { 
                                    text: 'Accept and Start Chat',
                                    onPress: handleAcceptRequest
                                , 
                                },
                                { 
                                    text: 'View Profile', 
                                    onPress: openProfile
                                },
                                { 
                                    text: 'Close', 
                                    style: 'cancel' 
                                },
                            ]
                        )
                    }
                    style={styles.acceptButton}
                />
            )}
        </View>
        <FlatList
            data={[...messages].reverse()}
            inverted
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <MessageBubble
                    message={item}
                    isMine={item.senderId === currentUser.id}
                    avatar={item.senderId === currentUser.id ? currentUser.avatar : chatThread.otherUser.avatar}
                    onAvatarPress={openProfile}
                />
        )}
            contentContainerStyle={styles.list}
            keyboardShouldPersistTaps="handled"
        />

        <View
            style={[
                styles.inputSafeArea,
                { paddingBottom: isKeyboardVisible ? KEYBOARD_INPUT_GAP : insets.bottom },
            ]}
        >
            <ChatInput onSend={handleSend} disabled={isPendingRequest} />
        </View>
        <AppDrawer
            ref={profileDrawerRef}
            title={`${listing.owner.name} Profile`}
            primaryAction={() => {
                profileDrawerRef.current?.close()
                if (requestMeta.canAccept) {
                    handleAcceptRequest();
                }
            }}
            primaryActionText={
                requestMeta.canAccept ? "Accept & Start Chat" : "Close"
            }
          >
            
            <ProfileSection userId={listing.owner.id} listing={listing} />
            
        </AppDrawer>
    </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base.background,
  },
  list: {
    padding: 16,
  },
  chatHeader: {
    alignItems: "center",
  },
  acceptButton: {
    marginTop: 12,
    width: 120,
  },
  inputSafeArea: {
    backgroundColor: colors.base.background,
  }
});
