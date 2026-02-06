import { useSignup } from "@/context/SignupContext";
import { router } from "expo-router";
import { StyleSheet, View } from 'react-native';

import TextField from "@/components/ui/input/textField";
import AppButton from "@/components/ui/appButton";
import AppText from "@/components/ui/appText";
import FormField from "@/components/ui/form/formField";

export default function Varify() {
  const { verificationCode, setVerificationCode } = useSignup();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.topContent}>
          <AppText variant="headline-md" color="primary" style={{ marginBottom: 12 }}>
            Check Your Email
          </AppText>
          <AppText variant="body-sm" color="primary">
            We’ve sent a 6-digit code to your email.
          </AppText>
          <AppText variant="body-sm" color="primary" style={{ marginBottom: 54 }}>
            Enter the code to verify your email address.
          </AppText>
          <FormField>
            <TextField
              value={verificationCode}
              onChangeText={setVerificationCode}
              placeholder="Enter Verification Code"
              type="auth"
            />
          </FormField>
        </View>
        <View style={styles.bottomContent}>
          <AppButton
            text="Verify"
            onPress={() => {
              // varifyCode(signup.verificationCode)
              router.push("/(auth)/signUp/password");
            }}
          />
          <AppButton
            text="Resend Code"
            onPress={() => {}}
            type="secondary"
          />
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
  }
});