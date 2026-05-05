import { useSignup } from "@/context/SignupContext";
import { router } from "expo-router";
import { StyleSheet, View } from 'react-native';

import TextField from "@/components/ui/input/textField";
import AppButton from "@/components/ui/appButton";
import AppText from "@/components/ui/appText";
import FormField from "@/components/ui/form/formField";

import { LoginBackground } from "@/components/ui/loginBackground";
import AppHeader from "@/components/ui/appHeader";
import AuthCard from "@/components/ui/authInputCard";
import AppLogo from "@/components/ui/appMainLogo";

export default function Varify() {
  const { verificationCode, setVerificationCode } = useSignup();

  return (
    <View style={styles.container}>
      {/* Background shapes */}
      <LoginBackground />
      <AppHeader showBack />
      <View style={styles.content}>
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
            onPress={() => {}}
            type="bare"
            underline
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
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 46,
  },
  topContent: { 
    height: 160,
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
  }
});