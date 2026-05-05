import { useState } from "react";
import { useSignup } from "@/context/SignupContext";
import { router } from "expo-router";
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";

import TextField from "@/components/ui/input/textField";
import AppButton from "@/components/ui/appButton";
import AppText from "@/components/ui/appText";
import { colors } from '@/constants/colors';
import FormField from "@/components/ui/form/formField";
import AuthCard from "@/components/ui/authInputCard";
import { LoginBackground } from "@/components/ui/loginBackground";
import AppHeader from "@/components/ui/appHeader";
import AppLogo from "@/components/ui/appMainLogo";

export default function EmailScreen() {
  var insets = useSafeAreaInsets();
  const { signup, setEmail } = useSignup();
  const [error, setError] = useState("");

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
      {/* Background shapes */}
      <LoginBackground />
      <AppHeader showBack />
      <View style={[styles.content, { paddingBottom: insets.bottom }]}>
        <View style={styles.topContent}>
          <AppLogo />
        </View>
        <View style={styles.midContent}>
          <AuthCard
            title="Sign Up Now"
            description="Enter your school or work email. We’ll send a code to verify."
          >
            <FormField error={error} lastField>
              <TextField
                error={error}
                value={signup.email}
                placeholder="Enter your email"
                type="auth"
                onChangeText={(text) => {
                  setEmail(text);
                  setError(null);
                }}
              />
            </FormField>
          </AuthCard>
        </View>
        <View style={styles.footerContent}>
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
          <AppButton
            text="Log In"
            onPress={() => router.push("/(auth)/login")}
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
    backgroundColor: colors.base.white, 
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
