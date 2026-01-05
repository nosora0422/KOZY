import { Stack } from 'expo-router';

export default function HomeStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="search" options={{ 
        title: 'Search',
        headerShown: true,
        headerBackVisible: true,    
      }} />
      <Stack.Screen name="[id]" options={{ 
        title: '',
        headerShown: true,
        headerBackVisible: true,    
      }} />
    </Stack>
  );
}