import { Stack } from 'expo-router';

export default function PostStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Post'}} />
      <Stack.Screen name="stepOne" options={{
        title:'',
        headerShown: true,
        headerBackVisible: true,    
      }} />
      <Stack.Screen name="stepTwo" options={{
        title:'',
        headerShown: true,
        headerBackVisible: true,    
      }} />
      <Stack.Screen name="stepThree" options={{
        title:'',
        headerShown: true,
        headerBackVisible: true,    
      }} />
      <Stack.Screen name="stepFour" options={{
        title:'',
        headerShown: true,
        headerBackVisible: true,    
      }} />
      <Stack.Screen name="previewListing" options={{
        title:'',
        headerShown: true,
        headerBackVisible: true,    
      }} />
      <Stack.Screen name="confirmPublish" options={{
        title:'',
        headerShown: true,
        headerBackVisible: true,    
      }} />
    </Stack>
  );
}