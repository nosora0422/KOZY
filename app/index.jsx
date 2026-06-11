import { Redirect } from "expo-router";

export default function TabsIndex() {
  const isLoggedIn = false; // Replace with auth state

  if (isLoggedIn) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/login" />;
}
