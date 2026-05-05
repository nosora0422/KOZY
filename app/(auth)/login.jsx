import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import TextField from "@/components/ui/input/textField";
import AppButton from "@/components/ui/appButton";
import FormField from "@/components/ui/form/formField";
import { colors } from "@/constants/colors";
import { LoginBackground } from "@/components/ui/loginBackground";
import AuthCard from "@/components/ui/authInputCard";
import AppLogo from "@/components/ui/appMainLogo";
import AppHeader from "@/components/ui/appHeader";

export default function Login() {
  var insets = useSafeAreaInsets();
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
      {/* Background shapes */}
      <LoginBackground />
      <AppHeader />
      <View style={[styles.content, { paddingBottom: insets.bottom }]}>
        <View style={styles.topContent}>
          <AppLogo />
        </View>
        <View style={styles.midContent}>
          <AuthCard
            title="Log In to Continue"
            description="Match with the Right Room, Right Roommate"
          >    
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

              <FormField error={errors.password} lastField>
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
          </AuthCard>
        </View>
        <View style={styles.footerContent}>
          {/* Temporary home button for testing */}
          <Pressable 
            onPress={() => router.replace("/(tabs)/home")}
            style={{position: 'absolute', top: 16, }}
          >
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
    backgroundColor: colors.base.white,
  },
  inputContainer:{
    width: '100%',
    marginHorizontal: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.base.white,
    padding: 34,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
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
    gap: 12,
    width: '100%',
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