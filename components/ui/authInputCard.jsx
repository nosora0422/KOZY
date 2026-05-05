import { View, Image, StyleSheet } from "react-native";
import AppText from "@/components/ui/appText";
import { colors } from "@/constants/colors";

export default function AuthCard({
  title,
  description,
  children,
}) {
  return (
    <View style={styles.topContent}>
      <View style={[styles.card, description ? { gap: 12 } : { gap: 28 }]}>
        <AppText
          variant="headline-md"
          style={styles.title}
          textColor={colors.base.gray800}
        >
          {title}
        </AppText>

        {description && (
          <AppText
            variant="body-sm"
            style={styles.description}
            textColor={colors.base.gray800}
          >
            {description}
          </AppText>
        )}

        <View style={styles.inputGroup}>
          {children}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topContent: {
    alignItems: "center",
    width: "90%",
  },
  card: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.base.white,
    paddingHorizontal: 28,
    paddingVertical: 46,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    marginBottom: 12,
  },
  description: {
    marginBottom: 32,
    textAlign: "center",
  },
  inputGroup: {
    width: "100%",
  },
});