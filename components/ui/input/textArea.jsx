// components/input/TextArea.jsx
import { TextInput, StyleSheet } from "react-native";
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

export default function TextArea({
  value,
  placeholder,
  error,
  disabled,
  onChangeText,
}) {

    const [focused, setFocused] = useState(false);
    
    const borderStyle = () => {
        if (disabled) return colors.semantic.input.border.disabled;
        if (error) return colors.semantic.input.border.error;
        if (focused) return colors.semantic.input.border.focused;
        return colors.semantic.input.border.normal;
    };

    const border = borderStyle();

  return (
    <TextInput
      value={value}
      editable={!disabled}
      placeholder={placeholder}
      placeholderTextColor={colors.semantic.text.placeholder}
      multiline
      numberOfLines={4}
      onChangeText={onChangeText}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={[
        styles.input,
        typography.body['body-xsm'],
        {
          borderColor: border.color,
          borderWidth: border.width,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  textarea: {
    width: '100%',
    height: 120,
    padding: 14,
    borderRadius: 16,
    backgroundColor: colors.semantic.input.bg,
    color: colors.semantic.input.text,
    textAlignVertical: "top",
  },
  error: {
    borderColor: colors.semantic.input.border.error,
  },
});
