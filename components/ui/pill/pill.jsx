// components/pill/Pill.jsx
import { Pressable, Text, StyleSheet } from "react-native";
import { typography } from '@/constants/typography';
import { colors } from '@/constants/colors';

export default function Pill({ label, selected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.pill, typography.body['body-xsm'], selected && styles.selected]}
    >
      <Text style={[styles.text, typography.body['body-xsm'], selected && styles.textSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.semantic.input.border.normal.color,
  },
  selected: {
    backgroundColor: "#fff",
  },
  text: {
    color: "#fff",
  },
  textSelected: {
    color: "#000",
  },
});
