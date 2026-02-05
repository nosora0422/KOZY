import { Stack } from 'expo-router';

export default function AccountStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Account' }} />
      <Stack.Screen name="trustLevelInfo" 
        options={{ 
          title: '',
          headerShown: true,
          headerBackVisible: true,
          headerBackTitleVisible: false
      }} />
      <Stack.Screen name="editProfile" 
        options={{ 
          title: '',
          headerShown: true,
          headerBackVisible: true,
          headerBackTitleVisible: false
      }} />
      <Stack.Screen name="notification" 
        options={{ 
          title: '',
          headerShown: true,
          headerBackVisible: true,
          headerBackTitleVisible: false
      }} />
      <Stack.Screen name="privacyPolicy" 
        options={{ 
          title: '',
          headerShown: true,
          headerBackVisible: true,
          headerBackTitleVisible: false
      }} />
      <Stack.Screen name="contactUs" 
        options={{ 
          title: '',
          headerShown: true,
          headerBackVisible: true,
          headerBackTitleVisible: false
      }} />
      <Stack.Screen name="savedList/index" 
        options={{ 
          title: 'Saved Listings',
          headerShown: true,
          headerBackVisible: true,
          headerBackTitleVisible: false
      }} />
      <Stack.Screen name="savedList/[id]" 
        options={{ 
          title: '',
          headerShown: false,
        }}
      />
      <Stack.Screen name="savedList/detail/[id]" 
        options={{ 
          title: '',
          headerShown: true,
          headerBackVisible: true,
          headerBackTitleVisible: false
        }}
      />
      <Stack.Screen name="myListings/index" 
        options={{ 
          title: 'My Listings',
          headerShown: true,
          headerBackVisible: true,
          headerBackTitleVisible: false
        }}
      />
      <Stack.Screen name="myListings/[id]" 
        options={{ 
          title: '',
          headerShown: false,
        }}
      />
      <Stack.Screen name="myListings/detail/[id]" 
        options={{ 
          title: '',
          headerShown: true,
          headerBackVisible: true,
          headerBackTitleVisible: false
        }}
      />
    </Stack>
  );
}