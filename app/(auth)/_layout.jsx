import { Stack, router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Pressable } from "react-native";

export default function SignupLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: true,
        headerTitle: "",
        headerRight: () => (
          <Pressable onPress={() => router.replace("/(tabs)/home")}>
            <Feather name="home" size={22} color="#fff" />
          </Pressable>
        ),
      }}
    />
  );
}
