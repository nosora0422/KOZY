
import { router } from "expo-router";
import { StyleSheet, View } from 'react-native';

import AppButton from "@/components/ui/appButton";
import AppText from "@/components/ui/appText";

export default function Success() {

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.topContent}>
          <View style={styles.imagePlaceHolder}></View>
          <AppText variant="headline-lg" color="primary" style={{ marginBottom: 12 }}>
            🎉 You're all set!
          </AppText>
          <AppText variant="body-sm" color="primary" style={{ marginBottom: 54 }}>
            Your account has been successfully created.
          </AppText>
        </View>
        <View style={styles.bottomContent}>
          <AppButton
            text="Boost My Profile"
            onPress={() => {
              // varifyCode(signup.verificationCode)
              router.push("/(auth)/signUp/password");
            }}
          />
          <AppButton
            text="Later & Back to Home"
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
  },
  imagePlaceHolder: {
    width: 120,   
    height: 120,
    backgroundColor: '#E0E0E0',
  },
});