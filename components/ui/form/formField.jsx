// components/form/FormField.jsx
import { View, Text, StyleSheet } from "react-native";
import ErrorMessage from "./errorMessage";
import { colors } from "@/constants/colors";
import { typography } from '@/constants/typography';

export default function FormField({
  label,
  error,
  children,
}) {
  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, typography.bodyStrong['body-md-strong']]}>{label}</Text>}

      {children}

      <ErrorMessage message={error} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    color: colors.semantic.text.primary,
  },
});
