import { useState } from "react";
import { useSignup } from "@/context/SignupContext";
import { router } from "expo-router";
import { StyleSheet, View, Text } from 'react-native';

import TextField from "@/components/ui/input/textField";
import AppButton from "@/components/ui/appButton";
import AppText from "@/components/ui/appText";
import { colors } from '@/constants/colors';
import FormField from "@/components/ui/form/formField";

export default function Password() {
  const { signup, setPassword } = useSignup();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    password: null,
    confirmPassword: null,
  });

  const validate = () => {
    const nextErrors = {
      password: null,
      confirmPassword: null,
    };

    if (!signup.password) {
      nextErrors.password = "Password is required.";
    } else if (signup.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (signup.password !== confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(nextErrors);

    return !nextErrors.password && !nextErrors.confirmPassword;
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.topContent}>
          <AppText variant="headline-md" color="primary" style={{ marginBottom: 12 }}>
            Set Your Password
          </AppText>
          <AppText variant="body-sm" color="primary" style={{ marginBottom: 54 }}>
            Create a secure password for your account.
          </AppText>
          <View style={styles.inputGroup}>
            <FormField error={errors.password}>
              <TextField
                value={signup.password}
                onChangeText={(text) => {
                  setPassword(text);
                  setErrors((e) => ({ ...e, password: null }));
                }}
                placeholder="Password"
                type="auth"
                error={!!errors.password}
              />
            </FormField>
            <FormField error={errors.confirmPassword}>
              <TextField
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  setErrors((e) => ({ ...e, confirmPassword: null }));
                }}
                placeholder="Confirm Password"
                type="auth"
                secureTextEntry
                error={!!errors.confirmPassword}
              />
            </FormField>
          </View>
        </View>
        <View style={styles.bottomContent}>
          <AppButton
            text="Continue"
            onPress={() => {
              if (!validate()) return;
              // setPassword(signup.confirmPassword)
              router.push("/(auth)/signUp/profile");
            }}
          />
          <Text style={styles.caption}>
            By continuing you agree to our{" "}
            <Text style={styles.link} onPress={() => {}}>
              Terms of Services
            </Text>{" "}
            and {" "} 
            <Text style={styles.link} onPress={() => {}}>
              Privacy Policy.
            </Text>{" "}
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
    marginTop: 12,
    color: colors.semantic.text.primary,
    textDecorationLine: "underline",
    textAlign: "center",
  },
  inputGroup: {
    width: '100%',
  },
});