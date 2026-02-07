import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { colors } from "@/constants/colors";

export default function Dropdown({ value, options, onChange, style }) {
  return (
    <View style={[styles.wrapper, style]}>
      <Picker
        selectedValue={value}
        onValueChange={onChange}
        style={styles.picker}
        itemStyle={{ color: 'white' }}
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
    height: 216,
    borderColor: colors.semantic.input.border.normal.color,
    overflow: "hidden",
    //borderWidth: 1, // Optional: Add border to match input styles
    //borderRadius: 24, // Optional: Add border radius to match input styles
  },
  picker: {
    height: 216,
    color: colors.semantic.text.primary,
  },
});
