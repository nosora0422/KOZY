import { Stack } from 'expo-router';

export default function AccountStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Account' }} />
      <Stack.Screen name="trustLevelInfo" options={{ 
        title: '',
        headerShown: true,
        headerBackVisible: true,
        headerBackTitleVisible: false
      }} />
      <Stack.Screen name="editProfile" options={{ 
        title: '',
        headerShown: true,
        headerBackVisible: true,
        headerBackTitleVisible: false
      }} />
    </Stack>
  );
}