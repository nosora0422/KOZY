// components/pill/PillGroup.jsx
import { View, StyleSheet } from "react-native";
import Pill from "./pill";

export default function PillGroup({ 
  items = [], 
  value = [], 
  onChange,
  isMulti = true
}) {
  const handlePress = (itemValue) => {
    if (isMulti) {
      const current = Array.isArray(value) ? value : [];

      if (current.includes(itemValue)) {
        onChange(current.filter(v => v !== itemValue));
      } else {
        onChange([...current, itemValue]);
      }
    } else {
      onChange(itemValue);
    }
  };

  return (
    <View style={styles.group}>
      {items.map((item) => {
        const isSelected = isMulti
          ? Array.isArray(value) && value.includes(item.value)
          : value === item.value;

        return (
          <Pill
            key={item.value}
            label={item.label}
            selected={isSelected}
            onPress={() => handlePress(item.value)}
          />
        );
      })}
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
