import { Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';

export default function SearchStack() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Search',
          headerShown: true,
          headerBackVisible: false,
          headerLeft: () => (
            <Pressable
              onPress={() => router.replace('/home')}
              accessibilityRole="button"
              accessibilityLabel="Back to home"
              hitSlop={10}
            >
              <Feather 
                name="chevron-left" 
                size={28} 
                color="white"
                style={{ marginLeft: 2 }} 
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="searchResult"
        options={{
          title: 'Search Results',
          headerShown: true,
          headerBackVisible: false,
          headerLeft: () => (
            <Pressable
              onPress={() => router.replace('/home/search')}
              accessibilityRole="button"
              accessibilityLabel="Back to search"
              hitSlop={10}
            >
              <Feather name="chevron-left" size={28} color="white" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: '',
          headerShown: false,
          headerBackVisible: true,
        }}
      />
    </Stack>
  );
}
