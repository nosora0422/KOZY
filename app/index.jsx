import { Redirect } from "expo-router";

export default function TabsIndex() {
  const isLoggedIn = false; // 나중에 auth state로 대체

  if (isLoggedIn) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/login" />;
}
