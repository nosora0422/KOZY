import { useSignup } from "@/context/SignupContext";
import { useState } from "react";
import { router } from "expo-router";
import { StyleSheet, View } from 'react-native';

import TextField from "@/components/ui/input/textField";
import AppButton from "@/components/ui/appButton";
import AppText from "@/components/ui/appText";
import FormField from "@/components/ui/form/formField";
import { colors } from '@/constants/colors';
import { LoginBackground } from "@/components/ui/loginBackground";
import AppHeader from "@/components/ui/appHeader"; 
import AuthCard from "@/components/ui/authInputCard";
import AppLogo from "@/components/ui/appMainLogo";

export default function Profile() {
  const { signup, setProfile } = useSignup();
  const formatDob = (text) => {
    // Remove non-digits
    const digits = text.replace(/\D/g, '');
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
  };
  
  const [errors, setErrors] = useState({
    firstName: null,
    lastName: null,
    dob: null,
  });

  const validate = () => {
    const nextErrors = {
      firstName: null,
      lastName: null,
      dob: null,
    };

    if (!signup.profile.firstName) {
      nextErrors.firstName = "First name is required.";
    }

    if (!signup.profile.lastName) {
      nextErrors.lastName = "Last name is required.";
    }

    if (!signup.profile.dob) {
      nextErrors.dob = "Date of birth is required.";
    }

    setErrors(nextErrors);
    return !nextErrors.firstName && !nextErrors.lastName && !nextErrors.dob;
  };

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
            title="Tell Us About Yourself"
            description="Make your experience more personal and trustworthy"
          >
          <View style={styles.inputGroup}>
            <FormField error={errors.firstName}>
                <TextField
                  value={signup.profile.firstName}
                onChangeText={(text) => {
                  setProfile({ firstName: text });
                  setErrors((e) => ({ ...e, firstName: null }));
                }}
                placeholder="First Name"
                type="auth"
                error={!!errors.firstName}
              />
            </FormField>

            <FormField error={errors.lastName}>
              <TextField
                value={signup.profile.lastName}
                onChangeText={(text) => {
                  setProfile({ lastName: text });
                  setErrors((e) => ({ ...e, lastName: null }));
                }}
                placeholder="Last Name"
                type="auth"
                error={!!errors.lastName}
              />
            </FormField>

            <FormField error={errors.dob} lastField>
              <TextField
                value={signup.profile.dob}
                onChangeText={(text) => {
                  setProfile({ dob: formatDob(text) });
                  setErrors((e) => ({ ...e, dob: null }));
                }}
                keyboardType="number-pad"
                maxLength={10}
                placeholder="Date of Birth (MM/DD/YYYY)"
                type="auth"
                error={!!errors.dob}
              />
            </FormField>
          </View>
          </AuthCard>
        </View>
        <View style={styles.footerContent}>
          <AppButton
            text="Continue"
            onPress={() => {
              if (!validate()) return;
              router.push("/(auth)/signUp/success");
            }}
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
    height: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  loginLink: {
    marginTop: 12,
    color: colors.semantic.text.primary,
    textDecorationLine: "underline",
    textAlign: "center",
  },
  inputGroup: {
    width: '100%',
  },
});