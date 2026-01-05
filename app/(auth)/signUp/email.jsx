import { useState } from "react";
import { useSignup } from "@/context/SignupContext";
import { router } from "expo-router";
import { StyleSheet, View, Pressable, Text } from 'react-native';

import TextField from "@/components/ui/input/textField";
import AppButton from "@/components/ui/appButton";
import AppText from "@/components/ui/appText";
import { colors } from '@/constants/colors';
import FormField from "@/components/ui/form/formField";

export default function EmailScreen() {
  const { signup, setEmail } = useSignup();
  
  const [ error, setError ] = useState("");

  const validate = () => {
    if (!signup.email) {
      setError("Email is required.");
      return false;
    }

    if (!signup.email.includes("@")) {
      setError("Enter a valid email address.");
      return false;
    }

    setError(null);
    return true;
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.topContent}>
          <AppText variant="headline-md" color="primary" style={{ marginBottom: 12 }}>
            Sign Up Now
          </AppText>
          <AppText variant="body-sm" color="primary" style={{ marginBottom: 12 }}>
            Enter Your School or Work Email
          </AppText>
          <View>
            <AppText variant="caption" color="primary">
              ✶ We’ll send a verification code to confirm your email.
            </AppText>
            <AppText variant="caption" color="primary" style={{ marginBottom: 54 }}>
              ✶ For secure matching, please use your school or work email address.
          </AppText>
          </View>
          <FormField error={error}>
            <TextField
              value={signup.email}
              placeholder="Enter your email"
              type="auth"
              onChangeText={(text) => {
                  setEmail(text);
                  setError(null);
              }}
            />
          </FormField>
        </View>
        <View>
          <AppButton
            text="Send Verification Code"
            onPress={() => {
              if (!validate()) return;
              // await sendCode(signup.email)
              router.push("/(auth)/signUp/varify");
            }}
          />
          <AppText variant="body-sm" color="primary" style={{ textAlign: "center", marginTop: 16 }}>
            Already have an account?
          </AppText>
          <Pressable onPress={() => router.push("/(auth)/login")}>
            <Text style={styles.link}>Log In</Text>
          </Pressable>
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
  link: {
    marginTop: 12,
    color: colors.semantic.text.primary,
    textDecorationLine: "underline",
    textAlign: "center",
  }
});
