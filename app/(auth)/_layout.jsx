import { Stack } from 'expo-router';

export default function SignupLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="*"
        options={{
          headerShown: true,
          headerBackTitleVisible: true,
          headerTitle: "",
        }}
      />
    </Stack>
  );
}
