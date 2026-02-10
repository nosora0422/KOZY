import { Stack } from 'expo-router';

export default function chatStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Messages' }} />
      <Stack.Screen name="[chatId]" options={{ 
          title: '', 
          headerShown: true,
          headerBackVisible: true,
          headerBackTitleVisible: false
        }} />
    </Stack>
  );
}