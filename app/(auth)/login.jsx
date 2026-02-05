import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

import TextField from "@/components/ui/input/textField";
import AppButton from "@/components/ui/appButton";
import AppText from "@/components/ui/appText";
import FormField from "@/components/ui/form/formField";
import { colors } from "@/constants/colors";

export default function Login() {
  const { redirect } = useLocalSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  const validate = () => {
    const nextErrors = {
      email: null,
      password: null,
    };

    if (!email) {
      nextErrors.email = "Email is required.";
    } else if (!email.includes("@")) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    }

    setErrors(nextErrors);
    return !nextErrors.email && !nextErrors.password;
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.topContent}>
          <AppText variant="headline-md" style={{ marginBottom: 12 }}>
            Log In to Continue
          </AppText>

          <AppText variant="body-sm" style={{ marginBottom: 54 }}>
            Match with the Right Room, Right Roommate
          </AppText>

          <View style={styles.inputGroup}>
            <FormField error={errors.email}>
              <TextField
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setErrors((e) => ({ ...e, email: null }));
                }}
                placeholder="Email"
                type="auth"
                autoCapitalize="none"
                keyboardType="email-address"
                error={!!errors.email}
              />
            </FormField>

            <FormField error={errors.password}>
              <TextField
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setErrors((e) => ({ ...e, password: null }));
                }}
                placeholder="Password"
                type="auth"
                secureTextEntry
                autoCapitalize="none"
                error={!!errors.password}
              />
            </FormField>
          </View>
        </View>

        <View style={styles.bottomContent}>
          <Pressable onPress={() => router.replace("/(tabs)/home")}>
            <Feather name="home" size={22} color="#fff" />
          </Pressable>
          <AppButton
            text="Log In"
            onPress={() => {
              if (!validate()) return;

              // integrate API
              router.replace(redirect ?? "/(tabs)/home");
            }}
          />

          <Text style={styles.caption}>
            Don’t have an account?{" "}
          </Text>
          <Text
              style={styles.link}
              onPress={() => router.push("/(auth)/signUp/email")}
            >
              Click here to sign up!
            </Text>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 96,
  },
  topContent: {
    display: 'flex',
    alignItems: 'center',
    width: '90%',
  },
  bottomContent: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: 12,
  },
  caption: {
    width: '80%',
    fontSize: 10,
    color: colors.semantic.text.primary,
    textAlign: "center",
  },
  link: {
    color: colors.semantic.text.primary,
    textDecorationLine: "underline",
    textAlign: "center",
  },
  inputGroup: {
    width: '100%',
  },
});