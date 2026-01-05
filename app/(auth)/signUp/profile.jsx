import { useSignup } from "@/context/SignupContext";
import { useState } from "react";
import { router } from "expo-router";
import { StyleSheet, View } from 'react-native';

import TextField from "@/components/ui/input/textField";
import AppButton from "@/components/ui/appButton";
import AppText from "@/components/ui/appText";
import FormField from "@/components/ui/form/formField";
import { colors } from '@/constants/colors';

export default function Profile() {
  const { signup, setProfile } = useSignup();
  
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
      <View style={styles.content}>
        <View style={styles.topContent}>
          <AppText variant="headline-md" color="primary" style={{ marginBottom: 12 }}>
            Tell Us About Yourself
          </AppText>
          <AppText variant="body-sm" color="primary" style={{ marginBottom: 54 }}>
            This helps us personalize your experience and build trust with other users.
          </AppText>
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

            <FormField error={errors.dob}>
              <TextField
                value={signup.profile.dob}
                onChangeText={(text) => {
                  setProfile({ dob: text });
                  setErrors((e) => ({ ...e, dob: null }));
                }}
                placeholder="Date of Birth"
                type="auth"
                error={!!errors.dob}
              />
            </FormField>
          </View>
        </View>
        <View style={styles.bottomContent}>
          <AppButton
            text="Save"
            onPress={() => {
              if (!validate()) return;

              // 다음 단계 or 완료 페이지
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