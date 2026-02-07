// components/input/TextField.jsx
import { useState } from "react";
import { TextInput, StyleSheet, View, Pressable } from "react-native";
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

export default function TextField({
  value,
  placeholder,
  error,
  disabled,
  onChangeText,
  onFocus,
  onBlur,
  type,
  style,
  containerStyle,
  rightIcon,
  onRightIconPress,
  rightIconAccessibilityLabel,
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
    <View style={[styles.wrapper, containerStyle]}>
      <TextInput
        {...props} 
        secureTextEntry={props.secureTextEntry}
        value={value}
        editable={!disabled}
        placeholder={placeholder}
        placeholderTextColor={colors.semantic.text.placeholder}
        onChangeText={onChangeText}
        onFocus={(event) => {
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          onBlur?.(event);
        }}
        style={[
          styles.input,
          type === 'auth' && styles.authInput,
          typography.body['body-xsm'],
          {
            borderColor: border.color,
            borderWidth: border.width,
          },
          rightIcon && styles.inputWithIcon,
          style,
        ]}
      />
      {rightIcon ? (
        onRightIconPress ? (
          <Pressable
            onPress={onRightIconPress}
            accessibilityRole="button"
            accessibilityLabel={rightIconAccessibilityLabel}
            style={styles.iconButton}
          >
            {rightIcon}
          </Pressable>
        ) : (
          <View style={styles.iconButton}>
            {rightIcon}
          </View>
        )
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 999,
    color: colors.semantic.input.text,
  },
  inputWithIcon: {
    paddingRight: 44,
  },
  iconButton: {
    position: 'absolute',
    right: 12,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
