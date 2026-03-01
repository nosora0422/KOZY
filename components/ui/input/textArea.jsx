// components/input/TextArea.jsx
import React, { useState } from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import AppText from "../appText";

export default function TextArea({
  value,
  placeholder,
  error,
  disabled,
  onChangeText,
  ...prop
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
    <View>
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
          styles.textarea,
          typography.body['body-xsm'],
          {
            borderColor: border.color,
            borderWidth: border.width,
          },
        ]}
        {...prop}
      />
      <AppText variant="caption" color={value.length > 750 ? 'error' : 'secondary'} style={styles.counter}>
        {value.length}/750
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  textarea: {
    width: '100%',
    height: 120,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    color: colors.semantic.input.text,
    textAlignVertical: "top",
  },
  error: {
    borderColor: colors.semantic.input.border.error,
  },
  counter: {
    position: 'absolute',
    bottom: 8,
    right: 16,
  },
});