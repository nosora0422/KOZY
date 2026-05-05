import { useSignup } from "@/context/SignupContext";
import { router } from "expo-router";
import { StyleSheet, View, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import TextField from "@/components/ui/input/textField";
import AppButton from "@/components/ui/appButton";
import FormField from "@/components/ui/form/formField";

import { LoginBackground } from "@/components/ui/loginBackground";
import AppHeader from "@/components/ui/appHeader";
import AuthCard from "@/components/ui/authInputCard";
import AppLogo from "@/components/ui/appMainLogo";

export default function Varify() {
  const insets = useSafeAreaInsets();
  const { verificationCode, setVerificationCode } = useSignup();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        {/* Background shapes */}
        <LoginBackground />
        <AppHeader showBack />
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={-80}
        >
          <View style={[styles.content, { paddingBottom: insets.bottom }]}> 
            <View style={styles.topContent}>
              <AppLogo />
            </View>
            <View style={styles.midContent}>
              <AuthCard
                title="Check Your Email"
                description="We’ve sent a 6-digit code to your email. Enter the code to verify your email address."
              >
                <FormField lastField>
                  <TextField
                    value={verificationCode}
                    onChangeText={setVerificationCode}
                    placeholder="Enter Verification Code"
                    type="auth"
                  />
                </FormField>
              </AuthCard>
            </View>
            <View style={styles.footerContent}>
              <AppButton
                text="Verify"
                onPress={() => {
                  // varifyCode(signup.verificationCode)
                  router.push("/(auth)/signUp/password");
                }}
              />
              <AppButton
                text="Resend Code"
                onPress={() => {
                  // await resendCode()
                  Alert.alert("Code Sent", "A new verification code has been sent to your email.");
                }}
                type="bare"
                underline
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  topContent: { 
    height: 100,
    display: 'flex', 
    alignItems: 'center', 
    width: '100%', 
    justifyContent: 'flex-end',
  }, 
  
  midContent: { 
    flexGrow: 1, 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    width: '100%', 
  }, 
  footerContent: {
    height: 160,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    gap: 12,
  }
});