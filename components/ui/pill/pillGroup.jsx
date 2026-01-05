// components/pill/PillGroup.jsx
import { View, StyleSheet } from "react-native";
import Pill from "./pill";

export default function PillGroup({ items = [], value = [], onChange }) {
  const toggle = (v) => {
    onChange(
      value.includes(v)
        ? value.filter((x) => x !== v)
        : [...value, v]
    );
  };

  return (
    <View style={styles.group}>
      {items.map((item) => (
        <Pill
          key={item.value}
          label={item.label}
          selected={value.includes(item.value)}
          onPress={() => toggle(item.value)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
});
