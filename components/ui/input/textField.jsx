// components/input/TextField.jsx
import { useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

export default function TextField({
  value,
  placeholder,
  error,
  disabled,
  onChangeText,
  type,
  ...props
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
      {...props} 
      secureTextEntry={props.secureTextEntry}
      value={value}
      editable={!disabled}
      placeholder={placeholder}
      placeholderTextColor={colors.semantic.text.placeholder}
      onChangeText={onChangeText}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={[
        styles.input,
        type === 'auth' && styles.authInput,
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
  input: {
    width: '100%',
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: colors.semantic.input.bg,
    color: colors.semantic.input.text,
  },
  authInput: {
    height: 50,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  error: {
    borderColor: colors.semantic.input.border.error,
  },
});
