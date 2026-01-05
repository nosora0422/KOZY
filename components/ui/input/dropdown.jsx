// components/input/Dropdown.jsx
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function Dropdown({ value, options, onChange }) {
  return (
    <View style={styles.wrapper}>
      <Picker
        selectedValue={value}
        onValueChange={onChange}
        style={styles.picker}
      >
        {options.map((o) => (
          <Picker.Item
            key={o.value}
            label={o.label}
            value={o.value}
          />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: 40,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#555",
    backgroundColor: "#2b2b2b",
    overflow: "hidden",
  },
  picker: {
    height: 40,
    color: "#fff",
  },
});
